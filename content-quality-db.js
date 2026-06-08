// KEP v5.7 — Content Quality Dashboard
// Admin/reviewer dashboard for checking if KEP content is ready for students.

(function(){
  const state = {
    questions: [],
    resources: [],
    aiSuggestions: [],
    subject: 'all',
    status: 'all',
    search: ''
  };

  const $ = (sel, parent=document) => parent.querySelector(sel);

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function status(message, type='info'){
    const box = $('[data-quality-status]');
    if(box){
      box.className = `ai-backend-status ${type}`;
      box.textContent = message;
    }
  }

  function getField(row, keys, fallback=''){
    for(const key of keys){
      if(row && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') return row[key];
    }
    return fallback;
  }

  function questionText(q){
    return getField(q, ['question_text','question','questionText','Question','Question Text','q'], '');
  }

  function subjectName(q){
    return getField(q, ['subject_name','subject','subjectName','Subject'], 'General');
  }

  function explanationText(q){
    return getField(q, ['explanation','Explanation','explain'], '');
  }

  function optionsList(q){
    if(Array.isArray(q.options)) return q.options.filter(Boolean);
    if(typeof q.options === 'string'){
      try{
        const parsed = JSON.parse(q.options);
        if(Array.isArray(parsed)) return parsed.filter(Boolean);
      }catch{}
      return q.options.split(/\n|,/).map(x => x.trim()).filter(Boolean);
    }
    return [
      getField(q, ['optionA','option_a','Option A','A']),
      getField(q, ['optionB','option_b','Option B','B']),
      getField(q, ['optionC','option_c','Option C','C']),
      getField(q, ['optionD','option_d','Option D','D'])
    ].filter(Boolean);
  }

  function correctAnswer(q){
    return getField(q, ['correct_answer','correctAnswer','correct','answer','Answer','Correct Answer'], '');
  }

  function wordCount(text){
    return String(text || '').trim().split(/\s+/).filter(Boolean).length;
  }

  function normalizeText(text){
    return String(text || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
  }

  function readinessForQuestion(q){
    const issues = [];
    const strengths = [];
    const text = questionText(q);
    const opts = optionsList(q);
    const correct = correctAnswer(q);
    const exp = explanationText(q);
    const st = q.status || 'unknown';

    if(!text) issues.push('Missing question text');
    if(text && wordCount(text) < 5) issues.push('Very short question');
    if(text && wordCount(text) > 45) issues.push('Long question');
    if(text && !/[?؟]$/.test(text.trim())) issues.push('No question mark');
    if(opts.length < 4) issues.push('Less than 4 options');
    if(new Set(opts.map(o => normalizeText(o))).size !== opts.length) issues.push('Duplicate options');
    if(correct && opts.length && !opts.some(o => normalizeText(o) === normalizeText(correct))){
      const indexLike = /^[0-3]$|^[A-D]$/i.test(String(correct).trim());
      if(!indexLike) issues.push('Correct answer may not match options');
    }
    if(!exp || wordCount(exp) < 8) issues.push('Missing or weak explanation');
    if(st !== 'published') issues.push(`Status is ${st}`);

    if(text && wordCount(text) >= 5 && wordCount(text) <= 45) strengths.push('Question length OK');
    if(opts.length >= 4) strengths.push('Options OK');
    if(exp && wordCount(exp) >= 8) strengths.push('Explanation OK');
    if(st === 'published') strengths.push('Published');

    const score = Math.max(0, Math.min(100, 100 - issues.length * 12 + strengths.length * 4));
    let band = 'Ready';
    if(score < 55) band = 'Needs work';
    else if(score < 78) band = 'Review';
    return { score, band, issues, strengths };
  }

  function duplicateGroups(){
    const map = new Map();
    state.questions.forEach(q => {
      const key = normalizeText(questionText(q));
      if(!key || key.length < 12) return;
      if(!map.has(key)) map.set(key, []);
      map.get(key).push(q);
    });
    return Array.from(map.values()).filter(group => group.length > 1);
  }

  function subjectStats(){
    const stats = {};
    state.questions.forEach(q => {
      const subject = subjectName(q);
      if(!stats[subject]) stats[subject] = {total:0,published:0,needs_review:0,draft:0,weak:0,avg:0,scores:[]};
      const s = stats[subject];
      s.total++;
      const st = q.status || 'unknown';
      if(st === 'published') s.published++;
      else if(st === 'needs_review') s.needs_review++;
      else s.draft++;
      const r = readinessForQuestion(q);
      s.scores.push(r.score);
      if(r.band !== 'Ready') s.weak++;
    });
    Object.values(stats).forEach(s => {
      s.avg = s.scores.length ? Math.round(s.scores.reduce((a,b)=>a+b,0) / s.scores.length) : 0;
    });
    return stats;
  }

  function overallStats(){
    const total = state.questions.length;
    const published = state.questions.filter(q => (q.status || '') === 'published').length;
    const needsReview = state.questions.filter(q => (q.status || '') === 'needs_review').length;
    const missingExp = state.questions.filter(q => wordCount(explanationText(q)) < 8).length;
    const weak = state.questions.filter(q => readinessForQuestion(q).band !== 'Ready').length;
    const duplicates = duplicateGroups().reduce((sum, group) => sum + group.length, 0);
    const avg = total ? Math.round(state.questions.reduce((sum, q) => sum + readinessForQuestion(q).score, 0) / total) : 0;
    const resourcesPublished = state.resources.filter(r => (r.status || '') === 'published').length;
    const aiPending = state.aiSuggestions.filter(s => (s.status || '') === 'suggested').length;

    return { total, published, needsReview, missingExp, weak, duplicates, avg, resourcesPublished, aiPending };
  }

  function filteredQuestions(){
    return state.questions.filter(q => {
      const subOk = state.subject === 'all' || subjectName(q) === state.subject;
      const statusOk = state.status === 'all' || (q.status || 'unknown') === state.status;
      const searchText = `${questionText(q)} ${subjectName(q)} ${q.status || ''} ${explanationText(q)}`.toLowerCase();
      const searchOk = !state.search || searchText.includes(state.search.toLowerCase());
      return subOk && statusOk && searchOk;
    });
  }

  function renderScoreRing(score){
    let cls = 'good';
    if(score < 55) cls = 'bad';
    else if(score < 78) cls = 'warn';
    return `<div class="quality-score-ring ${cls}"><b>${score}</b><span>score</span></div>`;
  }

  function renderStats(){
    const box = $('[data-quality-stats]');
    if(!box) return;
    const s = overallStats();
    box.innerHTML = `
      <div>${renderScoreRing(s.avg)}<p>Overall readiness</p></div>
      <div><b>${s.total}</b><span>Total questions</span></div>
      <div><b>${s.published}</b><span>Published</span></div>
      <div><b>${s.needsReview}</b><span>Needs review</span></div>
      <div><b>${s.missingExp}</b><span>Weak explanations</span></div>
      <div><b>${s.duplicates}</b><span>Duplicate risk</span></div>
      <div><b>${s.resourcesPublished}</b><span>Published resources</span></div>
      <div><b>${s.aiPending}</b><span>AI pending</span></div>
    `;
  }

  function renderFilters(){
    const subjectSelect = $('[data-quality-subject]');
    if(subjectSelect){
      const subjects = [...new Set(state.questions.map(subjectName))].sort();
      subjectSelect.innerHTML = `<option value="all">All subjects</option>` + subjects.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
      subjectSelect.value = state.subject;
    }
  }

  function renderSubjectTable(){
    const box = $('[data-quality-subjects]');
    if(!box) return;
    const stats = subjectStats();
    const rows = Object.entries(stats).sort((a,b) => b[1].total - a[1].total);
    if(!rows.length){
      box.innerHTML = `<div class="empty-state"><h3>No subject data</h3><p>Load content quality data first.</p></div>`;
      return;
    }
    box.innerHTML = `
      <div class="quality-table">
        <div class="quality-table-head">
          <b>Subject</b><b>Total</b><b>Published</b><b>Weak</b><b>Avg score</b>
        </div>
        ${rows.map(([subject, s]) => `
          <div class="quality-table-row">
            <span>${esc(subject)}</span>
            <span>${s.total}</span>
            <span>${s.published}</span>
            <span>${s.weak}</span>
            <span>${s.avg}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderIssueList(){
    const box = $('[data-quality-issues]');
    if(!box) return;
    const rows = filteredQuestions()
      .map(q => ({ q, r: readinessForQuestion(q) }))
      .filter(x => x.r.issues.length)
      .sort((a,b) => a.r.score - b.r.score)
      .slice(0, 60);

    if(!rows.length){
      box.innerHTML = `<div class="empty-state"><h3>No major issues found</h3><p>For the current filters, content looks clean.</p></div>`;
      return;
    }

    box.innerHTML = rows.map(({q, r}) => `
      <article class="quality-issue-card">
        <div class="quality-issue-top">
          ${renderScoreRing(r.score)}
          <div>
            <span class="ai-tag">${esc(subjectName(q))}</span>
            <span class="ai-tag status-${esc(q.status || 'unknown')}">${esc(q.status || 'unknown')}</span>
            <h3>${esc(questionText(q) || 'Untitled question')}</h3>
          </div>
        </div>
        <p><b>Issues:</b> ${esc(r.issues.join(' • '))}</p>
        <p><b>Explanation:</b> ${esc(explanationText(q) || 'Missing')}</p>
      </article>
    `).join('');
  }

  function renderDuplicateRisk(){
    const box = $('[data-quality-duplicates]');
    if(!box) return;
    const groups = duplicateGroups();
    if(!groups.length){
      box.innerHTML = `<div class="empty-state"><h3>No exact duplicate questions found</h3><p>This check catches exact text duplicates. Future AI can catch similar meaning duplicates.</p></div>`;
      return;
    }
    box.innerHTML = groups.map(group => `
      <article class="quality-duplicate-card">
        <h3>${esc(questionText(group[0]))}</h3>
        <p>${group.length} matching question records found.</p>
        <div>${group.map(q => `<span class="ai-tag">${esc(subjectName(q))} • ${esc(q.status || 'unknown')}</span>`).join('')}</div>
      </article>
    `).join('');
  }

  function render(){
    renderStats();
    renderFilters();
    renderSubjectTable();
    renderIssueList();
    renderDuplicateRisk();
  }

  async function safeSelect(table, columns='*'){
    const { data, error } = await window.kepSupabase.from(table).select(columns).limit(1000);
    if(error) {
      console.warn(`Could not load ${table}:`, error.message);
      return { data: [], error };
    }
    return { data: data || [], error: null };
  }

  async function loadQualityData(){
    if(!window.kepSupabase){
      status('Supabase client is not ready. Open Database Setup, save connection, and login as admin/reviewer.', 'warn');
      return;
    }

    status('Loading questions, resources, and AI suggestion data...', 'info');

    const questions = await safeSelect('questions', '*');
    const resources = await safeSelect('resources', '*');
    const ai = await safeSelect('ai_review_suggestions', '*');

    state.questions = questions.data || [];
    state.resources = resources.data || [];
    state.aiSuggestions = ai.data || [];

    const warningParts = [];
    if(questions.error) warningParts.push('questions table issue');
    if(resources.error) warningParts.push('resources table issue');
    if(ai.error) warningParts.push('AI suggestions table not available');

    if(warningParts.length){
      status(`Loaded with warnings: ${warningParts.join(', ')}.`, 'warn');
    } else {
      status(`Loaded ${state.questions.length} questions, ${state.resources.length} resources, and ${state.aiSuggestions.length} AI suggestion records.`, 'ok');
    }

    render();
  }

  function exportReport(){
    const report = {
      created_at: new Date().toISOString(),
      overall: overallStats(),
      subjects: subjectStats(),
      duplicate_groups: duplicateGroups().map(group => group.map(q => ({
        id: q.id,
        subject: subjectName(q),
        status: q.status,
        question: questionText(q)
      }))),
      top_issues: filteredQuestions()
        .map(q => ({ id:q.id, subject:subjectName(q), status:q.status, question:questionText(q), readiness:readinessForQuestion(q) }))
        .filter(x => x.readiness.issues.length)
        .sort((a,b) => a.readiness.score - b.readiness.score)
        .slice(0, 100)
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kep-content-quality-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-quality-action]')?.dataset.qualityAction;
    if(action === 'load') loadQualityData();
    if(action === 'export') exportReport();
  });

  document.addEventListener('change', (e) => {
    if(e.target.matches('[data-quality-subject]')){
      state.subject = e.target.value;
      renderIssueList();
    }
    if(e.target.matches('[data-quality-status-filter]')){
      state.status = e.target.value;
      renderIssueList();
    }
  });

  document.addEventListener('input', (e) => {
    if(e.target.matches('[data-quality-search]')){
      state.search = e.target.value.trim();
      renderIssueList();
    }
  });

  document.addEventListener('DOMContentLoaded', render);
})();

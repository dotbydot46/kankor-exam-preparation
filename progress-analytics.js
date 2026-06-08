// KEP v5.8 — Student Progress Analytics
// Student-facing analytics from Supabase exam_attempts + local practice attempts fallback.

(function(){
  const state = {
    attempts: [],
    localAttempts: [],
    subjectStats: {},
    filterType: 'all'
  };

  const $ = (sel, parent=document) => parent.querySelector(sel);

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function status(message, type='info'){
    const box = $('[data-progress-status]');
    if(box){
      box.className = `ai-backend-status ${type}`;
      box.textContent = message;
    }
  }

  function number(v, fallback=0){
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function parseJsonMaybe(value, fallback){
    if(!value) return fallback;
    if(typeof value === 'object') return value;
    try { return JSON.parse(value); } catch { return fallback; }
  }

  function getScorePercent(a){
    if(a.score_percent !== undefined) return number(a.score_percent);
    if(a.percentage !== undefined) return number(a.percentage);
    if(a.score !== undefined && number(a.total_questions) > 0 && number(a.score) <= number(a.total_questions)){
      return Math.round((number(a.score) / number(a.total_questions)) * 100);
    }
    if(a.correct_count !== undefined && number(a.total_questions) > 0){
      return Math.round((number(a.correct_count) / number(a.total_questions)) * 100);
    }
    if(a.score !== undefined) return number(a.score);
    return 0;
  }

  function getCorrect(a){
    if(a.correct_count !== undefined) return number(a.correct_count);
    if(a.correct !== undefined) return number(a.correct);
    if(a.score !== undefined && number(a.score) <= number(a.total_questions || 9999)) return number(a.score);
    return 0;
  }

  function getTotal(a){
    if(a.total_questions !== undefined) return number(a.total_questions);
    if(a.total !== undefined) return number(a.total);
    if(Array.isArray(a.answers)) return a.answers.length;
    return 0;
  }

  function getType(a){
    return a.exam_type || a.type || a.mode || a.source || 'practice';
  }

  function getDate(a){
    return a.created_at || a.date || a.finished_at || a.saved_at || new Date().toISOString();
  }

  function getSubjectBreakdown(a){
    return parseJsonMaybe(a.subject_breakdown || a.breakdown || a.subjects, {});
  }

  function normalizeLocalAttempts(){
    const raw = localStorage.getItem('kepPracticeAttempts') || '[]';
    const arr = parseJsonMaybe(raw, []);
    return Array.isArray(arr) ? arr.map((a, index) => ({
      id: `local-${index}`,
      source_kind: 'local',
      type: a.type || a.mode || 'practice',
      exam_type: a.type || a.mode || 'practice',
      created_at: a.created_at || a.date || new Date().toISOString(),
      score_percent: a.score_percent ?? a.percentage ?? a.score ?? 0,
      correct_count: a.correct_count ?? a.correct ?? 0,
      total_questions: a.total_questions ?? a.total ?? 0,
      subject_breakdown: a.subject_breakdown || a.breakdown || {}
    })) : [];
  }

  function mergeAttempts(dbRows, localRows){
    const db = (dbRows || []).map(a => ({...a, source_kind:'database'}));
    return [...db, ...localRows].sort((a,b) => new Date(getDate(b)) - new Date(getDate(a)));
  }

  function calcStats(){
    const attempts = filteredAttempts();
    const total = attempts.length;
    const avg = total ? Math.round(attempts.reduce((sum,a)=>sum + getScorePercent(a),0) / total) : 0;
    const best = total ? Math.max(...attempts.map(getScorePercent)) : 0;
    const latest = total ? getScorePercent(attempts[0]) : 0;
    const questions = attempts.reduce((sum,a)=>sum + getTotal(a),0);
    const correct = attempts.reduce((sum,a)=>sum + getCorrect(a),0);
    const accuracy = questions ? Math.round((correct / questions) * 100) : avg;

    return { total, avg, best, latest, questions, correct, accuracy };
  }

  function filteredAttempts(){
    if(state.filterType === 'all') return state.attempts;
    return state.attempts.filter(a => getType(a).toLowerCase().includes(state.filterType));
  }

  function calcSubjectStats(){
    const stats = {};
    state.attempts.forEach(a => {
      const breakdown = getSubjectBreakdown(a);
      if(!breakdown || typeof breakdown !== 'object') return;

      Object.entries(breakdown).forEach(([subject, value]) => {
        let correct = 0;
        let total = 0;

        if(typeof value === 'object' && value){
          correct = number(value.correct ?? value.score ?? value.right);
          total = number(value.total ?? value.questions ?? value.count);
        } else if(typeof value === 'number'){
          correct = value;
          total = 1;
        }

        if(!stats[subject]) stats[subject] = { correct:0, total:0, attempts:0 };
        stats[subject].correct += correct;
        stats[subject].total += total;
        stats[subject].attempts += 1;
      });
    });

    Object.keys(stats).forEach(subject => {
      const s = stats[subject];
      s.percent = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    });

    return stats;
  }

  function trendData(){
    return [...filteredAttempts()].reverse().slice(-12).map((a, index) => ({
      label: new Date(getDate(a)).toLocaleDateString(undefined, { month:'short', day:'numeric' }),
      score: getScorePercent(a),
      type: getType(a),
      index: index + 1
    }));
  }

  function streakDays(){
    const days = new Set(state.attempts.map(a => new Date(getDate(a)).toISOString().slice(0,10)));
    let streak = 0;
    const today = new Date();
    for(let i=0;i<90;i++){
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0,10);
      if(days.has(key)) streak++;
      else if(i > 0) break;
    }
    return streak;
  }

  function readinessMessage(stats){
    if(!stats.total) return 'Start with one practice session or one short mock exam.';
    if(stats.avg >= 80) return 'Strong progress. Keep practising and protect your weak subjects.';
    if(stats.avg >= 60) return 'Good foundation. Focus on weak subjects and review mistakes.';
    if(stats.avg >= 40) return 'You are building. Use Study Plan and repeat short practice daily.';
    return 'Start small. Do short practice sessions and read explanations carefully.';
  }

  function renderStats(){
    const box = $('[data-progress-stats]');
    if(!box) return;
    const s = calcStats();
    box.innerHTML = `
      <div class="progress-hero-stat"><b>${s.avg}%</b><span>Average score</span></div>
      <div><b>${s.latest}%</b><span>Latest score</span></div>
      <div><b>${s.best}%</b><span>Best score</span></div>
      <div><b>${s.total}</b><span>Total attempts</span></div>
      <div><b>${s.correct}/${s.questions}</b><span>Correct answers</span></div>
      <div><b>${streakDays()}</b><span>Day streak</span></div>
    `;

    const msg = $('[data-progress-message]');
    if(msg) msg.textContent = readinessMessage(s);
  }

  function renderTrend(){
    const box = $('[data-progress-trend]');
    if(!box) return;
    const data = trendData();

    if(!data.length){
      box.innerHTML = `<div class="empty-state"><h3>No progress yet</h3><p>Complete practice or mock exam attempts to see your trend.</p></div>`;
      return;
    }

    box.innerHTML = `
      <div class="progress-bars">
        ${data.map(d => `
          <div class="progress-bar-item">
            <div class="progress-bar-track"><span style="height:${Math.max(4, Math.min(100, d.score))}%"></span></div>
            <b>${d.score}%</b>
            <small>${esc(d.label)}</small>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSubjects(){
    const box = $('[data-progress-subjects]');
    if(!box) return;
    const stats = calcSubjectStats();
    const rows = Object.entries(stats).sort((a,b) => a[1].percent - b[1].percent);

    if(!rows.length){
      box.innerHTML = `<div class="empty-state"><h3>No subject breakdown yet</h3><p>Mock exams with subject breakdown will show strengths and weak subjects here.</p></div>`;
      return;
    }

    box.innerHTML = rows.map(([subject, s]) => {
      const cls = s.percent >= 75 ? 'good' : s.percent >= 50 ? 'warn' : 'bad';
      return `
        <article class="subject-progress-card">
          <div>
            <h3>${esc(subject)}</h3>
            <p>${s.correct}/${s.total} correct • ${s.attempts} attempt${s.attempts === 1 ? '' : 's'}</p>
          </div>
          <div class="subject-progress-meter">
            <span class="${cls}" style="width:${Math.max(5, s.percent)}%"></span>
          </div>
          <b>${s.percent}%</b>
        </article>
      `;
    }).join('');
  }

  function renderRecent(){
    const box = $('[data-progress-recent]');
    if(!box) return;
    const rows = filteredAttempts().slice(0, 8);

    if(!rows.length){
      box.innerHTML = `<div class="empty-state"><h3>No attempts yet</h3><p>Start with Practice or Mock Exam.</p></div>`;
      return;
    }

    box.innerHTML = rows.map(a => `
      <article class="recent-attempt-card">
        <div>
          <span class="ai-tag">${esc(getType(a))}</span>
          <span class="ai-tag">${esc(a.source_kind || 'database')}</span>
          <h3>${getScorePercent(a)}%</h3>
          <p>${getCorrect(a)}/${getTotal(a)} correct • ${esc(new Date(getDate(a)).toLocaleString())}</p>
        </div>
        <a class="btn btn-secondary" href="study-plan-db.html">Improve</a>
      </article>
    `).join('');
  }

  function renderRecommendations(){
    const box = $('[data-progress-recommendations]');
    if(!box) return;
    const s = calcStats();
    const subjectStats = calcSubjectStats();
    const weakSubjects = Object.entries(subjectStats)
      .filter(([_, v]) => v.percent < 60)
      .sort((a,b) => a[1].percent - b[1].percent)
      .slice(0, 3)
      .map(([subject]) => subject);

    const items = [];
    if(!s.total) {
      items.push(['Start practice', 'Complete one 5-question practice session today.', 'practice-db.html']);
      items.push(['Try a short mock', 'Take a 10-question mock to create your first baseline.', 'mock-db.html']);
    } else {
      if(weakSubjects.length) items.push(['Focus weak subjects', `Review: ${weakSubjects.join(', ')}.`, 'study-plan-db.html']);
      if(s.avg < 70) items.push(['Review mistakes', 'Do one short practice and read every explanation.', 'practice-db.html']);
      if(s.total >= 2) items.push(['Take a mock exam', 'Use a timed mock to check progress under pressure.', 'mock-db.html']);
      items.push(['Follow weekly plan', 'Generate or update your weekly study plan.', 'study-plan-db.html']);
    }
    items.push(['Use library', 'Read resources for the subject you find hardest.', 'library-db.html']);

    box.innerHTML = items.slice(0, 4).map(([title, desc, href]) => `
      <a class="student-recommendation-card" href="${href}">
        <b>${esc(title)}</b>
        <span>${esc(desc)}</span>
      </a>
    `).join('');
  }

  function render(){
    renderStats();
    renderTrend();
    renderSubjects();
    renderRecent();
    renderRecommendations();
  }

  async function loadDbAttempts(){
    if(!window.kepSupabase) return { data: [], error: new Error('Supabase client not ready') };

    const { data, error } = await window.kepSupabase
      .from('exam_attempts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    return { data: data || [], error };
  }

  async function loadProgress(){
    status('Loading your progress...', 'info');

    const localRows = normalizeLocalAttempts();
    state.localAttempts = localRows;

    let dbRows = [];
    let dbError = null;

    if(window.kepSupabase){
      const result = await loadDbAttempts();
      dbRows = result.data || [];
      dbError = result.error;
    }

    state.attempts = mergeAttempts(dbRows, localRows);

    if(dbError && localRows.length){
      status(`Loaded local progress only. Database attempts could not load: ${dbError.message || dbError}`, 'warn');
    } else if(dbError) {
      status(`Database attempts could not load. Try login again or complete a practice session.`, 'warn');
    } else {
      status(`Loaded ${state.attempts.length} attempt(s).`, 'ok');
    }

    render();
  }

  function exportProgress(){
    const payload = {
      created_at: new Date().toISOString(),
      stats: calcStats(),
      streak_days: streakDays(),
      subject_stats: calcSubjectStats(),
      attempts: state.attempts
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kep-student-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-progress-action]')?.dataset.progressAction;
    if(action === 'load') loadProgress();
    if(action === 'export') exportProgress();
  });

  document.addEventListener('change', (e) => {
    if(e.target.matches('[data-progress-filter]')){
      state.filterType = e.target.value;
      render();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    render();
  });
})();

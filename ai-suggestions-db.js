// KEP v5.6 — Saved AI Suggestions Dashboard
// Admin/reviewer tool for viewing and updating saved AI review suggestions.

(function(){
  const state = {
    rows: [],
    status: 'all',
    type: 'all',
    search: ''
  };

  const $ = (sel, parent=document) => parent.querySelector(sel);

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function statusBox(message, type='info'){
    const box = $('[data-ai-suggestions-status]');
    if(box){
      box.className = `ai-backend-status ${type}`;
      box.textContent = message;
    }
  }

  function getSuggestionText(row){
    const s = row.suggestion || {};
    const quality = s.suggestions?.quality || s.quality || {};
    const issues = quality.issues || [];
    const raw = JSON.stringify(s).toLowerCase();
    return `${row.content_type || ''} ${row.suggestion_type || ''} ${row.status || ''} ${row.reviewer_note || ''} ${issues.join(' ')} ${raw}`;
  }

  function filteredRows(){
    return state.rows.filter(row => {
      const statusOk = state.status === 'all' || row.status === state.status;
      const typeOk = state.type === 'all' || row.content_type === state.type;
      const searchOk = !state.search || getSuggestionText(row).includes(state.search.toLowerCase());
      return statusOk && typeOk && searchOk;
    });
  }

  function renderStats(){
    const box = $('[data-ai-suggestions-stats]');
    if(!box) return;
    const total = state.rows.length;
    const suggested = state.rows.filter(r => r.status === 'suggested').length;
    const accepted = state.rows.filter(r => r.status === 'accepted').length;
    const rejected = state.rows.filter(r => r.status === 'rejected').length;
    const edited = state.rows.filter(r => r.status === 'edited').length;

    box.innerHTML = `
      <div><b>${total}</b><span>Total</span></div>
      <div><b>${suggested}</b><span>Suggested</span></div>
      <div><b>${accepted}</b><span>Accepted</span></div>
      <div><b>${edited}</b><span>Edited</span></div>
      <div><b>${rejected}</b><span>Rejected</span></div>
    `;
  }

  function render(){
    renderStats();
    const list = $('[data-ai-suggestions-list]');
    if(!list) return;

    const rows = filteredRows();
    if(!rows.length){
      list.innerHTML = `<div class="empty-state"><h3>No AI suggestions found</h3><p>Save a suggestion from the AI Review Assistant, or adjust your filters.</p></div>`;
      return;
    }

    list.innerHTML = rows.map(row => {
      const s = row.suggestion || {};
      const input = s.input || {};
      const suggestions = s.suggestions || s;
      const quality = suggestions.quality || {};
      const difficulty = suggestions.difficulty || {};
      const issues = quality.issues || [];
      const strengths = quality.strengths || [];
      const question = input.question || suggestions.question || 'AI suggestion';
      const score = quality.score ?? '—';
      const mode = s.mode || row.suggestion_type || 'ai_review';

      return `
        <article class="ai-suggestion-card" data-row-id="${esc(row.id)}">
          <div class="ai-suggestion-head">
            <div>
              <span class="ai-tag">${esc(row.content_type || 'question')}</span>
              <span class="ai-tag status-${esc(row.status || 'suggested')}">${esc(row.status || 'suggested')}</span>
              <span class="ai-tag">${esc(mode)}</span>
            </div>
            <small>${esc(new Date(row.created_at).toLocaleString())}</small>
          </div>

          <h3>${esc(question)}</h3>

          <div class="ai-suggestion-grid">
            <div><b>${esc(score)}</b><span>Quality score</span></div>
            <div><b>${esc(difficulty.difficulty || 'Review')}</b><span>${esc(difficulty.reason || 'Difficulty suggestion')}</span></div>
          </div>

          <div class="ai-suggestion-notes">
            <p><b>Issues:</b> ${issues.length ? esc(issues.join(' • ')) : 'No major issue saved.'}</p>
            <p><b>Strengths:</b> ${strengths.length ? esc(strengths.join(' • ')) : 'No strengths saved.'}</p>
          </div>

          <details>
            <summary>View full suggestion JSON</summary>
            <pre>${esc(JSON.stringify(row.suggestion, null, 2))}</pre>
          </details>

          <label class="review-note-label">Reviewer note
            <textarea data-note rows="2" placeholder="Add reviewer decision note...">${esc(row.reviewer_note || '')}</textarea>
          </label>

          <div class="ai-suggestion-actions">
            <button class="btn btn-secondary" data-ai-status="accepted">Accept</button>
            <button class="btn btn-secondary" data-ai-status="edited">Mark Edited</button>
            <button class="btn btn-ghost" data-ai-status="rejected">Reject</button>
          </div>
        </article>
      `;
    }).join('');
  }

  async function loadSuggestions(){
    if(!window.kepSupabase){
      statusBox('Supabase client is not ready. Open Database Setup, save connection, and login as admin/reviewer.', 'warn');
      return;
    }

    statusBox('Loading AI suggestions...', 'info');
    const { data, error } = await window.kepSupabase
      .from('ai_review_suggestions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if(error){
      statusBox(error.message || 'Could not load AI suggestions. Run the v5.4 AI suggestions SQL if the table does not exist.', 'error');
      return;
    }

    state.rows = data || [];
    statusBox(`Loaded ${state.rows.length} AI suggestion(s).`, 'ok');
    render();
  }

  async function updateSuggestion(card, status){
    if(!window.kepSupabase){
      statusBox('Supabase client is not ready.', 'warn');
      return;
    }
    const id = card?.dataset.rowId;
    const note = card?.querySelector('[data-note]')?.value || '';
    if(!id) return;

    statusBox('Saving reviewer decision...', 'info');
    const { error } = await window.kepSupabase
      .from('ai_review_suggestions')
      .update({
        status,
        reviewer_note: note,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id);

    if(error){
      statusBox(error.message || 'Could not update suggestion.', 'error');
      return;
    }

    const row = state.rows.find(r => r.id === id);
    if(row){
      row.status = status;
      row.reviewer_note = note;
      row.reviewed_at = new Date().toISOString();
    }
    statusBox(`Suggestion marked as ${status}.`, 'ok');
    render();
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-ai-suggestions-action]')?.dataset.aiSuggestionsAction;
    if(action === 'load') loadSuggestions();

    const status = e.target.closest('[data-ai-status]')?.dataset.aiStatus;
    if(status){
      const card = e.target.closest('[data-row-id]');
      updateSuggestion(card, status);
    }
  });

  document.addEventListener('change', (e) => {
    if(e.target.matches('[data-filter-status]')){
      state.status = e.target.value;
      render();
    }
    if(e.target.matches('[data-filter-type]')){
      state.type = e.target.value;
      render();
    }
  });

  document.addEventListener('input', (e) => {
    if(e.target.matches('[data-filter-search]')){
      state.search = e.target.value.trim();
      render();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    if($('[data-ai-suggestions-list]')) {
      render();
    }
  });
})();

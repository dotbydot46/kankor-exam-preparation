// KEP v5.6 — Save AI review suggestion to Supabase
// Saves the current AI suggestion JSON into ai_review_suggestions table.

(function(){
  const $ = (sel, parent=document) => parent.querySelector(sel);

  function status(message, type='info'){
    const box = $('[data-ai-save-status]');
    if(box){
      box.className = `ai-backend-status ${type}`;
      box.textContent = message;
    }
  }

  function parseSuggestion(){
    const raw = $('[data-ai-output]')?.textContent?.trim() || localStorage.getItem('kepLastAiReviewSuggestion') || '';
    if(!raw){
      throw new Error('Run AI Review first. There is no suggestion to save.');
    }
    return JSON.parse(raw);
  }

  function contentTypeFor(data){
    return data.input?.content_type || data.content_type || data.input?.type || 'question';
  }

  function suggestionTypeFor(data){
    if(data.mode) return data.mode;
    if(data.suggestions?.translation_drafts) return 'ai_review';
    return 'prototype_review';
  }

  async function saveSuggestion(){
    if(!window.kepSupabase){
      status('Supabase client is not ready. Check Database Setup and login first.', 'warn');
      return;
    }

    let data;
    try{
      data = parseSuggestion();
    }catch(err){
      status(err.message || 'Could not read suggestion JSON.', 'warn');
      return;
    }

    status('Saving AI suggestion to Supabase...', 'info');

    const row = {
      content_type: contentTypeFor(data),
      suggestion_type: suggestionTypeFor(data),
      suggestion: data,
      status: 'suggested',
      reviewer_note: 'Saved from KEP v5.6 AI Review Assistant'
    };

    const { error } = await window.kepSupabase
      .from('ai_review_suggestions')
      .insert(row);

    if(error){
      status(error.message || 'Could not save suggestion. Run the AI suggestions SQL first.', 'error');
      return;
    }

    status('AI suggestion saved. Open Saved AI Suggestions to review it.', 'ok');
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-ai-save-action]')?.dataset.aiSaveAction;
    if(action === 'save') saveSuggestion();
  });
})();

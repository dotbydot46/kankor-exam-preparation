// KEP v5.5 — Frontend connector for Supabase Edge Function AI review
// Works only if the Edge Function `kep-ai-review` is deployed and the user is logged in as admin/reviewer.

(function(){
  const $ = (sel, parent=document) => parent.querySelector(sel);

  function parseOptionsText(text){
    return (text || '').split(/\n|,/).map(x => x.trim()).filter(Boolean).slice(0, 8);
  }

  function collectInput(){
    return {
      content_type: 'question',
      subject: ($('[data-ai-subject]')?.value || 'General').trim(),
      question: ($('[data-ai-question]')?.value || '').trim(),
      options: parseOptionsText($('[data-ai-options]')?.value || ''),
      correct_answer: ($('[data-ai-correct]')?.value || '').trim(),
      explanation: ($('[data-ai-explanation]')?.value || '').trim(),
      source: ($('[data-ai-source]')?.value || '').trim(),
      language: 'English'
    };
  }

  function output(message, type='info'){
    const box = $('[data-ai-backend-status]');
    if(box){
      box.className = `ai-backend-status ${type}`;
      box.textContent = message;
    }
  }

  function render(data){
    const out = $('[data-ai-output]');
    const summary = $('[data-ai-summary]');
    if(out) out.textContent = JSON.stringify(data, null, 2);
    if(summary){
      const suggestions = data.suggestions || {};
      const quality = suggestions.quality || {};
      const difficulty = suggestions.difficulty || {};
      summary.innerHTML = `
        <div class="ai-score"><b>${quality.score ?? 'AI'}</b><span>${data.mode || 'backend'} quality result</span></div>
        <div><b>${difficulty.difficulty || 'Review needed'}</b><span>${difficulty.reason || 'Backend suggestion returned.'}</span></div>
        <div><b>${data.safety_rule || 'AI suggests. Human approves.'}</b><span>${(quality.issues || []).join(' • ') || 'Check full JSON below.'}</span></div>
      `;
    }
    localStorage.setItem('kepLastAiReviewSuggestion', JSON.stringify(data, null, 2));
  }

  async function callBackend(){
    const input = collectInput();
    if(!input.question){
      output('Add a question first.', 'warn');
      return;
    }

    if(!window.kepSupabase || !window.kepSupabase.functions){
      output('Supabase client is not ready. Check Database Setup and login first.', 'warn');
      return;
    }

    output('Calling kep-ai-review Edge Function...', 'info');

    try{
      const { data, error } = await window.kepSupabase.functions.invoke('kep-ai-review', {
        body: { input }
      });

      if(error){
        output(error.message || 'Backend AI call failed.', 'error');
        return;
      }

      render(data);
      output(`Backend AI suggestion received (${data.mode || 'unknown mode'}).`, 'ok');
    }catch(err){
      output(err.message || String(err), 'error');
    }
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-ai-backend-action]')?.dataset.aiBackendAction;
    if(action === 'call') callBackend();
  });
})();

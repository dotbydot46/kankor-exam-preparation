// KEP v5.4 — AI Review Assistant Prototype
// Safe prototype: no external AI calls, no secret keys, no automatic publishing.
// This local helper prepares the workflow for a future backend/Edge Function AI connection.

(function(){
  const $ = (sel, parent=document) => parent.querySelector(sel);
  const $$ = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

  function value(sel){ return ($(sel)?.value || '').trim(); }
  function words(text){ return (text || '').trim().split(/\s+/).filter(Boolean); }
  function sentences(text){ return (text || '').split(/[.!?]+/).map(s => s.trim()).filter(Boolean); }

  function parseOptions(){
    const raw = value('[data-ai-options]');
    return raw.split(/\n|,/).map(o => o.trim()).filter(Boolean).slice(0, 6);
  }

  function safeJson(obj){
    return JSON.stringify(obj, null, 2);
  }

  function qualityCheck(input){
    const issues = [];
    const strengths = [];
    const questionWords = words(input.question);
    const opts = input.options;

    if(!input.question) issues.push('Question text is empty.');
    if(input.question && questionWords.length < 5) issues.push('Question may be too short or unclear.');
    if(input.question && questionWords.length > 45) issues.push('Question may be too long. Consider making it clearer.');
    if(input.question && !/[?؟]$/.test(input.question.trim())) issues.push('Question does not end with a question mark.');
    if(opts.length < 4) issues.push('There should usually be 4 answer options.');
    if(new Set(opts.map(o => o.toLowerCase())).size !== opts.length) issues.push('Some answer options look duplicated.');
    if(input.correct && opts.length && !opts.some(o => o.toLowerCase() === input.correct.toLowerCase())) {
      issues.push('Correct answer does not exactly match one of the options.');
    }
    if(!input.explanation || words(input.explanation).length < 8) issues.push('Explanation is missing or too short.');
    if(input.source && input.source.length > 6) strengths.push('Source/reference field is included.');
    if(opts.length >= 4) strengths.push('Question has enough answer options.');
    if(input.explanation && words(input.explanation).length >= 8) strengths.push('Explanation is present.');
    if(input.correct && opts.some(o => o.toLowerCase() === input.correct.toLowerCase())) strengths.push('Correct answer matches an option.');

    return {
      score: Math.max(0, 100 - issues.length * 15 + strengths.length * 5),
      strengths,
      issues,
      reviewer_decision: issues.length ? 'Needs human review before publishing' : 'Looks ready for reviewer approval'
    };
  }

  function suggestDifficulty(input){
    const text = `${input.question} ${input.explanation}`.toLowerCase();
    const hardWords = ['calculate', 'compare', 'explain why', 'derive', 'analyze', 'relationship', 'which statement', 'exception'];
    const mediumWords = ['if', 'because', 'process', 'formula', 'solve', 'reason'];
    let score = words(input.question).length;
    hardWords.forEach(w => { if(text.includes(w)) score += 12; });
    mediumWords.forEach(w => { if(text.includes(w)) score += 5; });
    if(input.options.length >= 5) score += 5;

    if(score >= 45) return { difficulty: 'Hard', reason: 'The wording or reasoning seems more demanding.' };
    if(score >= 22) return { difficulty: 'Medium', reason: 'The question needs some reasoning but is not too complex.' };
    return { difficulty: 'Easy', reason: 'The question is short and direct.' };
  }

  function draftExplanation(input){
    if(input.explanation && words(input.explanation).length >= 10){
      return input.explanation;
    }
    if(input.correct){
      return `The correct answer is “${input.correct}”. Review the key idea in the question and compare each option carefully. This explanation should be checked and improved by a human reviewer before publishing.`;
    }
    return 'Add the correct answer first, then write a short explanation that teaches the student why that answer is right.';
  }

  function translationDrafts(input){
    return {
      note: 'Prototype only. Real Pashto/Dari translation should be produced by a backend AI function and checked by a human reviewer.',
      english_clean: input.question || '',
      pashto_draft_placeholder: 'Pashto draft will appear here in the real AI version.',
      dari_draft_placeholder: 'Dari draft will appear here in the real AI version.'
    };
  }

  function duplicateHints(input){
    const keyTerms = words(input.question.toLowerCase()).filter(w => w.length > 4).slice(0, 8);
    return {
      search_terms: keyTerms,
      action: 'Search existing published questions using these terms before publishing.',
      warning: keyTerms.length < 3 ? 'Question has few searchable terms; duplicate detection may be weak.' : 'Use these terms to compare against existing content.'
    };
  }

  function buildSuggestion(){
    const input = {
      subject: value('[data-ai-subject]') || 'General',
      question: value('[data-ai-question]'),
      options: parseOptions(),
      correct: value('[data-ai-correct]'),
      explanation: value('[data-ai-explanation]'),
      source: value('[data-ai-source]'),
      created_at: new Date().toISOString()
    };
    const quality = qualityCheck(input);
    const difficulty = suggestDifficulty(input);
    const explanation = draftExplanation(input);
    const translations = translationDrafts(input);
    const duplicate = duplicateHints(input);

    return {
      content_type: 'question',
      status: 'ai_suggestion_only',
      safety_rule: 'AI suggests. Human reviewer approves. Do not auto-publish.',
      input,
      suggestions: {
        quality,
        difficulty,
        explanation_draft: explanation,
        translation_drafts: translations,
        duplicate_check: duplicate
      }
    };
  }

  function renderSuggestion(data){
    const output = $('[data-ai-output]');
    const summary = $('[data-ai-summary]');
    if(output) output.textContent = safeJson(data);
    if(summary){
      const q = data.suggestions.quality;
      const d = data.suggestions.difficulty;
      summary.innerHTML = `
        <div class="ai-score"><b>${q.score}</b><span>Quality score</span></div>
        <div><b>${d.difficulty}</b><span>${d.reason}</span></div>
        <div><b>${q.reviewer_decision}</b><span>${q.issues.length ? q.issues.join(' • ') : 'No major issue found by prototype.'}</span></div>
      `;
    }
    localStorage.setItem('kepLastAiReviewSuggestion', safeJson(data));
  }

  function fillDemo(){
    const set = (sel, val) => { const el = $(sel); if(el) el.value = val; };
    set('[data-ai-subject]', 'Biology');
    set('[data-ai-question]', 'Which part of the plant makes food?');
    set('[data-ai-options]', 'Root\nLeaf\nStem\nFlower');
    set('[data-ai-correct]', 'Leaf');
    set('[data-ai-explanation]', 'Leaves make food through photosynthesis by using sunlight, water, and carbon dioxide.');
    set('[data-ai-source]', 'KEP reviewer demo');
  }

  function downloadSuggestion(){
    const data = localStorage.getItem('kepLastAiReviewSuggestion') || safeJson(buildSuggestion());
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kep-ai-review-suggestion.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-ai-action]')?.dataset.aiAction;
    if(!action) return;
    if(action === 'demo') fillDemo();
    if(action === 'run') renderSuggestion(buildSuggestion());
    if(action === 'download') downloadSuggestion();
    if(action === 'clear'){
      $$('[data-ai-form] input, [data-ai-form] textarea, [data-ai-form] select').forEach(el => el.value = '');
      const output = $('[data-ai-output]'); if(output) output.textContent = '';
      const summary = $('[data-ai-summary]'); if(summary) summary.innerHTML = '';
      localStorage.removeItem('kepLastAiReviewSuggestion');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const existing = localStorage.getItem('kepLastAiReviewSuggestion');
    const output = $('[data-ai-output]');
    if(existing && output) output.textContent = existing;
  });
})();

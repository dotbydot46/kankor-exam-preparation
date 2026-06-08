// KEP v4.1 — Google Sheets to Supabase migration bridge
let kepMigrationQuestions = [];
let kepMigrationResources = [];

function migrationStatus(selector, message, state=''){
  const el = document.querySelector(selector);
  if(!el) return;
  el.textContent = message;
  el.classList.remove('ok','warn');
  if(state) el.classList.add(state);
}
function migrationEscape(value){
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function migrationJsonp(apiUrl, params={}){
  return new Promise((resolve, reject) => {
    const callback = 'kepMigrationCallback_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const url = new URL(apiUrl);
    Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
    url.searchParams.set('callback', callback);
    const script = document.createElement('script');
    const timer = setTimeout(() => {
      delete window[callback];
      script.remove();
      reject(new Error('Google Sheets API request timed out.'));
    }, 20000);
    window[callback] = payload => {
      clearTimeout(timer);
      delete window[callback];
      script.remove();
      resolve(payload);
    };
    script.onerror = () => {
      clearTimeout(timer);
      delete window[callback];
      script.remove();
      reject(new Error('Could not load Apps Script API. Check URL/deployment access.'));
    };
    script.src = url.toString();
    document.body.appendChild(script);
  });
}
function normalizeMigratedQuestion(q){
  const options = Array.isArray(q.options) ? q.options : [q.optionA,q.optionB,q.optionC,q.optionD].filter(Boolean);
  return {
    subject_name: q.subject || q.subject_name || 'General',
    question_text: q.question || q.question_text || q.questionText || '',
    options: options.filter(Boolean),
    correct_answer: q.correct || q.correct_answer || q.correctAnswer || q.answer || '',
    explanation: q.explanation || '',
    difficulty: q.difficulty || 'Medium',
    language: q.language || 'English',
    source_type: q.sourceType || q.source_type || 'Google Sheets migration',
    source_details: q.sourceDetails || q.origin || q.source_details || '',
    status: 'published'
  };
}
function normalizeMigratedResource(r){
  return {
    title: r.title || 'Untitled resource',
    resource_type: r.resourceType || r.resource_type || r.type || 'Book / Notes',
    subject_name: r.subject || r.subject_name || 'General',
    language: r.language || 'English',
    grade: r.grade || '',
    year: r.year || '',
    file_url: r.fileUrl || r.file_url || r.url || '',
    source_type: r.sourceType || r.source_type || 'Google Sheets migration',
    source_details: r.sourceDetails || r.origin || r.source_details || '',
    status: 'published'
  };
}
function renderMigrationPreview(){
  const qList = document.querySelector('[data-migration-question-list]');
  const rList = document.querySelector('[data-migration-resource-list]');
  const stats = document.querySelector('[data-migration-stats]');
  if(stats){
    const total = kepMigrationQuestions.length + kepMigrationResources.length;
    stats.innerHTML = `<div><b>${kepMigrationQuestions.length}</b><span>Published questions</span></div><div><b>${kepMigrationResources.length}</b><span>Published resources</span></div><div><b>${total}</b><span>Ready to import</span></div>`;
  }
  if(qList){
    qList.innerHTML = kepMigrationQuestions.length ? kepMigrationQuestions.slice(0,30).map((q, i) => `<article class="migration-preview-item"><div><b>${i+1}. ${migrationEscape(q.subject_name)}</b><span>${migrationEscape(q.language)} • ${migrationEscape(q.difficulty)}</span></div><p>${migrationEscape(q.question_text)}</p><small>Correct: ${migrationEscape(q.correct_answer)}</small></article>`).join('') : '<p class="small">No questions loaded yet.</p>';
  }
  if(rList){
    rList.innerHTML = kepMigrationResources.length ? kepMigrationResources.slice(0,30).map((r, i) => `<article class="migration-preview-item"><div><b>${i+1}. ${migrationEscape(r.title)}</b><span>${migrationEscape(r.resource_type)} • ${migrationEscape(r.language)}</span></div><p>${migrationEscape(r.subject_name)} ${r.year ? '• ' + migrationEscape(r.year) : ''}</p><small>${r.file_url ? 'Has file link' : 'No file link'}</small></article>`).join('') : '<p class="small">No resources loaded yet.</p>';
  }
}
async function checkMigrationAdmin(){
  const db = window.KEP_DB.client();
  const { data: userData, error: userError } = await db.auth.getUser();
  if(userError) throw userError;
  const user = userData.user;
  if(!user) throw new Error('Please login first.');
  const { data: profile, error } = await db.from('profiles').select('id,role,display_name').eq('id', user.id).single();
  if(error) throw error;
  if(!['admin','reviewer'].includes(profile.role)) throw new Error(`Your role is ${profile.role || 'student'}. Make your account admin/reviewer first.`);
  return {db, user, profile};
}
async function loadMigrationContent(){
  const input = document.querySelector('[data-migration-sheets-api]');
  const apiUrl = input?.value.trim() || localStorage.getItem('kepMigrationSheetsApi') || localStorage.getItem('kepLiveApiUrl') || localStorage.getItem('kepPracticeApiUrl') || '';
  if(!apiUrl){ migrationStatus('[data-migration-status]', 'Paste your Apps Script Web App URL first.', 'warn'); return; }
  try{
    migrationStatus('[data-migration-status]', 'Loading Published content from Google Sheets...');
    const [qPayload, rPayload] = await Promise.all([
      migrationJsonp(apiUrl, {action:'publishedQuestions'}),
      migrationJsonp(apiUrl, {action:'publishedResources'})
    ]);
    kepMigrationQuestions = (qPayload.questions || []).map(normalizeMigratedQuestion).filter(q => q.question_text && q.correct_answer && q.options.length >= 2);
    kepMigrationResources = (rPayload.resources || []).map(normalizeMigratedResource).filter(r => r.title);
    localStorage.setItem('kepMigrationSheetsApi', apiUrl);
    localStorage.setItem('kepLiveApiUrl', apiUrl);
    renderMigrationPreview();
    migrationStatus('[data-migration-status]', `Loaded ${kepMigrationQuestions.length} questions and ${kepMigrationResources.length} resources.`, 'ok');
  }catch(err){
    migrationStatus('[data-migration-status]', err.message || 'Could not load migration content.', 'warn');
  }
}
async function importMigrationRows(table, rows, label){
  if(!rows.length){ migrationStatus('[data-import-status]', `No ${label} to import.`, 'warn'); return; }
  try{
    migrationStatus('[data-import-status]', `Checking admin access for ${label} import...`);
    const {db, user} = await checkMigrationAdmin();
    const payload = rows.map(row => ({...row, submitted_by: user.id, reviewed_by: user.id, reviewed_at: new Date().toISOString()}));
    const chunkSize = 100;
    let imported = 0;
    for(let i=0; i<payload.length; i += chunkSize){
      const chunk = payload.slice(i, i + chunkSize);
      const { error } = await db.from(table).insert(chunk);
      if(error) throw error;
      imported += chunk.length;
      migrationStatus('[data-import-status]', `Imported ${imported}/${payload.length} ${label}...`, 'ok');
    }
    migrationStatus('[data-import-status]', `Imported ${imported} ${label} into Supabase.`, 'ok');
  }catch(err){
    migrationStatus('[data-import-status]', err.message || `Could not import ${label}.`, 'warn');
  }
}
(function initMigrationPage(){
  const input = document.querySelector('[data-migration-sheets-api]');
  if(!input) return;
  input.value = localStorage.getItem('kepMigrationSheetsApi') || localStorage.getItem('kepLiveApiUrl') || localStorage.getItem('kepPracticeApiUrl') || '';
  renderMigrationPreview();
  document.querySelector('[data-save-migration-api]')?.addEventListener('click', () => {
    const apiUrl = input.value.trim();
    if(!apiUrl){ migrationStatus('[data-migration-status]', 'Paste an Apps Script URL first.', 'warn'); return; }
    localStorage.setItem('kepMigrationSheetsApi', apiUrl);
    localStorage.setItem('kepLiveApiUrl', apiUrl);
    migrationStatus('[data-migration-status]', 'Saved Apps Script URL in this browser.', 'ok');
  });
  document.querySelector('[data-load-migration-content]')?.addEventListener('click', loadMigrationContent);
  document.querySelector('[data-import-questions-db]')?.addEventListener('click', () => importMigrationRows('questions', kepMigrationQuestions, 'questions'));
  document.querySelector('[data-import-resources-db]')?.addEventListener('click', () => importMigrationRows('resources', kepMigrationResources, 'resources'));
})();

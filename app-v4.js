

// KEP v4.3.2 — Shared mobile navigation for database pages
(function initSharedMobileNav(){
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
})();

// KEP v4.0 — Supabase auth/database frontend logic
function v4Status(sel,msg,state=''){const e=document.querySelector(sel);if(!e)return;e.textContent=msg;e.classList.remove('ok','warn');if(state)e.classList.add(state)}
function v4Escape(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function getDb(){return window.KEP_DB.client()}
async function getCurrentUserAndProfile(){const db=getDb();const {data:u,error:ue}=await db.auth.getUser();if(ue)throw ue;const user=u.user;if(!user)return{db,user:null,profile:null};const {data:profile,error}=await db.from('profiles').select('*').eq('id',user.id).single();if(error&&error.code!=='PGRST116')throw error;return{db,user,profile}}

(function(){const f=document.querySelector('[data-db-config-form]');if(!f)return;const c=window.KEP_DB.getConfig();f.url.value=c.url||'';f.anonKey.value=c.anonKey||'';f.addEventListener('submit',e=>{e.preventDefault();window.KEP_DB.saveConfig(f.url.value,f.anonKey.value);v4Status('[data-db-setup-status]','Connection saved. Now test it.','ok')});document.querySelector('[data-clear-db-config]')?.addEventListener('click',()=>{window.KEP_DB.clearConfig();f.reset();v4Status('[data-db-setup-status]','Connection cleared.','warn')});document.querySelector('[data-test-db]')?.addEventListener('click',async()=>{try{window.KEP_DB.saveConfig(f.url.value,f.anonKey.value);const db=getDb();const {data,error}=await db.from('subjects').select('id,name').limit(3);if(error)throw error;v4Status('[data-db-setup-status]',`Connected. Found ${data.length} subject row(s).`,'ok')}catch(err){v4Status('[data-db-setup-status]',err.message||'Connection failed.','warn')}})})();

(function(){const login=document.querySelector('[data-login-form]'), signup=document.querySelector('[data-signup-form]');if(!login&&!signup)return;async function refresh(){try{const {user,profile}=await getCurrentUserAndProfile();v4Status('[data-auth-session-status]',user?`Logged in as ${user.email}. Role: ${profile?.role||'student'}.`:'Not logged in.',user?'ok':'warn')}catch(e){v4Status('[data-auth-session-status]',e.message,'warn')}}refresh();login?.addEventListener('submit',async e=>{e.preventDefault();try{const db=getDb(),fd=Object.fromEntries(new FormData(login).entries());const {error}=await db.auth.signInWithPassword({email:fd.email,password:fd.password});if(error)throw error;v4Status('[data-login-status]','Logged in successfully.','ok');refresh()}catch(err){v4Status('[data-login-status]',err.message||'Login failed.','warn')}});signup?.addEventListener('submit',async e=>{e.preventDefault();try{const db=getDb(),fd=Object.fromEntries(new FormData(signup).entries());const {error}=await db.auth.signUp({email:fd.email,password:fd.password,options:{data:{display_name:fd.displayName||''}}});if(error)throw error;v4Status('[data-signup-status]','Account created. Check email confirmation if required.','ok');refresh()}catch(err){v4Status('[data-signup-status]',err.message||'Signup failed.','warn')}});document.querySelector('[data-auth-logout]')?.addEventListener('click',async()=>{try{await getDb().auth.signOut();v4Status('[data-auth-session-status]','Logged out.','ok')}catch(e){v4Status('[data-auth-session-status]',e.message,'warn')}})})();

(function(){const form=document.querySelector('[data-student-profile-form]');if(!form)return;async function load(){try{const {db,user,profile}=await getCurrentUserAndProfile();if(!user){v4Status('[data-student-db-status]','Please login first.','warn');return}v4Status('[data-student-db-status]',`Logged in as ${user.email}.`,'ok');if(profile)Object.keys(profile).forEach(k=>{if(form.elements[k]){if(form.elements[k].type==='checkbox')form.elements[k].checked=!!profile[k];else form.elements[k].value=profile[k]??''}});const {data,error}=await db.from('exam_attempts').select('*').eq('student_id',user.id).order('created_at',{ascending:false}).limit(20);if(error)throw error;render(data||[])}catch(e){v4Status('[data-student-db-status]',e.message,'warn')}}function render(a){const avg=a.length?Math.round(a.reduce((s,x)=>s+Number(x.percentage||0),0)/a.length):0,latest=a[0]?.percentage||0;document.querySelector('[data-db-attempt-stats]').innerHTML=`<div><b>${a.length}</b><span>Attempts</span></div><div><b>${avg}%</b><span>Average</span></div><div><b>${latest}%</b><span>Latest</span></div>`;document.querySelector('[data-db-attempt-list]').innerHTML=a.length?a.map(x=>`<div class="attempt-item"><b>${v4Escape(x.attempt_type||'Practice')}</b><span>${x.score}/${x.total} • ${x.percentage}%</span><small>${new Date(x.created_at).toLocaleString()}</small></div>`).join(''):'<p class="small">No database attempts yet.</p>'}form.addEventListener('submit',async e=>{e.preventDefault();try{const {db,user}=await getCurrentUserAndProfile();if(!user)throw new Error('Please login first.');const fd=Object.fromEntries(new FormData(form).entries());const payload={id:user.id,display_name:fd.display_name||'',province:fd.province||'',preferred_language:fd.preferred_language||'English',study_level:fd.study_level||'',dream_field:fd.dream_field||'',daily_study_minutes:Number(fd.daily_study_minutes||30),private_learner:form.private_learner.checked};const {error}=await db.from('profiles').upsert(payload);if(error)throw error;v4Status('[data-profile-save-status]','Profile saved to database.','ok');load()}catch(e){v4Status('[data-profile-save-status]',e.message,'warn')}});document.querySelector('[data-refresh-student-db]')?.addEventListener('click',load);document.querySelector('[data-migrate-local-attempts]')?.addEventListener('click',async()=>{try{const {db,user}=await getCurrentUserAndProfile();if(!user)throw new Error('Please login first.');const local=JSON.parse(localStorage.getItem('kepPracticeAttempts')||'[]');if(!local.length)throw new Error('No local attempts found.');const rows=local.slice(0,20).map(a=>({student_id:user.id,attempt_type:a.type||'practice',score:Number(a.score||0),total:Number(a.total||0),percentage:Number(a.percentage||0),wrong_answers:a.wrong||[],subject_breakdown:{},created_at:a.createdAt||new Date().toISOString()}));const {error}=await db.from('exam_attempts').insert(rows);if(error)throw error;v4Status('[data-migration-status]',`Uploaded ${rows.length} local attempt(s).`,'ok');load()}catch(e){v4Status('[data-migration-status]',e.message,'warn')}});load()})();

(function(){const form=document.querySelector('[data-admin-question-form]');if(!form)return;async function adminOK(){try{const {user,profile}=await getCurrentUserAndProfile();if(!user)throw new Error('Please login first.');if(!['admin','reviewer'].includes(profile?.role))throw new Error(`Logged in, but role is ${profile?.role||'student'}. Set role to admin in Supabase.`);v4Status('[data-admin-db-status]',`Admin access ready: ${profile.display_name||user.email}`,'ok');return true}catch(e){v4Status('[data-admin-db-status]',e.message,'warn');return false}}async function loadQ(){try{if(!await adminOK())return;const {data,error}=await getDb().from('questions').select('*').order('created_at',{ascending:false}).limit(30);if(error)throw error;document.querySelector('[data-admin-question-list]').innerHTML=data.length?data.map(q=>`<article class="card admin-question-card"><div class="rule-card-head"><span class="tag ${q.status==='published'?'green':'gold'}">${v4Escape(q.status)}</span><b>${v4Escape(q.subject_name||'General')}</b></div><h3>${v4Escape(q.question_text)}</h3><p>${(q.options||[]).map(v4Escape).join(' • ')}</p><p><b>Correct:</b> ${v4Escape(q.correct_answer)}</p></article>`).join(''):'<div class="card"><p>No questions yet.</p></div>'}catch(e){v4Status('[data-admin-db-status]',e.message,'warn')}}form.addEventListener('submit',async e=>{e.preventDefault();try{if(!await adminOK())return;const {user}=await getCurrentUserAndProfile();const fd=Object.fromEntries(new FormData(form).entries());const payload={subject_name:fd.subject_name,question_text:fd.question_text,options:[fd.option_a,fd.option_b,fd.option_c,fd.option_d].filter(Boolean),correct_answer:fd.correct_answer,explanation:fd.explanation||'',language:fd.language||'English',status:fd.status||'published',submitted_by:user.id,reviewed_by:user.id,reviewed_at:new Date().toISOString(),source_type:'Admin entered'};const {error}=await getDb().from('questions').insert(payload);if(error)throw error;v4Status('[data-admin-question-status]','Question saved.','ok');form.reset();loadQ()}catch(e){v4Status('[data-admin-question-status]',e.message,'warn')}});document.querySelector('[data-admin-refresh]')?.addEventListener('click',adminOK);document.querySelector('[data-admin-load-questions]')?.addEventListener('click',loadQ);adminOK()})();

(function(){const loadBtn=document.querySelector('[data-load-db-questions]');if(!loadBtn)return;let qs=[],sel=[],ans={},idx=0;function subjects(){const s=document.querySelector('[data-db-practice-subject]'),list=[...new Set(qs.map(q=>q.subject_name||'General'))].sort();s.innerHTML='<option value="All">All subjects</option>'+list.map(x=>`<option value="${v4Escape(x)}">${v4Escape(x)}</option>`).join('')}async function load(){try{const {data,error}=await getDb().from('questions').select('*').eq('status','published').limit(200);if(error)throw error;qs=data||[];subjects();v4Status('[data-practice-db-status]',`Loaded ${qs.length} published question(s).`,'ok')}catch(e){v4Status('[data-practice-db-status]',e.message,'warn')}}function render(){const q=sel[idx];if(!q)return;document.querySelector('[data-db-practice-title]').textContent=`Question ${idx+1} of ${sel.length}`;document.querySelector('[data-db-practice-subject-label]').textContent=q.subject_name||'General';document.querySelector('[data-db-practice-question]').textContent=q.question_text;document.querySelector('[data-db-practice-options]').innerHTML=(q.options||[]).map((o,i)=>`<label class="mock-option"><input type="radio" name="db-practice-answer" value="${v4Escape(o)}" ${ans[q.id]===o?'checked':''}><span>${v4Escape(o)}</span></label>`).join('');document.querySelectorAll('[name="db-practice-answer"]').forEach(i=>i.addEventListener('change',()=>ans[q.id]=i.value));document.querySelector('[data-db-practice-progress]').style.width=`${((idx+1)/sel.length)*100}%`}async function submit(){let score=0,wrong=[];sel.forEach(q=>{const ua=ans[q.id]||'',ok=String(ua).trim().toLowerCase()===String(q.correct_answer).trim().toLowerCase();if(ok)score++;else wrong.push({question:q.question_text,selected:ua,correct:q.correct_answer,subject:q.subject_name})});const total=sel.length,pct=total?Math.round(score/total*100):0;try{const {db,user}=await getCurrentUserAndProfile();if(user)await db.from('exam_attempts').insert({student_id:user.id,attempt_type:'database_practice',score,total,percentage:pct,wrong_answers:wrong})}catch(_e){}document.querySelector('[data-db-practice-shell]').setAttribute('hidden','');const r=document.querySelector('[data-db-practice-results]');r.removeAttribute('hidden');r.innerHTML=`<div class="card result-hero-card"><span class="eyebrow">Practice complete</span><h2>${score}/${total} • ${pct}%</h2><p>${wrong.length?'Review weak questions below.':'Excellent — no wrong answers.'}</p></div><div class="card"><h3>Wrong answers</h3>${wrong.length?wrong.map(w=>`<details class="review-detail"><summary>${v4Escape(w.subject)} — ${v4Escape(w.question)}</summary><p><b>Your answer:</b> ${v4Escape(w.selected||'Not answered')}</p><p><b>Correct:</b> ${v4Escape(w.correct)}</p></details>`).join(''):'<p class="success-text">No wrong answers.</p>'}<div class="small-actions"><a class="btn btn-primary" href="student-db.html">Open Student DB</a></div></div>`}loadBtn.addEventListener('click',load);document.querySelector('[data-start-db-practice]')?.addEventListener('click',()=>{if(!qs.length){v4Status('[data-practice-db-status]','Load questions first.','warn');return}const subject=document.querySelector('[data-db-practice-subject]').value,count=Number(document.querySelector('[data-db-practice-count]').value||5);let pool=subject==='All'?qs:qs.filter(q=>(q.subject_name||'General')===subject);sel=[...pool].sort(()=>Math.random()-.5).slice(0,count);if(!sel.length){v4Status('[data-practice-db-status]','No questions for this subject.','warn');return}ans={};idx=0;document.querySelector('[data-db-practice-results]').setAttribute('hidden','');document.querySelector('[data-db-practice-shell]').removeAttribute('hidden');render()});document.querySelector('[data-db-practice-prev]')?.addEventListener('click',()=>{idx=Math.max(0,idx-1);render()});document.querySelector('[data-db-practice-next]')?.addEventListener('click',()=>{idx=Math.min(sel.length-1,idx+1);render()});document.querySelector('[data-db-practice-submit]')?.addEventListener('click',submit)})();


// KEP v4.2 — Supabase Library + Mock Exam

function v42Shuffle(arr){
  return [...arr].sort(() => Math.random() - 0.5);
}
function v42Normalize(value){
  return String(value || '').trim().toLowerCase();
}
function v42FormatSeconds(seconds){
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

// -----------------------------
// Supabase Library
// -----------------------------
(function initDbLibrary(){
  const loadBtn = document.querySelector('[data-db-library-load]');
  if(!loadBtn) return;

  let resources = [];
  let currentType = 'All';

  function status(message, state=''){
    v4Status('[data-db-library-status]', message, state);
  }

  function renderStats(){
    const stats = document.querySelector('[data-db-library-stats]');
    if(!stats) return;
    const books = resources.filter(r => (r.resource_type || '').toLowerCase().includes('book') || (r.resource_type || '').toLowerCase().includes('note')).length;
    const papers = resources.filter(r => (r.resource_type || '').toLowerCase().includes('paper')).length;
    stats.innerHTML = `<div><b>${resources.length}</b><span>Resources</span></div><div><b>${books}</b><span>Books / Notes</span></div><div><b>${papers}</b><span>Past Papers</span></div>`;
  }

  function renderFilterOptions(){
    const subject = document.querySelector('[data-db-library-subject]');
    const lang = document.querySelector('[data-db-library-language]');
    if(subject){
      const old = subject.value || 'All';
      const subjects = [...new Set(resources.map(r => r.subject_name || 'General'))].sort();
      subject.innerHTML = `<option value="All">All subjects</option>` + subjects.map(s => `<option value="${v4Escape(s)}">${v4Escape(s)}</option>`).join('');
      subject.value = subjects.includes(old) ? old : 'All';
    }
    if(lang){
      const old = lang.value || 'All';
      const langs = [...new Set(resources.map(r => r.language || 'Not specified'))].sort();
      lang.innerHTML = `<option value="All">All languages</option>` + langs.map(l => `<option value="${v4Escape(l)}">${v4Escape(l)}</option>`).join('');
      lang.value = langs.includes(old) ? old : 'All';
    }
  }

  function typeMatches(r){
    const t = (r.resource_type || '').toLowerCase();
    if(currentType === 'All') return true;
    if(currentType === 'Past Paper') return t.includes('paper');
    if(currentType === 'Book / Notes') return t.includes('book') || t.includes('note') || t.includes('pdf');
    return true;
  }

  function renderResources(){
    const grid = document.querySelector('[data-db-library-grid]');
    if(!grid) return;
    const subject = document.querySelector('[data-db-library-subject]')?.value || 'All';
    const lang = document.querySelector('[data-db-library-language]')?.value || 'All';
    const filtered = resources.filter(r => {
      const s = r.subject_name || 'General';
      const l = r.language || 'Not specified';
      return typeMatches(r) && (subject === 'All' || s === subject) && (lang === 'All' || l === lang);
    });

    if(!filtered.length){
      grid.innerHTML = `<div class="empty-state-soft"><b>No matching database resources.</b><span>Try another filter or publish/import more resources.</span></div>`;
      return;
    }

    grid.innerHTML = filtered.map(r => `
      <article class="resource-card-live">
        <div class="resource-card-top">
          <span class="tag ${(r.resource_type || '').toLowerCase().includes('paper') ? 'gold' : 'green'}">${v4Escape(r.resource_type || 'Resource')}</span>
          <span class="resource-lang">${v4Escape(r.language || 'Not specified')}</span>
        </div>
        <h3>${v4Escape(r.title)}</h3>
        <p>${v4Escape([r.subject_name || 'General', r.year, r.grade].filter(Boolean).join(' • '))}</p>
        <div class="resource-source"><b>Source:</b> ${v4Escape(r.source_type || 'Reviewed source')}${r.source_details ? ' — ' + v4Escape(r.source_details) : ''}</div>
        <div class="review-origin">Supabase resource ID: ${v4Escape(r.id)}</div>
        <div class="small-actions">
          ${r.file_url ? `<a class="btn btn-primary" href="${v4Escape(r.file_url)}" target="_blank" rel="noopener">Open resource</a>` : `<button class="btn btn-secondary" type="button" disabled>No file link</button>`}
          <button class="btn btn-secondary" type="button" data-db-save-resource="${v4Escape(r.id)}">Save</button>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-db-save-resource]').forEach(btn => btn.addEventListener('click', async () => {
      try{
        const { db, user } = await getCurrentUserAndProfile();
        if(!user) throw new Error('Please login first to save resources.');
        const id = btn.getAttribute('data-db-save-resource');
        const { error } = await db.from('saved_resources').upsert({ student_id: user.id, resource_id: id });
        if(error) throw error;
        btn.textContent = 'Saved';
        status('Resource saved to your account.', 'ok');
      }catch(err){
        status(err.message || 'Could not save resource.', 'warn');
      }
    }));
  }

  async function loadResources(){
    try{
      const db = getDb();
      status('Loading published resources...');
      const { data, error } = await db.from('resources').select('*').eq('status','published').order('created_at', {ascending:false}).limit(300);
      if(error) throw error;
      resources = data || [];
      renderStats();
      renderFilterOptions();
      renderResources();
      status(`Loaded ${resources.length} published database resource${resources.length === 1 ? '' : 's'}.`, 'ok');
    }catch(err){
      status(err.message || 'Could not load database resources.', 'warn');
    }
  }

  loadBtn.addEventListener('click', loadResources);
  document.querySelectorAll('[data-db-library-type]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-db-library-type]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentType = btn.getAttribute('data-db-library-type') || 'All';
    renderResources();
  }));
  document.querySelector('[data-db-library-subject]')?.addEventListener('change', renderResources);
  document.querySelector('[data-db-library-language]')?.addEventListener('change', renderResources);
})();

// -----------------------------
// Supabase Mock Exam
// -----------------------------
(function initDbMock(){
  const loadBtn = document.querySelector('[data-db-mock-load]');
  if(!loadBtn) return;

  let questions = [];
  let templates = [];
  let exam = {
    selected: [],
    answers: {},
    index: 0,
    timer: null,
    remaining: 0,
    startedAt: null,
    label: 'Database Mock',
    template: null
  };

  function status(message, state=''){
    v4Status('[data-db-mock-status]', message, state);
  }

  function updateCounts(){
    const q = document.querySelector('[data-db-mock-question-count]');
    const t = document.querySelector('[data-db-mock-template-count]');
    if(q) q.textContent = `${questions.length} loaded`;
    if(t) t.textContent = `${templates.length} loaded`;
  }

  function renderSubjectOptions(){
    const subject = document.querySelector('[data-db-mock-subject]');
    if(!subject) return;
    const old = subject.value || 'All';
    const subjects = [...new Set(questions.map(q => q.subject_name || 'General'))].sort();
    subject.innerHTML = `<option value="All">All subjects</option>` + subjects.map(s => `<option value="${v4Escape(s)}">${v4Escape(s)}</option>`).join('');
    subject.value = subjects.includes(old) ? old : 'All';
  }

  function renderTemplateOptions(){
    const select = document.querySelector('[data-db-mock-template]');
    if(!select) return;
    select.innerHTML = `<option value="">Select published template</option>` + templates.map(t => `<option value="${v4Escape(t.id)}">${v4Escape(t.name)} • ${v4Escape(t.verification_status || 'Template')}</option>`).join('');
  }

  function updateDbMockCountOptions(){
    const countSelect = document.querySelector('[data-db-mock-count]');
    if(!countSelect) return;
    const type = document.querySelector('[data-db-mock-type]')?.value || 'quick';
    const subject = document.querySelector('[data-db-mock-subject]')?.value || 'All';
    const available = questions.filter(q => type !== 'subject' || subject === 'All' || (q.subject_name || 'General') === subject).length;
    const base = [1,5,10,20,30,50,100].filter(n => n <= available);
    if(available > 0 && !base.includes(available) && available < 100) base.unshift(available);
    const counts = [...new Set(base)].sort((a,b)=>a-b);
    countSelect.innerHTML = available === 0 ? `<option value="0">No questions</option>` : counts.map(n => `<option value="${n}">${n} question${n === 1 ? '' : 's'}</option>`).join('');
    if(available > 0 && available < 5) status(`Only ${available} published question${available === 1 ? '' : 's'} available. Add more questions for a stronger mock.`, 'warn');
  }

  async function loadExamData(){
    try{
      const db = getDb();
      status('Loading database questions and templates...');
      const [qRes, tRes] = await Promise.all([
        db.from('questions').select('*').eq('status','published').limit(500),
        db.from('exam_templates').select('*').eq('status','published').limit(50)
      ]);
      if(qRes.error) throw qRes.error;
      if(tRes.error) throw tRes.error;
      questions = qRes.data || [];
      templates = tRes.data || [];
      renderSubjectOptions();
      renderTemplateOptions();
      updateDbMockCountOptions();
      updateCounts();
      status(`Loaded ${questions.length} questions and ${templates.length} templates.`, 'ok');
    }catch(err){
      status(err.message || 'Could not load database exam data.', 'warn');
    }
  }

  function pickBySubject(subject, count, pool){
    if(!subject || subject === 'All' || subject === 'All subjects' || subject === 'Balanced from available subjects'){
      return v42Shuffle(pool).slice(0, count);
    }
    const exact = pool.filter(q => v42Normalize(q.subject_name) === v42Normalize(subject));
    if(exact.length >= count) return v42Shuffle(exact).slice(0, count);
    const loose = pool.filter(q => v42Normalize(q.subject_name).includes(v42Normalize(subject)) || v42Normalize(subject).includes(v42Normalize(q.subject_name)));
    const combined = [...exact, ...loose.filter(q => !exact.includes(q))];
    const fallback = v42Shuffle(pool.filter(q => !combined.includes(q))).slice(0, Math.max(0, count - combined.length));
    return [...combined, ...fallback].slice(0, count);
  }

  function buildSet(){
    const type = document.querySelector('[data-db-mock-type]')?.value || 'quick';
    const subject = document.querySelector('[data-db-mock-subject]')?.value || 'All';
    const count = Number(document.querySelector('[data-db-mock-count]')?.value || 10);

    if(type === 'template'){
      const templateId = document.querySelector('[data-db-mock-template]')?.value || '';
      const template = templates.find(t => t.id === templateId);
      if(!template) throw new Error('Select a published template first.');
      const distribution = Array.isArray(template.distribution) ? template.distribution : [];
      let selected = [];
      const totalNeeded = distribution.reduce((sum, item) => sum + Number(item.count || 0), 0);
      distribution.forEach(item => {
        const picked = pickBySubject(item.subject, Number(item.count || 0), questions).filter(q => !selected.includes(q));
        selected = [...selected, ...picked];
      });
      if(selected.length < totalNeeded){
        selected = [...selected, ...v42Shuffle(questions.filter(q => !selected.includes(q))).slice(0, totalNeeded - selected.length)];
      }
      return {
        selected: v42Shuffle(selected).slice(0, totalNeeded || selected.length),
        label: template.name,
        template,
        requested: totalNeeded || selected.length
      };
    }

    let pool = [...questions];
    if(type === 'subject' && subject !== 'All') pool = pool.filter(q => (q.subject_name || 'General') === subject);
    return {
      selected: v42Shuffle(pool).slice(0, count),
      label: type === 'subject' ? `${subject} Mock` : 'Quick Database Mock',
      template: null,
      requested: count
    };
  }


  function getTimeMinutes(template){
    if(template) return Number(template.time_minutes || 0);
    return Number(document.querySelector('[data-db-mock-time]')?.value || 0);
  }

  function startExamSafe(){
    try{
      if(!questions.length) throw new Error('Load database exam data first.');
      const built = buildSet();
      if(!built.selected.length) throw new Error('No questions available for this exam.');
      if(built.requested && built.selected.length < built.requested){ status(`Only ${built.selected.length} question${built.selected.length === 1 ? '' : 's'} available, so KEP started a smaller mock. Add more published questions for a full test.`, 'warn'); }
      const minutes = getTimeMinutes(built.template);
      exam = {
        selected: built.selected,
        answers: {},
        index: 0,
        timer: null,
        remaining: minutes * 60,
        startedAt: new Date(),
        label: built.label,
        template: built.template
      };
      document.querySelector('[data-db-mock-empty]')?.setAttribute('hidden','');
      document.querySelector('[data-db-mock-results]')?.setAttribute('hidden','');
      document.querySelector('[data-db-mock-shell]')?.removeAttribute('hidden');
      renderQuestion();
      startTimer();
    }catch(err){
      status(err.message || 'Could not start exam.', 'warn');
    }
  }

  function startTimer(){
    clearInterval(exam.timer);
    renderTimer();
    if(!exam.remaining) return;
    exam.timer = setInterval(() => {
      exam.remaining -= 1;
      renderTimer();
      if(exam.remaining <= 0){
        clearInterval(exam.timer);
        submitExam(true);
      }
    }, 1000);
  }

  function renderTimer(){
    const el = document.querySelector('[data-db-mock-timer]');
    if(!el) return;
    if(!exam.remaining && exam.remaining !== 0){
      el.textContent = 'No timer';
      return;
    }
    if(exam.remaining === 0 && !exam.timer){
      el.textContent = 'No timer';
      return;
    }
    const s = Math.max(0, exam.remaining || 0);
    if(!s && !exam.timer){
      el.textContent = 'No timer';
      return;
    }
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${sec}`;
    el.classList.toggle('danger', s <= 60 && s > 0);
  }

  function renderQuestion(){
    const q = exam.selected[exam.index];
    if(!q) return;
    const total = exam.selected.length;
    document.querySelector('[data-db-mock-label]').textContent = exam.template ? `${exam.label} • ${exam.template.verification_status || 'Template'}` : exam.label;
    document.querySelector('[data-db-mock-title]').textContent = `Question ${exam.index + 1} of ${total}`;
    document.querySelector('[data-db-mock-subject-label]').textContent = q.subject_name || 'General';
    document.querySelector('[data-db-mock-difficulty-label]').textContent = q.difficulty || 'Medium';
    document.querySelector('[data-db-mock-question]').textContent = q.question_text;
    const options = Array.isArray(q.options) ? q.options : [];
    const optionsEl = document.querySelector('[data-db-mock-options]');
    optionsEl.innerHTML = options.map((opt, i) => {
      const id = `dbm-${exam.index}-${i}`;
      const checked = exam.answers[q.id] === opt ? 'checked' : '';
      return `<label class="mock-option" for="${id}"><input type="radio" id="${id}" name="db-mock-answer" value="${v4Escape(opt)}" ${checked}><span>${v4Escape(opt)}</span></label>`;
    }).join('');
    optionsEl.querySelectorAll('input').forEach(input => input.addEventListener('change', () => {
      exam.answers[q.id] = input.value;
      renderDots();
    }));
    document.querySelector('[data-db-mock-progress]').style.width = `${((exam.index + 1) / total) * 100}%`;
    renderDots();
  }

  function renderDots(){
    const dots = document.querySelector('[data-db-mock-dots]');
    if(!dots) return;
    dots.innerHTML = exam.selected.map((q, i) => `<button class="${exam.answers[q.id] ? 'answered' : ''} ${i === exam.index ? 'active' : ''}" type="button" data-db-mock-go="${i}">${i+1}</button>`).join('');
    dots.querySelectorAll('[data-db-mock-go]').forEach(btn => btn.addEventListener('click', () => {
      exam.index = Number(btn.getAttribute('data-db-mock-go'));
      renderQuestion();
    }));
  }

  function fieldLevel(score){
    return score >= 80 ? 'Strong' : score >= 60 ? 'Medium' : 'Needs work';
  }

  function fieldReadiness(subjectStats, percentage){
    const pct = names => {
      for(const name of names){
        const found = Object.entries(subjectStats).find(([subject]) => names.map(v42Normalize).includes(v42Normalize(subject)));
        if(found) return Math.round((found[1].correct / found[1].total) * 100);
      }
      return percentage;
    };
    const biology = pct(['Biology','بیولوژی','بیولوژي']);
    const chemistry = pct(['Chemistry','کیمیا']);
    const physics = pct(['Physics','فزیک','فیزیک']);
    const math = pct(['Mathematics','Math','ریاضي','ریاضی']);
    const english = pct(['English','انګلیسي','انگلیسی']);
    const language = pct(['Pashto','Dari','English','پښتو','دری']);
    return [
      {field:'Medicine', note:`${fieldLevel(Math.round((biology+chemistry+physics)/3))}: focus on Biology, Chemistry, and Physics.`},
      {field:'Engineering', note:`${fieldLevel(Math.round((math+physics)/2))}: focus on Mathematics, Physics, and speed.`},
      {field:'Computer Science', note:`${fieldLevel(Math.round((math+english)/2))}: improve Mathematics, logic, and English.`},
      {field:'Law / Social Sciences', note:`${fieldLevel(Math.round((language+percentage)/2))}: strengthen language, history, and general knowledge.`},
      {field:'Education', note:`${fieldLevel(percentage)}: continue balanced practice and weekly revision.`}
    ];
  }

  async function submitExam(auto=false){
    clearInterval(exam.timer);
    const total = exam.selected.length;
    let score = 0;
    const subjectStats = {};
    const wrong = [];
    exam.selected.forEach(q => {
      const userAnswer = exam.answers[q.id] || '';
      const isCorrect = v42Normalize(userAnswer) === v42Normalize(q.correct_answer);
      if(isCorrect) score++;
      const subject = q.subject_name || 'General';
      subjectStats[subject] ||= {correct:0,total:0};
      subjectStats[subject].total++;
      if(isCorrect) subjectStats[subject].correct++;
      if(!isCorrect) wrong.push({question:q.question_text, selected:userAnswer, correct:q.correct_answer, subject, explanation:q.explanation || ''});
    });
    const percentage = total ? Math.round((score/total)*100) : 0;
    const usedSeconds = Math.round((new Date() - exam.startedAt) / 1000);

    let saveMessage = 'Result saved locally only because no login was found.';
    try{
      const { db, user } = await getCurrentUserAndProfile();
      if(user){
        const { error } = await db.from('exam_attempts').insert({
          student_id: user.id,
          attempt_type: 'database_mock',
          template_id: exam.template?.id || null,
          score,
          total,
          percentage,
          subject_breakdown: subjectStats,
          wrong_answers: wrong,
          time_used_seconds: usedSeconds
        });
        if(error) throw error;
        saveMessage = 'Result saved to your database account.';
      }
    }catch(err){
      saveMessage = err.message || saveMessage;
    }

    renderResults({score,total,percentage,subjectStats,wrong,usedSeconds,saveMessage,auto});
  }

  function renderResults(result){
    document.querySelector('[data-db-mock-shell]')?.setAttribute('hidden','');
    const results = document.querySelector('[data-db-mock-results]');
    results.removeAttribute('hidden');
    const statsHtml = Object.entries(result.subjectStats).map(([subject, s]) => {
      const pct = Math.round((s.correct / s.total) * 100);
      return `<div class="subject-score-row"><span>${v4Escape(subject)}</span><b>${s.correct}/${s.total} • ${pct}%</b><div><span style="width:${pct}%"></span></div></div>`;
    }).join('');
    const readiness = fieldReadiness(result.subjectStats, result.percentage).map(item => `<li><b>${v4Escape(item.field)}:</b> ${v4Escape(item.note)}</li>`).join('');
    const wrongHtml = result.wrong.length ? result.wrong.map(w => `
      <details class="review-detail">
        <summary>${v4Escape(w.subject)} — ${v4Escape(w.question)}</summary>
        <p><b>Your answer:</b> ${v4Escape(w.selected || 'Not answered')}</p>
        <p><b>Correct answer:</b> ${v4Escape(w.correct)}</p>
        <p>${v4Escape(w.explanation || 'No explanation added yet.')}</p>
      </details>
    `).join('') : `<p class="success-text">Excellent — no wrong answers.</p>`;

    results.innerHTML = `
      <div class="card result-hero-card">
        <span class="eyebrow">${result.auto ? 'Time finished' : 'Database mock completed'}</span>
        <h2>${result.score}/${result.total} • ${result.percentage}%</h2>
        <div class="result-stats">
          <div><b>${result.score}/${result.total}</b><span>Score</span></div>
          <div><b>${result.percentage}%</b><span>Percentage</span></div>
          <div><b>${v42FormatSeconds(result.usedSeconds)}</b><span>Time used</span></div>
        </div>
        <div class="security-note">This is a study estimate only. Official Kankor placement depends on official exam results, capacity, competition, and NEXA rules.</div>
      </div>
      <div class="card"><h3>Save status</h3><p>${v4Escape(result.saveMessage)}</p></div>
      <div class="card"><h3>Subject breakdown</h3><div class="subject-score-list">${statsHtml}</div></div>
      <div class="card"><h3>Field readiness estimate</h3><ul class="readiness-list">${readiness}</ul></div>
      <div class="card"><h3>Wrong answer review</h3>${wrongHtml}<div class="small-actions"><a class="btn btn-primary" href="student-db.html">Open Student DB</a><button class="btn btn-secondary" type="button" data-db-mock-retake>Retake</button></div></div>
    `;
    results.querySelector('[data-db-mock-retake]')?.addEventListener('click', () => {
      results.setAttribute('hidden','');
      document.querySelector('[data-db-mock-empty]')?.removeAttribute('hidden');
    });
  }

  loadBtn.addEventListener('click', loadExamData);
  document.querySelector('[data-db-mock-start]')?.addEventListener('click', startExamSafe);
  document.querySelector('[data-db-mock-prev]')?.addEventListener('click', () => { exam.index = Math.max(0, exam.index - 1); renderQuestion(); });
  document.querySelector('[data-db-mock-next]')?.addEventListener('click', () => { exam.index = Math.min(exam.selected.length - 1, exam.index + 1); renderQuestion(); });
  document.querySelector('[data-db-mock-submit]')?.addEventListener('click', () => submitExam(false));
  document.querySelector('[data-db-mock-type]')?.addEventListener('change', () => {
    const type = document.querySelector('[data-db-mock-type]')?.value;
    updateDbMockCountOptions();
    if(type === 'template') status('Choose a published template after loading database exam data.', 'ok');
  });
  document.querySelector('[data-db-mock-subject]')?.addEventListener('change', updateDbMockCountOptions);
})();


// KEP v4.3 — Database Admin Review Dashboard
(function initV43AdminReview(){
  const board = document.querySelector('[data-v43-board]');
  if(!board) return;

  let queueItems = [];
  let reviewerProfile = null;
  let reviewerUser = null;

  const STATUS_LABELS = {
    submitted: 'Submitted',
    needs_review: 'Needs review',
    approved: 'Approved',
    published: 'Published',
    rejected: 'Rejected'
  };

  function setStatus(message, state=''){
    v4Status('[data-v43-status]', message, state);
  }

  async function requireReviewer(){
    const { user, profile } = await getCurrentUserAndProfile();
    if(!user) throw new Error('Please login first.');
    if(!profile || !['admin','reviewer'].includes(profile.role)){
      throw new Error(`Logged in, but role is ${profile?.role || 'student'}. Change your profile role to admin/reviewer in Supabase.`);
    }
    reviewerUser = user;
    reviewerProfile = profile;
    return { user, profile };
  }

  function normalizeQuestion(row){
    return {
      kind: 'question',
      table: 'questions',
      id: row.id,
      status: row.status || 'submitted',
      title: row.question_text || 'Untitled question',
      subject: row.subject_name || 'General',
      language: row.language || 'Not specified',
      created_at: row.created_at,
      raw: row
    };
  }

  function normalizeResource(row){
    return {
      kind: 'resource',
      table: 'resources',
      id: row.id,
      status: row.status || 'submitted',
      title: row.title || 'Untitled resource',
      subject: row.subject_name || 'General',
      language: row.language || 'Not specified',
      created_at: row.created_at,
      raw: row
    };
  }

  async function loadQueue(){
    try{
      await requireReviewer();
      setStatus(`Reviewer access ready: ${reviewerProfile.display_name || reviewerUser.email}`, 'ok');
      const db = getDb();
      const [qRes, rRes] = await Promise.all([
        db.from('questions').select('*').order('created_at', {ascending:false}).limit(200),
        db.from('resources').select('*').order('created_at', {ascending:false}).limit(200)
      ]);
      if(qRes.error) throw qRes.error;
      if(rRes.error) throw rRes.error;

      queueItems = [
        ...(qRes.data || []).map(normalizeQuestion),
        ...(rRes.data || []).map(normalizeResource)
      ].sort((a,b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

      renderStats();
      renderBoard();
      setStatus(`Loaded ${queueItems.length} database review item(s).`, 'ok');
    }catch(err){
      setStatus(err.message || 'Could not load review queue.', 'warn');
      board.innerHTML = `<div class="empty-state-soft"><b>Review queue unavailable.</b><span>${v4Escape(err.message || 'Please check login and database setup.')}</span></div>`;
    }
  }

  function getFilters(){
    return {
      type: document.querySelector('[data-v43-type]')?.value || 'All',
      status: document.querySelector('[data-v43-status-filter]')?.value || 'All',
      search: (document.querySelector('[data-v43-search]')?.value || '').trim().toLowerCase()
    };
  }

  function filteredItems(){
    const filters = getFilters();
    return queueItems.filter(item => {
      const typeOk = filters.type === 'All' || filters.type === `${item.table}`;
      const statusOk = filters.status === 'All' || item.status === filters.status;
      const haystack = `${item.title} ${item.subject} ${item.language} ${item.status}`.toLowerCase();
      const searchOk = !filters.search || haystack.includes(filters.search);
      return typeOk && statusOk && searchOk;
    });
  }

  function renderStats(){
    const stats = document.querySelector('[data-v43-stats]');
    if(!stats) return;
    const total = queueItems.length;
    const questions = queueItems.filter(i => i.kind === 'question').length;
    const resources = queueItems.filter(i => i.kind === 'resource').length;
    const pending = queueItems.filter(i => ['submitted','needs_review','approved'].includes(i.status)).length;
    stats.innerHTML = `
      <div><b>${total}</b><span>Total</span></div>
      <div><b>${questions}</b><span>Questions</span></div>
      <div><b>${resources}</b><span>Resources</span></div>
      <div><b>${pending}</b><span>Pending</span></div>
    `;
  }

  function statusClass(status){
    if(status === 'published') return 'green';
    if(status === 'rejected') return 'red';
    return 'gold';
  }

  function renderBoard(){
    const items = filteredItems();
    if(!items.length){
      board.innerHTML = `<div class="empty-state-soft"><b>No matching review items.</b><span>Try another filter or import/add content first.</span></div>`;
      return;
    }

    board.innerHTML = items.map(item => {
      if(item.kind === 'question') return questionCard(item);
      return resourceCard(item);
    }).join('');

    bindCardActions();
  }

  function questionCard(item){
    const q = item.raw;
    const options = Array.isArray(q.options) ? q.options : [];
    return `
      <article class="card review-item-card" data-review-card="${v4Escape(item.table)}:${v4Escape(item.id)}">
        <div class="rule-card-head">
          <span class="tag ${statusClass(item.status)}">${v4Escape(STATUS_LABELS[item.status] || item.status)}</span>
          <span class="resource-lang">${v4Escape(item.language)}</span>
        </div>
        <span class="eyebrow">Question • ${v4Escape(item.subject)}</span>
        <h3>${v4Escape(q.question_text)}</h3>
        <div class="review-options-list">
          ${options.map(opt => `<span>${v4Escape(opt)}</span>`).join('')}
        </div>
        <p><b>Correct:</b> ${v4Escape(q.correct_answer || 'Not set')}</p>
        <p><b>Explanation:</b> ${v4Escape(q.explanation || 'No explanation added yet.')}</p>
        <details class="review-edit-box">
          <summary>Edit question before publishing</summary>
          <label class="field"><span>Question text</span><textarea data-edit-question>${v4Escape(q.question_text || '')}</textarea></label>
          <label class="field"><span>Options, one per line</span><textarea data-edit-options>${v4Escape(options.join('\n'))}</textarea></label>
          <label class="field"><span>Correct answer</span><input data-edit-correct value="${v4Escape(q.correct_answer || '')}"></label>
          <label class="field"><span>Explanation</span><textarea data-edit-explanation>${v4Escape(q.explanation || '')}</textarea></label>
          <div class="small-actions">
            <button class="btn btn-secondary" type="button" data-save-question-edit="${v4Escape(item.id)}">Save edits</button>
          </div>
        </details>
        ${actionButtons(item)}
      </article>
    `;
  }

  function resourceCard(item){
    const r = item.raw;
    return `
      <article class="card review-item-card" data-review-card="${v4Escape(item.table)}:${v4Escape(item.id)}">
        <div class="rule-card-head">
          <span class="tag ${statusClass(item.status)}">${v4Escape(STATUS_LABELS[item.status] || item.status)}</span>
          <span class="resource-lang">${v4Escape(item.language)}</span>
        </div>
        <span class="eyebrow">Resource • ${v4Escape(item.subject)}</span>
        <h3>${v4Escape(r.title)}</h3>
        <p><b>Type:</b> ${v4Escape(r.resource_type || 'Resource')}</p>
        <p><b>File link:</b> ${r.file_url ? `<a href="${v4Escape(r.file_url)}" target="_blank" rel="noopener">${v4Escape(r.file_url)}</a>` : 'No link added'}</p>
        <p><b>Source:</b> ${v4Escape(r.source_type || 'Not specified')} ${r.source_details ? '— ' + v4Escape(r.source_details) : ''}</p>
        <details class="review-edit-box">
          <summary>Edit resource before publishing</summary>
          <label class="field"><span>Title</span><input data-edit-title value="${v4Escape(r.title || '')}"></label>
          <label class="field"><span>Resource type</span><input data-edit-resource-type value="${v4Escape(r.resource_type || '')}"></label>
          <label class="field"><span>File URL</span><input data-edit-file-url value="${v4Escape(r.file_url || '')}"></label>
          <label class="field"><span>Source details</span><textarea data-edit-source-details>${v4Escape(r.source_details || '')}</textarea></label>
          <div class="small-actions">
            <button class="btn btn-secondary" type="button" data-save-resource-edit="${v4Escape(item.id)}">Save edits</button>
          </div>
        </details>
        ${actionButtons(item)}
      </article>
    `;
  }

  function actionButtons(item){
    return `
      <div class="review-actions">
        <button class="btn btn-secondary" type="button" data-review-status="${v4Escape(item.table)}:${v4Escape(item.id)}:needs_review">Needs review</button>
        <button class="btn btn-secondary" type="button" data-review-status="${v4Escape(item.table)}:${v4Escape(item.id)}:approved">Approve</button>
        <button class="btn btn-primary" type="button" data-review-status="${v4Escape(item.table)}:${v4Escape(item.id)}:published">Publish</button>
        <button class="btn btn-ghost danger-text" type="button" data-review-status="${v4Escape(item.table)}:${v4Escape(item.id)}:rejected">Reject</button>
      </div>
      <p class="small review-item-id">ID: ${v4Escape(item.id)}</p>
    `;
  }

  function findItem(table, id){
    return queueItems.find(i => i.table === table && i.id === id);
  }

  async function updateStatus(table, id, status){
    try{
      await requireReviewer();
      const db = getDb();
      const item = findItem(table, id);
      const oldStatus = item?.status || null;
      const patch = {
        status,
        reviewed_by: reviewerUser.id,
        reviewed_at: new Date().toISOString()
      };
      const { error } = await db.from(table).update(patch).eq('id', id);
      if(error) throw error;

      // Optional audit log; ignore if table was not created.
      try{
        await db.from('content_review_events').insert({
          table_name: table,
          item_id: id,
          old_status: oldStatus,
          new_status: status,
          reviewer_id: reviewerUser.id
        });
      }catch(_auditErr){}

      if(item) item.status = status;
      renderStats();
      renderBoard();
      setStatus(`Updated ${table} item to ${STATUS_LABELS[status] || status}.`, 'ok');
    }catch(err){
      setStatus(err.message || 'Status update failed.', 'warn');
    }
  }

  async function saveQuestionEdit(id, card){
    try{
      await requireReviewer();
      const db = getDb();
      const patch = {
        question_text: card.querySelector('[data-edit-question]')?.value.trim() || '',
        options: (card.querySelector('[data-edit-options]')?.value || '').split('\n').map(s => s.trim()).filter(Boolean),
        correct_answer: card.querySelector('[data-edit-correct]')?.value.trim() || '',
        explanation: card.querySelector('[data-edit-explanation]')?.value.trim() || ''
      };
      if(!patch.question_text || patch.options.length < 2 || !patch.correct_answer){
        throw new Error('Question text, at least 2 options, and correct answer are required.');
      }
      const { error } = await db.from('questions').update(patch).eq('id', id);
      if(error) throw error;
      setStatus('Question edits saved.', 'ok');
      await loadQueue();
    }catch(err){
      setStatus(err.message || 'Could not save question edits.', 'warn');
    }
  }

  async function saveResourceEdit(id, card){
    try{
      await requireReviewer();
      const db = getDb();
      const patch = {
        title: card.querySelector('[data-edit-title]')?.value.trim() || '',
        resource_type: card.querySelector('[data-edit-resource-type]')?.value.trim() || 'Resource',
        file_url: card.querySelector('[data-edit-file-url]')?.value.trim() || '',
        source_details: card.querySelector('[data-edit-source-details]')?.value.trim() || ''
      };
      if(!patch.title) throw new Error('Resource title is required.');
      const { error } = await db.from('resources').update(patch).eq('id', id);
      if(error) throw error;
      setStatus('Resource edits saved.', 'ok');
      await loadQueue();
    }catch(err){
      setStatus(err.message || 'Could not save resource edits.', 'warn');
    }
  }

  function bindCardActions(){
    board.querySelectorAll('[data-review-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        const [table, id, status] = btn.getAttribute('data-review-status').split(':');
        updateStatus(table, id, status);
      });
    });

    board.querySelectorAll('[data-save-question-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-save-question-edit');
        const card = btn.closest('[data-review-card]');
        saveQuestionEdit(id, card);
      });
    });

    board.querySelectorAll('[data-save-resource-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-save-resource-edit');
        const card = btn.closest('[data-review-card]');
        saveResourceEdit(id, card);
      });
    });
  }

  document.querySelectorAll('[data-v43-load]').forEach(btn => btn.addEventListener('click', loadQueue));
  document.querySelector('[data-v43-type]')?.addEventListener('change', renderBoard);
  document.querySelector('[data-v43-status-filter]')?.addEventListener('change', renderBoard);
  document.querySelector('[data-v43-search]')?.addEventListener('input', renderBoard);
  document.querySelector('[data-v43-clear-filters]')?.addEventListener('click', () => {
    const type = document.querySelector('[data-v43-type]');
    const status = document.querySelector('[data-v43-status-filter]');
    const search = document.querySelector('[data-v43-search]');
    if(type) type.value = 'All';
    if(status) status.value = 'All';
    if(search) search.value = '';
    renderBoard();
  });

  requireReviewer()
    .then(({user, profile}) => setStatus(`Reviewer access ready: ${profile.display_name || user.email}`, 'ok'))
    .catch(err => setStatus(err.message || 'Please login as admin/reviewer.', 'warn'));
})();


// KEP v4.4 — Database Study Plan & Recommendations
(function initV44StudyPlan(){
  const planRoot = document.querySelector('[data-v44-plan]');
  if(!planRoot) return;

  let currentUser = null;
  let currentProfile = null;
  let attempts = [];
  let resources = [];
  let analysis = null;
  let generatedPlan = [];
  let recommendedResources = [];

  function setStatus(message, state=''){
    v4Status('[data-v44-status]', message, state);
  }

  function getSettings(){
    return {
      minutes: Number(document.querySelector('[data-v44-minutes]')?.value || 30),
      goal: document.querySelector('[data-v44-goal]')?.value || 'General Kankor',
      intensity: document.querySelector('[data-v44-intensity]')?.value || 'balanced',
      privateMode: !!document.querySelector('[data-v44-private]')?.checked
    };
  }

  async function loadProgress(){
    try{
      const { db, user, profile } = await getCurrentUserAndProfile();
      if(!user) throw new Error('Please login first.');
      currentUser = user;
      currentProfile = profile || {};
      const minutesSelect = document.querySelector('[data-v44-minutes]');
      const goalSelect = document.querySelector('[data-v44-goal]');
      const privateBox = document.querySelector('[data-v44-private]');
      if(minutesSelect && profile?.daily_study_minutes) minutesSelect.value = String(profile.daily_study_minutes);
      if(goalSelect && profile?.dream_field) goalSelect.value = profile.dream_field;
      if(privateBox) privateBox.checked = !!profile?.private_learner;

      const [attemptRes, resourceRes] = await Promise.all([
        db.from('exam_attempts').select('*').eq('student_id', user.id).order('created_at', {ascending:false}).limit(50),
        db.from('resources').select('*').eq('status','published').order('created_at', {ascending:false}).limit(300)
      ]);
      if(attemptRes.error) throw attemptRes.error;
      if(resourceRes.error) throw resourceRes.error;
      attempts = attemptRes.data || [];
      resources = resourceRes.data || [];
      analysis = analyseAttempts(attempts);
      renderStats();
      renderSnapshot();
      setStatus(`Loaded ${attempts.length} attempt(s) and ${resources.length} published resource(s).`, 'ok');
    }catch(err){
      setStatus(err.message || 'Could not load progress.', 'warn');
    }
  }

  function analyseAttempts(list){
    const subjectMap = {};
    const wrongMap = {};
    let totalPercent = 0;

    list.forEach(attempt => {
      totalPercent += Number(attempt.percentage || 0);
      const breakdown = attempt.subject_breakdown || {};
      if(breakdown && typeof breakdown === 'object' && !Array.isArray(breakdown)){
        Object.entries(breakdown).forEach(([subject, value]) => {
          subjectMap[subject] ||= {correct:0,total:0};
          subjectMap[subject].correct += Number(value.correct || 0);
          subjectMap[subject].total += Number(value.total || 0);
        });
      }
      const wrong = Array.isArray(attempt.wrong_answers) ? attempt.wrong_answers : [];
      wrong.forEach(item => {
        const subject = item.subject || 'General';
        wrongMap[subject] = (wrongMap[subject] || 0) + 1;
      });
    });

    let subjects = Object.entries(subjectMap).map(([subject, stats]) => ({
      subject,
      correct: stats.correct,
      total: stats.total,
      percentage: stats.total ? Math.round((stats.correct / stats.total) * 100) : 0,
      wrongCount: wrongMap[subject] || 0
    }));

    Object.entries(wrongMap).forEach(([subject, count]) => {
      if(!subjects.some(s => s.subject === subject)){
        subjects.push({subject, correct:0, total:count, percentage:0, wrongCount:count});
      }
    });

    subjects = subjects.sort((a,b) => {
      if(a.percentage !== b.percentage) return a.percentage - b.percentage;
      return b.wrongCount - a.wrongCount;
    });

    const avg = list.length ? Math.round(totalPercent / list.length) : 0;
    const latest = list[0]?.percentage || 0;
    return {
      attempts: list.length,
      average: avg,
      latest,
      weakSubjects: subjects.slice(0,3),
      strongSubjects: [...subjects].sort((a,b)=>b.percentage-a.percentage).slice(0,3)
    };
  }

  function renderStats(){
    const stats = document.querySelector('[data-v44-stats]');
    if(!stats) return;
    const weak = analysis?.weakSubjects?.[0]?.subject || '—';
    stats.innerHTML = `
      <div><b>${analysis?.attempts || 0}</b><span>Attempts</span></div>
      <div><b>${analysis?.average || 0}%</b><span>Average</span></div>
      <div><b>${analysis?.latest || 0}%</b><span>Latest</span></div>
      <div><b>${v4Escape(weak)}</b><span>Weak subject</span></div>
    `;
  }

  function renderSnapshot(){
    const el = document.querySelector('[data-v44-snapshot]');
    if(!el) return;
    if(!analysis || !analysis.attempts){
      el.innerHTML = `
        <div class="snapshot-card warn">
          <b>No saved attempts yet</b>
          <span>Start with Practice DB or Mock DB. KEP will create a beginner plan for now.</span>
        </div>
      `;
      return;
    }

    const weak = analysis.weakSubjects.length ? analysis.weakSubjects.map(s => `<li><b>${v4Escape(s.subject)}</b> — ${s.percentage}% readiness, ${s.wrongCount} wrong answer(s)</li>`).join('') : '<li>No weak subject found yet.</li>';
    const strong = analysis.strongSubjects.length ? analysis.strongSubjects.map(s => `<li><b>${v4Escape(s.subject)}</b> — ${s.percentage}%</li>`).join('') : '<li>No strong subject found yet.</li>';

    el.innerHTML = `
      <div class="snapshot-grid">
        <div class="snapshot-card"><b>Weak subjects</b><ul>${weak}</ul></div>
        <div class="snapshot-card"><b>Strong subjects</b><ul>${strong}</ul></div>
        <div class="snapshot-card"><b>Guidance</b><span>${analysis.average >= 75 ? 'You are building strong readiness. Keep revision consistent.' : analysis.average >= 50 ? 'You have a base. Focus on weak subjects and repeated practice.' : 'Start gentle. Build foundation first, then increase mock exams.'}</span></div>
      </div>
    `;
  }

  function subjectForDay(dayIndex, weakSubjects, goal){
    const goalMap = {
      'Medicine': ['Biology','Chemistry','Physics'],
      'Engineering': ['Mathematics','Physics'],
      'Computer Science': ['Mathematics','English','General'],
      'Law': ['English','Dari','Pashto','General'],
      'Education': ['General','English','Mathematics'],
      'General Kankor': ['Mathematics','Science','English','General']
    };
    const weak = weakSubjects.map(s => s.subject).filter(Boolean);
    const goalSubjects = goalMap[goal] || goalMap['General Kankor'];
    const combined = [...weak, ...goalSubjects].filter(Boolean);
    return combined[dayIndex % combined.length] || 'General';
  }

  function tasksForIntensity(intensity, minutes, subject, dayIndex){
    const basePractice = intensity === 'strong' ? 25 : intensity === 'gentle' ? 10 : 15;
    const reviewTime = Math.max(5, Math.round(minutes * 0.3));
    const practiceTime = Math.max(10, Math.min(minutes - reviewTime, basePractice));
    const days = [
      `Review basic notes for ${subject}`,
      `Practise MCQs for ${subject}`,
      `Review wrong answers in ${subject}`,
      `Read one short resource for ${subject}`,
      `Timed mini-practice for ${subject}`,
      `Mixed revision with focus on ${subject}`,
      `Weekly review and small mock test`
    ];
    return [
      `${reviewTime} min — ${days[dayIndex]}`,
      `${practiceTime} min — solve focused questions`,
      `${Math.max(5, minutes - reviewTime - practiceTime)} min — write mistakes and one lesson learned`
    ];
  }

  function recommendResources(weakSubjects){
    const subjects = weakSubjects.map(s => String(s.subject || '').toLowerCase());
    let matched = resources.filter(r => {
      const subject = String(r.subject_name || '').toLowerCase();
      return subjects.some(s => subject.includes(s) || s.includes(subject));
    });
    if(!matched.length) matched = resources.slice(0, 6);
    return matched.slice(0, 6);
  }

  function generatePlan(){
    const settings = getSettings();
    if(!analysis) analysis = analyseAttempts(attempts);
    const weakSubjects = analysis.weakSubjects.length ? analysis.weakSubjects : [{subject:'Mathematics'}, {subject:'English'}, {subject:'General'}];

    const dayNames = ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'];
    generatedPlan = dayNames.map((day, i) => {
      const subject = subjectForDay(i, weakSubjects, settings.goal);
      return {
        day,
        subject,
        minutes: settings.minutes,
        focus: i === 6 ? 'Weekly review + short mock' : `${subject} improvement`,
        tasks: tasksForIntensity(settings.intensity, settings.minutes, subject, i)
      };
    });

    recommendedResources = recommendResources(weakSubjects);
    renderPlan();
    renderRecommendedResources();
    setStatus('Weekly study plan generated.', 'ok');
  }

  function renderPlan(){
    if(!planRoot) return;
    planRoot.innerHTML = generatedPlan.map(item => `
      <article class="study-day-card">
        <div class="rule-card-head">
          <span class="tag green">${v4Escape(item.day)}</span>
          <span class="resource-lang">${v4Escape(item.minutes)} min</span>
        </div>
        <h3>${v4Escape(item.focus)}</h3>
        <p><b>Subject:</b> ${v4Escape(item.subject)}</p>
        <ul>${item.tasks.map(t => `<li>${v4Escape(t)}</li>`).join('')}</ul>
      </article>
    `).join('');
  }

  function renderRecommendedResources(){
    const grid = document.querySelector('[data-v44-resources]');
    if(!grid) return;
    if(!recommendedResources.length){
      grid.innerHTML = `<div class="empty-state-soft"><b>No matching resources found.</b><span>Add or migrate published resources for weak subjects.</span></div>`;
      return;
    }
    grid.innerHTML = recommendedResources.map(r => `
      <article class="resource-card-live">
        <div class="resource-card-top">
          <span class="tag green">${v4Escape(r.resource_type || 'Resource')}</span>
          <span class="resource-lang">${v4Escape(r.language || 'Language')}</span>
        </div>
        <h3>${v4Escape(r.title)}</h3>
        <p>${v4Escape([r.subject_name || 'General', r.year, r.grade].filter(Boolean).join(' • '))}</p>
        <div class="small-actions">
          ${r.file_url ? `<a class="btn btn-primary" href="${v4Escape(r.file_url)}" target="_blank" rel="noopener">Open</a>` : `<button class="btn btn-secondary" disabled>No link</button>`}
          <button class="btn btn-secondary" type="button" data-v44-save-resource="${v4Escape(r.id)}">Save resource</button>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-v44-save-resource]').forEach(btn => btn.addEventListener('click', async () => {
      try{
        if(!currentUser) await loadProgress();
        if(!currentUser) throw new Error('Please login first.');
        const db = getDb();
        const resourceId = btn.getAttribute('data-v44-save-resource');
        const { error } = await db.from('saved_resources').upsert({student_id: currentUser.id, resource_id: resourceId});
        if(error) throw error;
        btn.textContent = 'Saved';
        setStatus('Resource saved to account.', 'ok');
      }catch(err){
        setStatus(err.message || 'Could not save resource.', 'warn');
      }
    }));
  }

  async function savePlan(){
    try{
      if(!generatedPlan.length) generatePlan();
      if(!currentUser) await loadProgress();
      if(!currentUser) throw new Error('Please login first.');
      const settings = getSettings();
      const payload = {
        student_id: currentUser.id,
        title: 'Weekly Study Plan',
        goal: settings.goal,
        weak_subjects: analysis?.weakSubjects || [],
        plan: generatedPlan,
        recommended_resources: recommendedResources.map(r => ({id:r.id, title:r.title, subject:r.subject_name, type:r.resource_type}))
      };

      let savedToDb = false;
      try{
        const db = getDb();
        const { error } = await db.from('study_plans').insert(payload);
        if(error) throw error;
        savedToDb = true;
      }catch(_dbErr){
        // Optional table may not exist yet. Save local fallback.
      }

      localStorage.setItem('kepLatestStudyPlan', JSON.stringify({...payload, created_at:new Date().toISOString()}));
      setStatus(savedToDb ? 'Study plan saved to database and local browser.' : 'Study plan saved locally. Run v4.4 SQL to save plans in Supabase.', savedToDb ? 'ok' : 'warn');
    }catch(err){
      setStatus(err.message || 'Could not save study plan.', 'warn');
    }
  }

  document.querySelectorAll('[data-v44-load]').forEach(btn => btn.addEventListener('click', loadProgress));
  document.querySelectorAll('[data-v44-generate]').forEach(btn => btn.addEventListener('click', generatePlan));
  document.querySelector('[data-v44-save]')?.addEventListener('click', savePlan);
  document.querySelector('[data-v44-print]')?.addEventListener('click', () => window.print());

  // Do not auto-load sensitive data; only check session lightly.
  getCurrentUserAndProfile()
    .then(({user, profile}) => {
      if(user){
        currentUser = user;
        currentProfile = profile || {};
        setStatus(`Logged in as ${user.email}. Click “Load my progress”.`, 'ok');
      }else{
        setStatus('Please login first, then load progress.', 'warn');
      }
    })
    .catch(err => setStatus(err.message || 'Database connection not ready.', 'warn'));
})();


// KEP v4.5 — Student Home Dashboard
(function initV45StudentHome(){
  const homeRoot = document.querySelector('[data-v45-today]');
  if(!homeRoot) return;

  let state = {
    user: null,
    profile: null,
    attempts: [],
    resources: [],
    plans: [],
    analysis: null
  };

  function setStatus(message, stateClass=''){
    v4Status('[data-v45-status]', message, stateClass);
  }

  function analyseAttempts(list){
    const subjectMap = {};
    const wrongMap = {};
    let totalPercent = 0;

    list.forEach(attempt => {
      totalPercent += Number(attempt.percentage || 0);
      const breakdown = attempt.subject_breakdown || {};
      if(breakdown && typeof breakdown === 'object' && !Array.isArray(breakdown)){
        Object.entries(breakdown).forEach(([subject, value]) => {
          subjectMap[subject] ||= {correct:0,total:0};
          subjectMap[subject].correct += Number(value.correct || 0);
          subjectMap[subject].total += Number(value.total || 0);
        });
      }
      const wrong = Array.isArray(attempt.wrong_answers) ? attempt.wrong_answers : [];
      wrong.forEach(item => {
        const subject = item.subject || 'General';
        wrongMap[subject] = (wrongMap[subject] || 0) + 1;
      });
    });

    let subjects = Object.entries(subjectMap).map(([subject, stats]) => ({
      subject,
      percentage: stats.total ? Math.round((stats.correct / stats.total) * 100) : 0,
      correct: stats.correct,
      total: stats.total,
      wrongCount: wrongMap[subject] || 0
    }));

    Object.entries(wrongMap).forEach(([subject, count]) => {
      if(!subjects.some(s => s.subject === subject)){
        subjects.push({subject, percentage:0, correct:0, total:count, wrongCount:count});
      }
    });

    subjects = subjects.sort((a,b) => {
      if(a.percentage !== b.percentage) return a.percentage - b.percentage;
      return b.wrongCount - a.wrongCount;
    });

    return {
      attempts: list.length,
      average: list.length ? Math.round(totalPercent / list.length) : 0,
      latest: list[0]?.percentage || 0,
      weakSubjects: subjects.slice(0,3),
      strongSubjects: [...subjects].sort((a,b)=>b.percentage-a.percentage).slice(0,3)
    };
  }

  async function loadDashboard(){
    try{
      const { db, user, profile } = await getCurrentUserAndProfile();
      if(!user) throw new Error('Please login first.');
      state.user = user;
      state.profile = profile || {};

      const [attemptRes, resourceRes] = await Promise.all([
        db.from('exam_attempts').select('*').eq('student_id', user.id).order('created_at', {ascending:false}).limit(50),
        db.from('resources').select('*').eq('status','published').order('created_at', {ascending:false}).limit(300)
      ]);
      if(attemptRes.error) throw attemptRes.error;
      if(resourceRes.error) throw resourceRes.error;

      state.attempts = attemptRes.data || [];
      state.resources = resourceRes.data || [];

      try{
        const planRes = await db.from('study_plans').select('*').eq('student_id', user.id).order('created_at', {ascending:false}).limit(3);
        state.plans = planRes.error ? [] : (planRes.data || []);
      }catch(_err){
        state.plans = [];
      }

      if(!state.plans.length){
        const localPlan = JSON.parse(localStorage.getItem('kepLatestStudyPlan') || 'null');
        if(localPlan) state.plans = [localPlan];
      }

      state.analysis = analyseAttempts(state.attempts);
      renderAll();
      setStatus(`Loaded dashboard for ${user.email}.`, 'ok');
    }catch(err){
      setStatus(err.message || 'Could not load dashboard.', 'warn');
    }
  }

  function renderAll(){
    renderWelcome();
    renderProfile();
    renderStats();
    renderToday();
    renderPlan();
    renderResources();
    renderWrongAnswers();
  }

  function renderWelcome(){
    const el = document.querySelector('[data-v45-welcome]');
    const name = state.profile?.display_name || state.user?.email?.split('@')[0] || 'student';
    if(el) el.textContent = `Welcome back, ${name}.`;
  }

  function renderProfile(){
    const nameEl = document.querySelector('[data-v45-profile-name]');
    const profileEl = document.querySelector('[data-v45-profile]');
    const p = state.profile || {};
    if(nameEl) nameEl.textContent = p.display_name || 'Student';
    if(profileEl){
      profileEl.innerHTML = `
        <div><b>Dream field</b><span>${v4Escape(p.dream_field || 'General Kankor')}</span></div>
        <div><b>Language</b><span>${v4Escape(p.preferred_language || 'Not set')}</span></div>
        <div><b>Study level</b><span>${v4Escape(p.study_level || 'Not set')}</span></div>
        <div><b>Daily time</b><span>${v4Escape(p.daily_study_minutes || 30)} minutes</span></div>
        ${p.private_learner ? '<div><b>Mode</b><span>Private learner</span></div>' : ''}
      `;
    }
  }

  function renderStats(){
    const stats = document.querySelector('[data-v45-stats]');
    if(!stats) return;
    const a = state.analysis || {attempts:0, average:0, latest:0, weakSubjects:[]};
    const weak = a.weakSubjects?.[0]?.subject || '—';
    stats.innerHTML = `
      <div><b>${a.attempts}</b><span>Attempts</span></div>
      <div><b>${a.average}%</b><span>Average</span></div>
      <div><b>${a.latest}%</b><span>Latest</span></div>
      <div><b>${v4Escape(weak)}</b><span>Weak subject</span></div>
    `;
  }

  function chooseTodayTask(){
    const a = state.analysis || {};
    const weak = a.weakSubjects?.[0]?.subject || 'Mathematics';
    const avg = Number(a.average || 0);
    const goal = state.profile?.dream_field || 'General Kankor';

    if(!a.attempts){
      return {
        title: 'Start with a gentle baseline practice',
        subject: weak,
        steps: [
          'Open Practice DB and answer 5–10 questions.',
          'Do not worry about score yet.',
          'Save the result, then return to Student Home.'
        ],
        action: 'practice-db.html',
        actionLabel: 'Start Practice'
      };
    }

    if(avg < 50){
      return {
        title: `Rebuild your foundation in ${weak}`,
        subject: weak,
        steps: [
          `Review one basic note or resource for ${weak}.`,
          'Practise 10 focused questions.',
          'Write down every mistake in simple words.'
        ],
        action: 'study-plan-db.html',
        actionLabel: 'Open Study Plan'
      };
    }

    if(avg < 75){
      return {
        title: `Strengthen your weak area: ${weak}`,
        subject: weak,
        steps: [
          `Practise 15–20 questions from ${weak}.`,
          'Review wrong answers immediately.',
          'Take a short subject mock tomorrow.'
        ],
        action: 'practice-db.html',
        actionLabel: 'Practise Weak Subject'
      };
    }

    return {
      title: `Take a timed mock for ${goal}`,
      subject: weak,
      steps: [
        'Open Mock DB and choose a timed mock.',
        'Treat it like a real exam session.',
        'Review subject breakdown after finishing.'
      ],
      action: 'mock-db.html',
      actionLabel: 'Take Mock Exam'
    };
  }

  function renderToday(){
    const task = chooseTodayTask();
    homeRoot.innerHTML = `
      <div class="today-task-card">
        <div class="rule-card-head">
          <span class="tag green">${v4Escape(task.subject)}</span>
          <span class="resource-lang">Today</span>
        </div>
        <h3>${v4Escape(task.title)}</h3>
        <ul>${task.steps.map(step => `<li>${v4Escape(step)}</li>`).join('')}</ul>
        <div class="small-actions">
          <a class="btn btn-primary" href="${v4Escape(task.action)}">${v4Escape(task.actionLabel)}</a>
          <a class="btn btn-secondary" href="library-db.html">Find Resource</a>
        </div>
      </div>
    `;
  }

  function renderPlan(){
    const el = document.querySelector('[data-v45-plan]');
    if(!el) return;
    const latest = state.plans?.[0];
    const plan = Array.isArray(latest?.plan) ? latest.plan : [];
    if(!plan.length){
      el.innerHTML = `<div class="empty-state-soft"><b>No saved plan found.</b><span>Open Study Plan and create your weekly plan.</span></div>`;
      return;
    }
    el.innerHTML = plan.slice(0,4).map(day => `
      <article class="study-day-card compact">
        <div class="rule-card-head">
          <span class="tag green">${v4Escape(day.day || 'Day')}</span>
          <span class="resource-lang">${v4Escape(day.minutes || '')} min</span>
        </div>
        <h3>${v4Escape(day.focus || day.subject || 'Study')}</h3>
        <p><b>Subject:</b> ${v4Escape(day.subject || 'General')}</p>
      </article>
    `).join('') + `<a class="action-card" href="study-plan-db.html"><b>View full plan</b><span>Open all 7 days</span></a>`;
  }

  function renderResources(){
    const el = document.querySelector('[data-v45-resources]');
    if(!el) return;
    const weakSubjects = (state.analysis?.weakSubjects || []).map(s => String(s.subject || '').toLowerCase());
    let matches = state.resources.filter(r => {
      const subject = String(r.subject_name || '').toLowerCase();
      return weakSubjects.some(w => subject.includes(w) || w.includes(subject));
    });
    if(!matches.length) matches = state.resources.slice(0,3);
    if(!matches.length){
      el.innerHTML = `<div class="empty-state-soft"><b>No database resources yet.</b><span>Add or migrate published resources first.</span></div>`;
      return;
    }
    el.innerHTML = matches.slice(0,3).map(r => `
      <div class="mini-resource-card">
        <b>${v4Escape(r.title)}</b>
        <span>${v4Escape([r.subject_name || 'General', r.resource_type || 'Resource'].join(' • '))}</span>
        ${r.file_url ? `<a href="${v4Escape(r.file_url)}" target="_blank" rel="noopener">Open</a>` : '<small>No file link</small>'}
      </div>
    `).join('');
  }

  function renderWrongAnswers(){
    const el = document.querySelector('[data-v45-wrong-list]');
    if(!el) return;
    const wrong = [];
    state.attempts.forEach(attempt => {
      const items = Array.isArray(attempt.wrong_answers) ? attempt.wrong_answers : [];
      items.forEach(item => wrong.push({...item, created_at: attempt.created_at}));
    });
    if(!wrong.length){
      el.innerHTML = `<p class="success-text">No wrong answers found yet. Complete a practice or mock attempt first.</p>`;
      return;
    }
    el.innerHTML = wrong.slice(0,6).map(item => `
      <details class="review-detail">
        <summary>${v4Escape(item.subject || 'General')} — ${v4Escape(item.question || 'Question')}</summary>
        <p><b>Your answer:</b> ${v4Escape(item.selected || item.userAnswer || 'Not answered')}</p>
        <p><b>Correct:</b> ${v4Escape(item.correct || 'Not saved')}</p>
      </details>
    `).join('');
  }

  document.querySelectorAll('[data-v45-load]').forEach(btn => btn.addEventListener('click', loadDashboard));

  getCurrentUserAndProfile()
    .then(({user, profile}) => {
      if(user){
        state.user = user;
        state.profile = profile || {};
        renderWelcome();
        setStatus(`Logged in as ${user.email}. Click “Load my dashboard”.`, 'ok');
      }else{
        setStatus('Please login first.', 'warn');
      }
    })
    .catch(err => setStatus(err.message || 'Database setup required.', 'warn'));
})();

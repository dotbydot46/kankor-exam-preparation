// KEP v5.3 — Student mobile shell
// Adds a clean app-like bottom navigation to student pages without touching database logic.

(function(){
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const studentPages = new Set([
    'student-home.html','practice-db.html','mock-db.html','study-plan-db.html',
    'library-db.html','student-db.html','dashboard.html','girls-pathway.html','study-packs.html','progress-analytics.html'
  ]);
  if(!studentPages.has(file)) return;

  document.body.classList.add('kep-student-shell');

  const items = [
    ['Home','student-home.html','⌂'],
    ['Practice','practice-db.html','✓'],
    ['Mock','mock-db.html','⏱'],
    ['Plan','study-plan-db.html','▦'],
    ['Progress','progress-analytics.html','↗']
  ];

  if(!document.querySelector('.student-bottom-nav')){
    const nav = document.createElement('nav');
    nav.className = 'student-bottom-nav';
    nav.setAttribute('aria-label','Student mobile navigation');
    nav.innerHTML = items.map(([label, href, icon]) => {
      const active = file === href ? ' active' : '';
      return `<a class="${active}" href="${href}"><b>${icon}</b><span>${label}</span></a>`;
    }).join('');
    document.body.appendChild(nav);
  }

  if(!document.querySelector('.learning-focus-strip')){
    const main = document.querySelector('main');
    if(main && file !== 'student-home.html'){
      const strip = document.createElement('div');
      strip.className = 'learning-focus-strip';
      strip.innerHTML = `
        <div class="container">
          <div class="focus-inner">
            <span>Student mode</span>
            <b>Learn one step at a time — practice, review, improve.</b>
            <a href="student-home.html">Back to Student Home</a>
          </div>
        </div>`;
      main.prepend(strip);
    }
  }
})();

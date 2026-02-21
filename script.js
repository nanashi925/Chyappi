const prompts = [
  '「初心者向けにToDoアプリ作って、手順もやさしく教えて」',
  '「このエラーの原因を1個ずつ説明して、直して」',
  '「このコマンド、押したら何が起きるか教えて」',
  '「課金の可能性がある操作だけ先に注意して」'
];

const typingEl = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const text = prompts[phraseIndex];

  if (!deleting) {
    typingEl.textContent = text.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === text.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typingEl.textContent = text.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % prompts.length;
    }
  }

  setTimeout(typeLoop, deleting ? 24 : 44);
}

function setupTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const next = document.getElementById(target);
      if (next) next.classList.add('is-active');
    });
  });
}

function setupReveal() {
  const revealTargets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

typeLoop();
setupTabs();
setupReveal();


const currentUrlEl = document.getElementById('currentUrl');
if (currentUrlEl) currentUrlEl.textContent = window.location.href;


const refreshBtn = document.getElementById('forceRefreshBtn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    const u = new URL(window.location.href);
    u.searchParams.set('refresh', String(Date.now()));
    window.location.replace(u.toString());
  });
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const u = new URL(window.location.href);
    u.searchParams.set('pageshow', String(Date.now()));
    window.location.replace(u.toString());
  }
});

(() => {
  const WHATSAPP_NUMBER = '525579847656';

  const intro = document.querySelector('#site-intro');
  const introVideo = document.querySelector('#site-intro-video');
  const introEnter = document.querySelector('#intro-enter');
  const introSound = document.querySelector('#intro-sound');

  if (intro && introVideo) {
    const closeIntro = () => {
      intro.classList.add('is-closing');
      document.body.classList.remove('intro-open');
      setTimeout(() => {
        introVideo.pause();
        intro.remove();
      }, 700);
    };

    document.body.classList.add('intro-open');
    introVideo.muted = true;
    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    introVideo.addEventListener('ended', closeIntro, { once: true });
    if (introEnter) introEnter.addEventListener('click', closeIntro);
    if (introSound) {
      introSound.addEventListener('click', () => {
        introVideo.muted = !introVideo.muted;
        introSound.textContent = introVideo.muted ? 'Sonido' : 'Silenciar';
      });
    }
  }

  const page = document.body.dataset.page || '';
  const navItems = [
    ['inicio', 'Inicio', 'index.html'],
    ['salidas', 'Tours MX', 'salidas.html'],
    ['caribe', 'Caribe', 'caribe.html'],
    ['parques', 'Parques', 'parques.html'],
    ['cruceros', 'Cruceros', 'cruceros.html'],
    ['nosotros', 'Mi servicio', 'nosotros.html'],
    ['contacto', 'Contacto', 'contacto.html']
  ];

  const header = document.querySelector('#site-header');
  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#contenido">Ir al contenido</a>
      <nav class="nav" aria-label="Navegación principal">
        <div class="container nav-inner">
          <a class="brand" href="index.html" aria-label="Thania Ruiz Travel Planner - Inicio">
            <img src="assets/logo.webp" alt="Thania Ruiz Travel Planner">
            <span><strong>Thania Ruiz</strong><small>Travel Planner</small></span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-menu" id="nav-menu">
            ${navItems.map(([id,label,href]) => `<a ${page === id ? 'class="active" aria-current="page"' : ''} href="${href}">${label}</a>`).join('')}
            <a class="btn btn-sm" href="contacto.html#cotizar">Cotizar viaje</a>
          </div>
        </div>
      </nav>`;
  }

  const footer = document.querySelector('#site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-main">
        <div class="container footer-grid">
          <div>
            <a class="brand brand-footer" href="index.html">
              <img src="assets/logo.webp" alt="">
              <span><strong>Thania Ruiz</strong><small>Travel Planner</small></span>
            </a>
            <p>Planeación personalizada para Caribe, parques temáticos, cruceros y experiencias en México.</p>
          </div>
          <div>
            <h3>Explora</h3>
            <a href="salidas.html">Tours MX</a>
            <a href="caribe.html">Caribe</a>
            <a href="parques.html">Parques</a>
            <a href="cruceros.html">Cruceros</a>
          </div>
          <div>
            <h3>Información</h3>
            <a href="nosotros.html">Mi servicio</a>
            <a href="contacto.html">Contacto</a>
            <a href="contacto.html#preguntas">Preguntas frecuentes</a>
            <a href="contacto.html#cotizar">Solicitar cotización</a>
          </div>
          <div>
            <h3>Hablemos de tu viaje</h3>
            <p class="footer-contact">WhatsApp<br><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">55 7984 7656</a></p>
            <a class="btn btn-light btn-sm" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Thania, quiero cotizar un viaje.')}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <span>© <span id="year"></span> Thania Ruiz Travel Planner.</span>
          <span>Tarifas y disponibilidad sujetas a confirmación al momento de cotizar.</span>
        </div>
      </div>`;
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }

  document.querySelectorAll('[data-wa-message]').forEach(el => {
    const msg = el.getAttribute('data-wa-message') || 'Hola Thania, quiero información para un viaje.';
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  const form = document.querySelector('#quote-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const nombre = String(data.get('nombre') || '').trim();
      const destino = String(data.get('destino') || '').trim();
      const fechas = String(data.get('fechas') || '').trim();
      const viajeros = String(data.get('viajeros') || '').trim();
      const presupuesto = String(data.get('presupuesto') || '').trim();

      const text = [
        'Hola Thania, me gustaría cotizar un viaje ✨',
        '',
        `Nombre: ${nombre}`,
        `Destino de interés: ${destino || 'Por definir'}`,
        `Fechas aproximadas: ${fechas || 'Por definir'}`,
        `No. de pasajeros: ${viajeros}`,
        `Presupuesto aprox.: ${presupuesto}`
      ].join('\n');

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 }) : null;

  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));
})();

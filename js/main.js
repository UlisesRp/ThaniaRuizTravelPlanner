(() => {
  const WHATSAPP_NUMBER = '525579847656';

  const page = document.body.dataset.page || '';
  const navItems = [
    ['inicio', 'Inicio', 'index.html'],
    ['salidas', 'Salidas', 'salidas.html'],
    ['cruceros', 'Cruceros', 'cruceros.html'],
    ['parques', 'Parques', 'parques.html'],
    ['caribe', 'Caribe', 'caribe.html'],
    ['nosotros', 'Sobre Thania', 'nosotros.html'],
    ['contacto', 'Contacto', 'contacto.html']
  ];

  const header = document.querySelector('#site-header');
  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#contenido">Ir al contenido</a>
      <div class="topbar">
        <div class="container topbar-inner">
          <span>Cruceros · Parques temáticos · Caribe · Salidas de mayoristas</span>
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Thania, quiero información para planear un viaje.')}" target="_blank" rel="noopener">WhatsApp: 55 7984 7656</a>
        </div>
      </div>
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
            <p>Planeación personalizada para cruceros, parques temáticos, Caribe y salidas seleccionadas de operadores mayoristas.</p>
          </div>
          <div>
            <h3>Explora</h3>
            <a href="salidas.html">Salidas y promociones</a>
            <a href="cruceros.html">Cruceros</a>
            <a href="parques.html">Parques temáticos</a>
            <a href="caribe.html">Caribe</a>
          </div>
          <div>
            <h3>Información</h3>
            <a href="nosotros.html">Sobre Thania</a>
            <a href="contacto.html">Contacto</a>
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
          <span>Los precios, disponibilidad y condiciones de servicios operados por terceros están sujetos a confirmación.</span>
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
      const nombre = data.get('nombre') || '';
      const tipo = data.get('tipo') || '';
      const destino = data.get('destino') || '';
      const fechas = data.get('fechas') || '';
      const viajeros = data.get('viajeros') || '';
      const presupuesto = data.get('presupuesto') || '';
      const mensaje = data.get('mensaje') || '';

      const text = [
        `Hola Thania, soy ${nombre}. Quiero cotizar un viaje.`,
        `Tipo de viaje: ${tipo || 'Por definir'}`,
        `Destino o idea: ${destino || 'Por definir'}`,
        `Fechas: ${fechas || 'Flexibles / por definir'}`,
        `Viajeros: ${viajeros || 'Por definir'}`,
        `Presupuesto aproximado: ${presupuesto || 'Por definir'}`,
        mensaje ? `Comentarios: ${mensaje}` : ''
      ].filter(Boolean).join('\n');

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

/*
  CATÁLOGO DE SALIDAS
  -------------------
  Para agregar una nueva salida, duplica un objeto y cambia sus datos.
  No es necesario editar el HTML.

  Categorías sugeridas: nacional, caribe, internacional, crucero, parques.
*/
window.SALIDAS = [
  {
    id: 'proximas-salidas',
    titulo: 'Próximas salidas',
    destino: 'Consulta destinos y próximas fechas',
    categoria: 'nacional',
    fecha: 'Programación según disponibilidad',
    precio: 'Solicita cotización',
    descripcion: 'Pregunta por las salidas disponibles. Te ayudo a revisar fechas, espacios, inclusiones y condiciones antes de reservar.',
    etiqueta: 'Salida especial',
    fondo: 'sea'
  }
];

(() => {
  const list = document.querySelector('#salidas-list');
  if (!list) return;

  const filterButtons = document.querySelectorAll('[data-filter]');

  const icon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17h16M6 13l3-7h6l3 7M8.5 13h7M9 17v2m6-2v2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function render(filter = 'todos') {
    const items = window.SALIDAS.filter(item => filter === 'todos' || item.categoria === filter);

    if (!items.length) {
      list.innerHTML = `<div class="empty-state"><strong>No hay salidas publicadas en esta categoría por ahora.</strong><span>Escríbenos y revisamos opciones disponibles para tus fechas.</span><a class="btn" data-wa-message="Hola Thania, ¿qué salidas tienes disponibles próximamente?">Consultar por WhatsApp</a></div>`;
      document.querySelectorAll('[data-wa-message]').forEach(el => {
        const msg = el.getAttribute('data-wa-message');
        el.href = `https://wa.me/525579847656?text=${encodeURIComponent(msg)}`;
        el.target = '_blank';
        el.rel = 'noopener';
      });
      return;
    }

    list.innerHTML = items.map(item => `
      <article class="departure-card reveal visible">
        <div class="departure-visual ${item.fondo || 'sea'}">
          <span class="departure-label">${item.etiqueta || 'Salida'}</span>
          <span class="departure-icon">${icon}</span>
        </div>
        <div class="departure-body">
          <p class="eyebrow">Salida disponible</p>
          <h2>${item.titulo}</h2>
          <p class="departure-destination">${item.destino}</p>
          <div class="departure-meta">
            <span><strong>Fecha</strong>${item.fecha}</span>
            <span><strong>Precio</strong>${item.precio}</span>
          </div>
          <p>${item.descripcion}</p>
          <a class="btn btn-block" href="https://wa.me/525579847656?text=${encodeURIComponent(`Hola Thania, quiero información sobre: ${item.titulo}.`)}" target="_blank" rel="noopener">Consultar disponibilidad</a>
        </div>
      </article>`).join('');
  }

  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.filter);
  }));

  render();
})();

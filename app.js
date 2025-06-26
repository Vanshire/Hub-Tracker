/**
 * Módulo del Panel de Administración
 * Maneja menú lateral, dropdowns, saludo y tabs.
 */
class AdminPanel {
  constructor() {
    this.initElements();
    this.initEvents();
    this.updateDateTime();
  }

  /* ========= Elementos ========= */
  initElements() {
    // Menú lateral
    this.$menu        = document.querySelector('.side-menu');
    this.$menuToggle  = document.querySelector('.js-toggle-menu');
    this.$dropdowns   = document.querySelectorAll('.menu-dropdown');

    // Saludo
    this.$timeElement = document.getElementById('time');

    // Tabs
    this.$tabButtons  = document.querySelectorAll('.tab-button');
    this.$tabPanels   = document.querySelectorAll('.tab-panel');
    this.loadedTabs   = new Set();       // Para no cargar dos veces
  }

  /* ========= Eventos ========= */
  initEvents() {
    /* Menú hamburguesa */
    this.$menuToggle?.addEventListener('click', () => this.$menu.classList.toggle('menu-expanded'));

    /* Dropdowns del sidebar */
    this.$dropdowns.forEach(drop => {
      drop.querySelector('.dropdown-toggle')?.addEventListener('click', () => this.toggleDropdown(drop));
    });

    /* Navegación de pestañas */
    this.$tabButtons.forEach(btn => {
      btn.addEventListener('click', () => this.activateTab(btn.dataset.tab));
    });
  }

  /* ========= Dropdown ========= */
  toggleDropdown(dropdown) {
    // Cerrar otros
    this.$dropdowns.forEach(item => {
      if (item !== dropdown) item.classList.remove('dropdown-opened');
    });
    dropdown.classList.toggle('dropdown-opened');
  }

  /* ========= Tabs ========= */
  activateTab(tabId) {
    // Resaltar botón activo
    this.$tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));

    // Mostrar/ocultar paneles
    this.$tabPanels.forEach(p => (p.hidden = p.dataset.tab !== tabId));

    // Cargar datos sólo la primera vez
    if (!this.loadedTabs.has(tabId)) {
      this.loadTickets(tabId);
      this.loadedTabs.add(tabId);
    }
  }

  /**
   * PUNTO DE ENGANCHE: traer tickets desde API cuando exista.
   * Por ahora llenamos la tabla con datos ficticios.
   */
  loadTickets(estado) {
    const tabla = document.getElementById(`tbl-${estado}`);
    if (!tabla) return;

    // Datos de prueba
    const dummy = [
      { id: 1, asunto: 'Error login', fecha: '2025-06-26', estado },
      { id: 2, asunto: 'Actualizar perfil', fecha: '2025-06-25', estado },
    ];

    // Construir tabla básica
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>#</th><th>Asunto</th><th>Fecha</th><th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${dummy.map(t => `
          <tr>
            <td>${t.id}</td>
            <td>${t.asunto}</td>
            <td>${t.fecha}</td>
            <td>${t.estado}</td>
          </tr>`).join('')}
      </tbody>`;
  }

  /* ========= Saludo ========= */
  updateDateTime() {
    if (!this.$timeElement) return;

    const hours = new Date().getHours();
    let greeting;
    if (hours < 12) {
      greeting = 'Buenos días,';
    } else if (hours < 16) {
      greeting = 'Buenas tardes,';
    } else {
      greeting = 'Buenas noches,';
    }
    this.$timeElement.textContent = greeting;
  }
}

/* ========= Bootstrap ========= */
document.addEventListener('DOMContentLoaded', () => new AdminPanel());



/*
Para poblar los contadores

document.getElementById('count-totales').textContent     = total;
document.getElementById('count-cerrados').textContent    = cerrados;
document.getElementById('count-rechazados').textContent  = rechazados;
document.getElementById('count-pendientes').textContent  = pendientes;
document.getElementById('count-abiertos').textContent    = abiertos;
document.getElementById('count-cola').textContent        = cola;

*/
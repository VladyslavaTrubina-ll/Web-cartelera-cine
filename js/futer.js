// Footer component
export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-section">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a href="cartelera.html">Cartelera</a></li>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="nuevoCliente.html">Crear cuenta</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contacto</h3>
        <ul>
          <li>Email: info@micine.com</li>
          <li>Teléfono: +34 900 000 000</li>
          <li>Horario: 9:00 - 22:00</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Mi Cine — Todos los derechos reservados</p>
    </div>
  `;

  return footer;
}

// Auto-insert footer on page load
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".site-footer")) {
    const footer = createFooter();
    document.body.appendChild(footer);
  }
});

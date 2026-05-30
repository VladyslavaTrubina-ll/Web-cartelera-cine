// Footer component
export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="cartelera.html">Now Showing</a></li>
          <li><a href="index.html">Home</a></li>
          <li><a href="nuevoCliente.html">Create Account</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact</h3>
        <ul>
          <li>Email: info@micine.com</li>
          <li>Phone: +34 900 000 000</li>
          <li>Hours: 9:00 - 22:00</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 My Cinema — All rights reserved</p>
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

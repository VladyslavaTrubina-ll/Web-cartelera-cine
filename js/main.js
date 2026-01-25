export function calcularPrecio(cantidad, precioUnitario) {
  if (cantidad >= 3) {
    return cantidad * precioUnitario * (1 - 0.3); // 30% de descuento
  }
  if (cantidad == 2) {
    return cantidad * precioUnitario * (1 - 0.2); // 20% de descuento
  } else {
    return cantidad * precioUnitario; // Sin descuento
  }
}

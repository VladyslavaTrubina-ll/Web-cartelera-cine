export function calcularPrecioYDescuento(cantidad, precioUnitario) {
  let descuento = 0.0;
  if (cantidad >= 3) {
    descuento = 0.3;
  } else if (cantidad == 2) {
    descuento = 0.2; // 20% de descuento
  }
  const precioTotal = cantidad * precioUnitario * (1.0 - descuento);

  return {
    precio: parseFloat(precioTotal.toFixed(2)),
    descuentoCalculado: descuento,
  };
}

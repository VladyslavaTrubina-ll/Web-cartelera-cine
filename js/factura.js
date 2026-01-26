var comprasStorage = JSON.parse(localStorage.getItem("compras"));

let params = new URLSearchParams(document.location.search);
let idCompra = params.get("idCompra");

var compra = comprasStorage.find((c) => c.idCompra == idCompra);

console.log(compra);

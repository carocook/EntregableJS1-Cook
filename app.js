// Array de productos
const productos = [
  { id: 1, nombre: "Apple Watch ⌚️", precio: 350000 },
  { id: 2, nombre: "iPhone 📱", precio: 1500000 },
  { id: 3, nombre: "MacBook 💻", precio: 2500000 },
];

// Carrito de compras
const carrito = [];

// Funcion que muestra menu y trae productos
function obtenerProducto() {
  let menu = "¿Qué producto te gustaría comprar?\n";
  for (let i = 0; i < productos.length; i++) {
    menu += `${productos[i].id} - ${productos[i].nombre} ($${productos[i].precio})\n`;
  }
  menu += "0 - Salir";

  let seleccion = parseInt(prompt(menu));
  if (seleccion === 0) return null;
  return productos.find((prod) => prod.id === seleccion);
}

// Funcion que calcula el total sumando el IVA
function calcularTotal(producto) {
  const IVA = 0.21;
  const montoIVA = producto.precio * IVA;
  const total = producto.precio + montoIVA;

  return {
    total: total,
    iva: montoIVA,
  };
}

// Funcion que muestra el resultado de una compra individual
function mostrarResultado(producto, resultado) {
  alert(
    `Producto adquirido: ${producto.nombre}\n` +
      `Precio sin impuestos: $${producto.precio}\n` +
      `IVA: $${resultado.iva.toFixed(2)}\n` +
      `Total: $${resultado.total.toFixed(2)}`
  );

  console.log("Producto:", producto.nombre);
  console.log("Precio sin impuestos:", producto.precio);
  console.log("IVA:", resultado.iva);
  console.log("Total facturado:", resultado.total);
}

// Funcion que muestra el resumen final del carrito
function mostrarResumenFinal(carrito) {
  if (carrito.length === 0) {
    alert("No realizaste ninguna compra.");
    return;
  }

  let resumen = "🧾 Resumen de tu compra:\n";
  let totalFacturado = 0;

  carrito.forEach((item, index) => {
    resumen += `\n${index + 1}) ${item.nombre}\n`;
    resumen += `   Precio: $${item.precio}\n`;
    resumen += `   IVA: $${item.iva.toFixed(2)}\n`;
    resumen += `   Total: $${item.total.toFixed(2)}\n`;
    totalFacturado += item.total;
  });

  resumen += `\n💵 Total facturado: $${totalFacturado.toFixed(2)}`;
  alert(resumen);
  console.log(resumen);
}

// Inicio del simulador
alert("Bienvenido a la Tienda Online ");

let seguirComprando = true;

while (seguirComprando) {
  const productoElegido = obtenerProducto();

  if (productoElegido) {
    const confirmar = confirm(
      `Confirmás la compra de ${productoElegido.nombre}?`
    );

    if (confirmar) {
      const resultado = calcularTotal(productoElegido);
      mostrarResultado(productoElegido, resultado);

      // Agregar al carrito
      carrito.push({
        nombre: productoElegido.nombre,
        precio: productoElegido.precio,
        iva: resultado.iva,
        total: resultado.total,
      });

      alert("Compra realizada con éxito ✅");
    } else {
      alert("Compra cancelada ❌");
    }
  } else {
    seguirComprando = false;
    mostrarResumenFinal(carrito);
    alert("Gracias por visitar nuestra tienda 😊");
  }
}

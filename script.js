//----------------- Funciones
function listar(listaProductos) {
    return listaProductos.map(producto => `ID ${producto.id} - ${producto.nombre} - ${producto.categoria.toUpperCase()} - $${producto.precio}`).join("\n")
}

function filtro(valorCat) {
    return productos.filter(producto => producto.categoria === valorCat)
}
//----------------- Array
let productos = [
    { id: 11, nombre: "FilmStretch 10x500 cm", categoria: "produccion", stock: 7, precio: 3700 },
    { id: 12, nombre: "FilmStretch 38x600 cm", categoria: "produccion", stock: 2, precio: 5000 },
    { id: 13, nombre: "FilmStretch 38x1000 cm", categoria: "produccion", stock: 20, precio: 6300 },
    { id: 14, nombre: "FilmStretch 45x600 cm", categoria: "prodiccion", stock: 1, precio: 6000 },
    { id: 15, nombre: "FilmStretch 45x10000 cm", categoria: "produccion", stock: 11, precio: 7500 },
    { id: 21, nombre: "FilmStretch Negro 45x10000 cm ", categoria: "produccion", stock: 8, precio: 9000 },
    { id: 31, nombre: "FilmStretch Alimentos 38x600 cm", categoria: "alimentos", stock: 2, precio: 7000 },
    { id: 32, nombre: "FilmStretch Alimentos 45x600 cm", categoria: "alimentos", stock: 2, precio: 8000 },
    { id: 41, nombre: "Cinta Adhesiva", categoria: "embalaje", stock: 27, precio: 3700 },
    { id: 51, nombre: "Paletizadora Manual", categoria: "herramientas", stock: 5, precio: 18200 },
    { id: 52, nombre: "Paletizadora Automática", categoria: "herramientas", stock: 2, precio: 48000 }
]

//----------------- Inicio de programa
let opcion = Number(prompt("Ingrese\n1 - Lista de productos\n2 - Finalizar Compra\n3 - Salir"))
let carrito = []

while (opcion !== 3) {
    if (opcion === 1) {
        let idProducto = Number(prompt("Si desea filtrar ingrese:\n0 - Para filtrar productos\n\nSeleccione productos por ID:\n" + listar(productos)))
        if (productos.some(producto => producto.id === idProducto || idProducto === 0)) {
            let productosFiltrado
            let productoBuscado
            let indexItemsCarrito = carrito.findIndex(producto => producto.id === idProducto)
            if (idProducto === 0) {
                let categoriaSeleccionada
                let condicionWhile = 1
                do {
                    categoriaSeleccionada = Number(prompt("Seleccione categoría:\n1 - Produccion\n2 - Alimentos\n3 - Embalaje\n4 - Herramientas"))
                } while (![1, 2, 3, 4].includes(categoriaSeleccionada))
                if (categoriaSeleccionada === 1) {
                    productosFiltrado = filtro("produccion")
                }
                else if (categoriaSeleccionada === 2) {
                    productosFiltrado = filtro("alimentos")
                }
                else if (categoriaSeleccionada === 3) {
                    productosFiltrado = filtro("embalaje")
                }
                else if (categoriaSeleccionada === 4) {
                    productosFiltrado = filtro("herramientas")
                }
                idProducto = Number(prompt("Seleccione productos por ID:\n" + listar(productosFiltrado)))
                while (condicionWhile === 1) {
                    if (productosFiltrado.some(producto => producto.id === idProducto)) {
                        productoBuscado = productos.find(producto => producto.id === idProducto)
                        condicionWhile = 0
                    }
                    else {
                        idProducto = Number(prompt("¡ ID INEXISTENTE !\nSeleccione productos por ID:\n" + listar(productosFiltrado)))
                    }
                }
            }
            else {
                productoBuscado = productos.find(producto => producto.id === idProducto)
            }
            if (indexItemsCarrito === -1) {
                carrito.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    precioUnitario: productoBuscado.precio,
                    unidades: productoBuscado.stock,
                    subTotal: productoBuscado.precio
                })
            }
            else {
                carrito[indexItemsCarrito].unidades++
                carrito[indexItemsCarrito].subTotal = carrito[indexItemsCarrito].unidades * carrito[indexItemsCarrito].precioUnitario
            }
        }
        else {
            alert("ID ingresado inexistente")
        }
    }
    else if (opcion === 2) {
        let total = carrito.reduce((acumulador, producto) => acumulador + producto.subTotal, 0)
        alert(`Total $${total} Gracias por su compra.`)
        break
    }
    opcion = Number(prompt("Ingrese\n1 - Lista de productos\n2 - Finalizar Compra\n3 - Salir"))
}

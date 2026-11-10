class Producto(
    val nombre: String?,
    val precio: Double?
) {

    init {
        require(precio != null && precio >= 0) {
            "El precio debe ser mayor o igual a 0"
        }
    }

    fun mostrarInformacion() {
        val nombreProducto = nombre ?: "Producto sin nombre"
        val precioProducto = precio ?: 0.0

        println("Producto: $nombreProducto")
        println("Precio: $precioProducto")
    }
}

fun main() {
    val producto1 = Producto("Computador", 2500000.0)
    producto1.mostrarInformacion()

    println("--------------------")

    val producto2 = Producto(null, 15000.0)
    producto2.mostrarInformacion()

    println("--------------------")

    try {
        val producto3 = Producto("Celular", -500000.0)
        producto3.mostrarInformacion()
    } catch (e: IllegalArgumentException) {
        println("Error: ${e.message}")
    }
}

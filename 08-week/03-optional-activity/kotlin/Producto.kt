class Producto(
    val nombre: String,
    precio: Double?
) {
    val precio: Double = precio ?: 0.0

    init {
        require(this.precio >= 0) {
            "El precio no puede ser negativo"
        }
    }

    fun mostrarInformacion() {
        println("Producto: $nombre")
        println("Precio: $precio")
    }
}

fun main() {
    val producto1 = Producto("Laptop", 2500000.0)
    val producto2 = Producto("Mouse", null)

    producto1.mostrarInformacion()
    println()

    producto2.mostrarInformacion()
}

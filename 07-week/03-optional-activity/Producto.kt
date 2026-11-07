class Producto(
    val nombre: String,
    val precio: Double?
) {
    init {
        require(precio == null || precio >= 0) {
            "El precio no puede ser negativo"
        }
    }

    fun mostrarInformacion() {
        val precioTexto = precio?.let { "$it" } ?: "Precio no disponible"
        println("Producto: $nombre - Precio: $precioTexto")
    }
}

fun main() {
    val producto1 = Producto("Celular", 1200000.0)
    val producto2 = Producto("Producto sin precio", null)

    producto1.mostrarInformacion()
    producto2.mostrarInformacion()
}

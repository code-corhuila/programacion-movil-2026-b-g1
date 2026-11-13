open class Programmer {
    var name: String

    public init(name: String) {
        this.name = name
    }

    public open func writeCode(): Unit {
        println("${name} is writing code...")
    }

    public func fixBug(): Unit {
        println("${name} is fixing bugs...")
    }

    public func commitCode(): Unit {
        println("${name} is committing code...")
    }
}

class CangjieProgrammer <: Programmer {
    public init(name: String) {
        super(name)
    }

    public override func writeCode(): Unit {
        println("${name} is writing Cangjie code...")
    }
}

main() {
    let dev = CangjieProgrammer("Julian")
    dev.writeCode()
    dev.fixBug()
    dev.commitCode()
}

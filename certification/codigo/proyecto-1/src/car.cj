abstract class Car {
    var brand: String
    var model: String

    public init(brand: String, model: String) {
        this.brand = brand
        this.model = model
    }

    public func recharge(): Unit
    public func startEngine(): Unit

    public func drive(): Unit {
        println("${brand} ${model} is driving...")
    }
}

class ElectricCar <: Car {
    var chargeLevel: Int64

    public init(brand: String, model: String, chargeLevel: Int64) {
        super(brand, model)
        this.chargeLevel = chargeLevel
    }

    public override func recharge(): Unit {
        chargeLevel = 100
        println("${brand} ${model} is recharging. Battery is now ${chargeLevel}%.")
    }

    public override func startEngine(): Unit {
        println("${brand} ${model} electric motor started silently.")
    }

    public func showBattery(): Unit {
        println("${brand} ${model} remaining battery level: ${chargeLevel}%.")
    }
}

main() {
    let myEv = ElectricCar("Huawei", "AITO M9", 65)
    myEv.recharge()
    myEv.startEngine()
    myEv.drive()
    myEv.showBattery()
}

// Patrón Builder para construir objetos Order paso a paso.
// Facilita la creación de pedidos complejos sin constructores enormes.

const Order = require("./Order");

class OrderBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this._id = Date.now(); // id simple basado en tiempo
    this._customerName = null;
    this._address = null;
    this._items = [];
    this._deliveryFee = 0;
    this._paymentMethod = "CASH";
    this._status = "CREATED";
    this._createdAt = new Date();
    return this;
  }

  setCustomer(name) {
    this._customerName = name;
    return this;
  }

  setAddress(address) {
    this._address = address;
    return this;
  }

  addItem(name, quantity, price) {
    this._items.push({ name, quantity, price });
    return this;
  }

  setDeliveryFee(fee) {
    this._deliveryFee = fee;
    return this;
  }

  setPaymentMethod(method) {
    this._paymentMethod = method;
    return this;
  }

  setStatus(status) {
    this._status = status;
    return this;
  }

  // Calcula el total a partir de los items + deliveryFee
  _calculateTotal() {
    const itemsTotal = this._items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return itemsTotal + this._deliveryFee;
  }

  build() {
    if (!this._customerName) {
      throw new Error("El pedido debe tener nombre de cliente.");
    }
    if (!this._address) {
      throw new Error("El pedido debe tener dirección.");
    }
    if (this._items.length === 0) {
      throw new Error("El pedido debe tener al menos un item.");
    }

    const total = this._calculateTotal();

    const order = new Order({
      id: this._id,
      customerName: this._customerName,
      address: this._address,
      items: this._items,
      deliveryFee: this._deliveryFee,
      total,
      paymentMethod: this._paymentMethod,
      status: this._status,
      createdAt: this._createdAt
    });

    // Permite reutilizar el Builder (opcional)
    this.reset();

    return order;
  }
}

module.exports = OrderBuilder;

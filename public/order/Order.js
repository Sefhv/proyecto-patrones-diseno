// Clase simple que representa un Pedido.
// La instancia es creada por el Builder.

class Order {
  constructor({
    id,
    customerName,
    address,
    items,
    deliveryFee,
    total,
    paymentMethod,
    status,
    createdAt
  }) {
    this.id = id;
    this.customerName = customerName;
    this.address = address;
    this.items = items; // array de { name, quantity, price }
    this.deliveryFee = deliveryFee;
    this.total = total;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = Order;

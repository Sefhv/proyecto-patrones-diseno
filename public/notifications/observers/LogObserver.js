// Observador concreto que registra información del pedido en logs.

class LogObserver {
  update(order) {
    console.log("=== [LOG OBSERVER] ===");
    console.log("Nuevo pedido creado:");
    console.log(`ID: ${order.id}`);
    console.log(`Cliente: ${order.customerName}`);
    console.log(`Dirección: ${order.address}`);
    console.log(`Items:`);
    order.items.forEach((item) => {
      console.log(
        ` - ${item.name} x${item.quantity} (${item.price} cada uno)`
      );
    });
    console.log(`Total: ${order.total}`);
    console.log("=======================\n");
  }
}

module.exports = LogObserver;

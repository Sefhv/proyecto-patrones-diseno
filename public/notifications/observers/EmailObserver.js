// Observador concreto que "simula" el envío de un email cuando se crea un pedido.

const AppConfig = require("../../config/AppConfig");

class EmailObserver {
  update(order) {
    const config = AppConfig.getInstance();
    console.log("=== [EMAIL OBSERVER] ===");
    console.log(
      `Enviando email de confirmación a ${order.customerName} desde ${config.supportEmail}...`
    );
    console.log(
      `Asunto: Confirmación de pedido ${order.id} - ${config.appName}`
    );
    console.log(
      `Contenido: Gracias por tu pedido, total: ${order.total} ${config.defaultCurrency}`
    );
    console.log("=========================\n");
  }
}

module.exports = EmailObserver;

const express = require('express');
const AppConfig = require('./public/config/AppConfig');
const OrderBuilder = require('./public/order/OrderBuilder');
const OrderSubject = require('./public/notifications/OrderSubject');
const EmailObserver = require('./public/notifications/observers/EmailObserver');
const LogObserver = require('./public/notifications/observers/LogObserver');

const PORT = 8080;
const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.static('public'));

// Inicializar configuración (Singleton)
const config = AppConfig.getInstance();

// Crear el sujeto (Subject) y registrar observadores
const orderSubject = new OrderSubject();
const emailObs = new EmailObserver();
const logObs = new LogObserver();

orderSubject.attach(emailObs);
orderSubject.attach(logObs);

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenido a ${config.appName}</h1>
    <p>Versión: ${config.version}</p>
    <h2>Endpoints disponibles:</h2>
    <ul>
      <li><a href="/api/orders/create-demo">POST /api/orders/create-demo</a> - Crear pedido de demostración</li>
      <li><a href="/api/config">GET /api/config</a> - Ver configuración (Singleton)</li>
    </ul>
    <p><a href="index.html">Ir a la página principal</a></p>
  `);
});

// Endpoint para ver la configuración (demuestra Singleton)
app.get('/api/config', (req, res) => {
  const configInstance = AppConfig.getInstance();
  res.json({
    message: "Esta es la configuración única de la aplicación (Singleton)",
    config: configInstance
  });
});

// Endpoint para crear un pedido de demostración (usa Builder y Observer)
app.post('/api/orders/create-demo', (req, res) => {
  try {
    const builder = new OrderBuilder();
    
    const order = builder
      .setCustomer("Juan Pérez")
      .setAddress("Calle Falsa 123, Ciudad X")
      .addItem("Pizza Margarita", 2, 8.5)
      .addItem("Refresco Cola", 3, 1.5)
      .setDeliveryFee(3)
      .setPaymentMethod("CARD")
      .build();

    // Notificar a todos los observadores
    orderSubject.notify(order);

    res.json({
      success: true,
      message: "Pedido creado exitosamente",
      order: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para crear un pedido personalizado (usa Builder y Observer)
app.post('/api/orders', (req, res) => {
  try {
    const { customerName, address, items, deliveryFee, paymentMethod } = req.body;
    
    const builder = new OrderBuilder();
    builder.setCustomer(customerName);
    builder.setAddress(address);
    
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        builder.addItem(item.name, item.quantity, item.price);
      });
    }
    
    if (deliveryFee !== undefined) {
      builder.setDeliveryFee(deliveryFee);
    }
    
    if (paymentMethod) {
      builder.setPaymentMethod(paymentMethod);
    }
    
    const order = builder.build();
    
    // Notificar a todos los observadores
    orderSubject.notify(order);

    res.json({
      success: true,
      message: "Pedido creado exitosamente",
      order: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n=== ${config.appName} ===`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Versión: ${config.version}`);
});

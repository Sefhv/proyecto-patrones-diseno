// Patrón Observer
// OrderSubject: representa un "sujeto" que notifica a todos los observadores
// cuando ocurre un evento, por ejemplo, cuando se crea un nuevo pedido.

class OrderSubject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(order) {
    for (const observer of this.observers) {
      observer.update(order);
    }
  }
}

module.exports = OrderSubject;

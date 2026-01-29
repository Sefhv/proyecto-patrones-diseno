// Patrón Singleton para manejar la configuración global de la aplicación.
// Garantiza que solo exista UNA instancia de configuración en toda la app.

class AppConfig {
  constructor() {
    if (AppConfig.instance) {
      // Si ya existe una instancia, devolvemos la misma
      return AppConfig.instance;
    }

    // Configuración "global" de ejemplo
    this.appName = "Sistema de Pedidos de Comida";
    this.version = "1.0.0";
    this.defaultCurrency = "COP";
    this.supportEmail = "soporte@mi-restaurante.com";

    AppConfig.instance = this;
  }

  // Método estático de acceso cómodo
  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

module.exports = AppConfig;

# Proyecto Patrones de Diseño

Aplicación de gestión de pedidos de comida que implementa tres patrones de diseño fundamentales:

- **Singleton**: Configuración global de la aplicación
- **Builder**: Construcción de pedidos complejos
- **Observer**: Sistema de notificaciones desacoplado

## Descripción

Este proyecto demuestra la aplicación práctica de patrones de diseño en Node.js mediante un sistema de gestión de pedidos de comida a domicilio. Los patrones implementados permiten crear una arquitectura escalable, mantenible y flexible.

## Cómo correr en local

```bash
# 1) Clona el repositorio
git clone https://github.com/Sefhv/proyecto-patrones-diseno.git

# 2) Entra a la carpeta del proyecto
cd proyecto-patrones-diseno

# 3) Instala dependencias
npm install

# 4) Ejecuta el proyecto
npm start
```

El servidor se ejecutará en `http://localhost:8080`

## 📡 Endpoints

- `GET /` - Página principal con información de la aplicación
- `GET /api/config` - Ver configuración (demuestra Singleton)
- `POST /api/orders/create-demo` - Crear pedido de demostración
- `POST /api/orders` - Crear pedido personalizado

### Ejemplo de creación de pedido personalizado:

```bash
curl -X POST http://localhost:8080/api/orders ^
  -H "Content-Type: application/json" ^
  -d "{\"customerName\":\"María López\",\"address\":\"Av. Principal 45\",\"items\":[{\"name\":\"Hamburguesa\",\"quantity\":2,\"price\":10},{\"name\":\"Patatas\",\"quantity\":1,\"price\":2.5}],\"deliveryFee\":2,\"paymentMethod\":\"CASH\"}"
```

## Patrones Implementados

### 1. Singleton (AppConfig)
**Ubicación:** `public/config/AppConfig.js`

Garantiza una única instancia de configuración en toda la aplicación. Esto asegura que todos los componentes compartan la misma configuración sin duplicación.

**Ventajas:**
- Control de acceso global
- Evita duplicación de instancias
- Facilita el mantenimiento de configuración centralizada

### 2. Builder (OrderBuilder)
**Ubicación:** `public/order/OrderBuilder.js`

Permite construir pedidos complejos paso a paso de forma legible y escalable. Facilita la creación de objetos con múltiples parámetros opcionales.

**Ventajas:**
- Código más legible y mantenible
- Construcción flexible de objetos complejos
- Validación antes de crear el objeto final
- Reutilización del builder para múltiples pedidos

### 3. Observer (OrderSubject + Observers)
**Ubicación:** `public/notifications/OrderSubject.js` y `public/notifications/observers/`

Sistema de notificaciones desacoplado que permite agregar nuevos observadores sin modificar el código existente. Cuando se crea un pedido, todos los observadores registrados son notificados automáticamente.

**Observadores implementados:**
- `EmailObserver`: Simula el envío de emails de confirmación
- `LogObserver`: Registra información del pedido en logs

**Ventajas:**
- Desacoplamiento entre el sujeto y los observadores
- Fácil extensión agregando nuevos observadores
- Principio de responsabilidad única
- Comunicación uno-a-muchos

## Estructura del Proyecto

```
proyecto-patrones-diseno/
├── public/
│   ├── config/
│   │   └── AppConfig.js          # Singleton
│   ├── order/
│   │   ├── Order.js              # Entidad Pedido
│   │   └── OrderBuilder.js       # Builder
│   ├── notifications/
│   │   ├── OrderSubject.js       # Subject (Observer)
│   │   └── observers/
│   │       ├── EmailObserver.js  # Observer concreto
│   │       └── LogObserver.js    # Observer concreto
│   ├── index.html                # Página principal HTML
│   └── 404.html                  # Página de error
├── index.js                       # Punto de entrada
├── package.json
└── README.md
```

## Pruebas

1. Inicia el servidor: `npm start`
2. Abre `http://localhost:8080` en el navegador
3. Prueba `GET /api/config` para ver el Singleton en acción
4. Prueba `POST /api/orders/create-demo` para crear un pedido de demostración
5. Revisa la consola para ver las notificaciones de los observadores

## Notas

- Los observadores se ejecutan automáticamente cuando se crea un pedido
- El Builder valida que el pedido tenga todos los campos requeridos antes de construirlo
- El Singleton garantiza que siempre se use la misma instancia de configuración

## Autor

- Sergio Fabián Hernández Vivas - sefhv95@gmail.com
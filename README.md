# 🧾 Sistema de Consulta de Contribuyentes DGII

Aplicación completa (Full Stack) para la consulta de contribuyentes (RNC/Cédula) en República Dominicana, compuesta por una API en .NET y un frontend en React.

---

## 🚀 Características principales

* 🔍 Consulta de contribuyentes (RNC/Cédula)
* 🔐 Autenticación con JWT
* 🌐 API REST estructurada en capas
* 💻 Interfaz web en React
* 🗄️ Manejo de base de datos con SQL Server

---

## 🧱 Arquitectura del proyecto

El backend está organizado siguiendo buenas prácticas de arquitectura en capas:

* **Application** → lógica de negocio
* **Domain** → entidades del sistema
* **Persistence** → acceso a datos
* **Identity** → autenticación (JWT)
* **WebApi** → endpoints de la API

---

## 🛠️ Tecnologías utilizadas

### Backend

* C#
* ASP.NET Core
* SQL Server
* JWT Authentication

### Frontend

* React
* Vite
* JavaScript

---

## 📂 Estructura del proyecto

```
api_contribuyentes_
│
├── dgii_api_contribuyentes/
│   ├── Application/
│   ├── Domain/
│   ├── Persistence/
│   ├── Identity/
│   └── WebApi2/
│
├── frontend/react_frontend/
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Instalación y ejecución

### 🔹 Backend (.NET)

```bash
cd dgii_api_contribuyentes
dotnet run
```

---

### 🔹 Frontend (React)

```bash
cd frontend/react_frontend_1.2
npm install
npm run dev
```

---

## 📌 Endpoints de la API

### 🔐 Autenticación

```http
POST /api/auth/login
POST /api/auth/register
```

---

### 👤 Usuarios

```http
GET    /api/usuarios
GET    /api/usuarios/{id}
POST   /api/usuarios
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

---

### 🛡️ Roles de Usuario

```http
GET    /api/roles_usuario
POST   /api/roles_usuario
```

---

### 🧾 Contribuyentes

```http
GET    /api/contribuyentes
GET    /api/contribuyentes/{rnc}
POST   /api/contribuyentes
```

---

### 📄 Comprobantes Fiscales

```http
GET    /api/comprobantesfiscales
POST   /api/comprobantesfiscales
```

---

### 🏷️ Tipos de Contribuyente

```http
GET    /api/tiposcontribuyente
POST   /api/tiposcontribuyente
```


---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado para:

* ✔️ Practicar arquitectura en capas
* ✔️ Implementar autenticación con JWT
* ✔️ Integrar frontend y backend
* ✔️ Aplicar buenas prácticas de desarrollo

---

## 📈 Posibles mejoras

* 🚀 Despliegue en la nube (Azure / Render)
* 📄 Documentación con Swagger
* 🔐 Mejoras en seguridad
* 🧪 Pruebas unitarias

---

## 👨‍💻 Autor

**Víctor Eulogio Galvez Faña**

📍 Santo Domingo, República Dominicana
📧 [galvezfanavictor@gmail.com](mailto:galvezfanavictor@gmail.com)
🔗 LinkedIn: https://www.linkedin.com/in/victor-eulogio-galvez-faña-b61b6229a

---

## ⭐ Nota

Proyecto desarrollado con fines educativos.


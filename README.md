# Trabajo Práctico Final - Backend (Plataforma de Crowdfunding)

Plataforma de financiamiento colectivo local para proyectos de emprendedores, donde empresas o el municipio pueden aportar fondos.

---

## Instalación

git clone https://github.com/tuusuario/impulso-local-backend.git
cd tp-final-backend
npm install
cp .env.example .env
npm run dev

## Endpoints Principales

# Auth

| Método | Ruta           | Descripción         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Registro de usuario |
| POST   | /auth/login    | Inicio de sesión    |

# Projects

| Método | Ruta      | Descripción      | Rol         |
| ------ | --------- | ---------------- | ----------- |
| POST   | /projects | Crear proyecto   | Emprendedor |
| GET    | /projects | Listar proyectos | Público     |

# Funding

| Método | Ruta                 | Descripción        | Rol                     |
| ------ | -------------------- | ------------------ | ----------------------- |
| POST   | /fundings            | Financiar proyecto | Empresa / Municipalidad |
| GET    | /fundings/:projectId | Ver aportes        | Público                 |

## Servidor Socket

El socket lo unico que hacer es emitir un evento funding:created cuando se crear un nuevo financiamiento

{
  "message": "Nuevo financiamiento creado",
}

## Arquitectura del proyecto

ORM: Sequelize (MySQL)

Autenticación: JWT + Passport

Validaciones: Joi

WebSockets: Socket.IO

Estructura por módulos: Users, Projects, Fundings
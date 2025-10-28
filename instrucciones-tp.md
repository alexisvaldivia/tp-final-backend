# Proyecto Final — Requisitos

A continuación se describen los requisitos obligatorios que debe cumplir el proyecto. Su objetivo es garantizar una estructura, validación, persistencia y seguridad adecuadas.

## 1. Estructura del proyecto

- Backend modular organizado por capas: controllers, routes, DTOs, entidades, servicios, middlewares, etc.
- Mantener una organización clara y consistente entre módulos. La estructura indicada es obligatoria.

## 2. Base de datos

- Uso obligatorio de un ORM (TypeORM, Prisma o Mongoose).
- Debe demostrarse manejo de migraciones, modelos/entidades y consultas mediante el ORM elegido.

## 3. Validaciones

- Definir DTOs para las entidades.
- Validar DTOs en creación y actualización usando Joi u otra librería equivalente.
- Validaciones claras y mensajes de error útiles para el cliente.

## 4. Autenticación

- Autenticación basada en JWT y Passport (obligatorio).
- Endpoints privados deben requerir autenticación; endpoints públicos no.
- Manejar expiración y errores de token de forma explícita.

## 5. Comunicación en tiempo real

- Implementar WebSockets con Socket.IO.
- Documentar el caso de uso elegido (ej.: chat, notificaciones, actualizaciones en tiempo real).
- Asegurar manejo correcto de conexiones, reconexiones y autorización si aplica.

## 6. Configuración y seguridad

- Validar variables de entorno con Joi (obligatorio).
- No exponer credenciales ni secretos en el repositorio.
- Incluir `.env` en `.gitignore` y proveer `.env.example` con valores de ejemplo.

## 7. Documentación

- Documentar la API y arquitectura con:
  - Diagramas: clases, casos de uso, secuencia y modelo entidad–relación (MER).
  - README.md con instrucciones de instalación, ejecución y uso.
- La documentación debe ser completa y entregada junto con el proyecto.

---

## Notas finales

- El cumplimiento de estos requisitos es obligatorio para aprobar.
- Se permiten funcionalidades adicionales siempre que no comprometan los mínimos exigidos.

## Checklist de entrega (sugerido)

- [x] Estructura modular y completa
- [x] ORM configurado y funcionando
- [x] DTOs y validaciones aplicadas
- [x] Autenticación JWT con Passport
- [x] Socket.IO implementado y documentado
- [x] Variables de entorno validadas y `.env` en `.gitignore`
- [ ] Diagramas y README incluidos



## Descripción
API con autenticación JWT, rate limiting, logging y documentación Swagger.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- JWT
- Swagger UI
- Nodemailer (para verificación de email)

## Instalación
1. Clonar repositorio
2. `npm install`
3. Crear archivo `.env` con las variables:
4. `npm start`

## Endpoints

### POST /api/auth/register
Registra un nuevo usuario.
- **Body**: `{ "name": "Juan", "email": "juan@mail.com", "password": "123456" }`
- **Respuesta 201**: `{ "message": "...", "token": "...", "user": {...} }`
- **Errores**: 400 (email ya registrado), 500.

### POST /api/auth/login
Inicia sesión (requiere email verificado).
- **Body**: `{ "email": "...", "password": "..." }`
- **Respuesta 200**: `{ "message": "...", "token": "...", "user": {...} }`
- **Errores**: 401 (email no verificado o credenciales inválidas).

### GET /api/profile
Obtiene el perfil del usuario autenticado.
- **Header**: `Authorization: Bearer <token>`
- **Respuesta 200**: `{ "success": true, "user": {...} }`
- **Errores**: 401 (token inválido), 429 (rate limit).

## Rate Limiting
Cada usuario puede hacer 100 peticiones por hora a rutas protegidas. Al exceder, recibe 429.

## CORS
- **Whitelist**: `http://localhost:3000`, `http://localhost:3001`, `https://...vercel.app`
- **Blacklist**: `google.com`, `facebook.com`

## Logging
Todas las peticiones a rutas protegidas se registran en MongoDB (colección `logs`), excepto `/login` y `/register`.

## Documentación Swagger
Accede a `https://tu-api.vercel.app/api-docs`

## Enlaces
- Repositorio: https://github.com/SofiaSoraire/TP-integrador-del-modulo-5--api-segura
- API desplegada: https://tp-integrador-del-modulo-5-api-segu.vercel.app/


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
- **URL**: `http://localhost:3001/api/auth/register`
- **Método**: `POST`
- **Body**: `{ "name": "Juan", "email": "juan@mail.com", "password": "123456" }`
- **Respuesta 201**: `{ "message": "...", "token": "...", "user": {...} }`
- **Errores**: 400 (email ya registrado), 500(Error interno).


### POST /api/auth/login
Inicia sesión (requiere email verificado).
-**URL**: `http://localhost:3001/api/auth/login`
- **Método**: `POST`
- **Body**: `{"email": "juan@mail.com", "password": "123456" }`
- **Body**: `{ "email": "...", "password": "..." }`
- **Respuesta 200**: `{ "message": "...", "token": "...", "user": {...} }`
- **Errores**: 401 (credenciales inválidas).


## Rate Limiting
Cada usuario puede hacer 100 peticiones por hora a rutas protegidas. Al exceder, recibe 429.

## CORS
- **Whitelist**: `http://localhost:3000`, `http://localhost:3001`, `https://...vercel.app`
- **Blacklist**: `google.com`, `facebook.com`

## Logging
Todas las peticiones a rutas protegidas se registran en MongoDB (colección `logs`), excepto `/login` y `/register`.

## Documentación Swagger
Accede a `https://tp-integrador-del-modulo-5-api-segura.vercel.app/api-docs`

## Enlaces
- Repositorio: https://github.com/SofiaSoraire/TP-integrador-del-modulo-5--api-segura
- API desplegada: https://tp-integrador-del-modulo-5-api-segu.vercel.app/
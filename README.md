# API de Gestión de Expedientes e Indicios

API RESTful desarrollada con TypeScript, Express y SQL Server para la gestión de expedientes e indicios con sistema de roles y autenticación JWT.
_____________________________________________________________
## Características

- **Autenticación JWT** con roles (Técnico/Coordinador)  
- **CRUD Completo** de expedientes e indicios  
- **Validaciones** con Zod  
- **Stored Procedures** en SQL Server  
- **Documentación Interactiva** con Swagger  
- **Seguridad** (Helmet, rate limiting, CORS)  
- **Manejo de errores** centralizado  
- **Variables de entorno** configurables  
_____________________________________________________________
## Requisitos Previos

- Node.js 18+
- SQL Server 2012+
- npm o yarn
_____________________________________________________________
## Instalación

**1. Clonar el repositorio:**  

git clone <tu-repositorio>  
cd mi-api-expedientes  
_____________________________________________________________
**2. Instalar dependencias:**  

npm install  
_____________________________________________________________
**3. Configurar variables de entorno:**  
  
cp .env.example .env  
  
*Editar .env con tus credenciales:*  
NODE_ENV=development  
PORT=3000  
  
DB_SERVER=localhost\\SQLEXPRESS  
DB_NAME=ExpedientesDB  
DB_USER=sa  
DB_PASSWORD=TuPassword  
DB_ENCRYPT=false  
  
JWT_SECRET=mi_clave_super_secreta_jwt  
JWT_EXPIRES_IN=1d  
_____________________________________________________________
**4. Configurar la base de datos:**

#Ejecutar scripts SQL manualmente en SSMS o Azure Data Studio:
1. scripts/schema.sql
2. scripts/seed.sql (¡generar hashes bcrypt válidos!)
_____________________________________________________________
  **Uso**  
*Desarrollo:*  
npm run dev  
  
*Producción:*  
npm run build  
npm start  
_____________________________________________________________
  **URLs importantes:**

API: http://localhost:3000  
Documentación: http://localhost:3000/docs  
Health Check: http://localhost:3000/health  
_____________________________________________________________
  **Usuarios Semilla**
  
*Técnico:*  
Usuario: tecnico1  
Contraseña: password123  
Rol: tecnico  
_____________________________________________________________

*Coordinador:*  
Usuario: coord1  
Contraseña: password123  
Rol: coordinador  
_____________________________________________________________
**Ejemplos de Uso**

*1. Login*  
curl -X POST http://localhost:3000/auth/login \  
  -H "Content-Type: application/json" \  
  -d '{"username":"tecnico1","password":"password123"}'  
  
*2. Crear Expediente (como técnico)*  
curl -X POST http://localhost:3000/expedientes \  
  -H "Authorization: Bearer <tu_token_generado>" \  
  -H "Content-Type: application/json" \  
  -d '{"codigo":"EXP-001","descripcion":"Expediente de prueba"}'  
  
*3. Listar Expedientes*  
curl -X GET http://localhost:3000/expedientes \  
  -H "Authorization: Bearer <tu_token_generado>"  

*4. Aprobar Expediente (como coordinador)*  
curl -X PATCH http://localhost:3000/expedientes/1/estado \  
  -H "Authorization: Bearer <tu_token_generado>" \  
  -H "Content-Type: application/json" \  
  -d '{"estado":"aprobado","justificacion":"Cumple requisitos"}'  

_____________________________________________________________
  **Estructura de Base de Datos**
*Tablas principales:*  

Usuarios - Usuarios del sistema con roles  
Expedientes - Expedientes con estados (pendiente/aprobado/rechazado)  
Indicios - Indicios asociados a expedientes  
  
*Stored Procedures implementados:*  

sp_Usuarios_Login - Autenticación de usuarios  
sp_Expedientes_Listar - Listado con paginación  
sp_Expedientes_Crear - Creación de expedientes  
sp_Indicios_Crear - Creación de indicios  
Y 8+ procedimientos más...
_____________________________________________________________
**Seguridad**  
  
JWT con expiración configurable  
BCrypt para hash de contraseñas  
Helmet para seguridad de headers  
Rate limiting (100 requests/minuto)  
CORS configurado  
Validaciones en front (Zod) y back (SQL constraints)  
_____________________________________________________________
## Testing
 *Próximamente...*  
npm test  
_____________________________________________________________
## Scripts Disponibles  
npm run dev      # Desarrollo con hot-reload  
npm run build    # Compilar TypeScript  
npm run start    # Producción  
npm run lint     # Linting  
npm run format   # Formateo de código  
_____________________________________________________________
## Contribución  
  
Fork el proyecto  
Crear feature branch (git checkout -b feature/AmazingFeature)  
Commit cambios (git commit -m 'Add AmazingFeature')  
Push al branch (git push origin feature/AmazingFeature)  
Abrir Pull Request  
_____________________________________________________________
## Licencia  
Este proyecto está bajo la Licencia MIT. Ver LICENSE para más detalles.  
_____________________________________________________________
## Soporte
Si encuentras issues:
Revisar la documentación en /docs
Verificar logs del servidor
Revisar configuración de BD en .env
_____________________________________________________________
## Autor

Javier Rivera
Contacto: joselurip1031@gmail.com
GitHub: Javiii3er


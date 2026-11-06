# Configuración institucional

## Antes de publicar

La planilla `BASE DE DATOS-ACTAS 2026` ya posee las hojas `ACTAS` y `USUARIOS`, con encabezados y datos. Este sistema **no las modifica, no las lee como fuente de permisos y no importa sus usuarios automáticamente**. Conservá ambas como están.

Creá manualmente tres hojas nuevas en la misma planilla, con estos nombres exactos y la primera fila indicada. Compartí la planilla con el correo de la cuenta de servicio como editor.

| Hoja | Primera fila |
| --- | --- |
| `Accesos` | `email, role, active, updatedAt, updatedBy` |
| `Estudiantes` | `recordId, revisionId, previousRevisionId, version, status, createdAt, createdBy, updatedAt, updatedBy, fechaHecho, curso, estudiante, mailTutor, motivo, hechos, intervenciones, acuerdos` |
| `Docentes` | `recordId, revisionId, previousRevisionId, version, status, createdAt, createdBy, updatedAt, updatedBy, fecha, tema, participantes, descripcion, acuerdos, responsable` |

Agregá manualmente el primer administrador en `Accesos`, por ejemplo: `nombre@escuelasproa.edu.ar,admin,true,2026-11-06T00:00:00.000Z,configuracion-inicial`. No habilites a todas las personas del dominio de forma automática.

## Google

1. En Google Cloud creá un cliente OAuth web y agregá la URL final de GitHub Pages como origen JavaScript autorizado.
2. Creá una cuenta de servicio y descargá sus datos. No subas el archivo JSON al repositorio.
3. En Cloudflare Workers cargá como secretos `GOOGLE_CLIENT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `SPREADSHEET_ID` y `ALLOWED_ORIGIN` (la URL exacta de Pages).
4. Editá `assets/config.js` con el ID de cliente y la URL del Worker. El archivo se carga explícitamente antes de la aplicación y debe contener solo valores públicos; las claves solo existen en Workers.

La verificación acepta únicamente tokens firmados para el cliente configurado, emitidos por Google, con `email_verified=true` y `hd=escuelasproa.edu.ar`. El Worker revisa `Accesos` en cada solicitud.

## Publicación

1. Creá el repositorio y subí los archivos. Habilitá GitHub Pages con GitHub Actions. El flujo `.github/workflows/pages.yml` publicará la interfaz al hacer push a `main`.
2. Copiá `worker/wrangler.toml.example` como `worker/wrangler.toml`, instalá las dependencias de `worker/` y ejecutá `npx wrangler deploy` después de cargar los secretos.
3. Actualizá `ALLOWED_ORIGIN` y el origen OAuth si cambia la URL pública.

No se incluyó un despliegue automático del Worker porque requiere iniciar sesión en Cloudflare y cargar secretos institucionales.

## Operación y recuperación

Cada edición agrega una fila: las actas no se sobrescriben. La aplicación muestra la versión de mayor número; un administrador puede archivar y el historial permanece en Sheets. Como Google Sheets no ofrece bloqueo transaccional entre lectura y escritura, la app detecta cambios con `baseRevisionId`; dos guardados simultáneos muy cercanos aún deben resolverse revisando el historial.

Exportá periódicamente las tres hojas nuevas desde Google Sheets y restringí quién tiene acceso a ellas. Si hace falta recuperar una acta, buscá `recordId` y restaurá su contenido creando una nueva revisión, nunca borrando filas.

El dictado depende del navegador y puede transmitir audio a su proveedor. La transcripción y los campos propuestos se deben revisar antes de guardar. El borrador de Gmail incluye información del acta en la URL de redacción: verificá el texto antes de abrirlo y evitá información innecesaria.

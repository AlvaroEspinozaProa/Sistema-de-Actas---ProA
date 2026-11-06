# Sistema de Actas · ProA

PWA para registrar y consultar actas estudiantiles y reuniones docentes. La interfaz se publica con GitHub Pages; el acceso y los datos quedan detrás de un Cloudflare Worker que usa Google Sheets.

## Desarrollo

La interfaz no necesita compilación: servila desde la raíz con cualquier servidor estático. Antes de probar el inicio de sesión, definí `PROA_GOOGLE_CLIENT_ID` y `PROA_API_URL` en una pequeña configuración local que no se suba al repositorio, o reemplazá temporalmente sus valores en `assets/auth.js` y `assets/api.js`.

El Worker se configura y despliega desde `worker/`; consultá [Configuración](docs/CONFIGURACION.md). Ejecutá `npm test` y `npm run check` desde la raíz. Para el Worker: `cd worker`, `npm install`, `npx wrangler dev`.

Las actas son información sensible. No incluyas claves, datos reales de estudiantes ni exportaciones de la planilla en este repositorio.

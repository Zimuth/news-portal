# News Portal

Aplicación de noticias con Flat CMS (JSON) desarrollada en Node/Express (backend) y React/Vite/Tailwind (frontend).

# Demo
https://news-portalsss.onrender.com

## Construcción y ejecución local

```bash
# instalar dependencias en la raíz y en el cliente
cd news-portal
npm install
cd client && npm install

# compilar frontend
npm run build --prefix client

# iniciar servidor
npm start
```

El backend escucha en el puerto 5000 y sirve la carpeta `client/dist`.
Los datos se almacenan en `data/news.json`.

-----------

## Cambios recientes

- `useEffect` refactorizados para evitar warnings de React
- `image` es ahora opcional al crear/editar noticias (campo no "required")
- Validación mínima de título/contenido en el API
- Conversión de operaciones de fichero a `fs.promises` para evitar bloqueo
- Proxy configurado en `vite.config.js` para desarrollo (`/api` → `http://localhost:5000`)
- Eliminado `fs-extra` de dependencias
- Ruta de SPA convertida a middleware para compatibilidad con Express 5

### Placeholder de imagen
Si un elemento no tiene URL de imagen se muestra un placeholder desde `https://via.placeholder.com/400x200?text=Sin+imagen`.

-----------

## Despliegue en producción

Hay dos enfoques sencillos:

### 1. Plataforma de contenedores (Render, Railway, Heroku, Fly.io, etc.)
1. Empuja tu repo a GitHub.
2. Selecciona la opción "Deploy from GitHub" en el servicio.
3. Configura *build command*: `npm run build` (usa el script de la raíz que construye el cliente).
4. Configura *start command*: `npm start`.
5. Asegúrate de tener `NODE_ENV=production` y opcionalmente `PORT` en las variables de entorno.
6. El servicio construirá la imagen usando el `Dockerfile` incluido si eliges despliegue por contenedor.

> El `Dockerfile` multi-stage ya prepara tanto la compilación del frontend como la instalación de dependencias de producción.

### 2. Despliegue manual en un VPS/servidor
```bash
# compilar localmente
npm run build
# copiar todo al servidor
scp -r . user@servidor:/ruta
# en el servidor:
cd /ruta/news-portal
npm install --production
NODE_ENV=production PORT=5000 node server.js
```

El proyecto no utiliza base de datos externa; el archivo `data/news.json` debe estar disponible en la máquina.

> ⚠️ Si escalas a múltiples instancias, considera usar una base de datos real o almacenamiento compartido porque `news.json` no se sincroniza.

-----------

## Notas de producción
- Asegura el endpoint `/api/news` si se usa en un entorno real.
- La variable `PORT` puede ajustarse según el host.
- Para manejar tráfico concurrente, podrías migrar a una DB o añadir un mecanismo de bloqueo en las operaciones de archivo.

¡Listo para llevar a producción!

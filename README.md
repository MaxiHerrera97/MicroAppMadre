# 🌷 Feliz Día, Mamá

Página web interactiva de regalo para el Día de la Madre. La mamá escanea un QR, abre el link en el celular y vive la experiencia: riega una flor, descubre fotos, tarjetas, recuerdos, cartas y un ramo final.

Hecha con React + Vite, Tailwind CSS v4, Framer Motion y canvas-confetti. Sitio estático, sin backend.

## 1. Cambiar el contenido

Todo se edita en **`src/config.js`** (no hace falta tocar los componentes):

| Campo | Qué es |
| --- | --- |
| `nombreMama`, `comoLeDicen` | Nombre y cómo le dicen ("Mamá", "Ma", "Mami") |
| `remitentes` | Quiénes la regalan |
| `toquesRiego`, `textoInicio` | Toques para que florezca y texto de la primera pantalla |
| `cancion` | Ruta del mp3 |
| `fotosPortada` | 3 fotos de la portada |
| `gracias` | 6 motivos para las tarjetas |
| `lineaDeTiempo` | 4 a 6 `{ foto, anio, texto }` |
| `recuerdos` | 8 a 12 frases para el frasco |
| `cartas` | `{ de, mensaje }` por cada hijo/nieto (párrafos separados por `\n\n`) |
| `mensajeFinal` | Mensaje del final |
| `colores` | `primario`, `secundario`, `acento`, `fondo` |
| `og` | Descripción e imagen para la vista previa en WhatsApp |

## 2. Fotos y canción

Copia los archivos a **`public/media/`** y usa rutas que empiecen con `/media/`:

```js
cancion: '/media/cancion.mp3',
fotosPortada: ['/media/portada-1.jpg', '/media/portada-2.jpg', '/media/portada-3.jpg'],
```

- Ahora mismo se usan fotos de ejemplo (picsum.photos) y la canción **no está incluida**: agrega `public/media/cancion.mp3`.
- Comprime las fotos (unos 1200 px de lado como máximo) para que cargue rápido.
- Para WhatsApp, `og.imagen` debe ser una URL **absoluta**, por ejemplo `https://tu-proyecto.vercel.app/media/og.jpg` (1200×630).

## 3. Correrlo en local

```bash
npm install
npm run dev       # abre http://localhost:5173
```

Para probarlo en el celular (misma red Wi‑Fi): `npm run dev -- --host` y abre la URL "Network" que aparece.

Compilar y previsualizar la versión final:

```bash
npm run build
npm run preview
```

## 4. Subirlo a GitHub y Vercel

1. Crea un repositorio **nuevo y vacío** en GitHub (puede ser privado).
2. En esta carpeta:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa el repo. Vercel detecta Vite solo (build `npm run build`, salida `dist`). Pulsa **Deploy**.
4. Cada `git push` a `main` vuelve a publicar automáticamente.

`vercel.json` redirige todas las rutas a `index.html`. La página tiene `noindex` para que no aparezca en buscadores.

## 5. Generar el QR

Con la URL final (ej: `https://feliz-dia-rosa.vercel.app`):

- Online: cualquier generador de QR gratuito (ej. qr-code-generator.com, o en Chrome: menú *Compartir → Crear código QR*).
- Desde la terminal:
  ```bash
  npx qrcode -o qr.png "https://feliz-dia-rosa.vercel.app"
  ```

Imprímelo en una tarjeta 🌸. Antes de regalarlo, ábrelo en un celular para comprobar que la música suena tras el primer toque.

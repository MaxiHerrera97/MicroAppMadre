import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from './src/config.js'

const escapar = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Reemplaza {{clave}} en index.html con datos de src/config.js (título, Open Graph...)
function datosEnHtml() {
  const datos = {
    nombreMama: config.nombreMama,
    descripcion: config.og.descripcion,
    ogImagen: config.og.imagen,
    colorFondo: config.colores.fondo,
  }
  return {
    name: 'datos-en-html',
    transformIndexHtml: (html) =>
      html.replace(/\{\{(\w+)\}\}/g, (marca, clave) => (clave in datos ? escapar(datos[clave]) : marca)),
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), datosEnHtml()],
  // Expone el servidor en la red local para poder abrirlo desde el celular
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})

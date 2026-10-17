import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { config } from './config.js'

// Aplica la paleta de config.js a las variables de color de Tailwind
const raiz = document.documentElement.style
raiz.setProperty('--color-rosa', config.colores.primario)
raiz.setProperty('--color-lavanda', config.colores.secundario)
raiz.setProperty('--color-salvia', config.colores.acento)
raiz.setProperty('--color-crema', config.colores.fondo)
document.title = `Feliz Día, ${config.nombreMama}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

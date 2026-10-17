import confetti from 'canvas-confetti'
import { config } from '../config'

const { primario, secundario, acento } = config.colores
const paleta = [primario, secundario, acento, '#ffffff', '#f7d6e0']
const base = { disableForReducedMotion: true, zIndex: 60 }
const ESCALA_FLOR = 2

let formas = null
function obtenerFormas() {
  if (!formas) {
    formas = {
      petalo: confetti.shapeFromPath({ path: 'M12 0 C20 7 20 17 12 24 C4 17 4 7 12 0 Z' }),
      flores: ['🌸', '🌷', '🌼', '💐'].map((text) => confetti.shapeFromText({ text, scalar: ESCALA_FLOR })),
    }
  }
  return formas
}

// Lluvia suave de pétalos y flores desde arriba durante `duracion` ms
export function lluviaDePetalos(duracion = 3000) {
  const { petalo, flores } = obtenerFormas()
  const fin = Date.now() + duracion
  const caida = { startVelocity: 2, gravity: 0.45, ticks: 420 }
  ;(function cuadro() {
    confetti({
      ...base,
      ...caida,
      particleCount: 2,
      shapes: [petalo],
      colors: paleta,
      scalar: 1.4,
      drift: Math.random() - 0.5,
      origin: { x: Math.random(), y: -0.05 },
    })
    if (Math.random() < 0.25) {
      confetti({
        ...base,
        ...caida,
        particleCount: 1,
        shapes: flores,
        scalar: ESCALA_FLOR,
        flat: true,
        drift: Math.random() - 0.5,
        origin: { x: Math.random(), y: -0.05 },
      })
    }
    if (Date.now() < fin) requestAnimationFrame(cuadro)
  })()
}

// Explosión de pétalos desde un punto (coordenadas 0–1 de la pantalla)
export function rafagaDePetalos(origin = { x: 0.5, y: 0.6 }) {
  const { petalo, flores } = obtenerFormas()
  confetti({ ...base, origin, particleCount: 70, spread: 110, startVelocity: 38, gravity: 0.7, ticks: 260, shapes: [petalo], colors: paleta, scalar: 1.4 })
  confetti({ ...base, origin, particleCount: 16, spread: 130, startVelocity: 32, gravity: 0.7, ticks: 260, shapes: flores, scalar: ESCALA_FLOR, flat: true })
}

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { config } from '../config'
import { barajar } from '../utils/texto'
import { Seccion, TituloSeccion } from './Seccion'

const { primario, secundario, acento } = config.colores
const COLORES_PAPEL = [primario, secundario, acento, '#f7e3a1']

// Posiciones fijas de los papelitos dentro del frasco (de abajo hacia arriba)
const PAPELES = Array.from({ length: 14 }, (_, i) => {
  const fila = Math.floor(i / 4)
  const col = i % 4
  return {
    x: 50 + col * 24 + (fila % 2) * 8,
    y: 208 - fila * 12,
    rot: ((i * 47) % 40) - 20,
    color: COLORES_PAPEL[(i + fila) % 4],
  }
})

const CUERPO = 'M62 50 Q40 60 38 90 L38 205 Q38 230 63 230 L137 230 Q162 230 162 205 L162 90 Q160 60 138 50 Z'

export default function MemoryJar() {
  const recuerdos = config.recuerdos
  const indices = recuerdos.map((_, i) => i)
  const [cola, setCola] = useState(() => barajar(indices))
  const [actual, setActual] = useState(null)
  const frasco = useAnimationControls()
  const ocupado = useRef(false)

  const visibles = Math.round((cola.length / Math.max(1, recuerdos.length)) * PAPELES.length)
  const vacio = cola.length === 0

  const sacar = async () => {
    if (ocupado.current || recuerdos.length === 0) return
    ocupado.current = true
    let q = cola
    if (q.length === 0) {
      // Ya salieron todos: se vuelven a guardar (sin repetir el último primero)
      q = barajar(indices, actual?.indice)
      setCola(q)
    }
    await frasco.start({ rotate: [0, -9, 9, -7, 7, -3, 0], transition: { duration: 0.65 } })
    setActual({ indice: q[0], clave: Date.now(), giro: Math.random() * 6 - 3, color: COLORES_PAPEL[q[0] % 4] })
    setCola(q.slice(1))
    ocupado.current = false
  }

  return (
    <Seccion id="recuerdos">
      <TituloSeccion antes="Guardados con cariño" sub="Toca el frasco para sacar un recuerdo">
        Frasco de recuerdos
      </TituloSeccion>

      <div className="flex flex-col items-center">
        <motion.button
          type="button"
          onClick={sacar}
          animate={frasco}
          whileTap={{ scale: 0.97 }}
          style={{ originX: 0.5, originY: 0.9 }}
          aria-label="Sacar un recuerdo del frasco"
          className="w-52 sm:w-60"
        >
          <svg viewBox="0 0 200 240" className="w-full drop-shadow-lg" aria-hidden="true">
            <path d={CUERPO} fill="rgba(215, 235, 240, 0.45)" />
            {PAPELES.slice(0, visibles).map((p, i) => (
              <rect
                key={i}
                x={p.x}
                y={p.y}
                width="24"
                height="12"
                rx="2"
                fill={p.color}
                stroke="rgba(0,0,0,.08)"
                transform={`rotate(${p.rot} ${p.x + 12} ${p.y + 6})`}
              />
            ))}
            <path d={CUERPO} fill="none" stroke="rgba(110, 145, 160, 0.65)" strokeWidth="3" />
            <path d="M52 92 Q50 140 52 200" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="6" strokeLinecap="round" />
            <path d="M62 36 L138 36 L138 50 L62 50 Z" fill="rgba(215, 235, 240, 0.6)" stroke="rgba(110,145,160,.65)" strokeWidth="2" />
            {/* Tapa de tela */}
            <path d="M50 22 Q100 4 150 22 L156 38 Q100 30 44 38 Z" fill={primario} stroke="rgba(120,30,60,.2)" strokeWidth="1.5" />
            <path d="M48 38 Q100 30 152 38" fill="none" stroke="#b2486a" strokeWidth="3" />
            {/* Etiqueta */}
            <rect x="66" y="100" width="68" height="28" rx="6" fill="#fffaf1" stroke="rgba(0,0,0,.1)" />
            <text x="100" y="120" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="17" fontWeight="700" fill="#4a3442">
              Recuerdos
            </text>
          </svg>
        </motion.button>

        <p className="mt-3 text-base font-semibold text-tinta/75" aria-live="polite">
          {actual
            ? `Recuerdo ${recuerdos.length - cola.length} de ${recuerdos.length}`
            : 'Toca el frasco 👆'}
        </p>

        <div className="mt-4 flex min-h-[190px] w-full items-start justify-center" style={{ perspective: 800 }}>
          <AnimatePresence mode="wait">
            {actual && (
              <motion.div
                key={actual.clave}
                initial={{ opacity: 0, y: -110, scale: 0.25, rotate: -15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: actual.giro }}
                exit={{ opacity: 0, y: 30, scale: 0.85, transition: { duration: 0.25 } }}
                transition={{ type: 'spring', stiffness: 150, damping: 16 }}
                className="w-full max-w-xs"
              >
                <motion.div
                  initial={{ rotateX: -90 }}
                  animate={{ rotateX: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                  style={{ originY: 0, backgroundColor: `color-mix(in srgb, ${actual.color} 45%, white)` }}
                  className="papelito rounded-sm px-5 py-6 text-center shadow-lg"
                >
                  <p className="font-manuscrita text-[1.75rem] leading-snug font-bold text-tinta">{recuerdos[actual.indice]}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {actual && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <button type="button" onClick={sacar} className="boton">
              {vacio ? 'Volver a empezar 🔄' : 'Sacar otro recuerdo ✨'}
            </button>
            {vacio && <p className="text-base text-tinta/75">¡Ya salieron todos los recuerdos! 💕</p>}
          </div>
        )}
      </div>
    </Seccion>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { config } from '../config'
import FallingPetals from './FallingPetals'
import { Margarita } from './Flores'
import { rafagaDePetalos } from '../utils/petals'

// brote → tallo → hojas → capullo → flor
const ALTURAS_TALLO = [22, 62, 98, 126, 138]
const BASE_TALLO = 222
const MENSAJES = ['Un pequeño brote 🌱', 'Está creciendo…', 'Le salen hojitas 🌿', '¡Un capullo! Sigue regando', '¡Floreció! 🌸']
const VERDE_TALLO = '#5f8a5a'

function etapaPara(toques, total) {
  if (toques >= total) return 4
  return Math.min(3, Math.floor((toques / total) * 4))
}

export default function WaterFlowerScreen({ onIniciarMusica, onCompleto }) {
  const total = Math.max(1, config.toquesRiego)
  const [toques, setToques] = useState(0)
  const [gotas, setGotas] = useState([])
  const regadera = useAnimationControls()
  const timers = useRef([])
  const completo = toques >= total
  const etapa = etapaPara(toques, total)
  const { primario, acento } = config.colores

  // Precarga las fotos de la portada mientras se riega la flor
  useEffect(() => {
    config.fotosPortada.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (!completo) return
    const t1 = setTimeout(() => rafagaDePetalos({ x: 0.5, y: 0.45 }), 450)
    const t2 = setTimeout(onCompleto, 3000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [completo, onCompleto])

  const regar = () => {
    if (completo) return
    // Debe ejecutarse dentro del toque: iOS/Chrome bloquean el autoplay sin interacción
    onIniciarMusica()
    setToques((t) => Math.min(total, t + 1))
    regadera.start({
      rotate: [0, -32, -32, 0],
      transition: { duration: 1, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' },
    })
    const id = Date.now()
    const nuevas = Array.from({ length: 5 }, (_, i) => ({ id: `${id}-${i}`, x: 57 + Math.random() * 8, retraso: 0.22 + i * 0.09 }))
    setGotas((g) => [...g, ...nuevas])
    timers.current.push(setTimeout(() => setGotas((g) => g.filter((d) => !nuevas.includes(d))), 1700))
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8 }}
      className="relative flex h-[100dvh] flex-col items-center justify-between overflow-hidden bg-linear-to-b from-crema via-rosa/25 to-lavanda/35 px-4 py-6 text-center"
    >
      <FallingPetals cantidad={10} conHojas />

      <header className="relative z-10 mt-[4dvh] max-w-sm">
        <motion.h1
          key={completo ? 'fin' : 'inicio'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-manuscrita text-4xl leading-tight font-bold text-rosa-oscuro sm:text-5xl"
        >
          {completo ? `¡Feliz Día, ${config.comoLeDicen}! 🌸` : config.textoInicio}
        </motion.h1>
      </header>

      <button
        type="button"
        onClick={regar}
        aria-label="Regar la flor"
        className="relative z-10 aspect-[300/380] h-[min(54dvh,400px)] max-w-full select-none"
      >
        {/* Planta en su maceta */}
        <svg viewBox="0 0 200 300" className="absolute bottom-0 left-1/2 w-[66%] -translate-x-1/2 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="brillo">
              <stop offset="0%" stopColor="#fff8d6" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffe9a8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path d="M48 237 L152 237 L140 296 Q139 300 135 300 L65 300 Q61 300 60 296 Z" fill="#cf7f62" />
          <ellipse cx="100" cy="216" rx="56" ry="7" fill="#6b4a3a" />

          <motion.line
            x1="100"
            x2="100"
            y2={BASE_TALLO}
            initial={false}
            animate={{ y1: BASE_TALLO - ALTURAS_TALLO[etapa] }}
            transition={{ type: 'spring', stiffness: 110, damping: 15 }}
            stroke={VERDE_TALLO}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {etapa >= 2 && (
            <g transform="translate(100 182)">
              <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ originX: 1, originY: 0.6 }} d="M0 0 C-10 -16 -30 -18 -42 -8 C-30 4 -12 6 0 0Z" fill={acento} />
              <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ originX: 0, originY: 0.6 }} d="M0 0 C10 -16 30 -18 42 -8 C30 4 12 6 0 0Z" fill={acento} />
            </g>
          )}
          {etapa >= 3 && (
            <g transform="translate(100 152) scale(0.75)">
              <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ originX: 1, originY: 0.6 }} d="M0 0 C-10 -16 -30 -18 -42 -8 C-30 4 -12 6 0 0Z" fill={acento} />
              <motion.path initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ originX: 0, originY: 0.6 }} d="M0 0 C10 -16 30 -18 42 -8 C30 4 12 6 0 0Z" fill={acento} />
            </g>
          )}

          {/* Punta del tallo: brote, capullo o flor */}
          <motion.g initial={false} animate={{ y: BASE_TALLO - ALTURAS_TALLO[etapa] }} transition={{ type: 'spring', stiffness: 110, damping: 15 }}>
            <g transform="translate(100 0)">
              {etapa <= 1 && (
                <g>
                  <path d="M0 2 C-6 -8 -16 -10 -22 -4 C-15 3 -6 4 0 2Z" fill={acento} />
                  <path d="M0 2 C6 -8 16 -10 22 -4 C15 3 6 4 0 2Z" fill={acento} />
                </g>
              )}
              {etapa === 3 && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 12 }}>
                  <path d="M0 -34 C12 -24 11 -6 0 0 C-11 -6 -12 -24 0 -34Z" fill={primario} stroke="rgba(120,30,60,.2)" />
                  <path d="M0 4 C-8 0 -10 -8 -8 -13 L0 -3 L8 -13 C10 -8 8 0 0 4Z" fill={VERDE_TALLO} />
                </motion.g>
              )}
              {etapa === 4 && (
                <>
                  <motion.circle
                    cx="0"
                    cy="-16"
                    r="62"
                    fill="url(#brillo)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1.1], opacity: [0, 1, 0.85] }}
                    transition={{ duration: 1.4 }}
                  />
                  <motion.g
                    initial={{ scale: 0, rotate: -70 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                  >
                    <Margarita x={0} y={-16} r={32} color={primario} petalos={10} />
                  </motion.g>
                </>
              )}
            </g>
          </motion.g>

          <rect x="40" y="215" width="120" height="22" rx="5" fill="#e09a7d" />
          <Margarita x={100} y={268} r={10} color="#fff" petalos={6} />
        </svg>

        {/* Regadera */}
        <motion.div
          className="absolute top-[6%] right-0 w-[38%]"
          animate={{ opacity: completo ? 0 : 1, x: completo ? 30 : 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div animate={regadera} style={{ originX: 0.7, originY: 0.6 }}>
            <Regadera />
          </motion.div>
        </motion.div>

        {gotas.map((g) => (
          <motion.span
            key={g.id}
            className="gota absolute"
            style={{ left: `${g.x}%` }}
            initial={{ top: '25%', opacity: 0 }}
            animate={{ top: '76%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.75, delay: g.retraso, ease: 'easeIn' }}
          />
        ))}
      </button>

      <div className="relative z-10 mb-[3dvh] flex flex-col items-center gap-2">
        <div className="flex max-w-xs flex-wrap justify-center gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <svg key={i} viewBox="0 0 20 26" className="h-6 w-5">
              <path
                d="M10 1 C14 8 18 12 18 17 A8 8 0 0 1 2 17 C2 12 6 8 10 1Z"
                fill={i < toques ? '#7fb8dd' : 'rgba(255,255,255,.7)'}
                stroke="#7fb8dd"
                strokeWidth="1.5"
              />
            </svg>
          ))}
        </div>
        <p className="text-xl font-extrabold text-tinta" aria-live="polite">
          {toques}/{total}
        </p>
        <p className={`text-lg text-tinta/85 ${toques === 0 ? 'respirar' : ''}`}>
          {completo ? 'Tu sorpresa se está abriendo…' : toques === 0 ? 'Toca la maceta para regarla 💧' : MENSAJES[etapa]}
        </p>
      </div>
    </motion.div>
  )
}

function Regadera() {
  const borde = '#8f7bb8'
  return (
    <svg viewBox="0 0 120 100" className="w-full drop-shadow-md">
      <path d="M74 38 C74 8 112 8 110 44" fill="none" stroke={borde} strokeWidth="7" strokeLinecap="round" />
      <path d="M44 60 L10 30" stroke={borde} strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="8" cy="29" rx="8" ry="4.5" transform="rotate(-50 8 29)" fill="#7a66a6" />
      <rect x="40" y="36" width="70" height="54" rx="10" fill={config.colores.secundario} stroke={borde} strokeWidth="3" />
      <rect x="43" y="39" width="64" height="9" rx="4.5" fill="#fff" opacity="0.35" />
      <Margarita x={75} y={66} r={11} color="#fff" petalos={6} />
    </svg>
  )
}

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { config } from '../config'
import { Hoja, Margarita, Rosa, Tulipan } from './Flores'
import { lluviaDePetalos, rafagaDePetalos } from '../utils/petals'
import { unirNombres } from '../utils/texto'

const { primario, secundario, acento } = config.colores
const VERDE_TALLO = '#5f8a5a'
const UNION = { x: 150, y: 300 } // donde se juntan los tallos

// En orden de aparición (las de atrás primero)
const FLORES = [
  { tipo: 'tulipan', x: 100, y: 72, r: 24, color: primario },
  { tipo: 'margarita', x: 204, y: 66, r: 24, color: secundario },
  { tipo: 'rosa', x: 150, y: 98, r: 34, color: primario },
  { tipo: 'margarita', x: 86, y: 140, r: 28, color: '#ffffff' },
  { tipo: 'tulipan', x: 214, y: 134, r: 28, color: secundario },
  { tipo: 'margarita', x: 150, y: 170, r: 24, color: '#f7e3a1' },
  { tipo: 'rosa', x: 62, y: 200, r: 24, color: secundario },
  { tipo: 'rosa', x: 238, y: 196, r: 24, color: '#f9d0dc' },
]
const HOJAS = [
  { x: 74, y: 172, angulo: 200, largo: 34 },
  { x: 226, y: 166, angulo: -20, largo: 34 },
  { x: 120, y: 214, angulo: 215, largo: 28 },
  { x: 182, y: 214, angulo: -35, largo: 28 },
]
const COMPONENTES = { margarita: Margarita, rosa: Rosa, tulipan: Tulipan }

const varEnvoltorio = { oculto: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const varTallo = {
  oculto: { pathLength: 0 },
  visible: (i) => ({ pathLength: 1, transition: { delay: 0.3 + i * 0.1, duration: 0.8 } }),
}
const varHoja = {
  oculto: { scale: 0, opacity: 0 },
  visible: (i) => ({ scale: 1, opacity: 1, transition: { delay: 0.9 + i * 0.1, duration: 0.4 } }),
}
const varFlor = {
  oculto: { scale: 0, opacity: 0, rotate: -40 },
  visible: (i) => ({ scale: 1, opacity: 1, rotate: 0, transition: { delay: 1.2 + i * 0.3, type: 'spring', stiffness: 200, damping: 12 } }),
}
const DURACION_RAMO = 1200 + FLORES.length * 300 + 400

function Ramo({ armado }) {
  return (
    <motion.svg viewBox="0 0 300 370" className="mx-auto w-full max-w-[320px]" initial="oculto" animate={armado ? 'visible' : 'oculto'} aria-hidden="true">
      {/* Papel de atrás */}
      <motion.path variants={varEnvoltorio} d="M56 222 L244 222 L174 350 L126 350Z" fill={secundario} opacity="0.75" />

      {FLORES.map((f, i) => (
        <motion.path
          key={`t${i}`}
          variants={varTallo}
          custom={i}
          d={`M${f.x} ${f.y} Q${(f.x + UNION.x) / 2 + (f.x < UNION.x ? -12 : 12)} ${(f.y + UNION.y) / 2} ${UNION.x} ${UNION.y}`}
          fill="none"
          stroke={VERDE_TALLO}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {HOJAS.map((h, i) => (
        <motion.g key={`h${i}`} variants={varHoja} custom={i}>
          <Hoja {...h} color={acento} />
        </motion.g>
      ))}

      {FLORES.map((f, i) => {
        const Flor = COMPONENTES[f.tipo]
        return (
          <motion.g key={`f${i}`} variants={varFlor} custom={i}>
            <Flor x={f.x} y={f.y} r={f.r} color={f.color} />
          </motion.g>
        )
      })}

      {/* Envoltorio de papel y moño */}
      <motion.g variants={varEnvoltorio}>
        <path d="M78 230 L222 230 L168 352 L132 352Z" fill="#f6efe3" stroke="#e2d4bd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M78 230 L150 252 L222 230" fill="none" stroke="#e2d4bd" strokeWidth="2" />
        <path d="M112 236 L141 350 M188 236 L159 350" stroke="#ebdfcb" strokeWidth="2" />
        <g fill="#b2486a">
          <ellipse cx="134" cy="286" rx="16" ry="9" transform="rotate(-20 134 286)" />
          <ellipse cx="166" cy="286" rx="16" ry="9" transform="rotate(20 166 286)" />
          <path d="M146 292 L136 322 L144 318 L148 296Z M154 292 L164 322 L156 318 L152 296Z" />
          <circle cx="150" cy="289" r="7" fill="#c75a7c" />
        </g>
      </motion.g>
    </motion.svg>
  )
}

export default function FinalBouquet() {
  const ref = useRef(null)
  const enVista = useInView(ref, { once: true, amount: 0.4 })
  const [abrazos, setAbrazos] = useState(0)
  const [aviso, setAviso] = useState(false)
  const timerAviso = useRef()

  useEffect(() => {
    if (!enVista) return
    const t = setTimeout(() => lluviaDePetalos(4500), DURACION_RAMO)
    return () => clearTimeout(t)
  }, [enVista])

  useEffect(() => () => clearTimeout(timerAviso.current), [])

  const enviarAbrazo = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    rafagaDePetalos({ x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight })
    lluviaDePetalos(1800)
    setAbrazos((n) => n + 1)
    setAviso(true)
    clearTimeout(timerAviso.current)
    timerAviso.current = setTimeout(() => setAviso(false), 2800)
  }

  return (
    <section id="final" className="relative mx-auto w-full max-w-3xl px-4 pt-16 pb-32 text-center">
      <div ref={ref}>
        <Ramo armado={enVista} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mx-auto mt-8 max-w-xl font-titulo text-3xl leading-snug font-medium text-tinta italic sm:text-4xl"
      >
        {config.mensajeFinal}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="mt-5 font-manuscrita text-3xl font-bold text-rosa-oscuro"
      >
        Con amor, {unirNombres(config.remitentes)}
      </motion.p>

      <div className="mt-10 flex flex-col items-center">
        <button type="button" onClick={enviarAbrazo} className="boton px-9 py-4 text-xl">
          Enviar un abrazo 🤗
        </button>
        <div className="mt-4 h-16" aria-live="polite">
          <AnimatePresence>
            {aviso && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl bg-white/90 px-5 py-2 shadow-md"
              >
                <p className="text-xl font-extrabold text-rosa-oscuro">¡Abrazo enviado! 💞</p>
                {abrazos > 1 && <p className="text-base text-tinta/75">Ya van {abrazos} abrazos</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-10 text-base text-tinta/60">Hecho con 💗 por {unirNombres(config.remitentes)}</p>
    </section>
  )
}

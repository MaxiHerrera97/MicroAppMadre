import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../config'
import { FlorIcono } from './Flores'
import { Seccion, TituloSeccion } from './Seccion'

function Tarjeta({ texto, indice }) {
  const [volteada, setVolteada] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (indice % 2) * 0.12, duration: 0.5 }}
      className="h-56"
    >
      <button
        type="button"
        onClick={() => setVolteada((v) => !v)}
        aria-pressed={volteada}
        aria-label={volteada ? `Gracias ${texto}` : 'Gracias por… Toca para descubrir'}
        className="relative h-full w-full"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: volteada ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
        >
          <div className="cara absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-white bg-linear-to-br from-rosa/80 to-lavanda/70 p-3 shadow-md">
            <FlorIcono className="h-14 w-14" color="#fff" />
            <span className="font-manuscrita text-3xl font-bold text-tinta">Gracias por…</span>
          </div>
          <div
            className="cara absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-salvia bg-papel p-3 shadow-md"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <span className="font-manuscrita text-2xl text-rosa-oscuro">Gracias</span>
            <p className="text-lg leading-snug font-bold text-tinta">{texto}</p>
          </div>
        </motion.div>
      </button>
    </motion.li>
  )
}

export default function ThankYouCards() {
  return (
    <Seccion id="gracias">
      <TituloSeccion antes="Hoy y siempre" sub="Toca cada tarjeta 💐">
        Gracias por…
      </TituloSeccion>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {config.gracias.map((texto, i) => (
          <Tarjeta key={i} texto={texto} indice={i} />
        ))}
      </ul>
    </Seccion>
  )
}

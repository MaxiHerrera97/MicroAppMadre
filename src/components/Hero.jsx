import { motion } from 'framer-motion'
import { config } from '../config'
import FallingPetals from './FallingPetals'

const ROTACIONES = [-8, 2, 7]

export default function Hero() {
  const { comoLeDicen, nombreMama, fotosPortada } = config

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-14 pb-28 text-center">
      <div className="absolute inset-0 bg-linear-to-b from-rosa/40 via-crema/60 to-transparent" aria-hidden="true" />
      <FallingPetals cantidad={16} />

      <div className="relative z-10 flex w-full flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-manuscrita text-4xl font-bold text-rosa-oscuro sm:text-5xl"
        >
          Feliz Día,
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-titulo text-6xl leading-tight font-bold text-tinta sm:text-7xl"
        >
          {comoLeDicen}
        </motion.h1>
        {nombreMama !== comoLeDicen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-1 font-manuscrita text-3xl text-lavanda-oscuro sm:text-4xl"
          >
            — {nombreMama} —
          </motion.p>
        )}

        <div className="mt-12 flex w-full max-w-md items-start justify-center">
          {fotosPortada.slice(0, 3).map((src, i) => (
            <motion.figure
              key={src + i}
              initial={{ opacity: 0, y: 50, rotate: 0, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, rotate: ROTACIONES[i], scale: 1 }}
              transition={{ delay: 0.9 + i * 0.25, type: 'spring', stiffness: 90, damping: 14 }}
              className={`marco-vintage w-[34%] max-w-[170px] ${i === 1 ? 'z-10 -mx-3' : 'mt-9'}`}
            >
              <img
                src={src}
                alt={`Foto ${i + 1} de ${nombreMama}`}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
                fetchPriority={i === 1 ? 'high' : 'auto'}
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-tinta/75"
        aria-hidden="true"
      >
        <span className="text-base font-bold">Desliza hacia abajo</span>
        <motion.svg
          viewBox="0 0 24 24"
          className="mt-1 h-8 w-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <path d="M5 8 L12 15 L19 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}

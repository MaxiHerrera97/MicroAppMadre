import { motion } from 'framer-motion'
import { FlorIcono } from './Flores'

// Envoltorio de sección: aparece suavemente al entrar en pantalla
export function Seccion({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative mx-auto w-full max-w-3xl px-4 py-16 sm:py-20 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function TituloSeccion({ antes, children, sub }) {
  return (
    <header className="mb-9 text-center">
      {antes && <p className="font-manuscrita text-3xl text-rosa-oscuro">{antes}</p>}
      <h2 className="font-titulo text-4xl font-bold text-tinta sm:text-5xl">{children}</h2>
      <div className="mx-auto mt-3 flex w-44 items-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-rosa-oscuro/40" />
        <FlorIcono className="h-6 w-6" />
        <span className="h-px flex-1 bg-rosa-oscuro/40" />
      </div>
      {sub && <p className="mt-4 text-lg text-tinta/80">{sub}</p>}
    </header>
  )
}

import { motion } from 'framer-motion'

export default function MusicButton({ sonando, onAlternar }) {
  return (
    <motion.button
      type="button"
      onClick={onAlternar}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 15 }}
      aria-label={sonando ? 'Pausar la música' : 'Reanudar la música'}
      className="fixed right-4 z-50 grid h-15 w-15 place-items-center rounded-full bg-white/95 text-rosa-oscuro shadow-lg ring-2 ring-rosa backdrop-blur"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {sonando ? (
        <span className="flex h-6 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1].map((retraso, i) => (
            <span
              key={i}
              className="w-[4px] origin-bottom rounded-full bg-current"
              style={{ height: '100%', animation: `barra-musica 0.9s ease-in-out ${retraso}s infinite` }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path d="M8 5 L19 12 L8 19Z" fill="currentColor" />
        </svg>
      )}
    </motion.button>
  )
}

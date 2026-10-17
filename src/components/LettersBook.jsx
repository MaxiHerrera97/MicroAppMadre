import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'
import { FlorIcono } from './Flores'
import { Seccion, TituloSeccion } from './Seccion'

const variantes = {
  entra: (dir) => ({ x: dir >= 0 ? 120 : -120, opacity: 0, rotateY: dir >= 0 ? 25 : -25 }),
  centro: { x: 0, opacity: 1, rotateY: 0 },
  sale: (dir) => ({ x: dir >= 0 ? -120 : 120, opacity: 0, rotateY: dir >= 0 ? -25 : 25 }),
}

export default function LettersBook() {
  const { cartas, comoLeDicen } = config
  const [abierto, setAbierto] = useState(false)
  const [[pagina, dir], setPagina] = useState([0, 0])
  const carta = cartas[pagina]
  const varias = cartas.length > 1

  const ir = (paso) => {
    const siguiente = pagina + paso
    if (siguiente < 0 || siguiente >= cartas.length) return
    setPagina([siguiente, paso])
  }

  const finArrastre = (_, { offset, velocity }) => {
    if (offset.x < -60 || velocity.x < -400) ir(1)
    else if (offset.x > 60 || velocity.x > 400) ir(-1)
  }

  return (
    <Seccion id="cartas">
      <TituloSeccion antes="Palabras del corazón">Cartas para ti</TituloSeccion>

      <div style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait">
          {!abierto ? (
            <motion.button
              key="tapa"
              type="button"
              onClick={() => setAbierto(true)}
              initial={{ opacity: 0, rotateY: 0 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ rotateY: -110, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } }}
              whileTap={{ scale: 0.98 }}
              style={{ originX: 0 }}
              aria-label="Abrir el libro de cartas"
              className="relative mx-auto block aspect-[3/4] w-full max-w-[300px] rounded-l-md rounded-r-2xl bg-linear-to-br from-salvia-oscuro to-[#3e5a3c] p-5 shadow-2xl"
            >
              <span className="absolute inset-y-0 left-0 w-4 rounded-l-md bg-black/20" aria-hidden="true" />
              <span className="absolute inset-y-2 -right-1.5 w-2 rounded-r-sm bg-papel shadow-inner" aria-hidden="true" />
              <div className="ml-3 flex h-full flex-col items-center justify-center rounded-xl border-2 border-[#f3e3b5]/80 p-4 text-center">
                <FlorIcono className="h-20 w-20" />
                <p className="mt-4 font-titulo text-3xl leading-tight font-bold text-white">Cartas para {comoLeDicen}</p>
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-8 rounded-full bg-white/95 px-5 py-2 text-lg font-extrabold text-salvia-oscuro"
                >
                  Toca para abrir
                </motion.span>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="paginas"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full max-w-md"
            >
              <div style={{ perspective: 1200 }}>
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.article
                    key={pagina}
                    custom={dir}
                    variants={variantes}
                    initial="entra"
                    animate="centro"
                    exit="sale"
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    drag={varias ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={finArrastre}
                    className="papel-rayado relative min-h-[440px] rounded-lg py-8 pr-6 pl-12 shadow-xl select-none"
                  >
                    <p className="font-manuscrita text-3xl leading-[2.25rem] font-bold text-rosa-oscuro">Querida {comoLeDicen}:</p>
                    {carta.mensaje.split(/\n\s*\n/).map((parrafo, i) => (
                      <p key={i} className="mt-[1.125rem] font-manuscrita text-[1.6rem] leading-[2.25rem] text-tinta">
                        {parrafo}
                      </p>
                    ))}
                    <div className="mt-8 text-right">
                      <p className="font-manuscrita text-2xl text-tinta/80">Con todo mi amor,</p>
                      <p className="font-manuscrita text-4xl font-bold text-lavanda-oscuro">{carta.de}</p>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              {varias && (
                <>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <BotonFlecha onClick={() => ir(-1)} disabled={pagina === 0} etiqueta="Carta anterior" izquierda />
                    <div className="flex gap-2" aria-hidden="true">
                      {cartas.map((_, i) => (
                        <span key={i} className={`h-3 w-3 rounded-full transition-colors ${i === pagina ? 'bg-rosa-oscuro' : 'bg-rosa'}`} />
                      ))}
                    </div>
                    <BotonFlecha onClick={() => ir(1)} disabled={pagina === cartas.length - 1} etiqueta="Carta siguiente" />
                  </div>
                  <p className="mt-2 text-center text-base text-tinta/75" aria-live="polite">
                    Carta {pagina + 1} de {cartas.length} · desliza para pasar la página
                  </p>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setAbierto(false)
                  setPagina([0, 0])
                }}
                className="mx-auto mt-5 block text-lg font-bold text-lavanda-oscuro underline underline-offset-4"
              >
                Cerrar el libro
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Seccion>
  )
}

function BotonFlecha({ onClick, disabled, etiqueta, izquierda = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={etiqueta}
      className="grid h-13 w-13 place-items-center rounded-full bg-white text-rosa-oscuro shadow-md ring-1 ring-rosa transition-opacity disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path
          d={izquierda ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

import { motion } from 'framer-motion'
import { config } from '../config'
import { Seccion, TituloSeccion } from './Seccion'

export default function Timeline() {
  return (
    <Seccion id="historia">
      <TituloSeccion antes="Nuestra historia" sub="Momentos que llevamos en el corazón">
        Contigo en cada etapa
      </TituloSeccion>

      <ol className="relative space-y-10">
        <div
          className="absolute top-0 bottom-0 left-5 w-0.5 rounded-full bg-linear-to-b from-rosa via-lavanda to-salvia md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />
        {config.lineaDeTiempo.map((item, i) => {
          const derecha = i % 2 === 1
          return (
            <li key={i} className={`relative pl-12 md:w-1/2 md:pl-0 ${derecha ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
              <span
                className={`absolute top-7 left-[11px] h-5 w-5 rounded-full border-4 border-crema bg-rosa-oscuro shadow ${
                  derecha ? 'md:-left-2.5' : 'md:-right-2.5 md:left-auto'
                }`}
                aria-hidden="true"
              />
              <motion.article
                initial={{ opacity: 0, x: derecha ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="rounded-md bg-papel p-3 pb-4 shadow-lg ring-1 ring-black/5"
              >
                <img
                  src={item.foto}
                  alt={`Recuerdo de ${item.anio}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                  style={{ filter: 'sepia(.15)' }}
                />
                <p className="mt-3 font-titulo text-3xl font-bold text-rosa-oscuro">{item.anio}</p>
                <p className="mt-1 text-lg leading-relaxed text-tinta">{item.texto}</p>
              </motion.article>
            </li>
          )
        })}
      </ol>
    </Seccion>
  )
}

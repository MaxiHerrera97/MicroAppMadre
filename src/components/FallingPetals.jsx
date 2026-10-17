import { useMemo } from 'react'
import { config } from '../config'

// Pétalos (y opcionalmente hojas) cayendo de fondo, con CSS puro.
// Se ocultan si el usuario prefiere menos movimiento.
export default function FallingPetals({ cantidad = 14, conHojas = false, className = '' }) {
  const items = useMemo(() => {
    const { primario, secundario, acento } = config.colores
    const colores = [primario, secundario, '#f4c6d4', '#e4d9f3']
    return Array.from({ length: cantidad }, (_, i) => {
      const hoja = conHojas && i % 3 === 0
      return {
        id: i,
        hoja,
        color: hoja ? acento : colores[i % colores.length],
        izquierda: Math.random() * 100,
        tamano: 14 + Math.random() * 14,
        duracion: 10 + Math.random() * 9,
        retraso: -Math.random() * 19,
        mecer: 2.4 + Math.random() * 2,
        deriva: (Math.random() - 0.5) * 120,
      }
    })
  }, [cantidad, conHojas])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {items.map((p) => (
        <span
          key={p.id}
          className="petalo"
          style={{
            left: `${p.izquierda}%`,
            width: p.tamano,
            height: p.tamano,
            animationDuration: `${p.duracion}s`,
            animationDelay: `${p.retraso}s`,
            '--deriva': `${p.deriva}px`,
          }}
        >
          <span style={{ animationDuration: `${p.mecer}s` }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              {p.hoja ? (
                <>
                  <path d="M12 1 C21 8 19 18 12 23 C5 18 3 8 12 1Z" fill={p.color} />
                  <path d="M12 4 V21" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
                </>
              ) : (
                <path d="M12 2 C19 7 19 16 12 22 C5 16 5 7 12 2Z" fill={p.color} opacity="0.9" />
              )}
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}

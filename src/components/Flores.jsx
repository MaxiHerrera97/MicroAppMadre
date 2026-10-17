// Flores y hojas dibujadas en SVG, reutilizadas en toda la página.
// Los componentes *G devuelven un <g> para usarse dentro de otro <svg>.
import { config } from '../config'

const TRAZO = 'rgba(90, 40, 70, 0.16)'

export function Margarita({ x = 0, y = 0, r = 20, color = '#fff', centro = '#f5c542', petalos = 10 }) {
  return (
    <g>
      {Array.from({ length: petalos }, (_, i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y - r * 0.55}
          rx={r * 0.26}
          ry={r * 0.5}
          fill={color}
          stroke={TRAZO}
          strokeWidth={1}
          transform={`rotate(${(360 / petalos) * i} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.3} fill={centro} />
      <circle cx={x - r * 0.09} cy={y - r * 0.09} r={r * 0.1} fill="#fff" opacity="0.45" />
    </g>
  )
}

export function Rosa({ x = 0, y = 0, r = 20, color = '#f5b8c8' }) {
  const oscuro = 'rgba(120, 30, 60, 0.22)'
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = ((a - 90) * Math.PI) / 180
        return (
          <circle
            key={a}
            cx={x + Math.cos(rad) * r * 0.45}
            cy={y + Math.sin(rad) * r * 0.45}
            r={r * 0.55}
            fill={color}
            stroke={oscuro}
            strokeWidth={1}
          />
        )
      })}
      <circle cx={x} cy={y} r={r * 0.52} fill={color} stroke={oscuro} strokeWidth={1.2} />
      <path
        d={`M${x - r * 0.28} ${y} a${r * 0.28} ${r * 0.28} 0 1 1 ${r * 0.28} ${r * 0.28} a${r * 0.16} ${r * 0.16} 0 1 1 ${-r * 0.04} ${-r * 0.32}`}
        fill="none"
        stroke={oscuro}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </g>
  )
}

export function Tulipan({ x = 0, y = 0, r = 20, color = '#cbbbe8' }) {
  const copa = `M${x - r * 0.6} ${y - r * 0.35} L${x - r * 0.32} ${y - r * 0.9} L${x} ${y - r * 0.45} L${x + r * 0.32} ${y - r * 0.9} L${x + r * 0.6} ${y - r * 0.35} Q${x + r * 0.62} ${y + r * 0.65} ${x} ${y + r * 0.65} Q${x - r * 0.62} ${y + r * 0.65} ${x - r * 0.6} ${y - r * 0.35}Z`
  const centro = `M${x - r * 0.25} ${y + r * 0.6} Q${x - r * 0.35} ${y - r * 0.2} ${x} ${y - r * 0.7} Q${x + r * 0.35} ${y - r * 0.2} ${x + r * 0.25} ${y + r * 0.6}Z`
  return (
    <g>
      <path d={copa} fill={color} stroke={TRAZO} strokeWidth={1.2} strokeLinejoin="round" />
      <path d={centro} fill="#fff" opacity="0.28" />
    </g>
  )
}

export function Hoja({ x = 0, y = 0, largo = 30, angulo = 0, color = config.colores.acento }) {
  const l = largo
  return (
    <g transform={`translate(${x} ${y}) rotate(${angulo})`}>
      <path d={`M0 0 C${l * 0.3} ${-l * 0.35} ${l * 0.75} ${-l * 0.3} ${l} 0 C${l * 0.7} ${l * 0.28} ${l * 0.3} ${l * 0.28} 0 0Z`} fill={color} />
      <path d={`M2 0 L${l * 0.85} 0`} stroke="#fff" strokeOpacity="0.45" strokeWidth={1} />
    </g>
  )
}

// Icono suelto (HTML) para tarjetas, títulos y portada del libro
export function FlorIcono({ className = '', color = config.colores.primario, centro = '#f5c542' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <Margarita x={24} y={24} r={22} color={color} centro={centro} petalos={8} />
    </svg>
  )
}

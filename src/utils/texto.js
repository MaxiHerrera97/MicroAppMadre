// "Lucas y Sofía", "Ana, Lucas e Isabel"
export function unirNombres(nombres = []) {
  if (nombres.length <= 1) return nombres.join('')
  const ultimo = nombres[nombres.length - 1]
  const conjuncion = /^h?i(?![aeou])/i.test(ultimo) ? 'e' : 'y'
  return `${nombres.slice(0, -1).join(', ')} ${conjuncion} ${ultimo}`
}

// Mezcla un array; si se indica, evita que el primero sea `evitarPrimero`
export function barajar(lista, evitarPrimero) {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  if (a.length > 1 && a[0] === evitarPrimero) [a[0], a[1]] = [a[1], a[0]]
  return a
}

// ============================================================
//  🌷 CONTENIDO PERSONALIZABLE
//  Edita SOLO este archivo para cambiar textos, fotos, colores y canción.
//
//  Fotos y canción: ponlas en  public/media/  y referencialas así:
//    "/media/portada-1.jpg"   "/media/cancion.mp3"
//  (Mientras tanto se usan fotos de ejemplo de picsum.photos)
// ============================================================

// Foto de ejemplo. Reemplaza cada foto(...) por tu ruta, ej: '/media/portada-1.jpg'
const foto = (semilla, ancho = 600, alto = 600) =>
  `https://picsum.photos/seed/${semilla}/${ancho}/${alto}`

export const config = {
  // --- Quién recibe y quién regala ---
  nombreMama: 'Rosa',
  comoLeDicen: 'Mamá', // "Mamá", "Ma", "Mami"...
  remitentes: ['Lucas', 'Sofía'],

  // --- Pantalla 1: riega la flor ---
  toquesRiego: 8,
  textoInicio: 'Riega la flor para descubrir tu sorpresa 🌷',

  // ⚠️ REEMPLAZAR: copia tu canción a public/media/cancion.mp3 (o cambia esta ruta)
  cancion: '/media/cancion.mp3',

  // --- Portada: 3 fotos (se precargan mientras se riega la flor) ---
  fotosPortada: [
    foto('mama-portada-1', 600, 750),
    foto('mama-portada-2', 600, 750),
    foto('mama-portada-3', 600, 750),
  ],

  // --- "Gracias por…": 6 motivos (cortos, se leen mejor) ---
  gracias: [
    'por tus abrazos cuando todo salía mal',
    'por enseñarme a no rendirme nunca',
    'por las comidas que saben a hogar',
    'por desvelarte cuidándome',
    'por creer en mí antes que nadie',
    'por tu risa, que lo arregla todo',
  ],

  // --- Línea de tiempo: 4 a 6 momentos ---
  lineaDeTiempo: [
    { foto: foto('mama-epoca-1', 800, 600), anio: '1992', texto: 'Tus primeros pasos como mamá. Ahí empezó todo.' },
    { foto: foto('mama-epoca-2', 800, 600), anio: '1998', texto: 'Cumpleaños con torta casera y globos por toda la casa.' },
    { foto: foto('mama-epoca-3', 800, 600), anio: '2005', texto: 'Siempre en primera fila, en cada acto y cada partido.' },
    { foto: foto('mama-epoca-4', 800, 600), anio: '2015', texto: 'Nos viste crecer y nunca dejaste de cuidarnos.' },
    { foto: foto('mama-epoca-5', 800, 600), anio: '2025', texto: 'Hoy, más unidos que nunca. Gracias por todo.' },
  ],

  // --- Frasco de recuerdos: 8 a 12 frases cortas ---
  recuerdos: [
    'Cuando bailábamos en la cocina con la radio a todo volumen 💃',
    'Tus sopas mágicas que curaban cualquier resfrío 🍲',
    'Las vacaciones en la playa y los sándwiches con arena 🏖️',
    'Cuando me enseñaste a andar en bicicleta 🚲',
    'Tus notitas escondidas en la lonchera 💌',
    'Las tardes de películas bajo la misma manta 🎬',
    'El olor a torta recién horneada los domingos 🎂',
    'Cuando cantabas en el auto (y desafinabas un poquito) 🎶',
    'Tu mano en mi frente cada vez que tenía fiebre 🤒',
    'Las charlas largas hasta tarde en la mesa 🌙',
  ],

  // --- Cartas: una por cada hijo/nieto. Separa párrafos con una línea en blanco (\n\n) ---
  cartas: [
    {
      de: 'Lucas',
      mensaje:
        'Gracias por cada desayuno, cada consejo y cada vez que me esperaste despierta.\n\nNo siempre te lo digo, pero todo lo que soy te lo debo a ti. Eres mi lugar seguro.\n\nTe quiero muchísimo.',
    },
    {
      de: 'Sofía',
      mensaje:
        'Mami, eres la persona más fuerte y más dulce que conozco.\n\nGracias por enseñarme a reír incluso en los días grises y por abrazarme justo cuando más lo necesitaba.\n\nOjalá algún día ser al menos la mitad de increíble que tú.',
    },
  ],

  // --- Final ---
  mensajeFinal:
    'Gracias por darnos raíces para crecer y alas para volar. Todo lo bueno que somos lo aprendimos de ti. ¡Te queremos con todo el corazón!',

  // --- Paleta (se aplica a toda la página) ---
  colores: {
    primario: '#f5b8c8', // rosa pastel
    secundario: '#cbbbe8', // lavanda
    acento: '#a9c4a2', // verde salvia
    fondo: '#fdf7ee', // crema
  },

  // --- Vista previa al compartir el link (WhatsApp) ---
  og: {
    descripcion: 'Un regalo hecho con mucho amor para ti 💐',
    // ⚠️ Debe ser una URL ABSOLUTA (WhatsApp no acepta rutas relativas).
    // Tras publicar: 'https://tu-proyecto.vercel.app/media/og.jpg' (1200x630)
    imagen: 'https://picsum.photos/seed/mama-og/1200/630',
  },
}

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { config } from './config'
import WaterFlowerScreen from './components/WaterFlowerScreen'
import Hero from './components/Hero'
import ThankYouCards from './components/ThankYouCards'
import Timeline from './components/Timeline'
import MemoryJar from './components/MemoryJar'
import LettersBook from './components/LettersBook'
import FinalBouquet from './components/FinalBouquet'
import MusicButton from './components/MusicButton'

export default function App() {
  const audioRef = useRef(null)
  const [fase, setFase] = useState('riego')
  const [sonando, setSonando] = useState(false)

  // Se llama desde el handler del toque (requisito de iOS Safari / Chrome móvil)
  const iniciarMusica = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audio.paused) return
    audio.loop = true
    audio.play()?.catch(() => {})
  }, [])

  const alternarMusica = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play()?.catch(() => {})
    else audio.pause()
  }

  const terminarRiego = useCallback(() => {
    window.scrollTo(0, 0)
    setFase('principal')
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <audio
        ref={audioRef}
        src={config.cancion}
        loop
        preload="auto"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
      />

      <AnimatePresence mode="wait">
        {fase === 'riego' ? (
          <WaterFlowerScreen key="riego" onIniciarMusica={iniciarMusica} onCompleto={terminarRiego} />
        ) : (
          <motion.main
            key="principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="overflow-x-clip"
          >
            <Hero />
            <ThankYouCards />
            <Timeline />
            <MemoryJar />
            <LettersBook />
            <FinalBouquet />
          </motion.main>
        )}
      </AnimatePresence>

      {fase === 'principal' && <MusicButton sonando={sonando} onAlternar={alternarMusica} />}
    </MotionConfig>
  )
}

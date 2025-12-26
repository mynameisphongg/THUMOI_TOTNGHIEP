import { useState, useRef, useEffect } from 'react'

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        console.log('Audio playback failed')
      })
      setIsPlaying(true)
    }
  }

  return (
    <button
      className="audio-control"
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
    >
      {isPlaying ? '🔊' : '🔇'}
    </button>
  )
}


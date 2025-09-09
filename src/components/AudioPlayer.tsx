import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Set initial volume to 30%
    }
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3"
        loop
        autoPlay
      />
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-[#4E4F59] p-3 rounded-full shadow-lg hover:bg-[#8D9993] transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  )
}
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageDrawer from '../components/MessageDrawer'
import AudioPlayer from '../components/AudioPlayer'
import { MultimediaContent } from '../types'
import { useParams } from "react-router-dom"

export default function ExperiencePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { id } = useParams<{ id: string }>()
  const [contents, setContents] = useState<MultimediaContent[]>([
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&auto=format&fit=crop&q=80',
      title: 'Tech'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1920&auto=format&fit=crop&q=80',
      title: 'Art'
    },
    {
      type: 'video',
      url: 'https://player.vimeo.com/video/824804225?background=1&autoplay=1&loop=1&byline=0&title=0',
      title: 'Nature'
    }
  ])

  const videoRef = useRef<HTMLVideoElement>(null)

  // 🔹 Llamar al endpoint cuando haya un id
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const response = await fetch("http://3.140.23.226:8080/eternal/api/v1/UrlsQR", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ transaccion_id: id })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.urls && data.urls.length > 0) {
            const mapped = data.urls.map((url: string) => {
              const isVideo = url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".MOV")
              return {
                type: isVideo ? "video" : "image",
                url,
                title: "Contenido"
              } as MultimediaContent
            })
            setContents(mapped)
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error)
      }
    }

    fetchData()
  }, [id])

  // 🔹 Resetear índice cuando cambien los contenidos
  useEffect(() => {
    if (contents.length > 0) {
      setCurrentIndex(0)
    }
  }, [contents])

  // 🔹 Control inteligente del carrusel
  useEffect(() => {
    if (contents.length === 0) return
    const current = contents[currentIndex]

    // Para imágenes → esperar 5 segundos
    if (current.type === "image") {
      const timer = setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % contents.length)
      }, 5000)

      return () => clearTimeout(timer)
    }
    // Para videos → no usar timer, avanzar con onEnded
  }, [currentIndex, contents])

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#2B2E35]">
      <AudioPlayer />

      <AnimatePresence mode="wait">
        {contents.length > 0 && contents[currentIndex] && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            {contents[currentIndex].type === 'image' ? (
              <img
                src={contents[currentIndex].url}
                alt={contents[currentIndex].title}
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <video
                ref={videoRef}
                src={contents[currentIndex].url}
                autoPlay
                loop={false}
                muted
                playsInline
                className="w-full h-full object-contain bg-black"
                onEnded={() =>
                  setCurrentIndex((currentIndex + 1) % contents.length)
                }
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <MessageDrawer />
    </div>
  )
}

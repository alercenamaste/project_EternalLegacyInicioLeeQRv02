import { useNavigate, useParams } from 'react-router-dom'
import { Play } from 'lucide-react'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // 👈 capturamos el ID de la URL

  const handleStart = () => {
    if (id) {
      navigate(`/experience/${id}`) // 👈 redirige con el ID
    } else {
      navigate('/experience/default') // 👈 por si no hay id, manda uno por defecto
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#2B2E35]">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="aspect-square w-full max-w-sm overflow-hidden rounded-2xl border-4 border-[#FF7B0F] shadow-lg">
          <img
            src="https://contenedoreternallegacyqrinicio.s3.us-east-2.amazonaws.com/3a691552-8a5b-43b3-ad88-241e453f3bb3.webp"
            alt="Bienvenidos"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={handleStart}
          className="flex items-center gap-2 bg-[#FF7B0F] text-white px-8 py-4 rounded-full text-lg font-semibold transform transition hover:scale-105 hover:bg-opacity-90"
        >
          <Play size={24} />
          Comenzar
        </button>
      </div>
    </div>
  )
}

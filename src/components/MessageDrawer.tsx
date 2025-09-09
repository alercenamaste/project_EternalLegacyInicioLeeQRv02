import { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'

export default function MessageDrawer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission here
    setMessage('')
    setIsExpanded(false)
  }

  return (
    <div
      className={`message-drawer fixed bottom-0 left-0 right-0 bg-[#4E4F59] rounded-t-2xl p-4 ${
        isExpanded ? 'expanded' : ''
      }`}
    >
      <div
        className="flex items-center justify-center mb-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageSquare className="text-[#FF7B0F]" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Deja tu mensaje aquí..."
          className="w-full p-3 rounded-lg bg-[#2B2E35] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7B0F]"
          rows={4}
        />
        
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#FF7B0F] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Send size={20} />
          Enviar mensaje
        </button>
      </form>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import type { IGuest } from '../types'
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'

export default function InvitationView() {
  const { guestId } = useParams()
  const [guest, setGuest] = useState<IGuest | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const res = await api.get(`/guests/${guestId}`)
        setGuest(res.data)
      } catch (err) {
        setError(true)
      }
    }
    if (guestId) fetchGuest()
  }, [guestId])

  if (error) return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#09090b]">
      <div className="text-center px-6">
        <div className="text-5xl mb-6">😕</div>
        <h2 className="text-xl font-bold text-white mb-2">Thiệp không tồn tại</h2>
        <p className="text-zinc-500 text-sm">Link này có thể đã hết hạn hoặc không đúng.</p>
      </div>
    </div>
  )

  if (!guest) return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#09090b]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30" />
          <div className="absolute inset-0 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-zinc-500 text-sm tracking-wide">Đang mở thiệp mời...</p>
      </div>
    </div>
  )

  const event = guest.eventId

  return (
    <div className="w-full min-h-[100dvh]">
      {event.templateId === 'template1' ? (
        <Template1 event={event} guestName={guest.name} />
      ) : (
        <Template2 event={event} guestName={guest.name} />
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import type { IEvent, IGuest } from '../types'

export default function DashboardPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [guests, setGuests] = useState<IGuest[]>([])
  const [guestName, setGuestName] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${eventId}`)
      setEvent(res.data)
      const resGuests = await api.get(`/events/${eventId}/guests`)
      setGuests(resGuests.data)
    }
    if (eventId) fetchEvent()
  }, [eventId])

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !eventId) return
    setAdding(true)
    try {
      const res = await api.post('/guests', { eventId, name: guestName })
      setGuests([res.data, ...guests])
      setGuestName('')
    } catch (err) {
      alert("Không thể kết nối đến máy chủ!")
    } finally {
      setAdding(false)
    }
  }

  const handleCopy = async (link: string, guestId: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedId(guestId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback for mobile
      const textarea = document.createElement('textarea')
      textarea.value = link
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedId(guestId)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  if (!event) return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-500 text-sm">Đang tải dữ liệu...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-[100dvh] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 md:py-16">
        
        {/* Header */}
        <div className="mb-10 fade-in-up">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-6 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Tạo thiệp mới
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-600/20">
              {event.hostName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{event.hostName}</h1>
              <p className="text-zinc-500 text-sm">{event.eventType === 'birthday' ? '🎂 Sinh Nhật' : '🎓 Tốt Nghiệp'} &bull; {event.title}</p>
            </div>
          </div>
        </div>

        {/* Add Guest Form */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 mb-8 fade-in-up stagger-1">
          <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Thêm khách mời
          </h3>
          <form onSubmit={handleAddGuest} className="flex gap-3">
            <input 
              required 
              className="input-dark flex-1" 
              placeholder="Nhập tên khách mời (VD: Trúc Ly)" 
              value={guestName} 
              onChange={e => setGuestName(e.target.value)} 
            />
            <button 
              type="submit" 
              disabled={adding}
              className="btn-primary px-6 py-3 whitespace-nowrap flex items-center gap-2 disabled:opacity-50"
            >
              {adding ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              )}
              <span className="hidden md:inline">Tạo Link</span>
            </button>
          </form>
        </div>

        {/* Guest List */}
        <div className="fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Danh sách khách mời
            </h3>
            <span className="text-xs text-zinc-600 bg-zinc-800/50 px-3 py-1 rounded-full">{guests.length} khách</span>
          </div>

          {guests.length === 0 ? (
            <div className="card-dark rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-zinc-500 text-sm">Chưa có khách mời nào. Hãy thêm tên ở trên!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {guests.map((g, i) => {
                const inviteLink = `${window.location.origin}/invite/${g._id}`
                const isCopied = copiedId === g._id
                return (
                  <div 
                    key={g._id} 
                    className="card-dark rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
                        {g.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-white truncate">{g.name}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <input 
                        readOnly 
                        value={inviteLink} 
                        className="bg-zinc-900/50 border border-zinc-800 px-3 py-2 text-xs rounded-lg text-zinc-500 outline-none w-44 md:w-56 truncate select-all" 
                        onFocus={e => e.target.select()}
                      />
                      <button 
                        onClick={() => handleCopy(inviteLink, g._id)} 
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 shrink-0 ${
                          isCopied 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 border border-zinc-700'
                        }`}
                      >
                        {isCopied ? '✓ Copied' : 'Copy'}
                      </button>
                      <Link 
                        to={`/invite/${g._id}`} 
                        target="_blank" 
                        className="px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all shrink-0"
                      >
                        Xem
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

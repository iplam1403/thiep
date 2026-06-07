import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import type { IEvent, IUser } from '../types'

export default function HistoryPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<IEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    if (!storedUser) {
      navigate('/auth')
      return
    }
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)

    const fetchEvents = async () => {
      try {
        const res = await api.get(`/users/${parsedUser._id}/events`)
        setEvents(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('auth_user')
    navigate('/auth')
  }

  if (loading || !user) {
    return (
      <div className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#09090b] text-zinc-100 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-purple-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Đăng nhập thành công
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Xin chào, <span className="gradient-text">{user.username}</span>
            </h1>
            <p className="text-zinc-400 mt-2">Quản lý các thiệp mời bạn đã tạo</p>
          </div>

          <div className="flex items-center gap-3 fade-in-up stagger-1">
            <Link to="/" className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold rounded-xl transition-colors border border-zinc-700">
              + Tạo thiệp mới
            </Link>
            <button onClick={handleLogout} className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold rounded-xl transition-colors border border-red-500/20">
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Event List */}
        <div className="fade-in-up stagger-2">
          {events.length === 0 ? (
            <div className="glass-strong rounded-3xl p-16 text-center border border-dashed border-zinc-800">
              <div className="text-6xl mb-6">📭</div>
              <h3 className="text-xl font-bold text-white mb-2">Chưa có thiệp nào</h3>
              <p className="text-zinc-500 mb-6 max-w-sm mx-auto">Bạn chưa tạo thiệp mời nào. Hãy ấn nút tạo mới để bắt đầu ngay nhé.</p>
              <Link to="/" className="btn-primary inline-flex items-center gap-2">
                Bắt đầu tạo thiệp
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event._id} to={`/dashboard/${event._id}`} className="block group">
                  <div className="glass-strong rounded-3xl p-6 h-full transition-all duration-300 hover:bg-zinc-800/40 hover:border-zinc-700 hover:-translate-y-1 relative overflow-hidden">
                    {/* Theme accent glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 transition-opacity group-hover:opacity-40
                      ${event.templateId === 'template1' ? 'bg-red-500' : ''}
                      ${event.templateId === 'template2' ? 'bg-blue-500' : ''}
                      ${event.templateId === 'template3' ? 'bg-[#C49B5B]' : ''}
                      ${event.templateId === 'template4' ? 'bg-[#ff007f]' : ''}
                    `} />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg
                        ${event.templateId === 'template1' ? 'bg-gradient-to-br from-red-900 to-amber-800 text-amber-200' : ''}
                        ${event.templateId === 'template2' ? 'bg-gradient-to-br from-blue-800 to-indigo-600 text-blue-200' : ''}
                        ${event.templateId === 'template3' ? 'bg-gradient-to-br from-[#C49B5B] to-[#2B2521] text-amber-100' : ''}
                        ${event.templateId === 'template4' ? 'bg-gradient-to-br from-[#ff007f] to-[#00f0ff] text-white' : ''}
                        ${!['template1','template2','template3','template4'].includes(event.templateId) ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : ''}
                      ">
                        {event.hostName.charAt(0).toUpperCase()}
                      </div>
                      <span className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-400 font-medium capitalize">
                        {event.eventType === 'birthday' ? '🎂 Sinh nhật' : '🎓 Tốt nghiệp'}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-1 truncate">{event.hostName}</h3>
                      <p className="text-sm text-zinc-400 font-medium mb-4">{event.title}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {event.timeLine3 || 'Chưa định ngày'}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 truncate">
                          <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="truncate">{event.locationLine1 || 'Chưa định địa điểm'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between relative z-10 group-hover:border-zinc-700/80 transition-colors">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{event.templateId}</span>
                      <span className="text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:text-purple-300">
                        Quản lý <span className="text-lg leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

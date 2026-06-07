// @ts-nocheck
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import type { IEvent, IGuest } from '../types'
import Template1 from '../templates/Template1'
import Template2 from '../templates/Template2'
import Template3 from '../templates/Template3'
import Template4 from '../templates/Template4'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState<IEvent | null>(null)
  const [guests, setGuests] = useState<IGuest[]>([])
  const [guestName, setGuestName] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null)
  
  // Editing state and form data
  const [isEditing, setIsEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [editFormData, setEditFormData] = useState({
    hostName: '', universityName: '', universitySubName: '', universityLogo: '',
    title: '', subtitle: '', timeLine1: '', timeLine2: '', timeLine3: '',
    locationLine1: '', locationLine2: '', footerMessage: '', templateId: '', eventType: ''
  })

  const fetchEventData = async () => {
    const res = await api.get(`/events/${eventId}`)
    setEvent(res.data)
    setEditFormData(res.data) // Load old values
    const resGuests = await api.get(`/events/${eventId}/guests`)
    setGuests(resGuests.data)
  }

  useEffect(() => {
    if (eventId) fetchEventData()
  }, [eventId])

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !eventId) return
    setAdding(true)
    try {
      if (editingGuestId) {
        // Update guest
        const res = await api.put(`/guests/${editingGuestId}`, { name: guestName })
        setGuests(guests.map(g => g._id === editingGuestId ? { ...g, name: res.data.name } : g))
        setEditingGuestId(null)
      } else {
        // Add guest
        const res = await api.post('/guests', { eventId, name: guestName })
        setGuests([res.data, ...guests])
      }
      setGuestName('')
    } catch (err) {
      alert("Không thể kết nối đến máy chủ!")
    } finally {
      setAdding(false)
    }
  }

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const res = await api.put(`/events/${eventId}`, editFormData)
      setEvent(res.data)
      setIsEditing(false)
    } catch (err) {
      alert("Lỗi khi cập nhật thiệp mời!")
    } finally {
      setUpdating(false)
    }
  }


  const handleCopy = async (link: string, guestId: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedId(guestId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
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
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#09090b]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-500 text-sm">Đang tải dữ liệu...</p>
      </div>
    </div>
  )

  const handleEditSet = (key: string, val: string) => {
    setEditFormData({ ...editFormData, [key]: val })
  }

  return (
    <div className="min-h-[100dvh] relative overflow-hidden bg-[#09090b] text-zinc-100">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          {localStorage.getItem('auth_user') ? (
            <Link to="/history" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại lịch sử
            </Link>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tạo thiệp mới
            </Link>
          )}
          
          <button 
            onClick={() => setIsEditing(true)} 
            className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/25 rounded-xl transition-all duration-300 flex items-center gap-1.5"
          >
            ⚙️ Làm lại / Sửa thông tin thiệp
          </button>
        </div>

        {/* Dashboard Header Info */}
        <div className="mb-8 flex items-center gap-4 bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {event.hostName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{event.hostName}</h1>
            <p className="text-zinc-500 text-xs md:text-sm">
              {event.eventType === 'birthday' ? '🎂 Sinh Nhật' : '🎓 Tốt Nghiệp'} &bull; Theme: {event.templateId.toUpperCase()} &bull; {event.title}
            </p>
          </div>
        </div>

        {/* Main Columns Layout (Content + Preview Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Guest Management Form & List (2/3 width on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Add Guest Section */}
            <div className="glass-strong rounded-3xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {editingGuestId ? 'Sửa tên khách mời (Làm lại)' : 'Thêm khách mời'}
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
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                  <span>{editingGuestId ? 'Lưu' : 'Tạo Link'}</span>
                </button>
                {editingGuestId && (
                  <button 
                    type="button"
                    onClick={() => {
                      setGuestName('');
                      setEditingGuestId(null);
                    }}
                    className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm font-semibold rounded-xl transition-all"
                  >
                    Hủy
                  </button>
                )}
              </form>
            </div>

            {/* List Guests section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Danh sách khách mời
                </h3>
                <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">{guests.length} khách</span>
              </div>

              {guests.length === 0 ? (
                <div className="card-dark rounded-2xl p-12 text-center border border-dashed border-zinc-800">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-zinc-500 text-sm">Chưa có khách mời nào. Hãy thêm tên ở trên!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {guests.map((g, i) => {
                    const inviteLink = `${window.location.origin}/invite/${g._id}`
                    const isCopied = copiedId === g._id
                    return (
                      <div key={g._id} className="card-dark rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                            {g.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-white truncate text-sm">{g.name}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <input 
                            readOnly 
                            value={inviteLink} 
                            className="bg-zinc-950 border border-zinc-900 px-3 py-1.5 text-xs rounded-lg text-zinc-500 outline-none w-36 md:w-52 truncate select-all" 
                            onFocus={e => e.target.select()}
                          />
                          <button 
                            onClick={() => handleCopy(inviteLink, g._id)} 
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
                              isCopied 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 border border-zinc-700'
                            }`}
                          >
                            {isCopied ? '✓ Copied' : 'Copy'}
                          </button>
                          <button 
                            onClick={() => {
                              setGuestName(g.name);
                              setEditingGuestId(g._id);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 shrink-0 ${
                              editingGuestId === g._id 
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 border-zinc-700'
                            }`}
                          >
                            Sửa
                          </button>
                          <Link 
                            to={`/invite/${g._id}`} 
                            target="_blank" 
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all shrink-0"
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

          {/* RIGHT: Live Template Review/Preview (1/3 width on large screens) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Review thiệp mời (Live Preview)
              </h3>
              <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">Demo Guest</span>
            </div>
            
            {/* Interactive Preview Device Frame */}
            <div className="relative w-full max-w-[360px] mx-auto aspect-[9/16] rounded-[32px] border-[8px] border-zinc-800 bg-[#09090b] shadow-[0_25px_60px_-15px_rgba(124,58,237,0.15)] overflow-hidden">
              {/* Speaker / Camera notches */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-800 rounded-full z-40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-900 mr-2" />
                <div className="w-10 h-1 bg-zinc-950 rounded-full" />
              </div>
              
              {/* Actual Template Card View Rendering */}
              <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scale-[1.005]">
                {event.templateId === 'template1' && <Template1 event={event} guestName="Khách Mời Demo" />}
                {event.templateId === 'template2' && <Template2 event={event} guestName="Khách Mời Demo" />}
                {event.templateId === 'template3' && <Template3 event={event} guestName="Khách Mời Demo" />}
                {event.templateId === 'template4' && <Template4 event={event} guestName="Khách Mời Demo" />}
              </div>
            </div>
          </div>
        </div>

        {/* ── EDIT EVENT DIALOG / MODAL ── */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.95, y: 20 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>✏️ Chỉnh sửa thông tin thiệp</span>
                </h2>

                <form onSubmit={handleUpdateEvent} className="space-y-6">
                  {/* Event Type Select */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-2">Loại Sự Kiện</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button" 
                        onClick={() => {
                          handleEditSet('eventType', 'graduation');
                          handleEditSet('title', 'GRADUATION');
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold ${
                          editFormData.eventType === 'graduation' ? 'border-purple-500 bg-purple-500/10 text-purple-200' : 'border-zinc-800 text-zinc-400'
                        }`}
                      >
                        🎓 Tốt Nghiệp
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          handleEditSet('eventType', 'birthday');
                          handleEditSet('title', 'BIRTHDAY');
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold ${
                          editFormData.eventType === 'birthday' ? 'border-amber-500 bg-amber-500/10 text-amber-200' : 'border-zinc-800 text-zinc-400'
                        }`}
                      >
                        🎂 Sinh Nhật
                      </button>
                    </div>
                  </div>

                  {/* Personal info fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Tên chủ nhân</label>
                      <input required className="input-dark" value={editFormData.hostName} onChange={e => handleEditSet('hostName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">{editFormData.eventType === 'graduation' ? 'Tên Trường (Viết tắt)' : 'Tuổi / Phụ đề'}</label>
                      <input required className="input-dark" value={editFormData.universitySubName} onChange={e => handleEditSet('universitySubName', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">{editFormData.eventType === 'graduation' ? 'Tên Trường (Đầy đủ)' : 'Chủ đề / Tagline'}</label>
                      <input required className="input-dark" value={editFormData.universityName} onChange={e => handleEditSet('universityName', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Tiêu đề lớn</label>
                      <input required className="input-dark" value={editFormData.title} onChange={e => handleEditSet('title', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Link Logo/Ảnh</label>
                      <input className="input-dark" value={editFormData.universityLogo} onChange={e => handleEditSet('universityLogo', e.target.value)} />
                    </div>
                  </div>

                  {/* Time and location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Giờ</label>
                      <input className="input-dark" value={editFormData.timeLine1} onChange={e => handleEditSet('timeLine1', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Thứ</label>
                      <input className="input-dark" value={editFormData.timeLine2} onChange={e => handleEditSet('timeLine2', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Ngày</label>
                      <input className="input-dark" value={editFormData.timeLine3} onChange={e => handleEditSet('timeLine3', e.target.value)} />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Địa điểm</label>
                      <input className="input-dark" value={editFormData.locationLine1} onChange={e => handleEditSet('locationLine1', e.target.value)} />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Địa chỉ chi tiết</label>
                      <input className="input-dark" value={editFormData.locationLine2} onChange={e => handleEditSet('locationLine2', e.target.value)} />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Lời nhắn cuối</label>
                      <input className="input-dark" value={editFormData.footerMessage} onChange={e => handleEditSet('footerMessage', e.target.value)} />
                    </div>
                  </div>

                  {/* Template selector */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-2">Chọn mẫu thiệp</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['template1', 'template2', 'template3', 'template4'].map((tId) => (
                        <button 
                          key={tId} 
                          type="button" 
                          onClick={() => handleEditSet('templateId', tId)}
                          className={`p-3 rounded-xl border text-xs font-semibold ${
                            editFormData.templateId === tId ? 'border-purple-500 bg-purple-500/10 text-purple-200' : 'border-zinc-800 text-zinc-400'
                          }`}
                        >
                          {tId === 'template1' && 'Classic Royal'}
                          {tId === 'template2' && 'Modern Glass'}
                          {tId === 'template3' && 'Retro Vintage'}
                          {tId === 'template4' && 'Neon Cyber'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-zinc-800 justify-end">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)} 
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit" 
                      disabled={updating}
                      className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center"
                    >
                      {updating ? 'Đang lưu...' : 'Lưu cập nhật'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

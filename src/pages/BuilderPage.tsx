import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function BuilderPage() {
  const navigate = useNavigate()
  const [eventType, setEventType] = useState('graduation')
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    hostName: '', universityName: '', universitySubName: '', universityLogo: '',
    title: 'GRADUATION', subtitle: 'Ceremony 2026', timeLine1: '9:00 - 10:00',
    timeLine2: 'CHỦ NHẬT', timeLine3: '21.06.2026', locationLine1: '',
    locationLine2: '', footerMessage: 'Sự hiện diện của bạn là niềm vinh hạnh',
    templateId: 'template1'
  })

  const handleEventTypeChange = (type: string) => {
    setEventType(type)
    if (type === 'birthday') {
      setFormData({ ...formData, 
        title: 'BIRTHDAY', subtitle: 'Party', 
        universityName: '', universitySubName: '',
      })
    } else {
      setFormData({ ...formData, 
        title: 'GRADUATION', subtitle: 'Ceremony 2026', 
        universityName: '', universitySubName: '',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/events', { ...formData, eventType })
      navigate(`/dashboard/${res.data._id}`)
    } catch (err) {
      console.error(err)
      alert("Lỗi khi tạo sự kiện")
    } finally {
      setLoading(false)
    }
  }

  const isGraduation = eventType === 'graduation'
  const set = (key: string, val: string) => setFormData({ ...formData, [key]: val })

  return (
    <div className="min-h-[100dvh] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 md:py-16">
        
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-purple-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Online Card Builder
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Tạo Thiệp Mời</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-md mx-auto leading-relaxed">
            Thiết kế thiệp mời cao cấp cho sự kiện của bạn. Chỉ mất 1 phút để tạo và chia sẻ.
          </p>
        </div>

        {/* Event Type Selector */}
        <div className="mb-10 fade-in-up stagger-1">
          <label className="block text-sm font-medium text-zinc-400 mb-3 tracking-wide uppercase">Loại Sự Kiện</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => handleEventTypeChange('graduation')} 
              className={`relative p-5 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${
                isGraduation 
                  ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]' 
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/50'
              }`}
            >
              {isGraduation && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />}
              <div className="relative z-10">
                <span className="text-2xl mb-2 block">🎓</span>
                <div className={`font-semibold text-base ${isGraduation ? 'text-purple-200' : 'text-zinc-300'}`}>Tốt Nghiệp</div>
                <div className="text-xs text-zinc-500 mt-1">Graduation Ceremony</div>
              </div>
            </button>
            <button 
              type="button"
              onClick={() => handleEventTypeChange('birthday')} 
              className={`relative p-5 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${
                !isGraduation 
                  ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]' 
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/50'
              }`}
            >
              {!isGraduation && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />}
              <div className="relative z-10">
                <span className="text-2xl mb-2 block">🎂</span>
                <div className={`font-semibold text-base ${!isGraduation ? 'text-amber-200' : 'text-zinc-300'}`}>Sinh Nhật</div>
                <div className="text-xs text-zinc-500 mt-1">Birthday Party</div>
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Section: Personal */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 mb-6 fade-in-up stagger-2">
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Tên của bạn (Chủ tiệc)</label>
                <input required className="input-dark" placeholder="VD: Mai Hoa" value={formData.hostName} onChange={e => set('hostName', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">{isGraduation ? 'Tên Trường (Viết tắt)' : 'Tuổi / Phụ đề'}</label>
                <input required className="input-dark" placeholder={isGraduation ? "VD: NTT Univ" : "VD: 20TH"} value={formData.universitySubName} onChange={e => set('universitySubName', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-500 mb-2">{isGraduation ? 'Tên Trường (Đầy đủ)' : 'Chủ đề / Tagline'}</label>
                <input required className="input-dark" placeholder={isGraduation ? "VD: ĐẠI HỌC NGUYỄN TẤT THÀNH" : "VD: BLACK & PINK PARTY"} value={formData.universityName} onChange={e => set('universityName', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-500 mb-2">Tiêu đề lớn trên thiệp</label>
                <input required className="input-dark" placeholder="VD: GRADUATION hoặc BIRTHDAY" value={formData.title} onChange={e => set('title', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-500 mb-2">Link Logo / Ảnh đại diện <span className="text-zinc-600">(tuỳ chọn)</span></label>
                <input className="input-dark" placeholder="https://..." value={formData.universityLogo} onChange={e => set('universityLogo', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section: Time & Location */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 mb-6 fade-in-up stagger-3">
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Thời gian & Địa điểm
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Giờ</label>
                <input className="input-dark" placeholder="9:00 - 10:00" value={formData.timeLine1} onChange={e => set('timeLine1', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Thứ</label>
                <input className="input-dark" placeholder="CHỦ NHẬT" value={formData.timeLine2} onChange={e => set('timeLine2', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Ngày</label>
                <input className="input-dark" placeholder="21.06.2026" value={formData.timeLine3} onChange={e => set('timeLine3', e.target.value)} />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-zinc-500 mb-2">Địa điểm</label>
                <input className="input-dark" placeholder="Tên địa điểm" value={formData.locationLine1} onChange={e => set('locationLine1', e.target.value)} />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-zinc-500 mb-2">Địa chỉ chi tiết</label>
                <input className="input-dark" placeholder="Số nhà, đường, quận..." value={formData.locationLine2} onChange={e => set('locationLine2', e.target.value)} />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-zinc-500 mb-2">Lời nhắn cuối thiệp</label>
                <input className="input-dark" placeholder="Sự hiện diện của bạn là niềm vinh hạnh" value={formData.footerMessage} onChange={e => set('footerMessage', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section: Template Picker */}
          <div className="glass-strong rounded-3xl p-6 md:p-8 mb-8 fade-in-up stagger-4">
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wide uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              Chọn mẫu thiệp
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => set('templateId', 'template1')}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                  formData.templateId === 'template1' 
                    ? 'border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`absolute inset-0 transition-opacity duration-300 ${formData.templateId === 'template1' ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'linear-gradient(135deg, rgba(127,29,29,0.2), rgba(180,83,9,0.1))' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-900 to-amber-800 flex items-center justify-center text-amber-200 text-lg shadow-lg">✦</div>
                    <div>
                      <div className="font-bold text-white">Classic Royal</div>
                      <div className="text-xs text-zinc-500">Template 1</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">Phong cách sang trọng, cổ điển với tông đỏ lựu & vàng kim. Ruy băng dọc bên phải.</p>
                  {formData.templateId === 'template1' && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => set('templateId', 'template2')}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden ${
                  formData.templateId === 'template2' 
                    ? 'border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className={`absolute inset-0 transition-opacity duration-300 ${formData.templateId === 'template2' ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.2), rgba(99,102,241,0.1))' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-800 to-indigo-600 flex items-center justify-center text-blue-200 text-lg shadow-lg">◈</div>
                    <div>
                      <div className="font-bold text-white">Modern Glass</div>
                      <div className="text-xs text-zinc-500">Template 2</div>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">Hiện đại, tối giản với hiệu ứng kính mờ glassmorphism. Nền tối ánh xanh.</p>
                  {formData.templateId === 'template2' && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="fade-in-up stagger-5">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Đang tạo...
                </>
              ) : (
                <>
                  Tạo Thiệp & Tiếp Tục
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

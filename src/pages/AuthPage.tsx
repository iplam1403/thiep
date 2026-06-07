import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

export default function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const res = await api.post(endpoint, { username, password })
      
      // Store user info in localStorage
      localStorage.setItem('auth_user', JSON.stringify(res.data))
      navigate('/history')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden text-zinc-100">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10 fade-in-up">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại trang tạo thiệp
          </Link>
        </div>

        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-zinc-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight">
              {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
            </h1>
            <p className="text-zinc-400 text-sm">
              {isLogin ? 'Chào mừng bạn quay trở lại' : 'Đăng ký để lưu trữ các thiệp mời của bạn'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Tên đăng nhập</label>
              <input 
                required 
                type="text"
                className="input-dark" 
                placeholder="Nhập tên tài khoản" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Mật khẩu</label>
              <input 
                required 
                type="password"
                className="input-dark" 
                placeholder="Nhập mật khẩu" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {isLogin ? 'Chưa có tài khoản? Tạo mới ngay' : 'Đã có tài khoản? Đăng nhập'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

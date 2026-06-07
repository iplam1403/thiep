import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Copy, CheckCircle2 } from 'lucide-react'

export default function CreatorForm() {
  const [name, setName] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      // Create a URL with the guest name encoded
      const url = new URL(window.location.href)
      url.searchParams.set('guest', encodeURIComponent(name.trim()))
      setGeneratedLink(url.toString())
      setCopied(false)
    }
  }

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full"
    >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2.5rem] shadow-2xl w-full max-w-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl -z-10" />
        
        <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">
          Tạo Thiệp Mời
        </h1>
        <p className="text-blue-200/80 mb-8 font-light">
          Nhập tên khách mời để tạo đường link gửi riêng cho họ
        </p>

        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setGeneratedLink('') // Reset link when name changes
            }}
            placeholder="Ví dụ: Anh Tuấn, Chị Lan..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-all duration-300 text-lg font-light shadow-inner"
            required
          />
          <button 
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-amber-950 font-medium rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <Link className="w-5 h-5" />
            Tạo Link Thiệp
          </button>
        </form>

        {generatedLink && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5 text-left"
          >
            <p className="text-sm text-blue-200/60 mb-2">Đường link dành riêng cho {name}:</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-black/50 p-3 rounded-xl overflow-hidden">
                <p className="text-amber-100/90 text-sm truncate font-mono">{generatedLink}</p>
              </div>
              <button 
                onClick={handleCopy}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors shrink-0"
                title="Copy link"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

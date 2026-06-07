// @ts-nocheck
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

interface Props {
  guestName: string
}

export default function InvitationCard({ guestName }: Props) {
  useEffect(() => {
    // Fire confetti when card appears
    const duration = 2 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#7f1d1d', '#fcd34d', '#ffffff'] // Red and Gold
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#7f1d1d', '#fcd34d', '#ffffff']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-[100dvh] md:h-[850px] relative bg-[#FDFBF7] shadow-2xl overflow-hidden font-['Montserrat'] text-[#3a2e2b]"
    >
      {/* Faint floral/damask background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* The Red Ribbon/Sash on the right */}
      <motion.div 
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="absolute top-0 right-4 w-16 md:w-20 h-[85%] bg-gradient-to-b from-[#7A1515] via-[#5C0A0A] to-[#7A1515] flex flex-col items-center pt-8 shadow-xl z-10"
      >
        <div className="absolute inset-0 border-x-2 border-b-2 border-amber-300/30" />
        {/* Star Icon on sash */}
        <div className="text-amber-200 mb-6 relative z-10">✦</div>
        {/* University Logo placeholder on sash */}
        <div className="w-10 h-12 border border-amber-300/50 rounded-b-md rounded-t-sm flex items-center justify-center text-amber-200 text-xs text-center leading-tight mb-8 relative z-10">
          NTT<br/>Univ
        </div>
        {/* Vertical Text */}
        <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10">
          <p className="text-amber-200/70 text-[8px] md:text-[10px] uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Bachelor's degree in Computer Science
          </p>
          <div className="h-6" />
          <h2 className="text-amber-400 text-sm md:text-base font-serif tracking-[0.2em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            NGUYỄN MAI HOA
          </h2>
        </div>
        {/* Sash bottom point */}
        <div className="absolute -bottom-8 left-0 w-full h-8 flex">
          <div className="w-1/2 h-full bg-gradient-to-b from-[#7A1515] to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <div className="w-1/2 h-full bg-gradient-to-b from-[#7A1515] to-transparent" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full p-6 flex flex-col">
        
        {/* University Logo & Info */}
        <div className="flex items-center gap-3 mb-10 pt-2">
          <div className="w-10 h-12 bg-[#1e3a8a] rounded-b-xl flex items-center justify-center text-white text-[10px] font-bold shadow-md">
            NTT
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1e3a8a] leading-tight">ĐẠI HỌC<br/>NGUYỄN TẤT THÀNH</h3>
            <p className="text-[8px] text-gray-500 uppercase mt-0.5 tracking-wider">Nguyen Tat Thanh University</p>
          </div>
        </div>

        {/* Greeting */}
        <div className="flex items-end gap-2 mb-6">
          <span className="text-lg font-serif">Dear</span>
          <div className="flex-1 border-b border-dashed border-gray-400 pb-1 text-center">
            <span className="font-semibold text-lg text-[#7A1515]">{guestName}</span>
          </div>
        </div>

        {/* Invitation Text */}
        <div className="text-center mb-6 pl-2 pr-12">
          <p className="text-sm text-gray-600 mb-2">Thân mời bạn đến dự</p>
          <h1 className="font-['Alex_Brush'] text-5xl text-[#C49B5B] leading-none mb-1">
            Mai Hoa's
          </h1>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#5C0A0A] tracking-wider mb-2">
            GRADUATION
          </h2>
          <p className="text-base text-gray-700 tracking-widest uppercase">Ceremony 2026</p>
        </div>

        {/* Time and Location Details */}
        <div className="mt-8 space-y-5 pl-2 pr-16 text-sm">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Vào lúc</p>
            <p className="font-semibold text-[#5C0A0A]">9:00 - 10:00</p>
            <p className="font-bold">CHỦ NHẬT</p>
            <p className="text-gray-700">21.06.2026</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Tại</p>
            <p className="font-bold text-[#5C0A0A]">ĐẠI HỌC NGUYỄN TẤT THÀNH</p>
            <p className="text-gray-600 text-xs mt-1">331A - 331B Đỗ Mười, An Phú Đông</p>
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-auto pb-8 pr-12 pl-2">
          <p className="text-sm text-gray-600 italic leading-relaxed">
            Sự hiện diện và những lời chúc tốt đẹp của bạn sẽ làm cho ngày này trở nên đáng nhớ hơn bao giờ hết!
          </p>
        </div>

      </div>
    </motion.div>
  )
}

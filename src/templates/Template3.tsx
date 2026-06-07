// @ts-nocheck
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props { event: IEvent; guestName: string }

/* Vintage flourish decoration for corners */
const CornerFlourish = ({ className = '' }) => (
  <svg className={`w-8 h-8 md:w-16 md:h-16 text-[#C49B5B]/30 absolute ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10,10 L90,10 M10,10 L10,90" />
    <path d="M10,10 C30,20 20,30 10,40 C15,30 30,15 40,10" />
    <circle cx="15" cy="15" r="2" fill="currentColor" />
  </svg>
)

export default function Template3({ event, guestName }: Props) {
  const [opened, setOpened] = useState(false)

  const fireConfetti = () => {
    const end = Date.now() + 2500
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.4 }, colors: ['#c49b5b', '#b38a4b', '#d9b473', '#f2d8a7'], gravity: 0.9 })
      confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.4 }, colors: ['#c49b5b', '#b38a4b', '#d9b473', '#f2d8a7'], gravity: 0.9 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleOpen = () => { setOpened(true); setTimeout(fireConfetti, 400) }
  const isGrad = event.eventType !== 'birthday'

  return (
    <div className="w-full min-h-[100dvh] bg-[#FAF8F5] overflow-x-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER ═══════ */
          <motion.div key="cover" exit={{ opacity: 0, y: -50, filter: 'blur(8px)' }} transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2B2521] cursor-pointer p-4 md:p-10" onClick={handleOpen}>
            <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-auto md:h-full border border-[#C49B5B]/30 rounded flex flex-col items-center justify-center overflow-hidden">
              <CornerFlourish className="top-4 left-4" />
              <CornerFlourish className="top-4 right-4 rotate-90" />
              <CornerFlourish className="bottom-4 left-4 -rotate-90" />
              <CornerFlourish className="bottom-4 right-4 rotate-180" />
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center px-4 w-full">
                <span className="text-[10px] md:text-xs text-[#C49B5B] tracking-[0.4em] uppercase mb-4 block font-sans">You are invited</span>
                <div className="h-[1px] w-16 bg-[#C49B5B]/40 mx-auto my-6" />
                <h2 className="text-[#FAF8F5] text-3xl md:text-5xl font-light italic mb-8 break-words whitespace-normal px-2">
                  {isGrad ? 'Lễ Tốt Nghiệp' : 'Tiệc Sinh Nhật'}
                </h2>
                <p className="text-[#C49B5B] text-xs md:text-sm tracking-widest font-sans uppercase mb-12 break-words max-w-full px-2">{event.hostName}</p>
                <motion.button animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="px-6 md:px-8 py-3 rounded border border-[#C49B5B] text-[#C49B5B] bg-[#C49B5B]/5 font-sans tracking-widest text-[10px] md:text-xs uppercase hover:bg-[#C49B5B] hover:text-[#2B2521] transition-all">
                  Mở Lời Mời
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ═══════ MAIN VINTAGE CARD ═══════ */
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="relative w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-12 bg-[#FAF8F5]">
            
            {/* Vintage Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
              }}
            />

            {/* Falling Petals Background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[10%] left-[20%] w-4 h-4 bg-[#C49B5B]/30 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '4s' }} />
              <div className="absolute top-[40%] left-[80%] w-3 h-5 bg-[#C49B5B]/20 rounded-tr-xl rounded-bl-xl rotate-45 animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute top-[70%] left-[10%] w-5 h-3 bg-[#C49B5B]/25 rounded-tl-xl rounded-br-xl -rotate-12 animate-pulse" style={{ animationDuration: '5s' }} />
            </div>

            <div className="relative w-full max-w-4xl min-h-[90vh] md:min-h-[80vh] border border-[#2B2521]/15 bg-[#FAF8F5] p-5 md:p-16 flex flex-col items-center justify-center shadow-2xl">
              
              {/* Corner flourishes */}
              <CornerFlourish className="top-3 left-3 md:top-4 md:left-4" />
              <CornerFlourish className="top-3 right-3 md:top-4 md:right-4 rotate-90" />
              <CornerFlourish className="bottom-3 left-3 md:bottom-4 md:left-4 -rotate-90" />
              <CornerFlourish className="bottom-3 right-3 md:bottom-4 md:right-4 rotate-180" />

              {/* Double border for elegant framing */}
              <div className="absolute inset-2 md:inset-3 border border-[#C49B5B]/20 pointer-events-none" />
              <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#C49B5B]/10 pointer-events-none" />

              {/* Card Content */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-2xl text-center z-10 flex flex-col items-center py-8 px-2 md:px-0">
                
                {/* University Logo if present */}
                {event.universityLogo && (
                  <img src={event.universityLogo} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-4 md:mb-6 grayscale opacity-80 mix-blend-multiply" alt="" />
                )}
                
                <h4 className="text-[10px] md:text-sm font-sans tracking-[0.3em] text-[#C49B5B] uppercase mb-4 break-words max-w-full px-4">
                  {event.universityName || 'INVITATION'}
                </h4>
                
                <div className="h-[1px] w-12 bg-[#C49B5B]/40 my-3 md:my-4" />

                {/* Dear guests */}
                <div className="my-4 md:my-6 w-full px-4">
                  <span className="text-sm md:text-base italic text-gray-500 font-serif block mb-1">Kính gửi</span>
                  <h3 className="text-xl md:text-3xl font-light text-[#2B2521] border-b border-[#C49B5B]/40 px-4 md:px-8 pb-2 mt-2 inline-block break-words max-w-full">
                    {guestName}
                  </h3>
                </div>

                <p className="text-xs md:text-base text-gray-600 font-sans italic tracking-wide mt-3 mb-2 px-4 leading-relaxed">
                  {isGrad ? 'Thân mời bạn đến chung vui buổi lễ tốt nghiệp của' : 'Thân mời bạn đến dự bữa tiệc sinh nhật của'}
                </p>

                {/* Host Name */}
                <h1 className="text-4xl md:text-[4.2rem] font-light text-[#2B2521] tracking-wide my-4 md:my-6 font-serif break-words whitespace-normal w-full px-2">
                  {event.hostName}
                </h1>

                {/* Event Title */}
                <h2 className="text-xl md:text-4xl font-light tracking-[0.2em] text-[#C49B5B] uppercase mb-1 md:mb-2 break-words max-w-full px-2">
                  {event.title}
                </h2>
                
                <p className="text-[10px] md:text-sm text-gray-500 font-sans tracking-[0.15em] uppercase mb-8 md:mb-10 break-words max-w-full px-4">
                  {event.subtitle}
                </p>

                {/* Timeline and details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 w-full max-w-xl border-t border-b border-[#C49B5B]/30 py-6 md:py-8 my-4">
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[9px] md:text-[10px] text-[#C49B5B] font-sans tracking-widest uppercase mb-1 md:mb-2">Thời gian</span>
                    <span className="text-base md:text-lg font-medium text-[#2B2521] break-words text-center">{event.timeLine1}</span>
                    <span className="text-xs md:text-sm font-light text-[#2B2521] uppercase tracking-wider mt-1">{event.timeLine2}</span>
                    <span className="text-[10px] md:text-xs text-gray-500 mt-1">{event.timeLine3}</span>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <span className="text-[9px] md:text-[10px] text-[#C49B5B] font-sans tracking-widest uppercase mb-1 md:mb-2">Địa điểm</span>
                    <span className="text-sm md:text-base font-medium text-[#2B2521] break-words text-center">{event.locationLine1}</span>
                    <span className="text-[10px] md:text-xs text-gray-500 mt-2 leading-relaxed max-w-[220px] text-center">{event.locationLine2}</span>
                  </div>
                </div>
                </div>

                {/* Footer Message */}
                <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed max-w-lg mt-8 px-4">
                  "{event.footerMessage}"
                </p>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

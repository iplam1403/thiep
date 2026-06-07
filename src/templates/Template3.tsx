// @ts-nocheck
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props { event: IEvent; guestName: string }

/* Elegant Noir Gold flourish decoration for corners */
const CornerFlourish = ({ className = '' }) => (
  <svg className={`w-10 h-10 md:w-16 md:h-16 text-[#D4AF37] opacity-80 absolute ${className}`} viewBox="0 0 100 100" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5">
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BF953F" />
        <stop offset="25%" stopColor="#FCF6BA" />
        <stop offset="50%" stopColor="#B38728" />
        <stop offset="75%" stopColor="#FBF5B7" />
        <stop offset="100%" stopColor="#AA771C" />
      </linearGradient>
    </defs>
    <path d="M10,10 L90,10 M10,10 L10,90" />
    <path d="M10,10 C30,20 20,30 10,40 C15,30 30,15 40,10" />
    <circle cx="15" cy="15" r="2" fill="url(#gold-grad)" stroke="none" />
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
    <div className="w-full min-h-[100dvh] bg-[#0A0A0C] overflow-x-hidden" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Global CSS for Gold Foil Text */}
      <style>{`
        .gold-foil {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }
      `}</style>
      
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER (NOIR & GOLD) ═══════ */
          <motion.div key="cover" exit={{ opacity: 0, y: -50, filter: 'blur(8px)' }} transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C] cursor-pointer p-4 md:p-10" onClick={handleOpen}>
            
            {/* Subtle radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#B38728]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-auto md:h-full border border-[#D4AF37]/20 rounded flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0C] shadow-[0_0_50px_rgba(212,175,55,0.05)]">
              <CornerFlourish className="top-4 left-4" />
              <CornerFlourish className="top-4 right-4 rotate-90" />
              <CornerFlourish className="bottom-4 left-4 -rotate-90" />
              <CornerFlourish className="bottom-4 right-4 rotate-180" />
              
              <div className="absolute inset-2 border-[0.5px] border-[#D4AF37]/10 pointer-events-none" />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center px-4 w-full">
                <span className="text-[9px] md:text-[10px] text-[#D4AF37] tracking-[0.5em] uppercase mb-4 block font-sans">You are invited</span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto my-6" />
                <h2 className="text-3xl md:text-5xl font-light italic mb-8 break-words whitespace-normal px-2 gold-foil">
                  {isGrad ? 'Lễ Tốt Nghiệp' : 'Tiệc Sinh Nhật'}
                </h2>
                <p className="text-[#D4AF37]/80 text-[10px] md:text-xs tracking-[0.4em] font-sans uppercase mb-12 break-words max-w-full px-2">{event.hostName}</p>
                <motion.button animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 15px rgba(212,175,55,0.2)", "0 0 0px rgba(212,175,55,0)"] }} transition={{ duration: 2.5, repeat: Infinity }}
                  className="px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] bg-transparent font-sans tracking-[0.3em] text-[10px] uppercase hover:bg-[#D4AF37]/10 transition-all">
                  Open Invitation
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ═══════ MAIN GATSBY CARD ═══════ */
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="relative w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-12 bg-[#0A0A0C]">
            
            {/* Velvet Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
              }}
            />

            {/* Subtle Gold Dust Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute top-[60%] left-[85%] w-2 h-2 bg-[#D4AF37] rounded-full blur-[2px] animate-pulse" style={{ animationDuration: '5s' }} />
              <div className="absolute top-[80%] left-[25%] w-1.5 h-1.5 bg-[#FCF6BA] rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '4s' }} />
            </div>

            <div className="relative w-full max-w-3xl min-h-[90vh] md:min-h-[85vh] border border-[#D4AF37]/30 bg-[#0A0A0C]/80 backdrop-blur-md p-6 md:p-16 flex flex-col items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              
              {/* Corner flourishes */}
              <CornerFlourish className="top-4 left-4 md:top-6 md:left-6" />
              <CornerFlourish className="top-4 right-4 md:top-6 md:right-6 rotate-90" />
              <CornerFlourish className="bottom-4 left-4 md:bottom-6 md:left-6 -rotate-90" />
              <CornerFlourish className="bottom-4 right-4 md:bottom-6 md:right-6 rotate-180" />

              {/* Double border for elegant framing */}
              <div className="absolute inset-3 md:inset-5 border border-[#D4AF37]/20 pointer-events-none" />
              <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#D4AF37]/10 pointer-events-none" />

              {/* Card Content */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-2xl text-center z-10 flex flex-col items-center py-10 px-2 md:px-0">
                
                {/* University Logo if present */}
                {event.universityLogo && (
                  <div className="p-3 rounded-full border border-[#D4AF37]/30 bg-[#111] mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    <img src={event.universityLogo} className="w-10 h-10 md:w-16 md:h-16 object-contain grayscale opacity-90 contrast-125 sepia-[.3]" alt="" />
                  </div>
                )}
                
                <h4 className="text-[9px] md:text-[10px] font-sans tracking-[0.15em] md:tracking-[0.4em] text-[#D4AF37] uppercase mb-4 px-2 whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-full font-light">
                  {event.universityName || 'INVITATION'}
                </h4>
                
                <div className="flex items-center justify-center gap-2 my-4">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                  <span className="text-[#D4AF37] text-[10px]">❖</span>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                </div>

                {/* Dear guests */}
                <div className="my-6 md:my-8 w-full px-4 flex flex-col items-center">
                  <span className="text-xs md:text-sm italic text-[#D4AF37]/60 font-serif mb-2">Guest of Honor</span>
                  <h3 className="text-xl md:text-3xl font-light text-white tracking-[0.1em] border-b border-[#D4AF37]/30 pb-2 mt-1 uppercase">
                    {guestName}
                  </h3>
                </div>

                <p className="text-[10px] md:text-xs text-[#D4AF37]/70 font-sans tracking-[0.2em] uppercase mt-2 mb-4 px-4 leading-relaxed font-light">
                  {isGrad ? 'Thân mời bạn đến chung vui buổi lễ tốt nghiệp của' : 'Thân mời bạn đến dự bữa tiệc sinh nhật của'}
                </p>

                {/* Host Name */}
                <h1 className="text-[2rem] md:text-[3.5rem] font-light tracking-[0.15em] my-6 md:my-8 font-serif break-words whitespace-normal w-full px-2 gold-foil uppercase leading-[1.1]">
                  {event.hostName}
                </h1>

                {/* Event Title */}
                <h2 className="text-lg md:text-2xl font-light tracking-[0.3em] text-white uppercase mb-2 break-words max-w-full px-2 opacity-90">
                  {event.title}
                </h2>
                
                <p className="text-[8px] md:text-[10px] text-[#D4AF37]/60 font-sans tracking-[0.4em] uppercase mb-12 break-words max-w-full px-4">
                  {event.subtitle}
                </p>

                {/* Timeline and details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-lg border-t border-b border-[#D4AF37]/20 py-8 my-4 relative">
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
                  
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[8px] md:text-[9px] text-[#D4AF37]/80 font-sans tracking-[0.4em] uppercase mb-3">Thời gian</span>
                    <span className="text-base md:text-lg font-light tracking-widest text-white uppercase">{event.timeLine1}</span>
                    <span className="text-[10px] md:text-xs font-light text-[#D4AF37] uppercase tracking-[0.2em] mt-1">{event.timeLine2}</span>
                    <span className="text-[9px] md:text-[10px] text-white/50 mt-2 tracking-widest">{event.timeLine3}</span>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <span className="text-[8px] md:text-[9px] text-[#D4AF37]/80 font-sans tracking-[0.4em] uppercase mb-3">Địa điểm</span>
                    <span className="text-sm md:text-base font-light tracking-[0.15em] text-white uppercase leading-relaxed text-center">{event.locationLine1}</span>
                    <span className="text-[9px] md:text-[10px] text-white/50 mt-3 leading-relaxed tracking-widest max-w-[200px] text-center">{event.locationLine2}</span>
                  </div>
                </div>

                {/* Footer Message */}
                <p className="text-[10px] md:text-xs text-[#D4AF37]/50 italic leading-relaxed max-w-md mt-10 px-4 tracking-wider">
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

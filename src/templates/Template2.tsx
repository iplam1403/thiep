// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props { event: IEvent; guestName: string }

function Reveal({ children, className = '', delay = 0 }: any) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

function Particles({ count = 25 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
            background: `rgba(${130 + Math.random()*60}, ${140 + Math.random()*60}, 248, ${0.15 + Math.random()*0.25})`,
          }}
          animate={{
            y: [0, -(20 + Math.random() * 40), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function Countdown({ dateStr }: { dateStr: string }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const parts = dateStr?.match(/(\d+)/g)
  if (!parts || parts.length < 3) return null
  const target = new Date(+parts[2], +parts[1] - 1, +parts[0]).getTime()
  const diff = Math.max(0, target - now)
  if (diff <= 0) return null
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const items = [
    { val: d, label: 'Ngày' }, { val: h, label: 'Giờ' },
    { val: m, label: 'Phút' }, { val: s, label: 'Giây' },
  ]
  return (
    <div className="flex items-center justify-center gap-3">
      {items.map((it, i) => (
        <div key={i} className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center mb-2">
            <motion.span key={it.val} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}
              className="text-xl font-bold text-white">{String(it.val).padStart(2, '0')}</motion.span>
          </div>
          <span className="text-[8px] text-slate-500 uppercase tracking-widest">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Template2({ event, guestName }: Props) {
  const [opened, setOpened] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  const fireConfetti = () => {
    const end = Date.now() + 3000
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 50, origin: { x: 0, y: 0.3 }, colors: ['#6366f1','#818cf8','#c4b5fd','#fff'], gravity: 0.8 })
      confetti({ particleCount: 3, angle: 120, spread: 50, origin: { x: 1, y: 0.3 }, colors: ['#6366f1','#818cf8','#c4b5fd','#fff'], gravity: 0.8 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleOpen = () => {
    setOpened(true)
    setTimeout(fireConfetti, 400)
  }

  const isGrad = event.eventType !== 'birthday'

  return (
    <div ref={containerRef} className="w-full min-h-[100dvh] bg-[#000000] overflow-x-hidden text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER (ETHEREAL AURORA) ═══════ */
          <motion.div key="cover"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] cursor-pointer overflow-hidden"
            onClick={handleOpen}
          >
            <Particles count={40} />
            
            {/* Massive Aurora Glows */}
            <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-fuchsia-600/20 to-cyan-500/20 rounded-full blur-[150px] opacity-70" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
              className="relative z-10 text-center px-8 w-full flex flex-col items-center">

              {/* Minimalist Tech Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 mx-auto mb-10 relative flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border-[0.5px] border-white/20" />
                <div className="absolute inset-2 rounded-full border-[0.5px] border-white/10 border-t-white/40" />
                <span className="text-white text-4xl font-light tracking-widest" style={{ transform: 'none', fontFamily: "'Playfair Display', serif" }}>
                  {event.hostName.charAt(0)}
                </span>
              </motion.div>

              <p className="text-white/40 text-[9px] tracking-[0.5em] uppercase mb-4 font-medium">Invitation</p>
              <h2 className="text-3xl font-light text-white mb-3 tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {isGrad ? 'Graduation' : 'Birthday'}
              </h2>
              <p className="text-white/50 text-xs mb-16 tracking-[0.3em] font-light uppercase">of {event.hostName}</p>

              <motion.div animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(255,255,255,0.1)", "0 0 0 10px rgba(255,255,255,0)", "0 0 0 0 rgba(255,255,255,0)"] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl">
                <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase">Tap to unlock</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══════ MAIN CONTENT ═══════ */
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <Particles count={30} />

            {/* ── HERO AURORA ── */}
            <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden w-full">
              <motion.div style={{ rotate: bgRotate }}
                className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-30 pointer-events-none">
                <div className="w-full h-full" style={{ background: 'conic-gradient(from 180deg at 50% 50%, #4f46e5 0deg, #c026d3 90deg, #06b6d4 180deg, #000000 270deg, #4f46e5 360deg)', filter: 'blur(100px)' }} />
              </motion.div>
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full" />
              
              <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center">
                {event.universityLogo && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
                    className="w-16 h-16 md:w-24 md:h-24 bg-white/[0.02] backdrop-blur-3xl p-4 rounded-full border border-white/[0.1] shadow-[0_0_50px_rgba(255,255,255,0.05)] mx-auto mb-8">
                    <img src={event.universityLogo} className="w-full h-full object-contain filter drop-shadow-lg" alt="" />
                  </motion.div>
                )}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="w-full">
                  <p className="text-[10px] md:text-[11px] text-white/60 font-light tracking-[0.4em] uppercase mb-2 break-words whitespace-normal">{event.universityName}</p>
                  <p className="text-[7px] md:text-[8px] text-white/30 tracking-[0.3em] uppercase">{event.universitySubName}</p>
                </motion.div>

                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                  className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-10" />

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
                  <p className="text-[9px] md:text-[10px] text-white/40 tracking-[0.5em] uppercase mb-6 font-light">
                    {isGrad ? 'Thân mời dự lễ tốt nghiệp của' : 'Thân mời dự tiệc sinh nhật của'}
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1.5 }}>
                  <h1 className="text-[3rem] md:text-[5rem] font-light tracking-[0.15em] uppercase leading-[1.1] mb-4 break-words whitespace-normal drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {event.hostName}
                  </h1>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
                  <h2 className="text-xl md:text-2xl font-light text-white/80 tracking-[0.4em] uppercase mt-4">
                    {event.title}
                  </h2>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
                <p className="text-[7px] text-white/30 tracking-[0.4em] uppercase font-light">Scroll</p>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[1px] h-[30px] bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
              </motion.div>
            </div>

            {/* ── DETAILS (ULTRA-FROSTED GLASS) ── */}
            <div className="py-24 md:py-32 px-4 md:px-6 w-full relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]" />
              </div>
              <Reveal className="w-full max-w-2xl mx-auto">
                <div className="relative bg-white/[0.015] backdrop-blur-[40px] border border-white/[0.05] rounded-xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  
                  {/* Guest Name Section integrated into the glass pane */}
                  <div className="p-10 md:p-16 border-b border-white/[0.05] text-center">
                    <p className="text-[8px] md:text-[9px] text-white/40 tracking-[0.4em] uppercase mb-6 font-light">Guest of Honor</p>
                    <h3 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{guestName}</h3>
                  </div>

                  {/* Time & Location Grid */}
                  <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                    <div className="flex flex-col items-center text-center">
                      <p className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.4em] mb-4 font-light">Time</p>
                      <p className="text-lg md:text-2xl font-light text-white mb-2 tracking-widest uppercase">{event.timeLine1}</p>
                      <p className="text-sm md:text-md font-light text-white/70 tracking-[0.2em] uppercase mb-1">{event.timeLine2}</p>
                      <p className="text-[9px] md:text-[10px] text-white/40 tracking-[0.2em] uppercase">{event.timeLine3}</p>
                    </div>
                    
                    <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-transparent via-white/[0.1] to-transparent absolute left-1/2 -translate-x-1/2 bottom-16" />
                    
                    <div className="flex flex-col items-center text-center">
                      <p className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.4em] mb-4 font-light">Location</p>
                      <p className="text-lg md:text-xl font-light text-white mb-2 tracking-widest uppercase leading-tight">{event.locationLine1}</p>
                      <p className="text-[10px] md:text-[11px] font-light text-white/50 tracking-[0.1em] uppercase leading-relaxed max-w-[200px]">{event.locationLine2}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── FOOTER ── */}
            <div className="relative py-24 md:py-32 px-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px]" />
              </div>
              <Reveal className="text-center max-w-lg mx-auto relative z-10 flex flex-col items-center">
                <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/20 mb-8" />
                <p className="text-xs md:text-sm text-white/50 font-light italic leading-relaxed tracking-[0.1em]">"{event.footerMessage}"</p>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent mt-8 mb-10" />
                <p className="text-lg md:text-xl font-light tracking-[0.3em] uppercase text-white/80"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {event.hostName}
                </p>
              </Reveal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

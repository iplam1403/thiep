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
    <div ref={containerRef} className="w-full min-h-[100dvh] bg-[#050816] overflow-x-hidden text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER ═══════ */
          <motion.div key="cover"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] cursor-pointer overflow-hidden"
            onClick={handleOpen}
          >
            <Particles count={30} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px]" />

            {/* Grid bg */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="relative z-10 text-center px-8">

              {/* Hexagon icon */}
              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 rotate-45" />
                <div className="absolute inset-2 rounded-2xl border border-indigo-500/15 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-indigo-300 text-3xl font-bold" style={{ transform: 'none' }}>
                    {event.hostName.charAt(0)}
                  </span>
                </div>
              </motion.div>

              <p className="text-indigo-400/50 text-[10px] tracking-[0.3em] uppercase mb-3">Bạn nhận được lời mời</p>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 mb-2 tracking-wide">
                {isGrad ? 'Lễ Tốt Nghiệp' : 'Tiệc Sinh Nhật'}
              </h2>
              <p className="text-slate-500 text-xs mb-14 tracking-wider">từ {event.hostName}</p>

              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-indigo-500/25 bg-indigo-500/5 backdrop-blur-xl">
                <span className="text-indigo-300/80 text-sm font-medium tracking-wider">Nhấn để mở</span>
                <svg className="w-4 h-4 text-indigo-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══════ MAIN ═══════ */
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Particles count={20} />

            {/* ── HERO ── */}
            <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden w-full">
              <motion.div style={{ rotate: bgRotate }}
                className="absolute top-[-30%] left-[-30%] w-[160%] h-[160%] opacity-[0.1] pointer-events-none">
                <div className="w-full h-full" style={{ background: 'conic-gradient(from 0deg at 50% 50%, #6366f1 0deg, transparent 90deg, transparent 270deg, #3b82f6 360deg)' }} />
              </motion.div>
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full" />
              <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full" />
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
              <div className="absolute inset-4 md:inset-8 border border-white/[0.05] rounded-2xl pointer-events-none z-20" />

              <div className="relative z-10 text-center px-4 md:px-8 max-w-full w-full">
                {event.universityLogo && (
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/[0.05] backdrop-blur-2xl p-3 rounded-3xl border border-white/[0.08] shadow-[0_0_40px_rgba(99,102,241,0.12)] mx-auto mb-6 md:mb-8">
                    <img src={event.universityLogo} className="w-full h-full object-contain" alt="" />
                  </motion.div>
                )}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full">
                  <p className="text-[9px] md:text-[10px] text-indigo-400 font-semibold tracking-[0.25em] uppercase mb-0.5 break-words whitespace-normal">{event.universityName}</p>
                  <p className="text-[7px] md:text-[8px] text-slate-500 tracking-[0.2em] uppercase break-words whitespace-normal">{event.universitySubName}</p>
                </motion.div>

                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8 }}
                  className="h-[1px] w-24 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mx-auto my-8 md:my-10" />

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                  <p className="text-[10px] md:text-[11px] text-slate-400 tracking-[0.25em] uppercase mb-4 md:mb-6 font-medium">
                    {isGrad ? 'Thân mời bạn đến dự' : 'Trân trọng kính mời bạn'}
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 1 }}>
                  <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] font-black uppercase tracking-[0.1em] leading-[1.15] mb-3 break-words whitespace-normal max-w-[90%] mx-auto"
                    style={{
                      background: 'linear-gradient(180deg, #fff 0%, #c7d2fe 40%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 25px rgba(99,102,241,0.25))'
                    }}>{event.title}</h1>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                  className="flex items-center justify-center gap-3 mt-4">
                  <div className="h-[1px] w-6 md:w-8 bg-indigo-500/30" />
                  <p className="text-[9px] md:text-[11px] text-indigo-300/60 tracking-[0.3em] uppercase font-medium">{event.subtitle}</p>
                  <div className="h-[1px] w-6 md:w-8 bg-indigo-500/30" />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
                <p className="text-[8px] text-slate-600 tracking-[0.2em] uppercase">Cuộn xuống</p>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-[18px] h-[28px] rounded-full border border-indigo-500/25 flex justify-center pt-1.5">
                  <div className="w-[3px] h-[6px] bg-indigo-400/50 rounded-full" />
                </motion.div>
              </motion.div>
            </div>

            {/* ── GUEST NAME ── */}
            <div className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 md:w-72 md:h-72 bg-indigo-600/6 rounded-full blur-[110px]" />
              </div>
              <Reveal className="text-center relative z-10 w-full">
                <p className="text-[9px] md:text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-3">Kính gửi</p>
                <div className="relative inline-block my-4 md:my-6 max-w-full">
                  <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-3xl scale-150" />
                  <div className="relative px-6 md:px-12 py-5 md:py-6 w-full break-words whitespace-normal">
                    {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
                      <div key={i} className={`absolute w-4 h-4 md:w-6 md:h-6 ${c} border-indigo-400/25`} />
                    ))}
                    <h3 className="text-2xl md:text-4xl font-bold tracking-[0.1em] capitalize">{guestName}</h3>
                  </div>
                </div>
                <div className="h-[1px] w-16 md:w-20 bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent mx-auto my-6 md:my-8" />
                <p className="text-[10px] md:text-xs text-slate-500 tracking-widest uppercase">
                  {isGrad ? 'Tới dự lễ tốt nghiệp của' : 'Tới chung vui sinh nhật của'}
                </p>
                <p className="text-xl md:text-2xl font-bold mt-2 md:mt-3 tracking-[0.1em] uppercase break-words whitespace-normal"
                  style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {event.hostName}
                </p>
              </Reveal>
            </div>

            {/* ── COUNTDOWN ── */}
            <div className="py-16 md:py-24 px-4 md:px-6">
              <Reveal className="text-center w-full max-w-sm mx-auto flex flex-col items-center">
                <p className="text-[9px] md:text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-6 md:mb-8 font-medium">Đếm ngược</p>
                <div className="scale-90 sm:scale-100 transform origin-center">
                  <Countdown dateStr={event.timeLine3} />
                </div>
              </Reveal>
            </div>

            {/* ── DETAILS ── */}
            <div className="py-16 md:py-20 px-4 md:px-6 w-full">
              <Reveal className="w-full max-w-sm mx-auto">
                <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.05)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/5" />
                  <div className="relative z-10 p-6 md:p-8 space-y-0">
                    <div className="flex items-start gap-4 md:gap-5 py-4 md:py-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 shadow-inner">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div className="flex-1 w-0">
                        <p className="text-[8px] md:text-[9px] text-indigo-400 uppercase tracking-[0.2em] mb-1.5 md:mb-2 font-semibold">Thời gian</p>
                        <p className="text-lg md:text-xl font-bold text-white mb-1 break-words whitespace-normal">{event.timeLine1}</p>
                        <p className="text-xs md:text-sm text-slate-400 break-words whitespace-normal">{event.timeLine2} &bull; {event.timeLine3}</p>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    <div className="flex items-start gap-4 md:gap-5 py-4 md:py-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      </div>
                      <div className="flex-1 w-0">
                        <p className="text-[8px] md:text-[9px] text-blue-400 uppercase tracking-[0.2em] mb-1.5 md:mb-2 font-semibold">Địa điểm</p>
                        <p className="text-base md:text-lg font-bold text-white mb-1 break-words whitespace-normal">{event.locationLine1}</p>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed break-words whitespace-normal">{event.locationLine2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── FOOTER ── */}
            <div className="relative py-32 px-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 bg-indigo-600/5 rounded-full blur-[90px]" />
              </div>
              <Reveal className="text-center max-w-sm mx-auto relative z-10">
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-indigo-500/20" />
                  <div className="text-indigo-400/25 text-[10px] tracking-[0.3em]">✦ ✦ ✦</div>
                  <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-indigo-500/20" />
                </div>
                <p className="text-sm text-slate-400 italic leading-[2]">"{event.footerMessage}"</p>
                <p className="text-2xl font-bold mt-12 tracking-[0.1em] uppercase"
                  style={{ background: 'linear-gradient(135deg, rgba(165,180,252,0.2), rgba(129,140,248,0.1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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

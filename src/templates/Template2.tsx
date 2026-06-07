// @ts-nocheck
import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props {
  event: IEvent;
  guestName: string;
}

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Template2({ event, guestName }: Props) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    const duration = 3 * 1000
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0, y: 0.3 }, colors: ['#1d4ed8', '#818cf8', '#c4b5fd', '#fff'] })
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1, y: 0.3 }, colors: ['#1d4ed8', '#818cf8', '#c4b5fd', '#fff'] })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    setTimeout(frame, 800)
  }, [])

  const isGrad = event.eventType !== 'birthday'

  return (
    <div ref={containerRef} className="w-full min-h-[100dvh] bg-[#060918] overflow-x-hidden text-white" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>

      {/* ═══════════ HERO ═══════════ */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Animated background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-40%] left-[-40%] w-[180%] h-[180%] opacity-15"
            style={{ background: 'conic-gradient(from 0deg at 50% 50%, #3b82f6 0deg, transparent 60deg, transparent 300deg, #6366f1 360deg)' }}
          />
        </motion.div>
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          {event.universityLogo && (
            <div className="w-20 h-20 bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)] mx-auto mb-8">
              <img src={event.universityLogo} className="w-full h-full object-contain" alt="Logo" />
            </div>
          )}
          <p className="text-[10px] text-blue-400 font-bold tracking-[0.25em] uppercase mb-1">{event.universityName}</p>
          <p className="text-[9px] text-slate-500 tracking-[0.2em] uppercase mb-12">{event.universitySubName}</p>

          <p className="text-xs text-slate-400 tracking-[0.3em] uppercase mb-6 font-medium">
            {isGrad ? 'Trân trọng kính mời' : 'Mời bạn đến chung vui'}
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 tracking-wide uppercase mb-4 drop-shadow-[0_0_30px_rgba(99,102,241,0.4)] leading-tight">
            {event.title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-blue-500/50" />
            <p className="text-sm text-blue-300 tracking-[0.3em] uppercase font-medium">{event.subtitle}</p>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <p className="text-[9px] text-slate-500 tracking-widest uppercase">Cuộn xuống</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-blue-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════ GUEST NAME ═══════════ */}
      <div className="py-28 px-8 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>
        <RevealSection className="text-center relative z-10">
          <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase mb-8 font-medium">Kính gửi</p>
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-3xl" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            <h3 className="relative text-3xl md:text-4xl font-bold text-white tracking-wider capitalize px-8 py-4">
              {guestName}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-8 tracking-widest uppercase">
            {isGrad ? 'Tới dự lễ tốt nghiệp của' : 'Tới chung vui sinh nhật của'}
          </p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mt-3 tracking-wider uppercase">
            {event.hostName}
          </p>
        </RevealSection>
      </div>

      {/* ═══════════ DETAILS ═══════════ */}
      <div className="py-20 px-8">
        <RevealSection className="max-w-sm mx-auto">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 space-y-8">
            {/* Time */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest mb-2 font-medium">Thời gian</p>
                <p className="text-lg font-bold text-white mb-1">{event.timeLine1}</p>
                <p className="text-sm text-slate-400">{event.timeLine2} &bull; {event.timeLine3}</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/[0.06]" />

            {/* Location */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-2 font-medium">Địa điểm</p>
                <p className="text-base font-bold text-white mb-1">{event.locationLine1}</p>
                <p className="text-sm text-slate-400">{event.locationLine2}</p>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="py-28 px-8">
        <RevealSection className="text-center max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/30" />
            <div className="text-blue-400/40 text-xs tracking-widest">✦ ✦ ✦</div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/30" />
          </div>
          <p className="text-sm text-slate-500 italic leading-relaxed">
            "{event.footerMessage}"
          </p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400/30 to-indigo-400/30 mt-10 tracking-wider uppercase">
            {event.hostName}
          </p>
        </RevealSection>
      </div>
    </div>
  )
}

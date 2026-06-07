// @ts-nocheck
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props {
  event: IEvent;
  guestName: string;
}

function Section({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Template1({ event, guestName }: Props) {
  useEffect(() => {
    const duration = 3 * 1000
    const end = Date.now() + duration
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.3 }, colors: ['#991b1b', '#f59e0b', '#fcd34d', '#fff'] })
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.3 }, colors: ['#991b1b', '#f59e0b', '#fcd34d', '#fff'] })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    setTimeout(frame, 800)
  }, [])

  const isGrad = event.eventType !== 'birthday'

  return (
    <div className="w-full min-h-[100dvh] bg-[#fdfaf5] overflow-x-hidden" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-200/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-900/10 rounded-full blur-[100px]" />

        {/* Ribbon decoration */}
        <motion.div
          initial={{ y: '-110%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-[8%] w-16 md:w-20 h-[70%] bg-gradient-to-b from-[#8B1A1A] via-[#5C0A0A] to-[#8B1A1A] z-10 shadow-[0_10px_40px_rgba(92,10,10,0.4)]"
        >
          <div className="absolute inset-1 border border-amber-400/30" />
          <div className="flex flex-col items-center pt-8 h-full relative z-10">
            <div className="text-amber-300 text-xl mb-4 drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]">✦</div>
            {event.universityLogo ? (
              <img src={event.universityLogo} className="w-10 h-10 object-contain bg-white/90 rounded-full p-1 shadow-md" alt="Logo" />
            ) : null}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-amber-200/70 text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {isGrad ? "BACHELOR'S DEGREE" : 'BIRTHDAY PARTY'}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-8 left-0 w-full h-8 flex">
            <div className="w-1/2 h-full bg-[#5C0A0A]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
            <div className="w-1/2 h-full bg-[#5C0A0A]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center max-w-xs mx-auto"
        >
          {event.universityLogo && (
            <img src={event.universityLogo} className="w-14 h-14 object-contain mx-auto mb-4" alt="Logo" />
          )}
          <p className="text-[10px] text-[#1e3a8a] font-bold tracking-[0.2em] uppercase mb-1">{event.universityName}</p>
          <p className="text-[8px] text-gray-400 tracking-[0.15em] uppercase mb-10">{event.universitySubName}</p>

          <p className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-3 font-medium">
            {isGrad ? 'Thân mời bạn đến dự' : 'Trân trọng kính mời'}
          </p>

          <h1 className="text-5xl md:text-6xl text-[#C49B5B] leading-none mb-6 -rotate-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {event.hostName}
          </h1>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#5C0A0A] tracking-[0.1em] uppercase leading-tight mb-3" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            {event.title}
          </h2>
          <p className="text-xs text-[#7A1515]/60 tracking-[0.4em] uppercase font-semibold">{event.subtitle}</p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <p className="text-[9px] text-gray-400 tracking-widest uppercase">Cuộn xuống</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════ GUEST NAME SECTION ═══════════ */}
      <div className="relative py-24 px-8 bg-gradient-to-b from-[#fdfaf5] via-[#f8f0e3] to-[#fdfaf5]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 bg-amber-200/20 rounded-full blur-[80px]" />
        </div>
        <Section className="text-center relative z-10">
          <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-6 font-medium">Kính gửi</p>
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent rounded-2xl" />
            <h3 className="relative text-3xl md:text-4xl font-bold text-[#5C0A0A] uppercase tracking-wider px-8 py-4">
              {guestName}
            </h3>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
            <div className="text-amber-400 text-sm">✦</div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
        </Section>
      </div>

      {/* ═══════════ TIME & DATE ═══════════ */}
      <div className="py-20 px-8">
        <Section className="text-center max-w-xs mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#5C0A0A]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-5 h-5 text-[#5C0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-4 font-medium">Thời gian</p>
          <p className="text-2xl font-bold text-[#5C0A0A] mb-2">{event.timeLine1}</p>
          <p className="text-base font-semibold text-[#3a2e2b] mb-1">{event.timeLine2}</p>
          <p className="text-sm text-gray-500">{event.timeLine3}</p>
        </Section>
      </div>

      {/* ═══════════ LOCATION ═══════════ */}
      <div className="py-20 px-8 bg-gradient-to-b from-[#fdfaf5] via-[#f5ede0] to-[#fdfaf5]">
        <Section className="text-center max-w-xs mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#5C0A0A]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-5 h-5 text-[#5C0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          </div>
          <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mb-4 font-medium">Địa điểm</p>
          <p className="text-lg font-bold text-[#5C0A0A] uppercase tracking-wide mb-2">{event.locationLine1}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{event.locationLine2}</p>
        </Section>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="py-24 px-8">
        <Section className="text-center max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/40" />
            <div className="text-amber-400/60 text-xs">✦ ✦ ✦</div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
          </div>
          <p className="text-sm text-gray-500 italic leading-relaxed" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            "{event.footerMessage}"
          </p>
          <div className="mt-12 text-4xl text-[#C49B5B]/40" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {event.hostName}
          </div>
        </Section>
      </div>
    </div>
  )
}

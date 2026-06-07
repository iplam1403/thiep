// @ts-nocheck
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props { event: IEvent; guestName: string }

export default function Template4({ event, guestName }: Props) {
  const [opened, setOpened] = useState(false)

  const fireConfetti = () => {
    const end = Date.now() + 2500
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.4 }, colors: ['#ff007f', '#00f0ff', '#ffffff', '#7000ff'], gravity: 0.8 })
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.4 }, colors: ['#ff007f', '#00f0ff', '#ffffff', '#7000ff'], gravity: 0.8 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleOpen = () => { setOpened(true); setTimeout(fireConfetti, 400) }
  const isGrad = event.eventType !== 'birthday'

  return (
    <div className="w-full min-h-[100dvh] bg-[#05050C] overflow-x-hidden text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER ═══════ */
          <motion.div key="cover" exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05050c] cursor-pointer" onClick={handleOpen}>
            
            {/* Neon Glow Spots */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#ff007f]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00f0ff]/10 rounded-full blur-[120px]" />
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 text-center px-6">
              {/* Spinning Neon Rings */}
              <div className="w-24 h-24 mx-auto mb-10 relative flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-dashed border-[#ff007f] rounded-full shadow-[0_0_15px_rgba(255,0,127,0.4)]" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-3 border border-dotted border-[#00f0ff] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)]" />
                <span className="text-xl font-bold tracking-widest text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff]">{event.hostName.charAt(0)}</span>
              </div>

              <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Cyber Invitation</p>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-8 tracking-wider bg-gradient-to-r from-[#ff007f] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,0,127,0.3)]">
                {isGrad ? 'Graduation Gala' : 'Birthday Party'}
              </h2>
              
              <motion.button animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="px-10 py-3.5 rounded-full border border-[#00f0ff]/40 bg-[#05050C] text-[#00f0ff] font-semibold tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:bg-[#00f0ff]/5 transition-all">
                Enter Party
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══════ MAIN CYBER CARD ═══════ */
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full min-h-[100dvh] flex items-center justify-center p-4 md:p-8 bg-[#05050C]">
            
            {/* Glowing Neon Lines Background grid */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #ff007f 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
            
            {/* Dynamic glows */}
            <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-[#00f0ff]/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-[#ff007f]/10 blur-[130px] rounded-full pointer-events-none" />

            {/* Glowing borders of card */}
            <div className="relative w-full max-w-4xl min-h-[85vh] bg-black/40 backdrop-blur-3xl border border-white/[0.06] shadow-[0_0_60px_rgba(0,240,255,0.05),0_0_40px_rgba(255,0,127,0.02)] md:rounded-3xl p-6 md:p-16 flex flex-col items-center justify-center overflow-hidden">
              
              {/* Outer neon border stroke animation */}
              <div className="absolute inset-0 border border-[#00f0ff]/10 pointer-events-none md:rounded-3xl" />
              <div className="absolute inset-1 border border-[#ff007f]/5 pointer-events-none md:rounded-3xl" />

              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="w-full max-w-2xl text-center z-10 flex flex-col items-center py-4">
                
                {/* University Logo Badge */}
                {event.universityLogo ? (
                  <div className="w-14 h-14 md:w-16 md:h-16 p-2 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-6 md:mb-8 flex items-center justify-center">
                    <img src={event.universityLogo} className="w-full h-full object-contain" alt="" />
                  </div>
                ) : (
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#ff007f]/20 to-[#00f0ff]/20 border border-white/10 flex items-center justify-center text-[10px] md:text-xs font-bold tracking-widest text-[#00f0ff] mb-6 md:mb-8 shadow-lg">CYBER</div>
                )}

                <h4 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#00f0ff] uppercase mb-4 drop-shadow-[0_0_5px_rgba(0,240,255,0.4)] break-words max-w-full px-2">
                  {event.universityName || 'SPECIAL EVENT'}
                </h4>

                {/* Dear guests */}
                <div className="my-6 md:my-8 relative w-full px-4">
                  <div className="absolute inset-0 bg-[#ff007f]/5 blur-lg rounded-full" />
                  <div className="relative border-x border-[#ff007f]/20 px-4 md:px-8 py-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest block mb-1">Guests of Honour</span>
                    <span className="text-xl md:text-3xl font-extrabold text-white tracking-wide break-words max-w-full">{guestName}</span>
                  </div>
                </div>

                <p className="text-[10px] md:text-sm text-zinc-400 tracking-wider mb-2 px-4 leading-relaxed">
                  {isGrad ? 'Join the neon night celebrating the graduation of' : 'Join the neon party celebrating the birthday of'}
                </p>

                {/* Host Name */}
                <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-black uppercase tracking-wider my-4 leading-[1.1] break-words whitespace-normal w-full px-2"
                  style={{
                    background: 'linear-gradient(to bottom, #ffffff, #dcdcf0, #a2a2d0)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                  {event.hostName}
                </h1>

                {/* Event Title */}
                <h2 className="text-xl md:text-4xl font-extrabold tracking-[0.15em] bg-gradient-to-r from-[#ff007f] via-white to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,127,0.4)] uppercase break-words max-w-full px-2">
                  {event.title}
                </h2>
                
                <p className="text-[9px] md:text-xs text-zinc-500 tracking-[0.3em] uppercase mt-2 mb-8 md:mb-10 break-words px-4">
                  {event.subtitle}
                </p>

                {/* Time & location detail boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl my-4 md:my-6 px-2 md:px-0">
                  {/* Time box */}
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-center shadow-inner relative overflow-hidden group hover:border-[#00f0ff]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[8px] md:text-[9px] text-[#00f0ff] font-bold tracking-widest uppercase block mb-2 md:mb-3">SCHEDULE</span>
                    <span className="text-sm md:text-base font-extrabold text-white block mb-1 break-words">{event.timeLine1}</span>
                    <span className="text-[10px] md:text-xs font-semibold text-[#ff007f] block uppercase tracking-wider break-words">{event.timeLine2}</span>
                    <span className="text-[10px] md:text-xs text-zinc-400 mt-1 block break-words">{event.timeLine3}</span>
                  </div>

                  {/* Location box */}
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-center shadow-inner relative overflow-hidden group hover:border-[#ff007f]/30 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff007f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[8px] md:text-[9px] text-[#ff007f] font-bold tracking-widest uppercase block mb-2 md:mb-3">DESTINATION</span>
                    <span className="text-sm md:text-base font-extrabold text-white block px-2 break-words whitespace-normal">{event.locationLine1}</span>
                    <span className="text-[10px] md:text-xs text-zinc-400 mt-2 block leading-relaxed px-2 break-words whitespace-normal">{event.locationLine2}</span>
                  </div>
                </div>

                {/* Footer Message */}
                <p className="text-xs text-zinc-500 italic max-w-md mt-8 px-4 leading-relaxed">
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

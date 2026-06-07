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
          /* ═══════ COVER (NEO-TOKYO CYBER-LUXURY) ═══════ */
          <motion.div key="cover" exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] cursor-pointer" onClick={handleOpen}>
            
            {/* Tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.1]" style={{
              backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
            
            {/* Ambient Neon Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00f0ff]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#ff007f]/10 rounded-full blur-[100px]" />
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 text-center px-6 flex flex-col items-center">
              
              {/* High-Tech Hexagon Core */}
              <div className="w-24 h-24 mx-auto mb-12 relative flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-[0.5px] border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 border border-[#ff007f]/50 shadow-[0_0_15px_rgba(255,0,127,0.2)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                <span className="text-2xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_#00f0ff]">{event.hostName.charAt(0)}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-[#00f0ff]/50" />
                <p className="text-[#00f0ff] text-[9px] tracking-[0.4em] uppercase font-bold font-mono">System.Invite()</p>
                <div className="w-8 h-[1px] bg-[#00f0ff]/50" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-10 tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,0,127,0.5)]"
                style={{ textShadow: '2px 2px 0px #ff007f, -2px -2px 0px #00f0ff' }}>
                {isGrad ? 'Graduation' : 'Birthday'}
              </h2>
              
              {/* Cyber Button with Chamfered Edges */}
              <motion.button animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="relative group px-12 py-4 bg-black border border-[#00f0ff]/30 text-[#00f0ff] font-bold tracking-[0.3em] text-[10px] uppercase transition-all overflow-hidden"
                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                <div className="absolute inset-0 bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00f0ff]" />
                <span className="relative z-10 font-mono">Initialize</span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══════ MAIN CYBER LUXURY CARD ═══════ */
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full min-h-[100dvh] flex items-center justify-center p-4 md:p-8 bg-[#000000]">
            
            {/* Tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Precision Glows */}
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#00f0ff]/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[#ff007f]/15 blur-[150px] rounded-full pointer-events-none" />

            {/* Main Cyber Panel with Chamfered Geometry */}
            <div className="relative w-full max-w-4xl min-h-[85vh] bg-[#050508]/80 backdrop-blur-2xl p-[1px] shadow-[0_0_50px_rgba(0,240,255,0.1),0_0_30px_rgba(255,0,127,0.05)]"
                 style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
              
              {/* Animated gradient border wrapper */}
              <div className="w-full h-full bg-[#000000] p-6 md:p-16 flex flex-col items-center justify-center overflow-hidden"
                   style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
                
                {/* Tech Accents inside the card */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#00f0ff]/30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#ff007f]/30 pointer-events-none" />

                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                  className="w-full max-w-2xl text-center z-10 flex flex-col items-center py-4">
                  
                  {/* University Logo / Identity */}
                  {event.universityLogo ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-black border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)] mb-8 flex items-center justify-center"
                         style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                      <img src={event.universityLogo} className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] grayscale contrast-200" alt="" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-black border border-[#00f0ff]/30 flex items-center justify-center text-[10px] font-bold tracking-[0.3em] text-[#00f0ff] mb-8 font-mono shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                         style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>ID</div>
                  )}

                  <h4 className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] md:tracking-[0.5em] text-[#00f0ff] uppercase mb-4 px-2 whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-full">
                    {event.universityName || 'TARGET LOCATED'}
                  </h4>

                  {/* Target Guest */}
                  <div className="my-8 relative w-full px-4 flex flex-col items-center">
                    <span className="text-[9px] md:text-[10px] text-[#ff007f] uppercase tracking-[0.5em] font-bold font-mono mb-2">Subject // Guest</span>
                    <h3 className="text-2xl md:text-4xl font-black text-white tracking-[0.2em] uppercase break-words max-w-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      {guestName}
                    </h3>
                  </div>

                  <p className="text-[10px] md:text-xs text-zinc-400 font-mono tracking-[0.2em] uppercase mb-4 px-4">
                    {isGrad ? 'Executing graduation protocol for:' : 'Executing birthday protocol for:'}
                  </p>

                  {/* Host Name - Glitch Effect */}
                  <h1 className="text-[2rem] md:text-[3.5rem] font-black uppercase tracking-[0.1em] my-4 leading-[1] break-words whitespace-normal w-full px-2 text-white"
                    style={{ textShadow: '3px 0px 0px rgba(0,240,255,0.5), -3px 0px 0px rgba(255,0,127,0.5)' }}>
                    {event.hostName}
                  </h1>

                  {/* Event Title */}
                  <h2 className="text-xl md:text-3xl font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase mt-2 mb-4 break-words max-w-full px-2">
                    {event.title}
                  </h2>
                  
                  <p className="text-[9px] md:text-[10px] text-[#00f0ff]/60 font-mono tracking-[0.4em] uppercase mt-2 mb-12 break-words px-4">
                    &gt; {event.subtitle} _
                  </p>

                  {/* Data Modules (Time & Location) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl my-6 px-4 md:px-0">
                    {/* Time Module */}
                    <div className="bg-[#050508] border border-white/10 p-6 md:p-8 text-left relative group hover:border-[#00f0ff]/50 transition-colors"
                         style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-[#00f0ff] animate-pulse" />
                        <span className="text-[9px] md:text-[10px] text-[#00f0ff] font-mono font-bold tracking-[0.3em] uppercase">T-Minus</span>
                      </div>
                      <span className="text-lg md:text-2xl font-black text-white block mb-2 break-words uppercase tracking-widest">{event.timeLine1}</span>
                      <span className="text-xs md:text-sm font-bold text-zinc-400 block uppercase tracking-widest break-words">{event.timeLine2}</span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-2 block break-words">{event.timeLine3}</span>
                    </div>

                    {/* Location Module */}
                    <div className="bg-[#050508] border border-white/10 p-6 md:p-8 text-left relative group hover:border-[#ff007f]/50 transition-colors"
                         style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#ff007f] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-[#ff007f] animate-pulse" />
                        <span className="text-[9px] md:text-[10px] text-[#ff007f] font-mono font-bold tracking-[0.3em] uppercase">Coordinates</span>
                      </div>
                      <span className="text-sm md:text-lg font-black text-white block mb-2 break-words uppercase tracking-widest leading-tight">{event.locationLine1}</span>
                      <span className="text-[10px] md:text-xs text-zinc-400 font-mono mt-2 block leading-relaxed break-words whitespace-normal">{event.locationLine2}</span>
                    </div>
                  </div>

                  {/* Terminal Footer */}
                  <div className="mt-12 border-t border-white/10 w-full pt-8 text-left max-w-2xl px-4">
                    <p className="text-[10px] md:text-xs text-zinc-500 font-mono leading-relaxed">
                      <span className="text-[#00f0ff]">&gt; SYSTEM MSG:</span> "{event.footerMessage}" <span className="animate-pulse">_</span>
                    </p>
                  </div>

                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

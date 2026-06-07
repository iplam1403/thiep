// @ts-nocheck
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { IEvent } from '../types'

interface Props { event: IEvent; guestName: string }

const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/* Premium Ivory Silk Background */
const IvorySilkBg = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl bg-[#F4F1EB]">
    {/* Silk Texture overlay */}
    <div className="absolute inset-0 opacity-[0.4] mix-blend-color-burn"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    />
    
    {/* Very subtle vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_10%,rgba(210,195,175,0.5)_100%)] mix-blend-multiply" />

    {/* Falling gold leaves overlay for magic */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-[#C49B5B] rounded-bl-full rounded-tr-full falling-leaf opacity-40 shadow-[0_0_5px_#C49B5B]" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[30%] left-[70%] w-2.5 h-1.5 bg-[#E6C575] rounded-full falling-leaf opacity-50 shadow-[0_0_5px_#E6C575]" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[60%] left-[40%] w-2 h-2.5 bg-[#A87C33] rounded-tl-full rounded-br-full falling-leaf opacity-40 shadow-[0_0_5px_#A87C33]" style={{ animationDelay: '4s' }} />
    </div>
  </div>
)

export default function Template1({ event, guestName }: Props) {
  const [opened, setOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const fireConfetti = () => {
    const end = Date.now() + 3000
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.3 }, colors: ['#991b1b','#f59e0b','#fcd34d','#fff'], gravity: 0.8 })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.3 }, colors: ['#991b1b','#f59e0b','#fcd34d','#fff'], gravity: 0.8 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleOpen = () => { 
    setOpened(true); 
    setTimeout(fireConfetti, 400);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => console.log("Autoplay prevented"));
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  const isGrad = event.eventType !== 'birthday'
  const yearMatch = event.timeLine3?.match(/\d{4}/) || event.subtitle?.match(/\d{4}/);
  const dynamicYear = yearMatch ? yearMatch[0] : new Date().getFullYear().toString();

  return (
    <div className="w-full min-h-[100dvh] bg-[#FDFBF7]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Background Music Player */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/11/22/audio_1cd587285a.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {!opened ? (
          /* ═══════ COVER ═══════ */
          <motion.div key="cover" exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }} transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0808] via-[#2d0e0e] to-[#1a0808] cursor-pointer" onClick={handleOpen}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#C49B5B]/10 rounded-full blur-[100px]" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 text-center">
              <motion.div animate={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B1A1A] to-[#5C0A0A] mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(139,26,26,0.4),inset_0_2px_4px_rgba(255,255,255,0.1)]">
                <div className="w-20 h-20 rounded-full border-2 border-[#C49B5B]/30 flex items-center justify-center">
                  <span className="text-[#C49B5B] text-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>{event.hostName.charAt(0)}</span>
                </div>
              </motion.div>
              <p className="text-[#C49B5B]/60 text-[10px] tracking-[0.3em] uppercase mb-3">Bạn nhận được một lời mời</p>
              <h2 className="text-[#C49B5B] text-2xl mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {isGrad ? 'Thiệp Mời Tốt Nghiệp' : 'Thiệp Mời Sinh Nhật'}
              </h2>
              <p className="text-[#C49B5B]/40 text-xs mb-12 tracking-wider">từ {event.hostName}</p>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#C49B5B]/30 bg-[#C49B5B]/5">
                <span className="text-[#C49B5B]/80 text-sm font-medium tracking-wider">Nhấn để mở</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* ═══════ MAIN CARD — Full page ═══════ */
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="relative w-full min-h-[100dvh] flex items-center justify-center p-0 md:p-8 bg-[#FDFBF7]">
            
            {/* Custom CSS for extra cool/ngầu effects */}
            <style>{`
              @keyframes goldShine {
                0% { background-position: 0% center; }
                100% { background-position: 200% center; }
              }
              .gold-foil-text {
                background: linear-gradient(90deg, #A87C33 0%, #E6C575 25%, #FFF5C3 50%, #E6C575 75%, #A87C33 100%);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: goldShine 4s linear infinite;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
              }
              .title-glow-royal {
                text-shadow: 0 0 10px rgba(196, 155, 91, 0.15);
                animation: titleGlow 2.5s ease-in-out infinite alternate;
              }
              @keyframes titleGlow {
                from { text-shadow: 0 0 5px rgba(92, 10, 10, 0.1), 0 0 10px rgba(196, 155, 91, 0.1); }
                to { text-shadow: 0 0 20px rgba(92, 10, 10, 0.35), 0 0 15px rgba(196, 155, 91, 0.25); }
              }
              .sparkle-slow {
                animation: floatSparkle 6s ease-in-out infinite;
              }
              @keyframes floatSparkle {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
                50% { transform: translateY(-15px) rotate(180deg); opacity: 0.6; }
              }
              /* New Premium Effects */
              @keyframes lightSweep {
                0% { transform: translateX(-150%) skewX(-45deg); }
                100% { transform: translateX(250%) skewX(-45deg); }
              }
              .holographic-sweep {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 245, 195, 0.15), transparent);
                animation: lightSweep 6s infinite ease-in-out;
                pointer-events: none;
                z-index: 25;
              }
              @keyframes waxSealDrop {
                0% { transform: scale(3) translateY(-50px); opacity: 0; filter: blur(5px); }
                50% { transform: scale(0.9) translateY(2px); opacity: 1; filter: blur(0px); }
                70% { transform: scale(1.05) translateY(-1px); opacity: 1; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
              }
              .wax-seal-anim {
                animation: waxSealDrop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                animation-delay: 1.5s;
                opacity: 0;
              }
              @keyframes glintStarAnim {
                0%, 75%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                80% { transform: scale(1.3) rotate(90deg); opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 245, 195, 1)); }
                85% { transform: scale(1) rotate(180deg); opacity: 1; }
                90% { transform: scale(1.2) rotate(270deg); opacity: 0.8; }
              }
              .star-glint-active {
                animation: glintStarAnim 4s ease-in-out infinite;
                transform-origin: center;
              }
              @keyframes fallLeaf {
                0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translate(20px, 80px) rotate(45deg); opacity: 0; }
              }
              .falling-leaf {
                animation: fallLeaf 8s linear infinite;
              }
            `}</style>

            <div className="relative w-full max-w-5xl min-h-[100dvh] md:min-h-[85vh] bg-[#FDFBF7] md:rounded-3xl md:shadow-[0_20px_50px_rgba(90,40,40,0.15)] md:border md:border-[#C49B5B]/15 overflow-hidden flex flex-col items-center justify-center p-4 md:p-12">
              
              {/* Music Toggle Button */}
              <motion.button 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                onClick={toggleMusic}
                className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md border border-[#C49B5B]/40 rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer overflow-hidden"
              >
                <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="flex items-center justify-center">
                  <span className="text-xl md:text-2xl">{isPlaying ? '🎵' : '🔇'}</span>
                </motion.div>
                {isPlaying && (
                  <div className="absolute inset-0 rounded-full border border-[#C49B5B] animate-ping opacity-20 pointer-events-none" />
                )}
              </motion.button>

              {/* Ivory Silk background */}
              <IvorySilkBg />

              {/* Magical Gold Sparkles floating in background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-[#C49B5B] rounded-full sparkle-slow" style={{ animationDelay: '0s' }} />
                <div className="absolute top-[30%] left-[80%] w-3 h-3 bg-[#C49B5B] rotate-45 sparkle-slow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-[65%] left-[15%] w-1.5 h-1.5 bg-[#C49B5B] rounded-full sparkle-slow" style={{ animationDelay: '3s' }} />
                <div className="absolute top-[80%] left-[75%] w-2.5 h-2.5 bg-[#C49B5B] rotate-12 sparkle-slow" style={{ animationDelay: '0.8s' }} />
                <div className="absolute top-[45%] left-[5%] w-2 h-2 bg-[#5C0A0A] rounded-full sparkle-slow" style={{ animationDelay: '2.2s' }} />
                <div className="absolute top-[50%] left-[85%] w-2 h-2 bg-[#5C0A0A] rounded-full sparkle-slow" style={{ animationDelay: '1.1s' }} />
              </div>

              {/* Elegant Double Border Frame for Full Page styling */}
              <div className="absolute inset-3 md:inset-6 border border-[#C49B5B]/30 pointer-events-none rounded-2xl z-10">
                {/* Corner Flourishes */}
                <svg className="absolute -top-2 -left-2 w-8 h-8 md:w-12 md:h-12 text-[#C49B5B]/60" viewBox="0 0 100 100" fill="currentColor"><path d="M10,0 L10,30 Q10,70 70,70 L70,100 L0,100 Z" /><path d="M30,0 L30,20 Q30,50 60,50 L60,80 L0,80 Z" opacity="0.5"/></svg>
                <svg className="absolute -top-2 -right-2 w-8 h-8 md:w-12 md:h-12 text-[#C49B5B]/60 rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M10,0 L10,30 Q10,70 70,70 L70,100 L0,100 Z" /><path d="M30,0 L30,20 Q30,50 60,50 L60,80 L0,80 Z" opacity="0.5"/></svg>
                <svg className="absolute -bottom-2 -right-2 w-8 h-8 md:w-12 md:h-12 text-[#C49B5B]/60 rotate-180" viewBox="0 0 100 100" fill="currentColor"><path d="M10,0 L10,30 Q10,70 70,70 L70,100 L0,100 Z" /><path d="M30,0 L30,20 Q30,50 60,50 L60,80 L0,80 Z" opacity="0.5"/></svg>
                <svg className="absolute -bottom-2 -left-2 w-8 h-8 md:w-12 md:h-12 text-[#C49B5B]/60 -rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M10,0 L10,30 Q10,70 70,70 L70,100 L0,100 Z" /><path d="M30,0 L30,20 Q30,50 60,50 L60,80 L0,80 Z" opacity="0.5"/></svg>
              </div>
              <div className="absolute inset-4 md:inset-7 border-2 border-[#C49B5B]/20 pointer-events-none rounded-2xl z-10" />
              <div className="holographic-sweep rounded-3xl mix-blend-overlay" />

              {/* Overall Ambient Lighting Effects (Warm Stage Glows) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                {/* Golden Spotlight Top-Left */}
                <div className="absolute -top-[25%] -left-[20%] w-[70%] h-[70%] bg-gradient-to-br from-[#FFF5C3]/18 via-[#C49B5B]/6 to-transparent rounded-full blur-[90px] animate-pulse-slow" />
                
                {/* Warm Rose/Ruby glow behind the card content */}
                <div className="absolute top-[20%] left-[30%] -translate-x-1/2 w-[60%] h-[60%] bg-gradient-to-tr from-[#5C0A0A]/5 via-[#7A1515]/2 to-transparent rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '7s' }} />

                {/* Subtle light rays overlay */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-color-dodge"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 245, 195, 0.1) 0px, rgba(255, 245, 195, 0.1) 2px, transparent 2px, transparent 40px)'
                  }}
                />
              </div>

              {/* ── ULTRA VIP SYMMETRICAL CARD ── */}
              <div className="relative z-10 w-full max-w-[90vw] md:max-w-2xl mx-auto mt-12 md:mt-0 perspective-[1200px] pointer-events-auto">
                
                {/* Floating Animations ON the card */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] left-[-5%] opacity-30 text-2xl z-40 pointer-events-none">✨</motion.div>
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-[20%] right-[-5%] opacity-30 text-3xl z-40 pointer-events-none">✨</motion.div>

                {/* ── THE LAYERED FROSTED GLASS BASE ── */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.5, duration: 1 }}
                  className="relative w-full bg-[#FDFBF7]/90 backdrop-blur-xl shadow-[0_30px_60px_rgba(90,40,40,0.15)] rounded-sm border border-[#C49B5B]/30 flex flex-col px-4 md:px-12 py-12 md:py-16"
                >
                  {/* Dynamic Year Watermark - Very faint */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 opacity-[0.015]">
                    <span className="text-[40vw] md:text-[320px] font-bold text-[#C49B5B] tracking-[-0.05em] leading-none select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {dynamicYear}
                    </span>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      1. TẦNG TRÊN (HEADER TIER PLATE)
                      ───────────────────────────────────────────────────────── */}
                  <div className="relative self-center w-[95%] md:w-[85%] bg-[#FFFDF9] shadow-[0_20px_40px_rgba(196,155,91,0.18),0_4px_10px_rgba(0,0,0,0.05)] border-[0.5px] border-[#C49B5B]/50 rounded-sm -mt-20 md:-mt-28 p-6 md:p-8 mb-10 md:mb-12 z-20 flex flex-col items-center">
                    
                    {/* Corner Ornaments */}
                    <svg className="absolute top-2 left-2 w-4 h-4 text-[#C49B5B]/70" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute top-2 right-2 w-4 h-4 text-[#C49B5B]/70 transform rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute bottom-2 right-2 w-4 h-4 text-[#C49B5B]/70 transform rotate-180" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute bottom-2 left-2 w-4 h-4 text-[#C49B5B]/70 transform -rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>

                    {/* Hyper-Realistic Wax Seal */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
                      <div className="w-16 h-16 md:w-20 md:h-20 wax-seal-anim relative z-10 filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]">
                        <svg width="0" height="0" className="absolute">
                          <filter id="waxTexture">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                          </filter>
                        </svg>
                        <div className="w-full h-full rounded-full bg-[#8B1A1A] p-[2px] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.5)]" style={{ filter: 'url(#waxTexture)' }}>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d93838]/60 via-transparent to-[#4a0808]/80 mix-blend-overlay pointer-events-none" />
                          <div className="w-full h-full rounded-full bg-[#7A1515] flex items-center justify-center border-[1.5px] border-[#4a0808]/50 shadow-[inset_0_3px_5px_rgba(0,0,0,0.4)]">
                            <span className="text-[#F3E5AB] text-[20px] md:text-[26px] font-serif drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-95 relative z-10" style={{ fontFamily: "'Great Vibes', cursive" }}>{event.hostName.charAt(0)}</span>
                            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Header Content */}
                    {event.universityLogo ? (
                      <img src={event.universityLogo} className="w-12 h-12 md:w-16 md:h-16 object-contain mb-4 mt-6 opacity-90 z-10" alt="" />
                    ) : (
                      <div className="w-10 h-12 bg-gradient-to-b from-[#1e3a8a] to-[#172554] rounded-b-lg flex items-center justify-center text-white text-[6px] font-medium shadow-sm mb-4 mt-6 z-10">LOGO</div>
                    )}
                    <h3 className="text-[9px] md:text-[10px] font-semibold text-[#3a2e2b] leading-relaxed uppercase tracking-[0.3em] mb-1.5 text-center">{event.universityName}</h3>
                    <p className="text-[6px] md:text-[7px] text-[#C49B5B] uppercase tracking-[0.4em] mb-2 text-center">{event.universitySubName}</p>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      2. TẦNG GIỮA (BODY CONTENT)
                      ───────────────────────────────────────────────────────── */}
                  <div className="relative z-10 flex flex-col items-center w-full px-2">
                    <p className="text-[10px] md:text-[11px] italic text-[#8B1A1A] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Dear</p>
                    <p className="font-semibold text-lg md:text-xl text-[#3a2e2b] tracking-[0.15em] uppercase mb-10 border-b-[0.5px] border-[#C49B5B]/40 pb-3 px-12 min-w-[240px] text-center">{guestName}</p>

                    <p className="text-[9px] md:text-[10px] text-gray-500 italic tracking-[0.2em] mb-6 text-center">
                      {isGrad ? 'Thân mời bạn đến dự lễ tốt nghiệp của' : 'Trân trọng kính mời bạn đến dự tiệc sinh nhật của'}
                    </p>

                    <h1 className="text-[2.5rem] md:text-[4.5rem] leading-[1.2] font-normal font-serif gold-foil-text mb-6 text-center" style={{ fontFamily: "'Great Vibes', cursive" }}>
                      {event.hostName}
                    </h1>

                    <h2 className="text-xl md:text-[2rem] font-medium text-[#3a2e2b] tracking-[0.3em] uppercase leading-tight mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {event.title}
                    </h2>
                    <p className="text-[8px] md:text-[9px] text-[#C49B5B] tracking-[0.4em] uppercase font-semibold mb-6 text-center">{event.subtitle}</p>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      3. TẦNG DƯỚI (FOOTER TIER PLATE)
                      ───────────────────────────────────────────────────────── */}
                  <div className="relative self-center w-[95%] md:w-[85%] bg-[#FFFDF9] shadow-[0_-15px_30px_rgba(196,155,91,0.12),0_-2px_8px_rgba(0,0,0,0.04)] border-[0.5px] border-[#C49B5B]/50 rounded-sm mt-8 -mb-20 md:-mb-28 p-6 md:p-8 flex flex-col items-center z-20">
                    
                    {/* Corner Ornaments */}
                    <svg className="absolute top-2 left-2 w-4 h-4 text-[#C49B5B]/70" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute top-2 right-2 w-4 h-4 text-[#C49B5B]/70 transform rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute bottom-2 right-2 w-4 h-4 text-[#C49B5B]/70 transform rotate-180" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>
                    <svg className="absolute bottom-2 left-2 w-4 h-4 text-[#C49B5B]/70 transform -rotate-90" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 L20 0 C20 10 10 20 0 20 Z" /></svg>

                    {/* Divider inside Footer */}
                    <div className="w-full flex justify-center items-center mb-6">
                      <div className="h-[0.5px] w-12 md:w-20 bg-[#C49B5B]/60" />
                      <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-[#C49B5B] mx-3" />
                      <div className="h-[0.5px] w-12 md:w-20 bg-[#C49B5B]/60" />
                    </div>

                    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8 md:gap-4 px-2 md:px-8 mb-6">
                      <div className="flex flex-col items-center md:w-1/2">
                        <p className="text-[7px] md:text-[8px] text-[#C49B5B] uppercase tracking-[0.4em] mb-2 font-semibold">Vào lúc</p>
                        <p className="text-xs md:text-sm font-medium text-[#3a2e2b] tracking-[0.2em] uppercase">{event.timeLine1}</p>
                        <p className="text-[9px] md:text-[10px] font-semibold text-[#8B1A1A] uppercase tracking-[0.3em] my-1.5">{event.timeLine2}</p>
                        <p className="text-[7px] md:text-[8px] text-gray-500 font-medium tracking-[0.2em] uppercase">{event.timeLine3}</p>
                      </div>

                      <div className="hidden md:block w-[0.5px] h-12 bg-[#C49B5B]/40" />
                      <div className="md:hidden h-[0.5px] w-12 bg-[#C49B5B]/40" />

                      <div className="flex flex-col items-center md:w-1/2">
                        <p className="text-[7px] md:text-[8px] text-[#C49B5B] uppercase tracking-[0.4em] mb-2 font-semibold">Tại</p>
                        <p className="text-[9px] md:text-[10px] font-medium text-[#3a2e2b] uppercase tracking-[0.2em] text-center leading-[1.8]">{event.locationLine1}</p>
                        <p className="text-[6px] md:text-[7px] text-gray-500 mt-2 text-center tracking-[0.15em]">{event.locationLine2}</p>
                      </div>
                    </div>

                    <p className="text-[8px] md:text-[9px] text-gray-400 italic tracking-[0.1em] leading-relaxed text-center">
                      "{event.footerMessage}"
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

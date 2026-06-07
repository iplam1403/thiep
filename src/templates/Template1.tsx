// @ts-nocheck
import { useEffect, useState } from 'react'
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

/* Floral background SVG pattern */
const FloralBg = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 500 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {/* Large leaf clusters - top left */}
      <g opacity="0.8" transform="translate(20,60) rotate(-15)">
        <ellipse cx="40" cy="0" rx="45" ry="12" fill="#5a5a5a" transform="rotate(35)"/>
        <ellipse cx="20" cy="-15" rx="40" ry="10" fill="#5a5a5a" transform="rotate(55)"/>
        <ellipse cx="55" cy="15" rx="38" ry="9" fill="#5a5a5a" transform="rotate(20)"/>
        <ellipse cx="10" cy="10" rx="35" ry="8" fill="#5a5a5a" transform="rotate(70)"/>
        <circle cx="30" cy="5" r="8" fill="#666"/>
        <circle cx="50" cy="-5" r="5" fill="#777"/>
      </g>
      {/* Top right cluster */}
      <g opacity="0.7" transform="translate(350,30) rotate(10)">
        <ellipse cx="40" cy="0" rx="50" ry="13" fill="#5a5a5a" transform="rotate(-30)"/>
        <ellipse cx="70" cy="20" rx="45" ry="11" fill="#5a5a5a" transform="rotate(-50)"/>
        <ellipse cx="20" cy="25" rx="40" ry="10" fill="#5a5a5a" transform="rotate(-10)"/>
        <circle cx="45" cy="15" r="10" fill="#666"/>
        <circle cx="25" cy="5" r="6" fill="#777"/>
      </g>
      {/* Left side middle */}
      <g opacity="0.6" transform="translate(-30,350) rotate(5)">
        <ellipse cx="50" cy="0" rx="55" ry="14" fill="#5a5a5a" transform="rotate(40)"/>
        <ellipse cx="30" cy="30" rx="45" ry="12" fill="#5a5a5a" transform="rotate(65)"/>
        <ellipse cx="70" cy="-20" rx="40" ry="10" fill="#5a5a5a" transform="rotate(25)"/>
        <circle cx="40" cy="10" r="12" fill="#666"/>
        <circle cx="60" cy="-10" r="7" fill="#777"/>
        <circle cx="20" cy="20" r="5" fill="#777"/>
      </g>
      {/* Right side middle-low */}
      <g opacity="0.5" transform="translate(380,500) rotate(-20)">
        <ellipse cx="30" cy="0" rx="48" ry="12" fill="#5a5a5a" transform="rotate(-35)"/>
        <ellipse cx="10" cy="-20" rx="42" ry="10" fill="#5a5a5a" transform="rotate(-60)"/>
        <ellipse cx="50" cy="20" rx="38" ry="9" fill="#5a5a5a" transform="rotate(-15)"/>
        <circle cx="30" cy="5" r="9" fill="#666"/>
      </g>
      {/* Bottom left */}
      <g opacity="0.7" transform="translate(10,720) rotate(15)">
        <ellipse cx="50" cy="0" rx="52" ry="14" fill="#5a5a5a" transform="rotate(30)"/>
        <ellipse cx="25" cy="-20" rx="45" ry="11" fill="#5a5a5a" transform="rotate(60)"/>
        <ellipse cx="75" cy="15" rx="40" ry="10" fill="#5a5a5a" transform="rotate(10)"/>
        <circle cx="45" cy="0" r="11" fill="#666"/>
        <circle cx="65" cy="-10" r="6" fill="#777"/>
      </g>
      {/* Bottom right */}
      <g opacity="0.6" transform="translate(340,780) rotate(-10)">
        <ellipse cx="40" cy="0" rx="50" ry="13" fill="#5a5a5a" transform="rotate(-25)"/>
        <ellipse cx="70" cy="15" rx="42" ry="11" fill="#5a5a5a" transform="rotate(-50)"/>
        <ellipse cx="15" cy="20" rx="38" ry="9" fill="#5a5a5a" transform="rotate(-5)"/>
        <circle cx="40" cy="10" r="10" fill="#666"/>
      </g>
      {/* Scattered small elements */}
      <circle cx="200" cy="150" r="4" fill="#888" opacity="0.4"/>
      <circle cx="150" cy="400" r="3" fill="#888" opacity="0.3"/>
      <circle cx="300" cy="300" r="5" fill="#888" opacity="0.3"/>
      <circle cx="250" cy="650" r="4" fill="#888" opacity="0.4"/>
      <circle cx="100" cy="550" r="3" fill="#888" opacity="0.3"/>
      <ellipse cx="180" cy="250" rx="15" ry="5" fill="#5a5a5a" opacity="0.3" transform="rotate(40)"/>
      <ellipse cx="320" cy="450" rx="18" ry="5" fill="#5a5a5a" opacity="0.3" transform="rotate(-30)"/>
      <ellipse cx="120" cy="680" rx="20" ry="5" fill="#5a5a5a" opacity="0.25" transform="rotate(50)"/>
    </svg>
  </div>
)

export default function Template1({ event, guestName }: Props) {
  const [opened, setOpened] = useState(false)

  const fireConfetti = () => {
    const end = Date.now() + 3000
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.3 }, colors: ['#991b1b','#f59e0b','#fcd34d','#fff'], gravity: 0.8 })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.3 }, colors: ['#991b1b','#f59e0b','#fcd34d','#fff'], gravity: 0.8 })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const handleOpen = () => { setOpened(true); setTimeout(fireConfetti, 400) }
  const isGrad = event.eventType !== 'birthday'

  return (
    <div className="w-full min-h-[100dvh] bg-[#FDFBF7]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
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
              .star-glint-active {
                animation: glintStarAnim 4s ease-in-out infinite;
              }
              @keyframes glintStarAnim {
                0%, 75%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
                80% { transform: scale(1.3) rotate(90deg); opacity: 1; }
                85% { transform: scale(1) rotate(180deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(255, 245, 195, 0.9)); }
                90% { transform: scale(1.2) rotate(270deg); opacity: 0.8; }
              }
              @keyframes tasselSway {
                0%, 100% { transform: translateX(-50%) rotate(-5deg); }
                50% { transform: translateX(-50%) rotate(5deg); }
              }
              .animate-tassel-sway {
                animation: tasselSway 2.5s ease-in-out infinite;
                transform-origin: top center;
              }
            `}</style>

            <div className="relative w-full max-w-5xl min-h-[100dvh] md:min-h-[85vh] bg-[#FDFBF7] md:rounded-3xl md:shadow-[0_20px_50px_rgba(90,40,40,0.15)] md:border md:border-[#C49B5B]/15 overflow-hidden flex flex-col items-center justify-center p-4 md:p-12">
              
              {/* Floral background */}
              <FloralBg />

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
              <div className="absolute inset-3 md:inset-6 border border-[#C49B5B]/20 pointer-events-none rounded-2xl z-10" />
              <div className="absolute inset-4 md:inset-7 border-2 border-[#C49B5B]/10 pointer-events-none rounded-2xl z-10" />

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

              {/* ── REDESIGNED ULTRA-PREMIUM DUAL-LAYER RIBBON ── */}
              <motion.div
                initial={{ y: '-110%' }}
                animate={{ y: 0 }}
                whileHover={{ rotateY: -15, rotateZ: -1, scale: 1.05, y: 4 }}
                transition={{ 
                  y: { type: "spring", stiffness: 80, damping: 12, delay: 0.2 },
                  default: { duration: 0.3 }
                }}
                className="absolute top-0 right-3 md:right-16 w-[50px] md:w-[82px] h-[52%] md:h-[55%] z-20 origin-top cursor-pointer"
                style={{ perspective: '800px' }}
              >
                {/* Backing Gold Ribbon Layer (extends slightly on sides/bottom) */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'linear-gradient(160deg, #FFF5C3 0%, #E6C575 25%, #C49B5B 50%, #9E782F 75%, #785A24 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)',
                    transform: 'scaleX(1.08) scaleY(1.025)',
                    transformOrigin: 'top center',
                    filter: 'drop-shadow(-4px 4px 8px rgba(0,0,0,0.35))'
                  }}
                />

                {/* Main Velvet Crimson Ribbon (Front Layer) */}
                <div 
                  className="absolute inset-0 z-10 overflow-hidden flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, #8B1A1A 0%, #A22222 15%, #4C0B0B 16%, #4C0B0B 32%, #8B1A1A 45%, #A22222 60%, #4C0B0B 61%, #4C0B0B 78%, #8B1A1A 90%, #A22222 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)',
                    boxShadow: 'inset 1px 0 6px rgba(255,255,255,0.08), inset -1px 0 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Diagonal Folds Creases Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-30 z-10 mix-blend-multiply"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(145deg, transparent, transparent 18px, rgba(0,0,0,0.45) 19px, rgba(0,0,0,0.45) 20px, transparent 21px, transparent 40px)'
                    }}
                  />

                  {/* Fine Gold Ribbon Trim Borders (Double Stitch Lines) */}
                  <div className="absolute inset-y-0 left-[2px] md:left-[3px] w-[1px] md:w-[1.5px] bg-gradient-to-b from-[#F3E5AB] via-[#C49B5B] to-[#F3E5AB] opacity-80" />
                  <div className="absolute inset-y-0 left-[4px] md:left-[6px] w-[0.5px] md:w-[1px] bg-gradient-to-b from-[#F3E5AB]/40 via-[#C49B5B]/40 to-[#F3E5AB]/40 opacity-60" />
                  
                  <div className="absolute inset-y-0 right-[2px] md:right-[3px] w-[1px] md:w-[1.5px] bg-gradient-to-b from-[#F3E5AB] via-[#C49B5B] to-[#F3E5AB] opacity-80" />
                  <div className="absolute inset-y-0 right-[4px] md:right-[6px] w-[0.5px] md:w-[1px] bg-gradient-to-b from-[#F3E5AB]/40 via-[#C49B5B]/40 to-[#F3E5AB]/40 opacity-60" />
                  
                  {/* Subtle horizontal grain for fabric feel */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.2) 1px, rgba(255,255,255,0.2) 2px)`,
                      backgroundSize: '100% 3px',
                    }}
                  />

                  {/* Animated diagonal ribbon shine sweep */}
                  <motion.div
                    animate={{ y: ['-150%', '250%'] }}
                    transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-x-0 h-[45%] pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(135deg, transparent 20%, rgba(255,245,195,0.22) 45%, rgba(255,255,255,0.35) 50%, rgba(255,245,195,0.22) 55%, transparent 80%)',
                      transform: 'skewY(-8deg)'
                    }}
                  />

                  {/* Diagonal soft static shine effect */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 70%)',
                    }}
                  />

                  {/* Content container inside Ribbon */}
                  <div className="flex flex-col items-center h-full relative z-10 pt-10 md:pt-14 pb-8 px-0.5">
                    
                    {/* University Logo Badge wrapper */}
                    {event.universityLogo ? (
                      <div className="relative mb-2 shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#F3E5AB] to-[#C49B5B] rounded-full blur-[1px] opacity-75" />
                        <img src={event.universityLogo} className="relative w-7 h-7 md:w-11 md:h-11 object-contain bg-white rounded-full p-0.5 shadow-[0_2px_6px_rgba(0,0,0,0.35)] border border-[#C49B5B]/30" alt="" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 md:w-11 md:h-11 bg-gradient-to-br from-[#F3E5AB] to-[#C49B5B] rounded-full flex items-center justify-center text-[5px] md:text-[7px] font-bold text-[#3A1515] shadow-lg mb-2 shrink-0 border border-white/20">LOGO</div>
                    )}

                    {/* University Name */}
                    <p className="text-[#F3E5AB]/60 text-[4px] md:text-[6.5px] tracking-[0.15em] uppercase text-center leading-tight px-0.5 mb-2 font-semibold max-w-[42px] md:max-w-none"
                      style={{ writingMode: 'vertical-rl', transform: 'none', maxHeight: '60px' }}>
                      {removeAccents(event.universityName)}
                    </p>

                    {/* Royal Emblem Ornament above Host Name */}
                    <div className="text-[#F3E5AB] text-[10px] md:text-[14px] my-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] select-none">⚜</div>

                    {/* Host Name - beautifully aligned vertically, rotated right */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <h3 className="text-[#F3E5AB] text-[9px] md:text-[13px] font-serif font-bold tracking-[0.18em] uppercase whitespace-nowrap drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
                        style={{ writingMode: 'vertical-rl', transform: 'none' }}>
                        {removeAccents(event.hostName)}
                      </h3>
                    </div>

                    {/* Degree / Event Tagline */}
                    <div className="shrink-0 mt-2">
                      <p className="text-[#F3E5AB]/70 text-[5px] md:text-[7.5px] tracking-[0.1em] font-serif italic uppercase"
                        style={{ writingMode: 'vertical-rl', transform: 'none' }}>
                        {isGrad ? "Graduation" : "Birthday"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3D Gold Medallion / Seal on top of the ribbon (Anchors it) */}
                <div className="absolute top-1 md:top-1.5 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 z-30">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFF5C3] via-[#C49B5B] to-[#785A24] p-[1.5px] shadow-[0_3px_8px_rgba(0,0,0,0.4)] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#9E782F] to-[#E6C575] flex items-center justify-center border border-[#FFF5C3]/40">
                      <span className="text-[#FFF] text-[9px] md:text-[13px] font-serif drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">🎓</span>
                    </div>
                  </div>
                  {/* Glowing dynamic star flare effect */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 text-[#FFF5C3] star-glint-active pointer-events-none z-40">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                    </svg>
                  </div>
                  {/* Subtle shine glint */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
                </div>

                {/* Golden Fringe Tassel hanging from the pointed tip */}
                <div className="absolute bottom-[-16px] left-1/2 w-3 h-8 z-30 pointer-events-none animate-tassel-sway">
                  {/* Tassel Cap (Gold bead) */}
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-gradient-to-br from-[#FFF5C3] via-[#C49B5B] to-[#785A24] mx-auto shadow-md" />
                  {/* Tassel String */}
                  <div className="w-[1px] md:w-[1.5px] h-1.5 md:h-2 bg-[#C49B5B] mx-auto" />
                  {/* Tassel Fringe (Tua rua) */}
                  <div 
                    className="w-2 md:w-3 h-3 md:h-4 mx-auto" 
                    style={{
                      background: 'linear-gradient(90deg, #785A24 0%, #C49B5B 25%, #FFF5C3 50%, #C49B5B 75%, #785A24 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 80% 100%, 50% 90%, 20% 100%)'
                    }}
                  />
                </div>
              </motion.div>


              {/* ── CARD CONTENT ── */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center pr-[55px] md:pr-0 pl-4 md:pl-0 py-8 md:py-4 overflow-hidden"
              >
                {/* University header centered */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
                  className="flex flex-col items-center mb-6 md:mb-8"
                >
                  {event.universityLogo ? (
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src={event.universityLogo} 
                      className="w-14 h-14 md:w-18 md:h-18 object-contain mb-3 drop-shadow-md" 
                      alt="" 
                    />
                  ) : (
                    <div className="w-12 h-14 bg-gradient-to-b from-[#1e3a8a] to-[#172554] rounded-b-xl flex items-center justify-center text-white text-[8px] font-bold shadow-md mb-3">LOGO</div>
                  )}
                  <h3 className="text-[11px] md:text-sm font-bold text-[#1e3a8a] leading-tight uppercase tracking-wider px-1 break-words max-w-full">{event.universityName}</h3>
                  <p className="text-[8px] md:text-[10px] text-gray-400 uppercase mt-0.5 tracking-[0.15em] break-words max-w-full">{event.universitySubName}</p>
                </motion.div>

                {/* Centered Dear ___ line */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="flex flex-col items-center mb-6 md:mb-8 w-full max-w-[200px] md:max-w-md">
                  <span className="text-sm md:text-base italic text-gray-400 mb-0.5 font-light" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>Dear</span>
                  <span className="font-semibold text-lg md:text-2xl text-[#7A1515] border-b border-dashed border-[#C49B5B]/50 px-2 md:px-6 pb-1 text-center min-w-[120px] md:min-w-[220px] break-words max-w-full">
                    {guestName}
                  </span>
                </motion.div>

                {/* Invitation text */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
                  className="mb-3 px-2">
                  <p className="text-[11px] md:text-base text-gray-500 italic tracking-wide">
                    {isGrad ? 'Thân mời bạn đến dự lễ tốt nghiệp của' : 'Trân trọng kính mời bạn đến dự tiệc sinh nhật của'}
                  </p>
                </motion.div>

                {/* Host name script with Gold Foil moving shine */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 12 }}
                  className="mb-1 w-full px-2"
                >
                  <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.5rem] leading-[1.2] -rotate-1 font-normal font-serif gold-foil-text break-words whitespace-normal max-w-full mx-auto" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    {event.hostName}
                  </h1>
                </motion.div>

                {/* GRADUATION / Event title with pulsation glow */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
                  className="mb-2 w-full px-2"
                >
                  <h2 className="text-2xl sm:text-[1.8rem] md:text-[3.2rem] font-extrabold text-[#5C0A0A] tracking-[0.1em] uppercase leading-tight title-glow-royal break-words whitespace-normal max-w-full mx-auto" 
                    style={{ fontFamily: "'Playfair Display', sans-serif" }}>
                    {event.title}
                  </h2>
                </motion.div>

                {/* Subtitle */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                  className="mb-8 md:mb-10 px-2">
                  <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] uppercase">{event.subtitle}</p>
                </motion.div>

                {/* Time & Location details — side-by-side on desktop, stacked on mobile */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 my-2 w-full max-w-2xl border-y border-[#C49B5B]/15 py-6 md:py-8 px-2"
                >
                  {/* Time Section */}
                  <div className="flex flex-col items-center">
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-1 md:mb-2 font-medium">Vào lúc</p>
                    <p className="text-base md:text-lg font-bold text-[#3a2e2b]">{event.timeLine1}</p>
                    <p className="text-xs md:text-sm font-semibold text-[#5C0A0A] uppercase tracking-wider">{event.timeLine2}</p>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">{event.timeLine3}</p>
                  </div>

                  {/* Location Section */}
                  <div className="flex flex-col items-center">
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-1 md:mb-2 font-medium">Tại</p>
                    <p className="text-sm md:text-base font-bold text-[#3a2e2b] uppercase tracking-wide px-2">{event.locationLine1}</p>
                    <p className="text-[11px] md:text-xs text-gray-500 mt-1 leading-relaxed max-w-[240px] px-2">{event.locationLine2}</p>
                  </div>
                </motion.div>

                {/* Footer message */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}
                  className="pt-6 max-w-lg">
                  <p className="text-xs md:text-sm text-gray-400 italic leading-[1.8] px-4">
                    "{event.footerMessage}"
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

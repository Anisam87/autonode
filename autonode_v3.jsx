import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   AUTONODE v3 — Rich, colorful, mission-driven
   ═══════════════════════════════════════════════════════ */

function Logo({ size = 120, glow = false }) {
  const r = size / 2, cx = r, cy = r, stR = r * 0.88, roR = r * 0.55, coR = r * 0.22, nR = r * 0.09, teeth = 18;
  const pts = []; for (let i = 0; i < teeth * 2; i++) { const a = (i * Math.PI) / teeth - Math.PI / 2; const rd = i % 2 === 0 ? stR : stR * 0.88; pts.push(`${cx + rd * Math.cos(a)},${cy + rd * Math.sin(a)}`); }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={glow ? { filter: "drop-shadow(0 0 24px rgba(245,166,35,0.3))" } : {}}>
      <polygon points={pts.join(" ")} fill="none" stroke="#F5A623" strokeWidth={size * 0.012} opacity={0.55} />
      <circle cx={cx} cy={cy} r={roR} fill="none" stroke="#F5A623" strokeWidth={size * 0.007} opacity={0.25} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i * Math.PI * 2) / 12 - Math.PI / 2; return <line key={i} x1={cx + roR * Math.cos(a)} y1={cy + roR * Math.sin(a)} x2={cx + stR * 0.88 * Math.cos(a)} y2={cy + stR * 0.88 * Math.sin(a)} stroke="#F5A623" strokeWidth={size * 0.004} opacity={0.12} />; })}
      {[-90, 30, 150].map((angle, i) => { const a = (angle * Math.PI) / 180; const ox = cx + roR * 0.85 * Math.cos(a); const oy = cy + roR * 0.85 * Math.sin(a); const bw = size * 0.12, bh = size * 0.06; const mx = cx + coR * 1.6 * Math.cos(a); const my = cy + coR * 1.6 * Math.sin(a); return (<g key={i}><line x1={ox} y1={oy} x2={mx} y2={my} stroke="#F5A623" strokeWidth={size * 0.008} opacity={0.45} strokeDasharray={`${size * 0.02} ${size * 0.01}`} /><rect x={ox - bw / 2} y={oy - bh / 2} width={bw} height={bh} rx={size * 0.012} fill="none" stroke="#F5A623" strokeWidth={size * 0.01} opacity={0.65} transform={`rotate(${angle + 90} ${ox} ${oy})`} /><circle cx={mx} cy={my} r={size * 0.018} fill="#F5A623" opacity={0.35} /></g>); })}
      <circle cx={cx} cy={cy} r={coR} fill="none" stroke="#F5A623" strokeWidth={size * 0.01} opacity={0.45} />
      <circle cx={cx} cy={cy} r={nR} fill="#F5A623" opacity={0.85} />
    </svg>
  );
}

// ─── RICH ATMOSPHERIC BACKGROUNDS ───
function HeroBg() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g1" cx="20%" cy="30%"><stop offset="0%" stopColor="#F5A623" stopOpacity={0.08} /><stop offset="60%" stopColor="#F5A623" stopOpacity={0} /></radialGradient>
        <radialGradient id="g2" cx="80%" cy="70%"><stop offset="0%" stopColor="#14B8A6" stopOpacity={0.06} /><stop offset="60%" stopColor="#14B8A6" stopOpacity={0} /></radialGradient>
        <radialGradient id="g3" cx="50%" cy="50%"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.04} /><stop offset="70%" stopColor="#8B5CF6" stopOpacity={0} /></radialGradient>
        <radialGradient id="gNode"><stop offset="0%" stopColor="#F5A623" /><stop offset="100%" stopColor="#F5A623" stopOpacity={0} /></radialGradient>
      </defs>
      <rect width="1200" height="700" fill="#050505" />
      <ellipse cx={240} cy={200} rx={400} ry={300} fill="url(#g1)" />
      <ellipse cx={900} cy={500} rx={350} ry={250} fill="url(#g2)" />
      <ellipse cx={600} cy={350} rx={300} ry={300} fill="url(#g3)" />
      
      {/* Battery pack grid — large, colorful */}
      {Array.from({ length: 14 }).map((_, c) => Array.from({ length: 6 }).map((_, r) => {
        const x = 50 + c * 80, y = 80 + r * 90;
        const hue = (c * 10 + r * 20) % 360;
        const colors = ["#F5A623", "#14B8A6", "#8B5CF6", "#3B82F6", "#F97316", "#22C55E"];
        const color = colors[(c + r) % colors.length];
        return <rect key={`${c}${r}`} x={x} y={y} width={60} height={30} rx={4} fill="none" stroke={color} strokeWidth={0.4} opacity={0.06 + Math.random() * 0.06} />;
      }))}

      {/* Circuit traces in multiple colors */}
      {[
        { pts: "M100,400 L200,400 L200,300 L350,300 L350,380 L500,380", color: "#F5A623", op: 0.06 },
        { pts: "M700,100 L800,100 L800,200 L900,200 L900,150 L1050,150", color: "#14B8A6", op: 0.05 },
        { pts: "M400,550 L500,550 L500,480 L650,480 L650,550 L800,550", color: "#8B5CF6", op: 0.04 },
        { pts: "M50,600 L150,600 L150,520 L250,520", color: "#3B82F6", op: 0.05 },
        { pts: "M900,400 L1000,400 L1000,500 L1100,500", color: "#F97316", op: 0.04 },
      ].map((t, i) => (
        <g key={i}>
          <polyline points={t.pts.replace(/[ML]/g, '').split(' ').join(',')} fill="none" stroke={t.color} strokeWidth={0.8} opacity={t.op} />
          <circle cx={parseFloat(t.pts.split(' ').pop().split(',')[0])} cy={parseFloat(t.pts.split(' ').pop().split(',')[1]) || 0} r={3} fill={t.color} opacity={t.op * 3} />
        </g>
      ))}

      {/* Glowing nodes scattered */}
      {[
        [200, 200, "#F5A623", 8], [600, 350, "#14B8A6", 6], [900, 150, "#8B5CF6", 7],
        [400, 500, "#3B82F6", 5], [1000, 450, "#F97316", 6], [300, 600, "#22C55E", 5],
        [750, 250, "#F5A623", 4], [150, 450, "#14B8A6", 5], [1050, 300, "#8B5CF6", 4],
      ].map(([x, y, color, r], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r={r * 4} fill={color} opacity={0.03}>
            <animate attributeName="opacity" values="0.02;0.06;0.02" dur={`${3 + i * 0.7}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r={r * 0.6} fill={color} opacity={0.15}>
            <animate attributeName="opacity" values="0.1;0.25;0.1" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Motor coils in different colors */}
      {[[180, 180, 50, "#F5A623"], [850, 130, 40, "#14B8A6"], [1000, 500, 35, "#8B5CF6"]].map(([cx, cy, r, color], i) => (
        <g key={`mc${i}`} opacity={0.06}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.8} />
          <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke={color} strokeWidth={0.6} />
          <circle cx={cx} cy={cy} r={r * 0.25} fill="none" stroke={color} strokeWidth={1} />
          {[0, 60, 120, 180, 240, 300].map(a => { const rad = a * Math.PI / 180; return <line key={a} x1={cx + r * 0.25 * Math.cos(rad)} y1={cy + r * 0.25 * Math.sin(rad)} x2={cx + r * 0.6 * Math.cos(rad)} y2={cy + r * 0.6 * Math.sin(rad)} stroke={color} strokeWidth={0.4} />; })}
        </g>
      ))}
    </svg>
  );
}

function SectionBg({ colors = ["#F5A623", "#14B8A6"], pos = ["20%", "80%"] }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: "60%", height: "60%", left: pos[0], top: "20%", background: `radial-gradient(circle, ${colors[0]}08 0%, transparent 70%)`, transform: "translate(-50%, -50%)" }} />
      <div style={{ position: "absolute", width: "50%", height: "50%", left: pos[1], top: "70%", background: `radial-gradient(circle, ${colors[1]}06 0%, transparent 70%)`, transform: "translate(-50%, -50%)" }} />
    </div>
  );
}

// ─── COLORFUL EV ILLUSTRATION ───
function EVIllustration() {
  return (
    <svg viewBox="0 0 600 380" style={{ width: "100%", maxWidth: 580 }}>
      <defs>
        <linearGradient id="battGrad" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#22C55E" /><stop offset="50%" stopColor="#F5A623" /><stop offset="100%" stopColor="#EF4444" /></linearGradient>
        <radialGradient id="motorGlow"><stop offset="0%" stopColor="#14B8A6" stopOpacity={0.3} /><stop offset="100%" stopColor="#14B8A6" stopOpacity={0} /></radialGradient>
      </defs>
      {/* Car body */}
      <path d="M80 250 L80 215 Q80 195 105 185 L185 155 Q210 145 235 140 L385 132 Q425 132 445 145 L505 185 Q525 195 525 215 L525 250" fill="none" stroke="#F5A623" strokeWidth={1.8} opacity={0.45} />
      <path d="M185 155 Q195 110 240 98 L375 92 Q415 92 435 110 L445 145" fill="none" stroke="#F5A623" strokeWidth={1.2} opacity={0.3} />
      {/* Windows with color fill */}
      <path d="M200 152 Q205 118 240 108 L300 102 L300 148 Z" fill="#3B82F6" opacity={0.04} stroke="#3B82F6" strokeWidth={0.5} opacity={0.15} />
      <path d="M310 100 L375 98 Q405 100 420 115 L430 145 L310 148 Z" fill="#3B82F6" opacity={0.03} stroke="#3B82F6" strokeWidth={0.5} opacity={0.12} />
      {/* Wheels with color */}
      {[[155, 260], [455, 260]].map(([wx, wy], wi) => (
        <g key={wi}>
          <circle cx={wx} cy={wy} r={30} fill="none" stroke="#F5A623" strokeWidth={1.5} opacity={0.4} />
          <circle cx={wx} cy={wy} r={20} fill="none" stroke="#F97316" strokeWidth={0.8} opacity={0.25} />
          <circle cx={wx} cy={wy} r={10} fill="none" stroke="#F5A623" strokeWidth={1} opacity={0.3} />
          <circle cx={wx} cy={wy} r={3.5} fill="#F5A623" opacity={0.4} />
          {[0, 72, 144, 216, 288].map(a => { const rad = a * Math.PI / 180; return <line key={a} x1={wx + 10 * Math.cos(rad)} y1={wy + 10 * Math.sin(rad)} x2={wx + 20 * Math.cos(rad)} y2={wy + 20 * Math.sin(rad)} stroke="#F97316" strokeWidth={1.5} opacity={0.2} />; })}
        </g>
      ))}
      {/* Battery pack — gradient colored */}
      <rect x={165} y={225} width={275} height={28} rx={5} fill="none" stroke="url(#battGrad)" strokeWidth={1.5} opacity={0.5} />
      {Array.from({ length: 10 }).map((_, i) => {
        const colors = ["#22C55E", "#22C55E", "#22C55E", "#84CC16", "#F5A623", "#F5A623", "#F97316", "#F97316", "#EF4444", "#EF4444"];
        return <rect key={i} x={170 + i * 26.5} y={228} width={23} height={10} rx={2} fill={colors[i]} opacity={0.08 + i * 0.015} stroke={colors[i]} strokeWidth={0.5} opacity={0.25} />;
      })}
      {Array.from({ length: 10 }).map((_, i) => {
        const colors = ["#22C55E", "#22C55E", "#22C55E", "#84CC16", "#F5A623", "#F5A623", "#F97316", "#F97316", "#EF4444", "#EF4444"];
        return <rect key={`b${i}`} x={170 + i * 26.5} y={241} width={23} height={9} rx={2} fill={colors[i]} opacity={0.05 + i * 0.01} stroke={colors[i]} strokeWidth={0.4} opacity={0.18} />;
      })}
      <text x={302} y={268} textAnchor="middle" fill="url(#battGrad)" fontSize={7} fontFamily="monospace" opacity={0.45}>SoH: 92% ████████░░ BATTERY INTELLIGENCE</text>
      {/* Motor glow */}
      <circle cx={450} cy={200} r={40} fill="url(#motorGlow)" />
      <circle cx={450} cy={200} r={22} fill="none" stroke="#14B8A6" strokeWidth={1.2} opacity={0.35} />
      <circle cx={450} cy={200} r={14} fill="none" stroke="#14B8A6" strokeWidth={0.8} opacity={0.25} />
      <circle cx={450} cy={200} r={6} fill="none" stroke="#14B8A6" strokeWidth={1.5} opacity={0.4} />
      <circle cx={450} cy={200} r={2.5} fill="#14B8A6" opacity={0.6} />
      {[0, 60, 120, 180, 240, 300].map(a => { const rad = a * Math.PI / 180; return <line key={a} x1={450 + 6 * Math.cos(rad)} y1={200 + 6 * Math.sin(rad)} x2={450 + 14 * Math.cos(rad)} y2={200 + 14 * Math.sin(rad)} stroke="#14B8A6" strokeWidth={0.6} opacity={0.3} />; })}
      {/* BMS / Controller */}
      <rect x={115} y={185} width={48} height={32} rx={3} fill="#8B5CF6" opacity={0.04} stroke="#8B5CF6" strokeWidth={0.8} opacity={0.25} />
      {[0, 1, 2, 3].map(i => <line key={i} x1={120} y1={193 + i * 6} x2={155} y2={193 + i * 6} stroke="#8B5CF6" strokeWidth={0.4} opacity={0.15} />)}
      <text x={139} y={180} textAnchor="middle" fill="#8B5CF6" fontSize={6} fontFamily="monospace" opacity={0.35}>BMS</text>
      {/* Data streams (animated, colorful) */}
      {[
        { d: "M300,120 Q300,60 300,40", color: "#F5A623" },
        { d: "M320,118 Q340,50 360,30", color: "#14B8A6" },
        { d: "M280,120 Q260,55 240,35", color: "#8B5CF6" },
      ].map((s, i) => (
        <g key={i}>
          <path d={s.d} fill="none" stroke={s.color} strokeWidth={0.8} opacity={0.2} strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </path>
          <circle cx={parseFloat(s.d.split(' ').pop().split(',')[0])} cy={parseFloat(s.d.split(' ').pop().split(',')[1])} r={3} fill={s.color} opacity={0.3}>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <text x={300} y={20} textAnchor="middle" fill="#F5A623" fontSize={7} fontFamily="monospace" opacity={0.3}>TELEMATICS · BATTERY · MARKET DATA</text>
      {/* Ground */}
      <line x1={40} y1={295} x2={560} y2={295} stroke="#F5A623" strokeWidth={0.3} opacity={0.1} />
      {/* Residual value label */}
      <rect x={180} y={310} width={240} height={24} rx={4} fill="#0E0E0E" stroke="#22C55E" strokeWidth={0.6} opacity={0.35} />
      <text x={300} y={326} textAnchor="middle" fill="#22C55E" fontSize={8} fontFamily="monospace" opacity={0.5}>AUTONODE SCORE: A2 · RV: ₹12.4L · LTV: 82%</text>
    </svg>
  );
}

function FleetViz() {
  const colors = ["#8B5CF6", "#A78BFA", "#7C3AED", "#6D28D9", "#C4B5FD"];
  return (
    <svg viewBox="0 0 560 350" style={{ width: "100%", maxWidth: 540 }}>
      <defs>
        <radialGradient id="fGlow"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></radialGradient>
      </defs>
      {/* Fleet of buses */}
      {[[60, 50, 1, 0.35], [220, 30, 1.1, 0.5], [400, 55, 0.9, 0.3], [140, 150, 0.95, 0.4], [330, 155, 1, 0.35]].map(([x, y, s, op], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`} opacity={op}>
          <rect x={0} y={0} width={100} height={38} rx={5} fill={colors[i]} fillOpacity={0.04} stroke={colors[i]} strokeWidth={1.2} />
          <rect x={5} y={4} width={18} height={16} rx={2} fill="none" stroke={colors[i]} strokeWidth={0.6} opacity={0.5} />
          <rect x={27} y={4} width={14} height={16} rx={2} fill="none" stroke={colors[i]} strokeWidth={0.5} opacity={0.4} />
          <rect x={45} y={4} width={14} height={16} rx={2} fill="none" stroke={colors[i]} strokeWidth={0.5} opacity={0.4} />
          <rect x={63} y={4} width={32} height={16} rx={2} fill="none" stroke={colors[i]} strokeWidth={0.5} opacity={0.4} />
          <circle cx={18} cy={44} r={7} fill="none" stroke={colors[i]} strokeWidth={1} />
          <circle cx={80} cy={44} r={7} fill="none" stroke={colors[i]} strokeWidth={1} />
          {/* SoH bar on each bus */}
          <rect x={5} y={26} width={90} height={4} rx={1} fill="#111" />
          <rect x={5} y={26} width={90 * (0.7 + Math.random() * 0.25)} height={4} rx={1} fill={colors[i]} opacity={0.4} />
          {/* Pulse signal */}
          <circle cx={50} cy={-5} r={3} fill={colors[i]} opacity={0.4}>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={50} cy={-5} r={10} fill="none" stroke={colors[i]} strokeWidth={0.5} opacity={0.15}>
            <animate attributeName="r" values="8;18;8" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* Central hub */}
      <circle cx={280} cy={270} r={50} fill="url(#fGlow)" />
      <circle cx={280} cy={270} r={28} fill="none" stroke="#F5A623" strokeWidth={1.2} opacity={0.35} />
      <circle cx={280} cy={270} r={14} fill="none" stroke="#F5A623" strokeWidth={0.8} opacity={0.25} />
      <circle cx={280} cy={270} r={5} fill="#F5A623" opacity={0.5} />
      {/* Lines from buses to hub — colorful */}
      {[[110, 95], [275, 78], [445, 100], [190, 200], [380, 200]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={280} y2={248} stroke={colors[i]} strokeWidth={0.6} opacity={0.15} strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-18" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
      <text x={280} y={315} textAnchor="middle" fill="#F5A623" fontSize={8} fontFamily="monospace" opacity={0.45}>AUTONODE FLEET INTELLIGENCE</text>
      <text x={280} y={330} textAnchor="middle" fill="#8B5CF6" fontSize={7} fontFamily="monospace" opacity={0.3}>5 VEHICLES · AVG SoH 88% · FLEET VALUE ₹2.4Cr</text>
    </svg>
  );
}

function DashboardViz() {
  return (
    <svg viewBox="0 0 520 340" style={{ width: "100%", maxWidth: 500 }}>
      <defs>
        <linearGradient id="scoreGrad"><stop offset="0%" stopColor="#22C55E" /><stop offset="100%" stopColor="#14B8A6" /></linearGradient>
      </defs>
      <rect x={10} y={5} width={500} height={310} rx={8} fill="#080808" stroke="#14B8A6" strokeWidth={0.8} opacity={0.35} />
      {/* Header */}
      <rect x={10} y={5} width={500} height={32} rx={8} fill="#0C0C0C" stroke="#14B8A6" strokeWidth={0.4} opacity={0.25} />
      <circle cx={30} cy={21} r={4} fill="#EF4444" opacity={0.4} /><circle cx={44} cy={21} r={4} fill="#F5A623" opacity={0.4} /><circle cx={58} cy={21} r={4} fill="#22C55E" opacity={0.4} />
      <text x={260} y={24} textAnchor="middle" fill="#14B8A6" fontSize={7} fontFamily="monospace" opacity={0.5}>AUTONODE UNDERWRITING INTELLIGENCE</text>
      {/* Score card */}
      <rect x={25} y={50} width={140} height={120} rx={5} fill="#0E0E0E" stroke="#14B8A6" strokeWidth={0.5} opacity={0.3} />
      <text x={95} y={70} textAnchor="middle" fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.5}>AUTONODE SCORE</text>
      <text x={95} y={115} textAnchor="middle" fill="url(#scoreGrad)" fontSize={42} fontFamily="'Syne',sans-serif" fontWeight={800} opacity={0.7}>A2</text>
      <text x={95} y={135} textAnchor="middle" fill="#22C55E" fontSize={8} fontFamily="monospace" opacity={0.4}>LOW RISK</text>
      <rect x={45} y={142} width={100} height={6} rx={2} fill="#111" /><rect x={45} y={142} width={82} height={6} rx={2} fill="#22C55E" opacity={0.4} />
      <text x={95} y={160} textAnchor="middle" fill="#888" fontSize={6} fontFamily="monospace" opacity={0.3}>CONFIDENCE 94%</text>
      {/* Vehicle info */}
      <rect x={180} y={50} width={320} height={55} rx={5} fill="#0E0E0E" stroke="#14B8A6" strokeWidth={0.4} opacity={0.25} />
      <text x={195} y={68} fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.4}>VEHICLE</text>
      <text x={195} y={84} fill="#F0F0F0" fontSize={11} fontFamily="'Syne',sans-serif" fontWeight={700} opacity={0.6}>Tata Nexon EV Max LR</text>
      <text x={195} y={97} fill="#888" fontSize={7} fontFamily="monospace" opacity={0.3}>2023 · 28,400 km · Delhi NCR · Fast-charge 60%</text>
      {/* Battery health */}
      <rect x={180} y={115} width={155} height={55} rx={5} fill="#0E0E0E" stroke="#22C55E" strokeWidth={0.4} opacity={0.25} />
      <text x={195} y={132} fill="#22C55E" fontSize={6} fontFamily="monospace" opacity={0.45}>BATTERY SoH</text>
      <text x={195} y={157} fill="#22C55E" fontSize={24} fontFamily="'Syne',sans-serif" fontWeight={800} opacity={0.6}>92%</text>
      <rect x={240} y={145} width={80} height={5} rx={2} fill="#111" /><rect x={240} y={145} width={74} height={5} rx={2} fill="#22C55E" opacity={0.35} />
      {/* Residual value */}
      <rect x={345} y={115} width={155} height={55} rx={5} fill="#0E0E0E" stroke="#F5A623" strokeWidth={0.4} opacity={0.25} />
      <text x={360} y={132} fill="#F5A623" fontSize={6} fontFamily="monospace" opacity={0.45}>RESIDUAL VALUE</text>
      <text x={360} y={157} fill="#F5A623" fontSize={24} fontFamily="'Syne',sans-serif" fontWeight={800} opacity={0.6}>₹12.4L</text>
      <text x={430} y={157} fill="#888" fontSize={8} fontFamily="monospace" opacity={0.25}>/ ₹20L</text>
      {/* Depreciation chart */}
      <rect x={25} y={185} width={475} height={110} rx={5} fill="#0E0E0E" stroke="#14B8A6" strokeWidth={0.4} opacity={0.2} />
      <text x={40} y={202} fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.4}>RESIDUAL VALUE FORECAST</text>
      {/* Bars */}
      {["Now", "Y1", "Y2", "Y3", "Y4", "Y5"].map((l, i) => {
        const x = 55 + i * 72, h = [70, 62, 54, 45, 37, 30][i];
        const colors = ["#22C55E", "#22C55E", "#84CC16", "#F5A623", "#F97316", "#EF4444"];
        return (<g key={i}>
          <rect x={x} y={275 - h} width={48} height={h} rx={3} fill={colors[i]} opacity={0.12} stroke={colors[i]} strokeWidth={0.5} opacity={0.3} />
          <text x={x + 24} y={270 - h} textAnchor="middle" fill={colors[i]} fontSize={8} fontFamily="monospace" fontWeight="bold" opacity={0.55}>{[100, 88, 76, 65, 55, 46][i]}%</text>
          <text x={x + 24} y={290} textAnchor="middle" fill="#555" fontSize={6} fontFamily="monospace">{l}</text>
        </g>);
      })}
      {/* Recommendation bar */}
      <rect x={25} y={300} width={475} height={12} rx={3} fill="#14B8A6" opacity={0.06} />
      <text x={260} y={309} textAnchor="middle" fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.45}>⚡ UNDERWRITE AT 82% LTV · EXPECTED RECOVERY: 94% · RISK: LOW</text>
    </svg>
  );
}

// ─── SECTION ───
function Sec({ children, id, style = {} }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <section ref={ref} id={id} style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 8%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(25px)", transition: "opacity 0.8s, transform 0.8s", overflow: "hidden", ...style }}>{children}</section>;
}

// ═══ MAIN ═══
export default function App() {
  const [pg, setPg] = useState("home");
  const [sc, setSc] = useState(false);
  const mRef = useRef(null);
  useEffect(() => { const el = mRef.current; if (!el) return; const h = () => setSc(el.scrollTop > 50); el.addEventListener("scroll", h); return () => el.removeEventListener("scroll", h); }, [pg]);
  const go = useCallback((p) => { setPg(p); if (mRef.current) mRef.current.scrollTop = 0; }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden", background: "#050505", color: "#F0F0F0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; } 50% { opacity:0.7; } }
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-track { background:#050505; } ::-webkit-scrollbar-thumb { background:#1A1A1A; }
        .nl { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:2px; color:#555; cursor:pointer; padding:8px 0; transition:color 0.3s; text-transform:uppercase; }
        .nl:hover,.nl.a { color:#F5A623; }
        .cta { padding:14px 32px; background:#F5A623; color:#0A0A0A; font-family:'DM Mono',monospace; font-size:11px; font-weight:500; letter-spacing:3px; text-transform:uppercase; cursor:pointer; border:none; transition:all 0.3s; }
        .cta:hover { background:#D4900F; box-shadow:0 4px 24px rgba(245,166,35,0.25); }
        .gh { padding:14px 32px; background:transparent; border:1px solid #333; color:#777; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:3px; text-transform:uppercase; cursor:pointer; transition:all 0.3s; }
        .gh:hover { border-color:#F5A623; color:#F5A623; }
        .lb { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:5px; text-transform:uppercase; color:#F5A623; margin-bottom:24px; }
        .h1 { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(30px,5vw,56px); line-height:1.08; letter-spacing:-2px; }
        .h2 { font-family:'Syne',sans-serif; font-weight:700; font-size:clamp(22px,3.2vw,40px); line-height:1.12; letter-spacing:-1px; }
        .bd { font-family:'DM Mono',monospace; font-size:13px; line-height:1.85; color:#777; }
        .it { font-family:'Instrument Serif',Georgia,serif; font-style:italic; }
        .cd { background:#0A0A0A; border:1px solid #151515; padding:36px 28px; transition:border-color 0.4s; position:relative; overflow:hidden; }
        .cd:hover { border-color:rgba(245,166,35,0.25); }
        .cd::after { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,#F5A623,transparent); opacity:0; transition:opacity 0.4s; }
        .cd:hover::after { opacity:0.4; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 6%", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", background: sc ? "rgba(5,5,5,0.95)" : "transparent", backdropFilter: sc ? "blur(10px)" : "none", borderBottom: `1px solid ${sc ? "#111" : "transparent"}`, transition: "all 0.4s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("home")}><Logo size={26} /><span style={{ fontFamily: "'Syne'", fontSize: 12, fontWeight: 700, letterSpacing: 4, color: "#F0F0F0" }}>AUTONODE</span></div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span className={`nl ${pg === "oem" ? "a" : ""}`} onClick={() => go("oem")}>OEMs</span>
          <span className={`nl ${pg === "nbfc" ? "a" : ""}`} onClick={() => go("nbfc")}>NBFCs</span>
          <span className={`nl ${pg === "fleet" ? "a" : ""}`} onClick={() => go("fleet")}>Fleets</span>
          <button className="cta" style={{ padding: "7px 18px", fontSize: 10 }} onClick={() => go("contact")}>Partner</button>
        </div>
      </nav>

      <div ref={mRef} style={{ height: "100vh", overflowY: "auto" }}>

        {pg === "home" && <>
          {/* ── HERO: MISSION ── */}
          <Sec id="hero" style={{ alignItems: "center", textAlign: "center", minHeight: "100vh" }}>
            <HeroBg />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ animation: "fadeUp 1.5s ease 0.2s both", marginBottom: 36 }}><Logo size={110} glow /></div>
              <div className="lb" style={{ animation: "fadeUp 1s ease 0.8s both", marginBottom: 12, letterSpacing: 6 }}>Autonode</div>
              <h1 className="h1" style={{ animation: "fadeUp 1s ease 1s both", maxWidth: 750, margin: "0 auto" }}>
                Accelerating India's<br />EV transition by building the<br /><span className="it" style={{ color: "#F5A623" }}>intelligence it needs.</span>
              </h1>
              <p className="bd" style={{ maxWidth: 500, margin: "28px auto 0", animation: "fadeUp 1s ease 1.3s both" }}>
                Residual value. Battery health. Lifecycle economics.<br />The data layer that connects OEMs, lenders, and fleet operators.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 36, animation: "fadeUp 1s ease 1.6s both" }}>
                <button className="cta" onClick={() => go("contact")}>Partner with us</button>
                <button className="gh" onClick={() => go("oem")}>Explore</button>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", animation: "pulse 2.5s ease infinite" }}>
              <svg width={16} height={24} viewBox="0 0 16 24"><rect x={5} y={0} width={6} height={24} rx={3} fill="none" stroke="#333" strokeWidth={0.8} /><circle cx={8} cy={7} r={2} fill="#F5A623" opacity={0.5}><animate attributeName="cy" values="7;17;7" dur="2s" repeatCount="indefinite" /></circle></svg>
            </div>
          </Sec>

          {/* ── EV X-RAY + PROBLEM ── */}
          <Sec id="xray" style={{ background: "#060606" }}>
            <SectionBg colors={["#F5A623", "#EF4444"]} pos={["75%", "25%"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div>
                <div className="lb">The Problem</div>
                <h2 className="h2" style={{ marginBottom: 20 }}>Every component speaks data. Nobody is <span className="it" style={{ color: "#F5A623" }}>listening.</span></h2>
                <div style={{ width: 80, height: 1, background: "linear-gradient(90deg,#F5A623,transparent)", marginBottom: 20 }} />
                <p className="bd">Battery state-of-health, motor performance, charging behaviour, degradation under Indian heat and dust — this data exists inside every connected EV. But it doesn't reach the people who need it most: the lenders who underwrite the loans, the insurers who price the buyback, the fleet operators who plan the TCO.</p>
                <p className="bd" style={{ marginTop: 14 }}>The result: 82% of required EV capital remains unmet. Interest rates 2–3× higher than they should be. Sales dying at the finance counter.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}><EVIllustration /></div>
            </div>
          </Sec>

          {/* ── FOR PV ── */}
          <Sec id="pv" style={{ background: "#050505" }}>
            <SectionBg colors={["#EF4444", "#F97316"]} pos={["30%", "70%"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div>
                <div className="lb" style={{ color: "#F97316" }}>Passenger Vehicles</div>
                <h2 className="h2" style={{ marginBottom: 20 }}>The sale dies at the <span className="it" style={{ color: "#EF4444" }}>finance counter.</span></h2>
                <p className="bd">Customer loves the car. NBFC runs ICE-era valuation. LTV comes back at 65%. EMI is 25% higher than petrol. Customer walks out.</p>
                <p className="bd" style={{ marginTop: 14 }}>Your buyback guarantee — facilitated by Lockton, Zuno — is priced without real battery telemetry. Autonode doesn't replace your insurance partner. We give them the data they don't have.</p>
                <button className="gh" style={{ marginTop: 24, borderColor: "#F97316", color: "#F97316" }} onClick={() => go("oem")}>What Autonode does for OEMs →</button>
              </div>
              <div>
                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { v: "65%", l: "LTV without\nAutonode", c: "#EF4444" },
                    { v: "82%", l: "LTV with\nAutonode", c: "#22C55E" },
                    { v: "+25%", l: "EMI premium\nvs ICE", c: "#F97316" },
                    { v: "~0%", l: "With battery-certified\nunderwriting", c: "#14B8A6" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#0A0A0A", border: `1px solid ${s.c}22`, padding: "28px 16px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Syne'", fontSize: 32, fontWeight: 800, color: s.c, letterSpacing: -1 }}>{s.v}</div>
                      <div style={{ width: 24, height: 1, background: "#222", margin: "10px auto" }} />
                      <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#666", lineHeight: 1.6, whiteSpace: "pre-line" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Sec>

          {/* ── FOR CV / FLEET ── */}
          <Sec id="cv" style={{ background: "#060606" }}>
            <SectionBg colors={["#8B5CF6", "#3B82F6"]} pos={["70%", "30%"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", justifyContent: "center" }}><FleetViz /></div>
              <div>
                <div className="lb" style={{ color: "#8B5CF6" }}>Commercial Vehicles</div>
                <h2 className="h2" style={{ marginBottom: 20 }}>Your fleet pipeline is stalled at a <span className="it" style={{ color: "#8B5CF6" }}>single point.</span></h2>
                <p className="bd">Banks won't lend for e-buses and e-trucks. Fleet operators face 15–33% interest rates. MHI is creating a special SIDBI mechanism because private capital won't flow.</p>
                <p className="bd" style={{ marginTop: 14 }}>Root cause: no lender can model what an e-bus will be worth under Indian duty cycles in five years. Autonode provides that model. Interest drops to 10–12%. Orders start moving.</p>
                <button className="gh" style={{ marginTop: 24, borderColor: "#8B5CF6", color: "#8B5CF6" }} onClick={() => go("fleet")}>What Autonode does for Fleets →</button>
              </div>
            </div>
          </Sec>

          {/* ── THREE AUDIENCES ── */}
          <Sec id="who" style={{ background: "#050505" }}>
            <SectionBg colors={["#F5A623", "#14B8A6"]} pos={["50%", "50%"]} />
            <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2 }}>
              <div className="lb">Who We Serve</div>
              <h2 className="h2">One platform. Three stakeholders.</h2>
            </div>
            <div style={{ display: "flex", gap: 16, position: "relative", zIndex: 2 }}>
              {[
                { t: "OEMs", d: "Higher showroom conversion. Better buyback data. Unlocked fleet pipeline. Certified pre-owned channel.", c: "#F5A623", p: "oem" },
                { t: "NBFCs & Banks", d: "Underwrite EV loans with defensible residual data. Portfolio monitoring. Recovery intelligence.", c: "#14B8A6", p: "nbfc" },
                { t: "Fleet Operators", d: "Finance e-buses at 10–12%. Live fleet health. Residual protection. Terminal value extraction.", c: "#8B5CF6", p: "fleet" },
              ].map((c, i) => (
                <div key={i} className="cd" onClick={() => go(c.p)} style={{ flex: 1, cursor: "pointer", textAlign: "center", padding: "44px 24px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", border: `1.5px solid ${c.c}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 0 20px ${c.c}15` }}>
                    <span style={{ fontFamily: "'Syne'", fontSize: 14, fontWeight: 700, color: c.c }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne'", fontSize: 18, fontWeight: 700, color: "#F0F0F0", marginBottom: 14 }}>{c.t}</h3>
                  <p className="bd" style={{ fontSize: 12 }}>{c.d}</p>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: c.c, marginTop: 18, letterSpacing: 2 }}>EXPLORE →</div>
                </div>
              ))}
            </div>
          </Sec>

          {/* ── CTA ── */}
          <Sec id="cta" style={{ background: "#060606", alignItems: "center", textAlign: "center" }}>
            <SectionBg colors={["#F5A623", "#8B5CF6"]} pos={["40%", "60%"]} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <Logo size={70} glow />
              <h2 className="h2" style={{ marginTop: 28, marginBottom: 14 }}>We're looking for <span className="it" style={{ color: "#F5A623" }}>founding partners.</span></h2>
              <p className="bd" style={{ maxWidth: 400, margin: "0 auto 28px" }}>Co-develop the residual value standard that lenders across India will adopt.</p>
              <button className="cta" onClick={() => go("contact")}>Start the conversation</button>
              <div style={{ fontFamily: "'DM Mono'", fontSize: 11, color: "#333", marginTop: 36, letterSpacing: 2 }}>hello@autonodelabs.com</div>
            </div>
          </Sec>
        </>}

        {/* ═══ OEM ═══ */}
        {pg === "oem" && <>
          <Sec id="o1" style={{ background: "#050505" }}><SectionBg colors={["#F5A623", "#F97316"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div><div className="lb">For OEMs</div><h1 className="h1" style={{ marginBottom: 20 }}>Your cars are ready. Your financing <span className="it" style={{ color: "#F5A623" }}>infrastructure isn't.</span></h1><div style={{ width: 100, height: 1, background: "linear-gradient(90deg,#F5A623,transparent)", marginBottom: 20 }} /><p className="bd" style={{ maxWidth: 460 }}>Every EV that can't get financed at competitive rates is revenue walking out. Autonode gives NBFCs the residual value data to underwrite confidently — and gives your insurance partner the battery telemetry to price buyback accurately.</p></div>
              <div style={{ display: "flex", justifyContent: "center" }}><EVIllustration /></div>
            </div>
          </Sec>
          <Sec id="o2" style={{ background: "#060606" }}><SectionBg colors={["#F5A623", "#22C55E"]} pos={["80%", "20%"]} />
            <div style={{ position: "relative", zIndex: 2 }}><div className="lb">What You Get</div><h2 className="h2" style={{ marginBottom: 36 }}>Four outcomes. <span className="it" style={{ color: "#F5A623" }}>Zero build cost.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ n: "01", t: "Higher Showroom Conversion", d: "NBFC underwrites at 80–85% LTV instead of 65%. EMI drops. Sale closes. Every point of LTV improvement is revenue recovered.", c: "#22C55E" }, { n: "02", t: "Better Buyback Data", d: "We don't replace Lockton or Zuno. We give them battery telemetry they don't have. Better data = tighter, defensible pricing for your guarantee.", c: "#F5A623" }, { n: "03", t: "Unlocked Fleet Pipeline", d: "Lenders can't write e-bus loans without residual models. We provide them. Interest drops from 20%+ to 10–12%. Your stalled orders move.", c: "#8B5CF6" }, { n: "04", t: "Certified Pre-Owned", d: "Battery SoH certification enables a branded CPO program. Real data protects secondary-market residuals and builds repeat loyalty.", c: "#14B8A6" }].map((item, i) => (
                <div key={i} className="cd"><div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: item.c, letterSpacing: 3, marginBottom: 12 }}>{item.n}</div><h3 style={{ fontFamily: "'Syne'", fontSize: 17, fontWeight: 700, color: "#F0F0F0", marginBottom: 10 }}>{item.t}</h3><p className="bd" style={{ fontSize: 12 }}>{item.d}</p></div>
              ))}
            </div></div>
          </Sec>
          <Sec id="o3" style={{ background: "#050505", alignItems: "center", textAlign: "center" }}><h2 className="h2">Become a <span className="it" style={{ color: "#F5A623" }}>founding OEM partner.</span></h2><p className="bd" style={{ maxWidth: 400, margin: "14px auto 24px" }}>Share anonymised telematics. Co-develop the standard.</p><button className="cta" onClick={() => go("contact")}>Start the conversation</button></Sec>
        </>}

        {/* ═══ NBFC ═══ */}
        {pg === "nbfc" && <>
          <Sec id="n1" style={{ background: "#050505" }}><SectionBg colors={["#14B8A6", "#3B82F6"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div><div className="lb" style={{ color: "#14B8A6" }}>For NBFCs & Banks</div><h1 className="h1" style={{ marginBottom: 20 }}>You want to lend for EVs. You just can't <span className="it" style={{ color: "#14B8A6" }}>price the asset.</span></h1><div style={{ width: 100, height: 1, background: "linear-gradient(90deg,#14B8A6,transparent)", marginBottom: 20 }} /><p className="bd" style={{ maxWidth: 460 }}>Without India-specific residual value models, you're adding 3–5% risk premium to every EV loan. Autonode gives you the underwriting data to lend confidently.</p></div>
              <div style={{ display: "flex", justifyContent: "center" }}><DashboardViz /></div>
            </div>
          </Sec>
          <Sec id="n2" style={{ background: "#060606" }}><SectionBg colors={["#14B8A6", "#22C55E"]} pos={["70%", "30%"]} />
            <div style={{ position: "relative", zIndex: 2 }}><div className="lb" style={{ color: "#14B8A6" }}>Intelligence</div><h2 className="h2" style={{ marginBottom: 36 }}>Lend more. <span className="it" style={{ color: "#14B8A6" }}>Risk less.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[{ n: "01", t: "Per-Vehicle Scoring", d: "API returns residual value, battery grade, and depreciation curve — by make, model, variant, geography, usage." }, { n: "02", t: "Portfolio Monitoring", d: "Live SoH tracking across your EV book. Early degradation alerts. Continuous residual recalibration." }, { n: "03", t: "Recovery Intelligence", d: "When a loan goes NPA, know the asset's current fair market value — not what it was worth at origination." }].map((item, i) => (
                <div key={i} className="cd"><div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#14B8A6", letterSpacing: 3, marginBottom: 12 }}>{item.n}</div><h3 style={{ fontFamily: "'Syne'", fontSize: 17, fontWeight: 700, color: "#F0F0F0", marginBottom: 10 }}>{item.t}</h3><p className="bd" style={{ fontSize: 12 }}>{item.d}</p></div>
              ))}
            </div></div>
          </Sec>
          <Sec id="n3" style={{ background: "#050505", alignItems: "center", textAlign: "center" }}><h2 className="h2">Become a <span className="it" style={{ color: "#14B8A6" }}>design partner.</span></h2><p className="bd" style={{ maxWidth: 400, margin: "14px auto 24px" }}>Pilot Autonode on your EV portfolio.</p><button className="cta" style={{ background: "#14B8A6" }} onClick={() => go("contact")}>Start the conversation</button></Sec>
        </>}

        {/* ═══ FLEET ═══ */}
        {pg === "fleet" && <>
          <Sec id="f1" style={{ background: "#050505" }}><SectionBg colors={["#8B5CF6", "#6D28D9"]} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
              <div><div className="lb" style={{ color: "#8B5CF6" }}>For Fleet Operators</div><h1 className="h1" style={{ marginBottom: 20 }}>You want to electrify. Your lender <span className="it" style={{ color: "#8B5CF6" }}>won't let you.</span></h1><div style={{ width: 100, height: 1, background: "linear-gradient(90deg,#8B5CF6,transparent)", marginBottom: 20 }} /><p className="bd" style={{ maxWidth: 460 }}>The EV makes sense on paper. But your bank prices the loan at 15–33%. At those rates, TCO advantage vanishes. Autonode gives your lender the data to say yes at rates that work.</p></div>
              <div style={{ display: "flex", justifyContent: "center" }}><FleetViz /></div>
            </div>
          </Sec>
          <Sec id="f2" style={{ background: "#060606" }}><SectionBg colors={["#8B5CF6", "#14B8A6"]} pos={["75%", "25%"]} />
            <div style={{ position: "relative", zIndex: 2 }}><div className="lb" style={{ color: "#8B5CF6" }}>Intelligence</div><h2 className="h2" style={{ marginBottom: 36 }}>Finance it. Run it. <span className="it" style={{ color: "#8B5CF6" }}>Value it.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[{ n: "01", t: "Unlock Financing", d: "Defensible residual value models for your NBFC. Interest drops from 20%+ to 10–12%. Business case holds." }, { n: "02", t: "Live Fleet Health", d: "Real-time battery SoH across your fleet. Know which vehicles need attention before breakdown." }, { n: "03", t: "Residual Protection", d: "Certified values when remarketing. Sell into secondary market at fair price, not a blind haircut." }, { n: "04", t: "Terminal Value", d: "Battery grade certification for BESS at end-of-life. Maximum value extraction instead of scrapping." }].map((item, i) => (
                <div key={i} className="cd"><div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: "#8B5CF6", letterSpacing: 3, marginBottom: 12 }}>{item.n}</div><h3 style={{ fontFamily: "'Syne'", fontSize: 17, fontWeight: 700, color: "#F0F0F0", marginBottom: 10 }}>{item.t}</h3><p className="bd" style={{ fontSize: 12 }}>{item.d}</p></div>
              ))}
            </div></div>
          </Sec>
          <Sec id="f3" style={{ background: "#050505", alignItems: "center", textAlign: "center" }}><h2 className="h2">Let's get your fleet <span className="it" style={{ color: "#8B5CF6" }}>financed.</span></h2><p className="bd" style={{ maxWidth: 400, margin: "14px auto 24px" }}>We work with your OEM and lender to make it possible.</p><button className="cta" style={{ background: "#8B5CF6" }} onClick={() => go("contact")}>Start the conversation</button></Sec>
        </>}

        {/* ═══ CONTACT ═══ */}
        {pg === "contact" && <Sec id="cnt" style={{ alignItems: "center", textAlign: "center", background: "#050505" }}>
          <SectionBg colors={["#F5A623", "#14B8A6"]} pos={["35%", "65%"]} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Logo size={80} glow />
            <h1 className="h1" style={{ marginTop: 32, marginBottom: 14 }}>Let's build this <span className="it" style={{ color: "#F5A623" }}>together.</span></h1>
            <p className="bd" style={{ maxWidth: 420, margin: "0 auto 40px" }}>We're looking for 2–3 founding partners — OEMs, NBFCs, or fleet operators — to co-develop the residual value standard for India's EV ecosystem.</p>
            <div style={{ display: "flex", gap: 40, justifyContent: "center", marginBottom: 40 }}>
              {[{ n: "01", t: "Share Data", d: "Anonymised telematics and resale data for model calibration", c: "#F5A623" }, { n: "02", t: "Joint Pilot", d: "3-month paid pilot on your portfolio or fleet", c: "#14B8A6" }, { n: "03", t: "Shape Standard", d: "Co-develop the framework the market adopts", c: "#8B5CF6" }].map((s, i) => (
                <div key={i} style={{ maxWidth: 170, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, border: `1.5px solid ${s.c}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: `0 0 16px ${s.c}15` }}>
                    <span style={{ fontFamily: "'Syne'", fontSize: 15, fontWeight: 700, color: s.c }}>{s.n}</span>
                  </div>
                  <div style={{ fontFamily: "'Syne'", fontSize: 14, fontWeight: 700, color: "#F0F0F0", marginBottom: 6 }}>{s.t}</div>
                  <p className="bd" style={{ fontSize: 11 }}>{s.d}</p>
                </div>
              ))}
            </div>
            <div className="cd" style={{ padding: "28px 48px", display: "inline-block" }}>
              <div style={{ fontFamily: "'DM Mono'", fontSize: 15, color: "#F5A623", letterSpacing: 1 }}>hello@autonodelabs.com</div>
              <div className="bd" style={{ fontSize: 10, color: "#444", marginTop: 4 }}>autonodelabs.com</div>
            </div>
          </div>
        </Sec>}

        {/* FOOTER */}
        <footer style={{ padding: "28px 8%", borderTop: "1px solid #0E0E0E", background: "#030303", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo size={18} /><span style={{ fontFamily: "'Syne'", fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#222" }}>AUTONODE</span></div>
          <div style={{ fontFamily: "'DM Mono'", fontSize: 8, color: "#1A1A1A", letterSpacing: 2 }}>EV LIFECYCLE INTELLIGENCE · © 2026</div>
        </footer>
      </div>
    </div>
  );
}

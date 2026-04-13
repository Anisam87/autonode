import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   AUTONODE v4 — Car-parts wordmark + hero image
   ═══════════════════════════════════════════════════════ */

// ─── WORDMARK LETTERS (from car parts) ───
const G = "#F5A623";

function LetterA({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <line x1={s*0.05} y1={s*0.95} x2={s*0.48} y2={s*0.05} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <line x1={s*0.95} y1={s*0.95} x2={s*0.52} y2={s*0.05} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <circle cx={s*0.5} cy={s*0.06} r={s*0.06} fill="none" stroke={G} strokeWidth={s*0.03}/>
    <circle cx={s*0.5} cy={s*0.06} r={s*0.02} fill={G}/>
    <line x1={s*0.22} y1={s*0.58} x2={s*0.78} y2={s*0.58} stroke={G} strokeWidth={s*0.04} strokeLinecap="round"/>
    <circle cx={s*0.22} cy={s*0.58} r={s*0.035} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.5}/>
    <circle cx={s*0.78} cy={s*0.58} r={s*0.035} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.5}/>
  </g>;
}

function LetterU({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <path d={`M${s*0.1} ${s*0.05} L${s*0.1} ${s*0.6} Q${s*0.1} ${s*0.95} ${s*0.5} ${s*0.95} Q${s*0.9} ${s*0.95} ${s*0.9} ${s*0.6} L${s*0.9} ${s*0.05}`} fill="none" stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <path d={`M${s*0.2} ${s*0.05} L${s*0.2} ${s*0.6} Q${s*0.2} ${s*0.82} ${s*0.5} ${s*0.82} Q${s*0.8} ${s*0.82} ${s*0.8} ${s*0.6} L${s*0.8} ${s*0.05}`} fill="none" stroke={G} strokeWidth={s*0.012} opacity={0.25}/>
    <ellipse cx={s*0.1} cy={s*0.05} rx={s*0.05} ry={s*0.02} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.45}/>
    <ellipse cx={s*0.9} cy={s*0.05} rx={s*0.05} ry={s*0.02} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.45}/>
  </g>;
}

function LetterT({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <rect x={s*0.02} y={s*0.02} width={s*0.96} height={s*0.14} rx={s*0.03} fill="none" stroke={G} strokeWidth={s*0.045}/>
    <line x1={s*0.05} y1={s*0.21} x2={s*0.95} y2={s*0.21} stroke={G} strokeWidth={s*0.012} opacity={0.3}/>
    <circle cx={s*0.5} cy={s*0.31} r={s*0.035} fill="none" stroke={G} strokeWidth={s*0.02} opacity={0.45}/>
    <line x1={s*0.5} y1={s*0.35} x2={s*0.5} y2={s*0.82} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <circle cx={s*0.5} cy={s*0.88} r={s*0.07} fill="none" stroke={G} strokeWidth={s*0.025} opacity={0.45}/>
  </g>;
}

function LetterO1({ x, s }) {
  const cx=s*0.5, cy=s*0.5, r=s*0.42, teeth=14, pts=[];
  for(let i=0;i<teeth*2;i++){const a=(i*Math.PI)/teeth-Math.PI/2;const rd=i%2===0?r:r*0.84;pts.push(`${cx+rd*Math.cos(a)},${cy+rd*Math.sin(a)}`);}
  return <g transform={`translate(${x},0)`}>
    <polygon points={pts.join(" ")} fill="none" stroke={G} strokeWidth={s*0.035} strokeLinejoin="round"/>
    <circle cx={cx} cy={cy} r={s*0.18} fill="none" stroke={G} strokeWidth={s*0.025}/>
    <circle cx={cx} cy={cy} r={s*0.07} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.45}/>
    <circle cx={cx} cy={cy} r={s*0.025} fill={G} opacity={0.5}/>
    {[0,60,120,180,240,300].map(a=>{const rad=a*Math.PI/180;return<line key={a} x1={cx+s*0.09*Math.cos(rad)} y1={cy+s*0.09*Math.sin(rad)} x2={cx+s*0.17*Math.cos(rad)} y2={cy+s*0.17*Math.sin(rad)} stroke={G} strokeWidth={s*0.018} opacity={0.35}/>;})}
  </g>;
}

function LetterN({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <line x1={s*0.1} y1={s*0.95} x2={s*0.1} y2={s*0.05} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <line x1={s*0.12} y1={s*0.08} x2={s*0.88} y2={s*0.92} stroke={G} strokeWidth={s*0.05} strokeLinecap="round"/>
    <line x1={s*0.9} y1={s*0.95} x2={s*0.9} y2={s*0.05} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    {[[0.1,0.05],[0.1,0.95],[0.9,0.05],[0.9,0.95]].map(([fx,fy],i)=><circle key={i} cx={s*fx} cy={s*fy} r={s*0.04} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.4}/>)}
  </g>;
}

function LetterO2({ x, s }) {
  const cx=s*0.5, cy=s*0.5, stR=s*0.44, teeth=16, pts=[];
  for(let i=0;i<teeth*2;i++){const a=(i*Math.PI)/teeth-Math.PI/2;const rd=i%2===0?stR:stR*0.88;pts.push(`${cx+rd*Math.cos(a)},${cy+rd*Math.sin(a)}`);}
  return <g transform={`translate(${x},0)`}>
    <polygon points={pts.join(" ")} fill="none" stroke={G} strokeWidth={s*0.025}/>
    <circle cx={cx} cy={cy} r={s*0.28} fill="none" stroke={G} strokeWidth={s*0.018} opacity={0.45}/>
    {Array.from({length:8}).map((_,i)=>{const a=i*Math.PI*2/8;return<line key={i} x1={cx+s*0.28*Math.cos(a)} y1={cy+s*0.28*Math.sin(a)} x2={cx+stR*0.88*Math.cos(a)} y2={cy+stR*0.88*Math.sin(a)} stroke={G} strokeWidth={s*0.01} opacity={0.2}/>;})}
    <circle cx={cx} cy={cy} r={s*0.1} fill="none" stroke={G} strokeWidth={s*0.02} opacity={0.4}/>
    <circle cx={cx} cy={cy} r={s*0.035} fill={G} opacity={0.5}/>
  </g>;
}

function LetterD({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <line x1={s*0.12} y1={s*0.05} x2={s*0.12} y2={s*0.95} stroke={G} strokeWidth={s*0.055} strokeLinecap="round"/>
    <path d={`M${s*0.14} ${s*0.05} Q${s*1.05} ${s*0.05} ${s*1.05} ${s*0.5} Q${s*1.05} ${s*0.95} ${s*0.14} ${s*0.95}`} fill="none" stroke={G} strokeWidth={s*0.045}/>
    {[0.2,0.35,0.5,0.65,0.8].map((f,i)=>{const y=s*f;return<line key={i} x1={s*0.25} y1={y} x2={s*0.7} y2={y} stroke={G} strokeWidth={s*0.008} opacity={0.18}/>;})}
    <circle cx={s*0.35} cy={s*0.5} r={s*0.11} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.3}/>
    {[0,72,144,216,288].map(a=>{const rad=a*Math.PI/180;return<circle key={a} cx={s*0.35+s*0.07*Math.cos(rad)} cy={s*0.5+s*0.07*Math.sin(rad)} r={s*0.015} fill="none" stroke={G} strokeWidth={s*0.008} opacity={0.25}/>;})}
  </g>;
}

function LetterE({ x, s }) {
  return <g transform={`translate(${x},0)`}>
    <rect x={s*0.05} y={s*0.03} width={s*0.2} height={s*0.94} rx={s*0.03} fill="none" stroke={G} strokeWidth={s*0.04}/>
    <line x1={s*0.05} y1={s*0.08} x2={s*0.9} y2={s*0.08} stroke={G} strokeWidth={s*0.045} strokeLinecap="round"/>
    <line x1={s*0.05} y1={s*0.5} x2={s*0.7} y2={s*0.5} stroke={G} strokeWidth={s*0.04} strokeLinecap="round"/>
    <line x1={s*0.05} y1={s*0.92} x2={s*0.9} y2={s*0.92} stroke={G} strokeWidth={s*0.045} strokeLinecap="round"/>
    <circle cx={s*0.9} cy={s*0.08} r={s*0.025} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.45}/>
    <circle cx={s*0.7} cy={s*0.5} r={s*0.02} fill="none" stroke={G} strokeWidth={s*0.012} opacity={0.35}/>
    <circle cx={s*0.9} cy={s*0.92} r={s*0.025} fill="none" stroke={G} strokeWidth={s*0.015} opacity={0.45}/>
    {[0.25,0.37,0.63,0.75].map((f,i)=><line key={i} x1={s*0.1} y1={s*f} x2={s*0.2} y2={s*f} stroke={G} strokeWidth={s*0.006} opacity={0.12}/>)}
  </g>;
}

function Wordmark({ height = 50, opacity = 0.85, glow = false }) {
  const s = 80, gap = 10, letters = [LetterA, LetterU, LetterT, LetterO1, LetterN, LetterO2, LetterD, LetterE];
  const totalW = letters.length * (s + gap) - gap;
  return (
    <svg height={height} viewBox={`-4 -4 ${totalW + 8} ${s + 8}`} style={glow ? { filter: "drop-shadow(0 0 16px rgba(245,166,35,0.2))" } : {}} opacity={opacity}>
      {letters.map((L, i) => <L key={i} x={i * (s + gap)} s={s} />)}
    </svg>
  );
}

function MiniWordmark({ height = 20 }) {
  const s = 80, gap = 10, letters = [LetterA, LetterU, LetterT, LetterO1, LetterN, LetterO2, LetterD, LetterE];
  const totalW = letters.length * (s + gap) - gap;
  return <svg height={height} viewBox={`-2 -2 ${totalW + 4} ${s + 4}`} opacity={0.6}>{letters.map((L, i) => <L key={i} x={i * (s + gap)} s={s} />)}</svg>;
}

// ─── SECTION ───
function Sec({ children, id, style = {} }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <section ref={ref} id={id} style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 8%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(25px)", transition: "opacity 0.8s, transform 0.8s", overflow: "hidden", ...style }}>{children}</section>;
}

// ─── ILLUSTRATIONS (compact) ───
function EVIllust() {
  return <svg viewBox="0 0 600 340" style={{ width: "100%", maxWidth: 560 }}>
    <defs><linearGradient id="bg"><stop offset="0%" stopColor="#22C55E"/><stop offset="50%" stopColor="#F5A623"/><stop offset="100%" stopColor="#EF4444"/></linearGradient></defs>
    <path d="M80 240 L80 205 Q80 185 105 175 L185 145 Q210 135 235 130 L385 122 Q425 122 445 135 L505 175 Q525 185 525 205 L525 240" fill="none" stroke="#F5A623" strokeWidth={1.5} opacity={0.4}/>
    <path d="M185 145 Q195 100 240 88 L375 82 Q415 82 435 100 L445 135" fill="none" stroke="#F5A623" strokeWidth={1} opacity={0.25}/>
    {[[155,250],[455,250]].map(([wx,wy],i)=><g key={i}><circle cx={wx} cy={wy} r={28} fill="none" stroke="#F5A623" strokeWidth={1.3} opacity={0.4}/><circle cx={wx} cy={wy} r={10} fill="none" stroke="#F97316" strokeWidth={0.8} opacity={0.25}/><circle cx={wx} cy={wy} r={3} fill="#F5A623" opacity={0.4}/></g>)}
    <rect x={165} y={215} width={275} height={26} rx={4} fill="none" stroke="url(#bg)" strokeWidth={1.3} opacity={0.45}/>
    {Array.from({length:10}).map((_,i)=>{const c=["#22C55E","#22C55E","#84CC16","#84CC16","#F5A623","#F5A623","#F97316","#F97316","#EF4444","#EF4444"][i];return<rect key={i} x={170+i*26.5} y={218} width={23} height={9} rx={2} fill={c} opacity={0.1} stroke={c} strokeWidth={0.5}/>;})}
    <circle cx={450} cy={190} r={20} fill="none" stroke="#14B8A6" strokeWidth={1} opacity={0.3}/><circle cx={450} cy={190} r={8} fill="none" stroke="#14B8A6" strokeWidth={0.8} opacity={0.2}/><circle cx={450} cy={190} r={2.5} fill="#14B8A6" opacity={0.5}/>
    <rect x={115} y={175} width={45} height={28} rx={3} fill="#8B5CF6" opacity={0.03} stroke="#8B5CF6" strokeWidth={0.7} opacity={0.2}/>
    {[{d:"M300,110 Q300,50 300,30",c:"#F5A623"},{d:"M320,108 Q340,45 360,25",c:"#14B8A6"},{d:"M280,110 Q260,50 240,30",c:"#8B5CF6"}].map((t,i)=><path key={i} d={t.d} fill="none" stroke={t.c} strokeWidth={0.8} opacity={0.2} strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-16" dur={`${2+i*0.5}s`} repeatCount="indefinite"/></path>)}
    <text x={300} y={18} textAnchor="middle" fill="#F5A623" fontSize={7} fontFamily="monospace" opacity={0.3}>TELEMATICS · BATTERY · MARKET DATA</text>
    <rect x={180} y={280} width={240} height={22} rx={4} fill="rgba(4,21,13,0.5)" stroke="rgba(34,197,94,0.4)" strokeWidth={0.5} opacity={0.6}/><text x={300} y={295} textAnchor="middle" fill="#22C55E" fontSize={7} fontFamily="monospace" opacity={0.65}>AUTONODE SCORE: A2 · RV: ₹12.4L · LTV: 82%</text>
  </svg>;
}

function FleetViz() {
  const colors=["#8B5CF6","#A78BFA","#7C3AED","#6D28D9","#C4B5FD"];
  return <svg viewBox="0 0 540 320" style={{width:"100%",maxWidth:520}}>
    {[[60,50,1,.35],[210,30,1.08,.48],[390,55,.9,.28],[130,145,.95,.4],[320,150,1,.33]].map(([x,y,sc,op],i)=><g key={i} transform={`translate(${x},${y}) scale(${sc})`} opacity={op}><rect x={0} y={0} width={95} height={36} rx={5} fill={colors[i]} fillOpacity={0.04} stroke={colors[i]} strokeWidth={1.2}/><circle cx={16} cy={42} r={6} fill="none" stroke={colors[i]} strokeWidth={1}/><circle cx={76} cy={42} r={6} fill="none" stroke={colors[i]} strokeWidth={1}/><rect x={5} y={25} width={85} height={3} rx={1} fill="rgba(2,11,6,0.8)"/><rect x={5} y={25} width={85*(0.7+Math.random()*0.25)} height={3} rx={1} fill={colors[i]} opacity={0.4}/><circle cx={48} cy={-4} r={3} fill={colors[i]} opacity={0.3}><animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2+i*0.4}s`} repeatCount="indefinite"/></circle></g>)}
    <circle cx={270} cy={260} r={25} fill="none" stroke="#F5A623" strokeWidth={1} opacity={0.3}/><circle cx={270} cy={260} r={5} fill="#F5A623" opacity={0.45}/>
    {[[105,95],[265,75],[430,100],[180,195],[370,198]].map(([x,y],i)=><line key={i} x1={x} y1={y} x2={270} y2={242} stroke={colors[i]} strokeWidth={0.5} opacity={0.12} strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur={`${2+i*0.3}s`} repeatCount="indefinite"/></line>)}
    <text x={270} y={300} textAnchor="middle" fill="#F5A623" fontSize={7} fontFamily="monospace" opacity={0.4}>FLEET INTELLIGENCE HUB</text>
  </svg>;
}

function DashViz() {
  return <svg viewBox="0 0 500 310" style={{width:"100%",maxWidth:480}}>
    <rect x={8} y={4} width={484} height={296} rx={7} fill="rgba(2,11,6,0.7)" stroke="#14B8A6" strokeWidth={0.7} opacity={0.4}/>
    <rect x={8} y={4} width={484} height={28} rx={7} fill="rgba(4,21,13,0.6)" stroke="#14B8A6" strokeWidth={0.3} opacity={0.3}/>
    <circle cx={26} cy={18} r={3.5} fill="#EF4444" opacity={0.5}/><circle cx={38} cy={18} r={3.5} fill="#F5A623" opacity={0.5}/><circle cx={50} cy={18} r={3.5} fill="#22C55E" opacity={0.5}/>
    <text x={250} y={21} textAnchor="middle" fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.5}>AUTONODE UNDERWRITING INTELLIGENCE</text>
    <rect x={22} y={44} width={130} height={105} rx={4} fill="rgba(4,21,13,0.5)" stroke="#14B8A6" strokeWidth={0.4} opacity={0.4}/>
    <text x={87} y={62} textAnchor="middle" fill="#14B8A6" fontSize={6} fontFamily="monospace" opacity={0.5}>AUTONODE SCORE</text>
    <text x={87} y={105} textAnchor="middle" fill="#22C55E" fontSize={38} fontFamily="'Syne',sans-serif" fontWeight={800} opacity={0.75}>A2</text>
    <text x={87} y={125} textAnchor="middle" fill="#22C55E" fontSize={7} fontFamily="monospace" opacity={0.45}>LOW RISK</text>
    <rect x={42} y={132} width={90} height={5} rx={2} fill="rgba(2,11,6,0.8)"/><rect x={42} y={132} width={74} height={5} rx={2} fill="#22C55E" opacity={0.45}/>
    <rect x={166} y={44} width={310} height={48} rx={4} fill="rgba(4,21,13,0.5)" stroke="#14B8A6" strokeWidth={0.3} opacity={0.3}/>
    <text x={180} y={60} fill="#14B8A6" fontSize={5} fontFamily="monospace" opacity={0.45}>VEHICLE</text>
    <text x={180} y={74} fill="#F0F0F0" fontSize={10} fontFamily="'Syne',sans-serif" fontWeight={700} opacity={0.65}>Tata Nexon EV Max LR</text>
    <text x={180} y={85} fill="#888" fontSize={6} fontFamily="monospace" opacity={0.35}>2023 · 28,400 km · Delhi NCR</text>
    <rect x={22} y={162} width={454} height={100} rx={4} fill="rgba(4,21,13,0.5)" stroke="#14B8A6" strokeWidth={0.3} opacity={0.3}/>
    <text x={36} y={178} fill="#14B8A6" fontSize={5} fontFamily="monospace" opacity={0.35}>RESIDUAL VALUE FORECAST</text>
    {["Now","Y1","Y2","Y3","Y4","Y5"].map((l,i)=>{const x=48+i*70,h=[62,55,48,40,33,26][i];const c=["#22C55E","#22C55E","#84CC16","#F5A623","#F97316","#EF4444"][i];return<g key={i}><rect x={x} y={248-h} width={44} height={h} rx={3} fill={c} opacity={0.1} stroke={c} strokeWidth={0.4}/><text x={x+22} y={243-h} textAnchor="middle" fill={c} fontSize={7} fontFamily="monospace" fontWeight="bold" opacity={0.5}>{[100,88,76,65,55,46][i]}%</text><text x={x+22} y={262} textAnchor="middle" fill="#555" fontSize={5} fontFamily="monospace">{l}</text></g>;})}
    <rect x={22} y={272} width={454} height={14} rx={3} fill="#14B8A6" opacity={0.04}/>
    <text x={250} y={282} textAnchor="middle" fill="#14B8A6" fontSize={5.5} fontFamily="monospace" opacity={0.4}>UNDERWRITE AT 82% LTV · RECOVERY: 94% · RISK: LOW</text>
  </svg>;
}


// ═══ MAIN ═══
export default function App() {
  const [sc, setSc] = useState(false);
  const mRef = useRef(null);
  useEffect(() => {
    const el = mRef.current;
    if (!el) return;
    const h = () => setSc(el.scrollTop > 50);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);

  const heroImg = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80&auto=format";
  const evImg = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=80&auto=format";
  const fleetImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80&auto=format";
  const forestImg = "https://images.unsplash.com/photo-1511497584788-876760111969?w=1400&q=80&auto=format";

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={mRef} style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", scrollSnapType: "y mandatory", background: "#020B06", color: "#F0F0F0", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slowPan{from{transform:scale(1) translateX(0)}to{transform:scale(1.1) translateX(-2%)}}
        *{margin:0;padding:0;box-sizing:border-box}
        ::-webkit-scrollbar{width:0px;background:transparent}
        html{scroll-behavior:smooth}
        
        /* Typography */
        .nl{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;color:#88928A;cursor:pointer;padding:8px 12px;transition:color .3s;text-transform:uppercase}
        .nl:hover{color:#22C55E}
        .cta{padding:14px 32px;background:#22C55E;color:#020A05;font-family:'DM Mono',monospace;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;cursor:pointer;border:none;transition:all .3s;border-radius:4px;}
        .cta:hover{background:#16A34A;box-shadow:0 4px 24px rgba(34,197,94,.3)}
        .lb{font-family:'DM Mono',monospace;font-size:13px;letter-spacing:5px;text-transform:uppercase;color:#10B981;margin-bottom:24px;display:block; text-shadow: 0 2px 10px rgba(0,0,0,0.6);}
        
        .h-mega{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(32px, 5.5vw, 80px);line-height:1.05;letter-spacing:-2px; text-transform:uppercase; text-shadow: 0 4px 20px rgba(0,0,0,0.4);}
        .h1{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(28px,4.5vw,60px);line-height:1.1;letter-spacing:-1px; text-shadow: 0 4px 20px rgba(0,0,0,0.4);}
        .h2{font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(20px,3vw,36px);line-height:1.15;letter-spacing:-0.5px}
        .bd{font-family:'Outfit',sans-serif;font-size:18px;line-height:1.75;color:#E5E7EB;font-weight:400; text-shadow: 0 2px 4px rgba(0,0,0,0.7);}
        .it{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;text-transform:lowercase;display:inline-block;padding-right:8px}
        
        /* Layout Blocks */
        .snap-sec{min-height:100vh;scroll-snap-align:start;position:relative;display:flex;flex-direction:column;justify-content:center;padding:80px 8%;overflow:hidden;}
        .cd{background:rgba(4,21,13,0.35);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(34,197,94,0.15);padding:40px 32px;transition:all .5s cubic-bezier(0.16, 1, 0.3, 1);position:relative;overflow:hidden;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.4)}
        .cd:hover{border-color:rgba(34,197,94,0.4);transform:translateY(-4px);box-shadow:0 30px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(34,197,94,0.05)}
        .imgbg{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}
        
        /* Grids */
        .res-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; padding: 0 8%; height: 100vh; align-items: center; }
        .res-grid-eq { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 0 8%; height: 100vh; align-items: center; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 80px; text-align: left; }
        
        /* Stat Number Underlay */
        .stat-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Syne';font-weight:800;font-size:32vw;color:rgba(34,197,94,0.03);pointer-events:none;z-index:0;white-space:nowrap;user-select:none;}

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .res-grid, .res-grid-eq { display: flex; flex-direction: column; gap: 40px; height: auto; padding: 120px 4% 40px; }
          .mobile-first { order: -1; }
          .stat-grid { grid-template-columns: 1fr; gap: 40px; margin-top: 40px; }
          .hide-scroll { max-height: none !important; overflow: visible !important; padding-right: 0 !important; }
          .snap-sec { scroll-snap-align: none; min-height: auto; padding: 60px 4%; }
          .h-mega { font-size: clamp(36px, 12vw, 54px) !important; letter-spacing: -1px; }
          .stat-bg { font-size: 60vw !important; }
          nav { padding: 0 4% !important; }
          nav .nl { padding: 8px 6px; font-size: 10px; }
          .nav-links { gap: 6px !important; }
          .imgbg { background-position: 60% center !important; }
        }
      `}</style>

      {/* MINIMAL FLOATING NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 6%",height:70,display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(2,11,6,.85)":"transparent",backdropFilter:sc?"blur(24px)":"none",borderBottom:`1px solid ${sc?"rgba(34,197,94,0.08)":"transparent"}`,transition:"all .5s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>go("hero")}><Wordmark height={20}/></div>
        <div className="nav-links" style={{display:"flex",gap:16,alignItems:"center", background:"rgba(0,0,0,0.2)", padding:"6px", borderRadius:"30px", border:"1px solid rgba(255,255,255,0.05)"}}>
          <span className="nl" onClick={()=>go("stats")}>Vision</span>
          <span className="nl" onClick={()=>go("oem")}>OEMs</span>
          <span className="nl" onClick={()=>go("nbfc")}>NBFCs</span>
          <span className="nl" onClick={()=>go("fleet")}>Fleets</span>
        </div>
      </nav>

      {/* 1. MASSIVE HERO */}
      <section id="hero" className="snap-sec" style={{padding:0}}>
        <div className="imgbg" style={{backgroundImage:`url(${forestImg})`,animation:"slowPan 30s ease alternate infinite"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(2,11,6,0.5) 0%, rgba(2,11,6,0.98) 100%)", zIndex:1}}/>
        <div style={{position:"relative",zIndex:2,padding:"0 8%", width:"100%"}}>
          <div className="lb" style={{animation:"fadeUp 1.2s ease .2s both"}}>EV Lifecycle Intelligence</div>
          <h1 className="h-mega" style={{animation:"fadeUp 1.2s ease .4s both", maxWidth: 1200, color:"#fff"}}>
            Accelerating India's EV<br/>Transition through <br className="mobile-break"/><span className="it" style={{color:"#F5A623"}}>intelligence.</span>
          </h1>
        </div>
      </section>

      {/* 2. THE PROBLEM (MASSIVE STATS - Visite Amazonia Style) */}
      <section id="stats" className="snap-sec" style={{background:"#020B06"}}>
        <div className="stat-bg">82%</div>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 75% 40%, rgba(245,166,35,0.05) 0%, transparent 50%)", zIndex:1}}/>
        
        <div style={{position:"relative",zIndex:2, maxWidth:900, margin:"0 auto", textAlign:"center"}}>
          <div className="lb" style={{color:"#F5A623"}}>The Core Bottleneck</div>
          <h2 className="h1" style={{marginBottom:40}}>Every component speaks data.<br/><span className="it" style={{color:"#F5A623"}}>Nobody is listening.</span></h2>
          <p className="bd" style={{fontSize:22, lineHeight:1.6, color:"#A1A1AA"}}>
            Battery SoH, motor performance, degradation—this data exists inside every EV. But it rarely reaches lenders, insurers, or fleet operators.
          </p>
          <div className="stat-grid">
            <div style={{borderLeft:"2px solid #F5A623", paddingLeft:24}}>
              <div style={{fontFamily:"'Syne'", fontSize:48, fontWeight:800, color:"#F5A623"}}>82%</div>
              <div className="bd" style={{fontSize:14}}>Of required EV capital remains unmet due to asset pricing risks.</div>
            </div>
            <div style={{borderLeft:"2px solid #EF4444", paddingLeft:24}}>
              <div style={{fontFamily:"'Syne'", fontSize:48, fontWeight:800, color:"#EF4444"}}>+25%</div>
              <div className="bd" style={{fontSize:14}}>EMI premium versus ICE vehicles due to strict LTV capping.</div>
            </div>
            <div style={{borderLeft:"2px solid #22C55E", paddingLeft:24}}>
              <div style={{fontFamily:"'Syne'", fontSize:48, fontWeight:800, color:"#22C55E"}}>ZERO</div>
              <div className="bd" style={{fontSize:14}}>Battery telemetry effectively used in buyback guarantees today.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINATION: OEM */}
      <section id="oem" className="snap-sec" style={{background:"#030F08", padding:0}}>
        <div className="imgbg" style={{backgroundImage:`url(${evImg})`, opacity:0.15}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at left, rgba(3,15,8,1) 40%, rgba(3,15,8,0.7) 100%)", zIndex:1}}/>
        
        <div className="res-grid" style={{position:"relative", zIndex:2}}>
          <div>
            <div className="lb" style={{color:"#22C55E"}}>Destination 01 / OEMs</div>
            <h2 className="h-mega" style={{fontSize:"clamp(40px, 8vw, 84px)"}}>Unblock<br/><span className="it" style={{color:"#F5A623"}}>the sale.</span></h2>
            <p className="bd" style={{marginTop:30, fontSize:18}}>
              Your cars are ready, but the financing infrastructure isn't. Autonode connects your vehicle telematics with lenders to push LTVs from 65% to 85%, dropping EMIs and closing the showroom sale.
            </p>
            <div style={{marginTop:40, transform:"scale(0.85)", transformOrigin:"left center", maxWidth:"100%", overflow:"hidden"}}><EVIllust/></div>
          </div>
          
          {/* Cascading Masonry Glass Cards */}
          <div className="hide-scroll" style={{display:"flex", flexDirection:"column", gap:20, padding:"40px 0", maxHeight:"100vh", overflowY:"auto", paddingRight:20}}>
            <style>{`.hide-scroll::-webkit-scrollbar{display:none;}`}</style>
            {[
              {t:"Higher Conversion", d:"NBFCs safely underwrite at 85% LTV. Sale closes.", c:"#22C55E"},
              {t:"Better Buyback Data", d:"We supply Lockton/Zuno with the real battery telemetry they lack.", c:"#F5A623"},
              {t:"Unlocked Fleet Pipeline", d:"E-bus orders unstall when lenders have residual models.", c:"#8B5CF6"},
              {t:"Certified Pre-Owned", d:"SoH certification driving secondary market trust.", c:"#14B8A6"}
            ].map((item,i) => (
              <div key={i} className="cd" style={{background:"rgba(4,21,13,0.5)", padding:"32px"}}>
                <div style={{width:12, height:12, borderRadius:"50%", background:item.c, marginBottom:20, boxShadow:`0 0 12px ${item.c}`}}/>
                <h3 className="h2" style={{fontSize:24, color:"#fff", marginBottom:12}}>{item.t}</h3>
                <p className="bd" style={{fontSize:15}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DESTINATION: NBFC */}
      <section id="nbfc" className="snap-sec" style={{background:"#020B06", padding:0}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 30% 50%, rgba(20,184,166,0.1) 0%, transparent 70%)", zIndex:1}}/>
        
        <div className="res-grid-eq" style={{position:"relative", zIndex:2}}>
          
          <div className="hide-scroll" style={{display:"flex", flexDirection:"column", gap:20, padding:"40px 0", maxHeight:"100vh", overflowY:"auto", paddingRight:20}}>
            {[
              {t:"Per-Vehicle Scoring", d:"API returns residual value, battery grade, and accurate depreciation curve.", c:"#14B8A6"},
              {t:"Portfolio Monitoring", d:"Live SoH tracking across your entire EV book. Early degradation alerts.", c:"#22C55E"},
              {t:"Recovery Intelligence", d:"In case of NPA, know the current fair market value immediately.", c:"#F5A623"}
            ].map((item,i) => (
              <div key={i} className="cd" style={{background:"rgba(2,11,6,0.6)", padding:"32px", borderLeft:`4px solid ${item.c}`}}>
                <h3 className="h2" style={{fontSize:24, color:"#fff", marginBottom:12}}>{item.t}</h3>
                <p className="bd" style={{fontSize:15}}>{item.d}</p>
              </div>
            ))}
          </div>

          <div className="mobile-first">
            <div className="lb" style={{color:"#14B8A6"}}>Destination 02 / Lenders</div>
            <h2 className="h-mega" style={{fontSize:"clamp(40px, 8vw, 84px)"}}>Price<br/><span className="it" style={{color:"#14B8A6"}}>the asset.</span></h2>
            <p className="bd" style={{marginTop:30, fontSize:18, marginBottom:40}}>
              Lend for EVs without adding 3–5% blind risk premiums. We provide defensible residual valuations based on live battery telematics.
            </p>
            <div style={{transform:"scale(0.9)", transformOrigin:"left center", maxWidth:"100%", overflow:"hidden"}}><DashViz/></div>
          </div>
        </div>
      </section>

      {/* 5. DESTINATION: FLEET */}
      <section id="fleet" className="snap-sec" style={{background:"#030F08", padding:0}}>
        <div className="imgbg" style={{backgroundImage:`url(${fleetImg})`, opacity:0.1}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(270deg, rgba(3,15,8,1) 45%, rgba(3,15,8,0.7) 100%)", zIndex:1}}/>
        
        <div className="res-grid-eq" style={{position:"relative", zIndex:2}}>
          <div>
            <div className="lb" style={{color:"#8B5CF6"}}>Destination 03 / Fleets</div>
            <h2 className="h-mega" style={{fontSize:"clamp(40px, 8vw, 84px)"}}>Unlock<br/><span className="it" style={{color:"#8B5CF6"}}>the capital.</span></h2>
            <p className="bd" style={{marginTop:30, fontSize:18, maxWidth:500}}>
              Banks price e-bus loans at 20%+ because they can't model the 5-year residual value. Autonode does. Interest drops to 12%. TCO makes sense again. 
            </p>
            <div style={{marginTop:50, transform:"scale(0.9)", transformOrigin:"left center", maxWidth:"100%", overflow:"hidden"}}><FleetViz/></div>
          </div>

          <div className="hide-scroll" style={{display:"flex", flexDirection:"column", gap:20, padding:"40px 0", maxHeight:"100vh", overflowY:"auto", paddingRight:20}}>
            {[
              {t:"Unlock Financing", d:"Interest rates drop from 20%+ to 10-12% through standard residual models.", c:"#8B5CF6"},
              {t:"Live Health", d:"Real-time battery checks across your depot. Prevent breakdowns.", c:"#14B8A6"},
              {t:"Terminal Value", d:"BESS certification at end-of-life for maximum secondary market extraction.", c:"#22C55E"}
            ].map((item,i) => (
              <div key={i} className="cd" style={{background:"rgba(4,21,13,0.5)", padding:"32px"}}>
                <div style={{fontFamily:"'Syne'", fontSize:32, color:item.c, opacity:0.3, position:"absolute", top:20, right:24}}>0{i+1}</div>
                <h3 className="h2" style={{fontSize:24, color:"#fff", marginBottom:12, position:"relative", zIndex:2}}>{item.t}</h3>
                <p className="bd" style={{position:"relative", zIndex:2, fontSize:15}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & FOOTER */}
      <section className="snap-sec" style={{background:"#010603", textAlign:"center", alignItems:"center"}}>
        <Wordmark height={60} glow/>
        <h2 className="h-mega" style={{fontSize:"clamp(40px, 7vw, 64px)", marginTop:40}}>Shape the <span className="it" style={{color:"#22C55E"}}>standard.</span></h2>
        <p className="bd" style={{maxWidth:600, margin:"24px auto 40px", fontSize:20}}>
          We are seeking founding partners to co-develop India's definitive EV residual value standard.
        </p>
        <button className="cta" onClick={() => window.location.href="mailto:hello@autonodelabs.com"} style={{fontSize:14, padding:"20px 48px"}}>Partner With Us</button>
        
        <div style={{position:"absolute", bottom:0, left:0, right:0, padding:"24px 8%", borderTop:"1px solid rgba(34,197,94,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontFamily:"'DM Mono'",fontSize:10,color:"#304538",letterSpacing:2}}>© 2026 AUTONODE LABS</div>
          <div style={{fontFamily:"'DM Mono'",fontSize:10,color:"#304538",letterSpacing:2}}>hello@autonodelabs.com</div>
        </div>
      </section>
    </div>
  );
}

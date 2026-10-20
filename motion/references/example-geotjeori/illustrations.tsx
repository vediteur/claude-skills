import React from 'react';
import {useCurrentFrame} from 'remotion';

const OL = '#1F4A2C';

type Svg = {size: number; style?: React.CSSProperties};

// Deterministic pseudo-random so every render is identical
export const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const KIMCHI = 'M-30 -8 C-12 -26 18 -22 32 -6 C26 12 -4 20 -28 10 C-34 6 -34 -2 -30 -8Z';

export const Kimchi: React.FC<{x: number; y: number; r?: number; s?: number}> = ({x, y, r = 0, s = 1}) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d={KIMCHI} fill="#DF4A26" stroke="#A82E15" strokeWidth={3} />
    <path d="M-20 -6 C-6 -14 12 -12 22 -4" stroke="#F7C9A0" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

export const Cabbage: React.FC<Svg> = ({size, style}) => {
  const leaves: [number, number, number][] = [
    [160, 100, 72], [92, 150, 62], [228, 150, 62], [118, 72, 50], [202, 72, 50],
    [160, 48, 42], [66, 215, 48], [254, 215, 48], [160, 175, 70],
  ];
  const body = 'M62 200 C48 320 88 462 160 472 C232 462 272 320 258 200 C226 240 94 240 62 200Z';
  return (
    <svg viewBox="0 0 320 490" width={size} height={size * 1.53} style={style}>
      <path d={body} fill={OL} stroke={OL} strokeWidth={14} strokeLinejoin="round" />
      <path d={body} fill="#F5F8E2" />
      {[-70, -35, 0, 35, 70].map((dx) => (
        <path key={dx} d={`M160 468 C${160 + dx * 0.5} 400 ${160 + dx} 320 ${160 + dx * 1.1} 240`} stroke="#CFE3A0" strokeWidth={7} fill="none" strokeLinecap="round" />
      ))}
      {leaves.map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r + 7} fill={OL} />)}
      {leaves.map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#79C24B" />)}
      {leaves.slice(0, 6).map(([x, y, r], i) => <circle key={`h${i}`} cx={x - r * 0.25} cy={y - r * 0.3} r={r * 0.45} fill="#9BD56C" />)}
      <path d="M160 250 C150 180 158 110 165 60" stroke="#5DA737" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M100 250 C95 200 90 170 80 140" stroke="#5DA737" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M220 250 C225 200 230 170 240 140" stroke="#5DA737" strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const SaltShaker: React.FC<Svg> = ({size, style}) => (
  <svg viewBox="0 0 200 260" width={size} height={size * 1.3} style={style}>
    <rect x={40} y={80} width={120} height={165} rx={34} fill="#EAF6F7" stroke={OL} strokeWidth={7} />
    <path d="M48 170 H152 V210 C152 228 140 238 122 238 H78 C60 238 48 228 48 210Z" fill="#FFFFFF" />
    <path d="M62 105 V150" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" />
    <rect x={52} y={36} width={96} height={54} rx={18} fill="#B7C4CB" stroke={OL} strokeWidth={7} />
    {[70, 100, 130].map((cx) => <circle key={cx} cx={cx} cy={52} r={5} fill={OL} />)}
    <text x={100} y={205} textAnchor="middle" fontSize={34} fontWeight={900} fill={OL} fontFamily="sans-serif">SALT</text>
  </svg>
);

export const Chili: React.FC<Svg> = ({size, style}) => (
  <svg viewBox="0 0 120 240" width={size * 0.5} height={size} style={style}>
    <path d="M60 40 C95 45 100 90 88 140 C76 190 50 225 30 232 C40 200 44 170 40 130 C36 90 30 50 60 40Z" fill="#E33A22" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
    <path d="M70 70 C78 95 76 125 68 150" stroke="#FF8A6B" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M42 44 C50 30 72 30 80 46 C70 52 52 52 42 44Z" fill="#4DA338" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
    <path d="M61 38 C58 24 64 12 78 8" stroke={OL} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M61 38 C58 24 64 12 78 8" stroke="#4DA338" strokeWidth={6} fill="none" strokeLinecap="round" />
  </svg>
);

export const Garlic: React.FC<Svg> = ({size, style}) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={style}>
    <path d="M100 30 C110 50 150 70 160 110 C170 150 140 182 100 182 C60 182 30 150 40 110 C50 70 90 50 100 30Z" fill="#FBF6EC" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <path d="M100 42 C78 80 72 130 88 178" stroke="#D8C9E6" strokeWidth={6} fill="none" />
    <path d="M100 42 C122 80 128 130 112 178" stroke="#D8C9E6" strokeWidth={6} fill="none" />
    <path d="M100 32 C98 20 100 12 108 4" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />
  </svg>
);

export const Leaf: React.FC<Svg> = ({size, style}) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={style}>
    <path d="M30 170 C30 85 95 30 172 28 C172 110 118 170 30 170Z" fill="#79C24B" stroke={OL} strokeWidth={7} strokeLinejoin="round" />
    <path d="M30 170 C75 128 118 82 166 34" stroke={OL} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M100 100 C100 80 104 66 110 58 M78 122 C70 112 62 108 52 106" stroke={OL} strokeWidth={4} fill="none" strokeLinecap="round" />
  </svg>
);

export const Stopwatch: React.FC<Svg & {turns: number}> = ({size, style, turns}) => (
  <svg viewBox="0 0 200 220" width={size} height={size * 1.1} style={style}>
    <rect x={84} y={4} width={32} height={26} rx={6} fill={OL} />
    <rect x={150} y={36} width={24} height={18} rx={5} fill={OL} transform="rotate(40 162 45)" />
    <circle cx={100} cy={122} r={88} fill="#FFFFFF" stroke={OL} strokeWidth={10} />
    {Array.from({length: 12}, (_, i) => (
      <line key={i} x1={100} y1={46} x2={100} y2={i % 3 === 0 ? 62 : 56} stroke={OL} strokeWidth={i % 3 === 0 ? 7 : 4} strokeLinecap="round" transform={`rotate(${i * 30} 100 122)`} />
    ))}
    <path d={`M100 122 L100 ${122 - 82} A82 82 0 ${turns % 1 > 0.5 ? 1 : 0} 1 ${100 + 82 * Math.sin((turns % 1) * Math.PI * 2)} ${122 - 82 * Math.cos((turns % 1) * Math.PI * 2)} Z`} fill="#E23B7C" opacity={0.25} />
    <line x1={100} y1={122} x2={100} y2={58} stroke="#E23B7C" strokeWidth={8} strokeLinecap="round" transform={`rotate(${turns * 360} 100 122)`} />
    <circle cx={100} cy={122} r={10} fill={OL} />
  </svg>
);

// --- recipe step icons (animated) ---

const Bowl: React.FC<{fill?: string}> = ({fill = '#FFFFFF'}) => (
  <path d="M18 104 H182 C178 156 144 186 100 186 C56 186 22 156 18 104Z" fill={fill} stroke={OL} strokeWidth={7} strokeLinejoin="round" />
);

export const StepSauce: React.FC<Svg> = ({size, style}) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={style}>
      <g transform={`rotate(${Math.sin(f / 5) * 14} 100 104)`}>
        <rect x={120} y={18} width={16} height={92} rx={8} fill="#D9A86C" stroke={OL} strokeWidth={5} transform="rotate(28 128 64)" />
      </g>
      <ellipse cx={100} cy={104} rx={82} ry={20} fill="#D23A1E" stroke={OL} strokeWidth={7} />
      <Bowl />
      {Array.from({length: 7}, (_, i) => {
        const t = ((f * 3 + i * 17) % 60) / 60;
        return <rect key={i} x={40 + rand(i) * 60} y={-10 + t * 110} width={9} height={6} rx={2} fill="#C42A12" opacity={t < 0.9 ? 1 : 0} transform={`rotate(${i * 40} ${44 + rand(i) * 60} ${t * 110})`} />;
      })}
    </svg>
  );
};

export const StepCut: React.FC<Svg> = ({size, style}) => {
  const f = useCurrentFrame();
  const chop = Math.abs(Math.sin(f / 3.2)) * 26;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={style}>
      <rect x={10} y={138} width={180} height={42} rx={12} fill="#D9A86C" stroke={OL} strokeWidth={7} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${30 + i * 34} 112) skewX(-22)`}>
          <rect x={0} y={0} width={26} height={28} rx={4} fill="#F5F8E2" stroke={OL} strokeWidth={5} />
          <rect x={0} y={0} width={26} height={10} rx={4} fill="#79C24B" stroke={OL} strokeWidth={5} />
        </g>
      ))}
      <g transform={`translate(0 ${-chop})`}>
        <path d="M150 30 L188 30 L188 112 C170 112 150 96 150 70Z" fill="#E4EBEE" stroke={OL} strokeWidth={6} strokeLinejoin="round" />
        <rect x={160} y={0} width={20} height={34} rx={6} fill="#5B3A22" stroke={OL} strokeWidth={5} />
      </g>
    </svg>
  );
};

export const StepMix: React.FC<Svg> = ({size, style}) => {
  const f = useCurrentFrame();
  const squash = 1 + Math.sin(f / 3) * 0.06;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={style}>
      <g transform={`translate(100 104) scale(${2 - squash} ${squash}) translate(-100 -104)`}>
        {[[60, 92, -20], [100, 74, 10], [140, 92, 30], [80, 100, 60], [122, 100, -40], [100, 96, 80]].map(([x, y, r], i) => (
          <Kimchi key={i} x={x} y={y} r={r} s={0.9} />
        ))}
      </g>
      <Bowl fill="#F2F6F7" />
      <path d="M22 54 C14 66 14 80 20 92 M178 54 C186 66 186 80 180 92" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" opacity={Math.sin(f / 3) > 0 ? 1 : 0.3} />
    </svg>
  );
};

// --- pairing plates (top-down) ---

const Plate: React.FC<{size: number; children: React.ReactNode; id: string; rim: string; inner: string; innerR?: number}> = ({size, children, id, rim, inner, innerR = 78}) => (
  <svg viewBox="-100 -100 200 200" width={size} height={size} style={{overflow: 'visible'}}>
    <defs>
      <clipPath id={id}>
        <circle r={innerR} />
      </clipPath>
    </defs>
    <circle r={96} fill={rim} stroke={OL} strokeWidth={5} />
    <circle r={innerR} fill={inner} />
    <g clipPath={`url(#${id})`}>{children}</g>
  </svg>
);

export const RiceBowl: React.FC<{size: number}> = ({size}) => (
  <Plate size={size} id="rice" rim="#F1E4C8" inner="#FFFDF6">
    {Array.from({length: 70}, (_, i) => (
      <ellipse key={i} cx={(rand(i) - 0.5) * 160} cy={(rand(i + 99) - 0.5) * 160} rx={6} ry={3} fill="#EDE6D3" transform={`rotate(${rand(i + 7) * 180} ${(rand(i) - 0.5) * 160} ${(rand(i + 99) - 0.5) * 160})`} />
    ))}
    <Kimchi x={-12} y={-6} r={-15} s={1.3} />
    <Kimchi x={18} y={14} r={25} s={1.1} />
    <Kimchi x={-4} y={22} r={70} s={0.9} />
  </Plate>
);

export const Suyuk: React.FC<{size: number}> = ({size}) => (
  <Plate size={size} id="suyuk" rim="#3A2B24" inner="#4A3A31" innerR={84}>
    {Array.from({length: 26}, (_, i) => (
      <line key={i} x1={-90 + i * 7} y1={-80} x2={-60 + i * 7} y2={80} stroke={i % 2 ? '#4FA33A' : '#6CBF4A'} strokeWidth={5} />
    ))}
    {[-30, 0, 30].map((dy, i) => (
      <g key={i} transform={`translate(${-8 + i * 6} ${dy}) rotate(-18)`}>
        <rect x={-62} y={-16} width={124} height={34} rx={9} fill="#EED8C2" stroke="#8B6446" strokeWidth={3} />
        <rect x={-62} y={-16} width={124} height={9} rx={4} fill="#B98656" />
        <rect x={-58} y={-4} width={116} height={7} rx={3} fill="#FBF2E6" />
        <rect x={-58} y={8} width={116} height={5} rx={2} fill="#E3C3A6" />
      </g>
    ))}
  </Plate>
);

export const Kalguksu: React.FC<{size: number}> = ({size}) => (
  <Plate size={size} id="kalguksu" rim="#2F2B29" inner="#F0DFB8">
    {Array.from({length: 9}, (_, i) => (
      <path key={i} d={`M-90 ${-70 + i * 18} C-50 ${-86 + i * 18} -30 ${-54 + i * 18} 0 ${-70 + i * 18} S50 ${-86 + i * 18} 90 ${-70 + i * 18}`} stroke="#FFF7E3" strokeWidth={9} fill="none" strokeLinecap="round" />
    ))}
    {[[-30, -30], [34, -12], [-6, 34], [40, 40]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={15} fill="#CFE59A" stroke="#5E9E37" strokeWidth={4} />
        <circle cx={x} cy={y} r={6} fill="#EEF6D4" />
      </g>
    ))}
    {[[10, -50], [-50, 14], [56, 4]].map(([x, y], i) => <rect key={i} x={x} y={y} width={16} height={8} rx={2} fill="#1F2E22" transform={`rotate(${i * 50} ${x} ${y})`} />)}
  </Plate>
);

export const Ramen: React.FC<{size: number}> = ({size}) => (
  <svg viewBox="-130 -100 260 200" width={size * 1.3} height={size} style={{overflow: 'visible'}}>
    <rect x={-128} y={-14} width={50} height={28} rx={12} fill="#C99133" stroke={OL} strokeWidth={5} />
    <rect x={78} y={-14} width={50} height={28} rx={12} fill="#C99133" stroke={OL} strokeWidth={5} />
    <defs>
      <clipPath id="ramen">
        <circle r={80} />
      </clipPath>
    </defs>
    <circle r={96} fill="#E5AE45" stroke={OL} strokeWidth={5} />
    <circle r={80} fill="#E7672A" />
    <g clipPath="url(#ramen)">
      {Array.from({length: 8}, (_, i) => (
        <path key={i} d={`M-90 ${-64 + i * 18} q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0`} stroke="#F6CF7E" strokeWidth={8} fill="none" strokeLinecap="round" />
      ))}
      <circle cx={22} cy={-14} r={30} fill="#FFFFFF" />
      <circle cx={24} cy={-12} r={14} fill="#F6B21F" />
      {[[-40, 30], [-20, 46], [-52, 52], [40, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill="none" stroke="#7BC043" strokeWidth={4} />)}
      <Kimchi x={-34} y={-30} r={20} s={0.9} />
    </g>
  </svg>
);

import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {loadFont as loadJua} from '@remotion/google-fonts/Jua';
import {loadFont as loadNoto} from '@remotion/google-fonts/NotoSansKR';
import {loadFont as loadPen} from '@remotion/google-fonts/NanumPenScript';

export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const fonts = {
  display: loadJua('normal', {subsets: ['korean', 'latin'], ignoreTooManyRequestsWarning: true}).fontFamily,
  body: loadNoto('normal', {weights: ['700', '900'], subsets: ['korean', 'latin'], ignoreTooManyRequestsWarning: true}).fontFamily,
  hand: loadPen('normal', {subsets: ['korean', 'latin'], ignoreTooManyRequestsWarning: true}).fontFamily,
};

type SpringCfg = {damping?: number; mass?: number; stiffness?: number; overshootClamping?: boolean};

export const pop = (frame: number, delay: number, config: SpringCfg = {}) =>
  spring({frame: frame - delay, fps: FPS, config: {damping: 11, mass: 0.7, stiffness: 140, ...config}});

export const ease = (
  frame: number,
  range: [number, number],
  out: [number, number],
  easing: (t: number) => number = Easing.bezier(0.22, 1, 0.36, 1),
) => interpolate(frame, range, out, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

// Outline (and optional drop) around text, built from a ring of hard text-shadows
const ring = (r: number, color: string, dy = 0, steps = 20) =>
  Array.from({length: steps}, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    return `${(Math.cos(a) * r).toFixed(2)}px ${(Math.sin(a) * r + dy).toFixed(2)}px 0 ${color}`;
  });

export const sticker = (stroke: string, r: number, drop?: string) =>
  [...ring(r, stroke), ...(drop ? ring(r, drop, r * 0.9) : [])].join(',');

export const Txt: React.FC<{
  children: React.ReactNode;
  size: number;
  color: string;
  font?: string;
  stroke?: string;
  strokeW?: number;
  drop?: string;
  style?: React.CSSProperties;
}> = ({children, size, color, font = fonts.display, stroke, strokeW = 0, drop, style}) => (
  <div
    style={{
      fontFamily: font,
      fontSize: size,
      color,
      lineHeight: 1.12,
      whiteSpace: 'pre',
      textAlign: 'center',
      textShadow: stroke ? sticker(stroke, strokeW, drop) : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

// White sticker outline (hides cutout fringe) plus a soft drop shadow
const STICKER_OUTLINE = [
  'drop-shadow(7px 0 0 #fff)',
  'drop-shadow(-7px 0 0 #fff)',
  'drop-shadow(0 7px 0 #fff)',
  'drop-shadow(0 -7px 0 #fff)',
  'drop-shadow(0 30px 34px rgba(15, 60, 30, 0.35))',
].join(' ');

// A transparent product cutout from public/. `aspect` is width / height of the PNG.
// `shine` (0→1) sweeps a highlight across it, masked to its silhouette.
export const Product: React.FC<{file: string; aspect: number; height: number; shine?: number}> = ({
  file,
  aspect,
  height,
  shine = 0,
}) => {
  const src = staticFile(file);
  return (
    <div style={{position: 'relative', height, width: height * aspect}}>
      <Img src={src} style={{height, width: height * aspect, filter: STICKER_OUTLINE}} />
      {shine > 0 && shine < 1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            maskImage: `url(${src})`,
            maskSize: '100% 100%',
            backgroundImage: 'linear-gradient(110deg, transparent 42%, rgba(255,255,255,0.65) 50%, transparent 58%)',
            backgroundSize: '300% 100%',
            backgroundPosition: `${(1 - shine) * 100}% 0`,
          }}
        />
      )}
    </div>
  );
};

export const GridPaper: React.FC<{bg: string; line: string; size?: number}> = ({bg, line, size = 64}) => (
  <AbsoluteFill
    style={{
      backgroundColor: bg,
      backgroundImage: `linear-gradient(${line} 2px, transparent 2px), linear-gradient(90deg, ${line} 2px, transparent 2px)`,
      backgroundSize: `${size}px ${size}px`,
      backgroundPosition: '-1px -1px',
    }}
  />
);

export const Sunburst: React.FC<{bg: string; ray: string; cy?: number; rays?: number; speed?: number}> = ({
  bg,
  ray,
  cy = 960,
  rays = 18,
  speed = 0.25,
}) => {
  const frame = useCurrentFrame();
  const R = 2400;
  const step = 360 / rays;
  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <svg width={W} height={H}>
        <g transform={`translate(${W / 2} ${cy}) rotate(${frame * speed})`}>
          {Array.from({length: rays}, (_, i) => {
            const a0 = ((i * step - step / 4) * Math.PI) / 180;
            const a1 = ((i * step + step / 4) * Math.PI) / 180;
            return (
              <path
                key={i}
                d={`M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} L${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`}
                fill={ray}
              />
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Sparkle: React.FC<{x: number; y: number; size: number; color: string; delay?: number; period?: number}> = ({
  x,
  y,
  size,
  color,
  delay = 0,
  period = 36,
}) => {
  const frame = useCurrentFrame();
  const t = ((frame - delay) % period) / period;
  const s = frame < delay ? 0 : Math.sin(Math.max(0, t) * Math.PI);
  return (
    <svg
      viewBox="-1 -1 2 2"
      width={size}
      height={size}
      style={{position: 'absolute', left: x - size / 2, top: y - size / 2, transform: `scale(${s}) rotate(${t * 90}deg)`}}
    >
      <path
        d="M0 -1 C0.12 -0.12 0.12 -0.12 1 0 C0.12 0.12 0.12 0.12 0 1 C-0.12 0.12 -0.12 0.12 -1 0 C-0.12 -0.12 -0.12 -0.12 0 -1Z"
        fill={color}
      />
    </svg>
  );
};

// Scene entrance transitions; each scene is layered above the previous one
export const Enter: React.FC<{
  type: 'circle' | 'up' | 'left';
  children: React.ReactNode;
  origin?: [number, number];
  duration?: number;
}> = ({type, children, origin = [W / 2, H / 2], duration = 16}) => {
  const frame = useCurrentFrame();
  const p = ease(frame, [0, duration], [0, 1], Easing.bezier(0.7, 0, 0.25, 1));
  if (type === 'circle') {
    return (
      <AbsoluteFill style={{clipPath: `circle(${p * 2300}px at ${origin[0]}px ${origin[1]}px)`}}>{children}</AbsoluteFill>
    );
  }
  const off = (1 - p) * (type === 'up' ? H : W);
  return (
    <AbsoluteFill
      style={{
        transform: type === 'up' ? `translateY(${off}px)` : `translateX(${off}px)`,
        boxShadow: '0 -20px 60px rgba(0,0,0,0.25)',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Absolutely position an element by its center, with extra transforms applied after centering
export const at = (x: number, y: number, transform = '', style?: React.CSSProperties): React.CSSProperties => ({
  position: 'absolute',
  left: x,
  top: y,
  transform: `translate(-50%, -50%) ${transform}`,
  ...style,
});

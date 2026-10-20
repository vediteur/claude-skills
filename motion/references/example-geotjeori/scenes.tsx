import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ease, fonts, GridPaper, pop, Sparkle, Sunburst, Txt, at} from '../../lib';
import {C, Jar, PINK_DROP} from './theme';
import {
  Cabbage, Chili, Garlic, Kalguksu, Leaf, Ramen, rand, RiceBowl, SaltShaker,
  StepCut, StepMix, StepSauce, Stopwatch, Suyuk,
} from './illustrations';

// 1. Hook — "겉절이, 아직도 절이세요?" → NO 절임 stamp
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const stamp = pop(f, 46, {damping: 9, mass: 0.9, stiffness: 220});
  const shake = f >= 49 && f < 60 ? Math.sin(f * 2.7) * (60 - f) * 2.4 : 0;
  const knock = ease(f, [48, 64], [0, 1]);
  const pill = pop(f, 58);
  return (
    <AbsoluteFill style={{transform: `translate(${shake}px, ${shake * 0.6}px)`}}>
      <GridPaper bg={C.cream} line="rgba(31,154,75,0.10)" />
      <div style={at(540, 330, `scale(${pop(f, 2)})`)}>
        <Txt size={130} color={C.green} stroke={C.white} strokeW={10} drop={C.greenInk}>겉절이,</Txt>
      </div>
      <div style={at(540, 500, `scale(${pop(f, 8)})`)}>
        <Txt size={150} color={C.ink} stroke={C.white} strokeW={10}>아직도</Txt>
      </div>
      <div style={at(540, 690, `scale(${pop(f, 14)}) rotate(-3deg)`)}>
        <Txt size={190} color={C.pink} stroke={C.white} strokeW={12} drop={PINK_DROP}>절이세요?</Txt>
      </div>
      <div style={at(540, 1170, `scale(${pop(f, 4, {damping: 13})}) translateY(${Math.sin(f / 6) * 6}px)`)}>
        <Cabbage size={320} />
      </div>
      {f < 50 &&
        Array.from({length: 18}, (_, i) => {
          const t = ((f * 1.3 + i * 5.3) % 22) / 22;
          return (
            <div
              key={i}
              style={at(745 - t * 70 + (rand(i) - 0.5) * 50, 950 + t * 150, '', {
                width: 12, height: 12, borderRadius: 3, background: '#fff',
                border: '3px solid #9FB3BC', opacity: f < 8 ? 0 : 1 - t * 0.6,
              })}
            />
          );
        })}
      <div style={at(800 + knock * 520, 860 - knock * 260, `scale(${pop(f, 6)}) rotate(${-150 + Math.sin(f / 2.2) * 12 + knock * 200}deg)`)}>
        <SaltShaker size={170} />
      </div>
      {f >= 46 && (
        <div style={at(540, 1150, `scale(${1 + (1 - stamp) * 1.6}) rotate(-14deg)`, {opacity: Math.min(1, stamp * 3)})}>
          <div
            style={{
              width: 500, height: 500, borderRadius: '50%', border: `16px solid ${C.red}`,
              background: 'rgba(255,255,255,0.88)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 10px #fff, inset 0 0 0 18px ${C.red}`,
            }}
          >
            <Txt size={120} color={C.red} style={{lineHeight: 1}}>절임</Txt>
            <Txt size={190} color={C.red} style={{lineHeight: 1}}>NO!</Txt>
          </div>
        </div>
      )}
      <div style={at(540, 1530, `scale(${pill})`)}>
        <div style={{background: C.greenInk, borderRadius: 999, padding: '22px 52px'}}>
          <Txt size={58} color={C.white} font={fonts.body} style={{fontWeight: 900}}>절이지 않고 바로 무쳐요!</Txt>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 2. Product reveal
export const Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const jar = pop(f, 4, {damping: 10, mass: 0.9, stiffness: 120});
  const floaters: [React.ReactNode, number, number, number][] = [
    [<Chili size={190} />, 150, 760, -25],
    [<Garlic size={150} />, 930, 760, 15],
    [<Leaf size={150} />, 160, 1240, -10],
    [<Chili size={160} />, 940, 1250, 35],
  ];
  return (
    <AbsoluteFill>
      <Sunburst bg={C.green} ray="rgba(255,255,255,0.08)" cy={1000} />
      {floaters.map(([el, x, y, r], i) => {
        const p = pop(f, 10 + i * 4);
        return (
          <div key={i} style={at(x + (1 - p) * (x < 540 ? -400 : 400), y + Math.sin(f / 10 + i) * 14, `rotate(${r + Math.sin(f / 14 + i) * 8}deg)`)}>
            {el}
          </div>
        );
      })}
      <div style={at(540, 300, `scale(${pop(f, 6)})`)}>
        <Txt size={96} color={C.cream} stroke={C.greenInk} strokeW={8}>모든 김치양념이</Txt>
      </div>
      <div style={at(540, 450, `scale(${pop(f, 12)}) rotate(-2deg)`)}>
        <Txt size={170} color={C.yellow} stroke={C.greenInk} strokeW={12} drop={C.greenInk}>한 팩에!</Txt>
      </div>
      <div style={at(540, 1010 + (1 - jar) * 1100 + Math.sin(f / 14) * 10, `rotate(${(1 - jar) * -25 + Math.sin(f / 18) * 2.5}deg)`)}>
        <Jar height={820} shine={ease(f, [34, 58], [0, 1])} />
      </div>
      <Sparkle x={250} y={640} size={90} color={C.yellow} delay={14} />
      <Sparkle x={850} y={600} size={70} color={C.cream} delay={22} />
      <Sparkle x={880} y={1060} size={80} color={C.yellow} delay={30} />
      <Sparkle x={200} y={1000} size={60} color={C.cream} delay={18} />
      <div style={at(540, 1470, `scale(${pop(f, 22)}) rotate(-4deg)`)}>
        <div style={{background: C.pink, border: `8px solid ${C.white}`, borderRadius: 999, padding: '18px 56px', boxShadow: `0 12px 0 ${PINK_DROP}`}}>
          <Txt size={82} color={C.white}>새미네부엌 겉절이양념</Txt>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 3. Key features
const FEATURES: [React.ReactNode, string, string][] = [
  [<Garlic size={120} />, '마늘·생강·배·액젓까지', '김치에 필요한 재료가 한 팩에'],
  [<Leaf size={120} />, '가열하지 않은 프레쉬 공법', '신선한 풍미를 살린 생양념'],
  [<Chili size={130} />, '고춧가루는 원하는 만큼 넣어', '내 입맛대로 맵기 조절 OK'],
];

export const Features: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <GridPaper bg={C.cream} line="rgba(31,154,75,0.10)" />
      <div style={at(540, 300, `scale(${pop(f, 8)})`)}>
        <Txt size={84} color={C.green} stroke={C.white} strokeW={8} drop={C.greenInk}>절이지 않고 바로 무쳐</Txt>
      </div>
      <div style={at(540, 450, `scale(${pop(f, 14)}) rotate(-2deg)`)}>
        <Txt size={160} color={C.pink} stroke={C.white} strokeW={12} drop={PINK_DROP}>신선하게!</Txt>
      </div>
      {FEATURES.map(([icon, l1, l2], i) => {
        const p = pop(f, 22 + i * 12, {damping: 14});
        return (
          <div
            key={i}
            style={at(540 + (1 - p) * 1100, 700 + i * 260, `rotate(${(1 - p) * 8}deg)`, {
              width: 940, height: 220, borderRadius: 44, background: C.greenDark,
              display: 'flex', alignItems: 'center', gap: 34, padding: '0 40px', boxSizing: 'border-box',
              boxShadow: `0 10px 0 ${C.greenInk}`,
            })}
          >
            <div style={{width: 160, height: 160, flexShrink: 0, borderRadius: '50%', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{transform: `rotate(${Math.sin(f / 8 + i) * 8}deg)`}}>{icon}</div>
            </div>
            <div style={{fontFamily: fonts.body, textAlign: 'left'}}>
              <div style={{fontSize: 40, fontWeight: 700, color: C.cream, opacity: 0.92}}>{l1}</div>
              <div style={{fontSize: 48, fontWeight: 900, color: C.yellow, marginTop: 4}}>{l2}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 4. 5-minute recipe
const STEPS: [React.FC<{size: number}>, string, string][] = [
  [StepSauce, '양념에 고춧가루 섞고', '5분 불리기'],
  [StepCut, '배추는 한입 크기로', '어슷썰기'],
  [StepMix, '빡빡 주물러 버무리면', '완성!'],
];

export const Steps: React.FC = () => {
  const f = useCurrentFrame();
  const tip = pop(f, 150);
  return (
    <AbsoluteFill>
      <GridPaper bg="#F4F6CF" line="rgba(31,154,75,0.12)" />
      <div style={at(540, 280, `scale(${pop(f, 6)})`)}>
        <Txt size={100} color={C.green} font={fonts.hand}>절임 필요 없이</Txt>
      </div>
      <div style={at(540, 440, `scale(${pop(f, 12)})`, {display: 'flex', alignItems: 'center', gap: 20})}>
        <Stopwatch size={150} turns={ease(f, [10, 80], [0, 5])} />
        <Txt size={150} color={C.pink} stroke={C.white} strokeW={12} drop={PINK_DROP}>5분 완성!</Txt>
      </div>
      {STEPS.map(([Icon, l1, l2], i) => {
        const p = pop(f, 30 + i * 40, {damping: 13});
        const tilt = i % 2 ? 1.2 : -1.2;
        return (
          <div
            key={i}
            style={at(540, 700 + i * 275 + (1 - p) * 1600,`rotate(${tilt + (1 - p) * tilt * 8}deg)`, {
              width: 940, height: 240, borderRadius: 28, background: '#FFFFFF',
              backgroundImage: 'linear-gradient(rgba(31,154,75,0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(31,154,75,0.10) 2px, transparent 2px)',
              backgroundSize: '36px 36px', boxShadow: '0 14px 30px rgba(60,80,20,0.18)',
              display: 'flex', alignItems: 'center', padding: '0 36px 0 44px', boxSizing: 'border-box',
            })}
          >
            <div style={{position: 'absolute', top: -22, left: 400, width: 140, height: 44, background: 'rgba(242,242,91,0.85)', transform: 'rotate(-4deg)'}} />
            <div style={{fontFamily: fonts.hand, fontSize: 120, color: C.green, width: 130, lineHeight: 1}}>0{i + 1}</div>
            <div style={{fontFamily: fonts.body, textAlign: 'left', flex: 1, marginLeft: 18}}>
              <div style={{fontSize: 44, fontWeight: 700, color: C.ink}}>{l1}</div>
              <div style={{fontSize: 56, fontWeight: 900, color: C.greenDark, marginTop: 2}}>{l2}</div>
            </div>
            <Icon size={200} />
          </div>
        );
      })}
      <div style={at(540, 1520, `scale(${tip})`)}>
        <div style={{background: C.yellow, border: `5px solid ${C.greenInk}`, borderRadius: 999, padding: '18px 44px'}}>
          <Txt size={42} color={C.greenInk} font={fonts.body} style={{fontWeight: 900}}>+ 참기름·통깨 솔솔 뿌리면 더 맛있어요!</Txt>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 5. Pairings — 꿀.조.합
const PAIRS: [React.FC<{size: number}>, string, number, number][] = [
  [RiceBowl, '흰 쌀밥에도', 290, 830],
  [Suyuk, '야들야들 수육에도', 790, 830],
  [Kalguksu, '칼국수에도', 290, 1250],
  [Ramen, '라면에도~', 790, 1250],
];

export const Pairings: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sunburst bg={C.green} ray="rgba(255,255,255,0.07)" cy={1040} speed={-0.2} />
      <div style={at(540, 300, `scale(${pop(f, 6)})`)}>
        <Txt size={92} color={C.cream} stroke={C.greenInk} strokeW={8}>어디에 곁들여도</Txt>
      </div>
      <div style={at(540, 470, `scale(${pop(f, 12)}) rotate(-3deg)`)}>
        <Txt size={190} color={C.yellow} stroke={C.greenInk} strokeW={13} drop={C.greenInk}>꿀.조.합!</Txt>
      </div>
      {PAIRS.map(([Plate, label, x, y], i) => {
        const p = pop(f, 18 + i * 8, {damping: 12});
        return (
          <React.Fragment key={i}>
            <div style={at(x, y, `scale(${p}) rotate(${(1 - p) * -120 + Math.sin(f / 16 + i) * 4}deg)`, {filter: 'drop-shadow(0 16px 18px rgba(0,40,15,0.35))'})}>
              <Plate size={320} />
            </div>
            <div style={at(x, y + 205, `scale(${pop(f, 24 + i * 8)})`)}>
              <Txt size={68} color={C.cream} font={fonts.hand} stroke={C.greenInk} strokeW={6}>{label}</Txt>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

// 6. Outro — veggie marquee + lockup
const Band: React.FC<{y: number; rot: number; bg: string; color: string; text: string; dir: 1 | -1; enter: number}> = ({y, rot, bg, color, text, dir, enter}) => {
  const f = useCurrentFrame();
  const slide = (1 - ease(f, [enter, enter + 16], [0, 1])) * 1500 * dir;
  return (
    <div style={at(540 + slide, y, `rotate(${rot}deg)`, {width: 1500, height: 104, background: bg, overflow: 'hidden', display: 'flex', alignItems: 'center', boxShadow: '0 8px 0 rgba(0,0,0,0.12)'})}>
      <div style={{transform: `translateX(${dir * f * 5 - 900}px)`}}>
        <Txt size={60} color={color} style={{textAlign: 'left'}}>{text.repeat(5)}</Txt>
      </div>
    </div>
  );
};

export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const jar = pop(f, 6, {damping: 10, mass: 0.8});
  return (
    <AbsoluteFill>
      <Sunburst bg={C.cream} ray="rgba(242,242,91,0.32)" cy={800} rays={20} />
      <div style={at(540, 250, `scale(${pop(f, 8)})`)}>
        <Txt size={88} color={C.green} stroke={C.white} strokeW={8} drop={C.greenInk}>바로 무쳐 신선한</Txt>
      </div>
      <div style={at(540, 390, `scale(${pop(f, 14)}) rotate(-3deg)`)}>
        <Txt size={156} color={C.pink} stroke={C.white} strokeW={12} drop={PINK_DROP}>겉절이 완성!</Txt>
      </div>
      <div style={at(540, 790 + Math.sin(f / 14) * 8, `scale(${0.3 + jar * 0.7}) rotate(${(1 - jar) * 30 + Math.sin(f / 18) * 2}deg)`)}>
        <Jar height={600} shine={ease(f, [36, 60], [0, 1])} />
      </div>
      <Sparkle x={220} y={600} size={80} color={C.pink} delay={20} />
      <Sparkle x={870} y={650} size={90} color={C.green} delay={28} />
      <Sparkle x={860} y={960} size={60} color={C.pink} delay={36} />
      <Band y={1175} rot={-4} bg={C.green} color={C.cream} text="봄동 · 양배추 · 얼갈이 · 미나리 · 다양한 채소로 즐겨요 ✦ " dir={-1} enter={14} />
      <div style={at(540, 1320, `scale(${pop(f, 26)})`)}>
        <Txt size={70} color={C.green} stroke={C.white} strokeW={8} drop={C.greenInk}>새미네부엌</Txt>
      </div>
      <div style={at(540, 1435, `scale(${pop(f, 32)})`)}>
        <Txt size={124} color={C.pink} stroke={C.white} strokeW={11} drop={PINK_DROP}>겉절이양념</Txt>
      </div>
    </AbsoluteFill>
  );
};

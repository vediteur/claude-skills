import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Enter, H, W} from '../../lib';
import {Features, Hook, Outro, Pairings, Reveal, Steps} from './scenes';

export const REEL_DURATION = 720; // 24s @ 30fps

const TRANSITION = 18;

// Each scene starts at `from` and stays alive until the next one has fully covered it
const SCENES: {from: number; el: React.ReactNode}[] = [
  {from: 0, el: <Hook />},
  {from: 80, el: <Enter type="circle" origin={[540, 1150]}><Reveal /></Enter>},
  {from: 182, el: <Enter type="up"><Features /></Enter>},
  {from: 307, el: <Enter type="left"><Steps /></Enter>},
  {from: 497, el: <Enter type="circle" origin={[W / 2, H / 2]}><Pairings /></Enter>},
  {from: 602, el: <Enter type="up"><Outro /></Enter>},
];

export const GeotjeoriReel: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    {SCENES.map(({from, el}, i) => {
      const next = SCENES[i + 1];
      const dur = next ? next.from + TRANSITION - from : REEL_DURATION - from;
      return (
        <Sequence key={from} from={from} durationInFrames={dur}>
          {el}
        </Sequence>
      );
    })}
  </AbsoluteFill>
);

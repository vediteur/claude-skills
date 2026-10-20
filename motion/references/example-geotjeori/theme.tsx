import React from 'react';
import {Product} from '../../lib';

// Palette sampled from the 새미네부엌 detail page
export const C = {
  cream: '#FFF6D8',
  green: '#1F9A4B',
  greenDark: '#167A3B',
  greenInk: '#0F5528',
  lime: '#EEF2B6',
  yellow: '#F2F25B',
  pink: '#E23B7C',
  red: '#E4402B',
  ink: '#2B2119',
  white: '#FFFFFF',
};

export const PINK_DROP = '#8E1F4B';

export const Jar: React.FC<{height: number; shine?: number}> = (props) => (
  <Product file="geotjeori/jar.png" aspect={0.704} {...props} />
);

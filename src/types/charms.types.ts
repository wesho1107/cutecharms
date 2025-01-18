import Matter from 'matter-js';

export interface CharmPosition {
  x: number;
  y: number;
  angle: number;
}

export interface CharmPositions {
  [id: string]: CharmPosition;
}
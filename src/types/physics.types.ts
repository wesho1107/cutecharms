import { Engine, Body } from 'matter-js';

export interface PhysicsContextType {
  engine: Engine;
  addBody: (body: Body) => void;
  removeBody: (body: Body) => void;
}
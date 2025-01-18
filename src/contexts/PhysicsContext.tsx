import React, { createContext, useContext, useState } from 'react';
import Matter from 'matter-js';
import { PhysicsContextType } from '../types/physics.types';

const PhysicsContext = createContext<PhysicsContextType | null>(null);

interface PhysicsProviderProps {
  children: React.ReactNode;
}

export const PhysicsProvider: React.FC<PhysicsProviderProps> = ({ children }) => {
  const [engine] = useState(() => Matter.Engine.create());

  const addBody = (body: Matter.Body) => {
    Matter.World.add(engine.world, [body]);
  };

  const removeBody = (body: Matter.Body) => {
    Matter.World.remove(engine.world, body);
  };

  return (
    <PhysicsContext.Provider value={{ engine, addBody, removeBody }}>
      {children}
    </PhysicsContext.Provider>
  );
};

export const usePhysicsContext = () => {
  const context = useContext(PhysicsContext);
  if (!context) throw new Error('usePhysicsContext must be used within PhysicsProvider');
  return context;
};
import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import { usePhysicsContext } from '../../contexts/PhysicsContext';
import { PHYSICS_CONFIG } from '../../constants/physics.constants';

const { width, height } = Dimensions.get('window');

const Physics = (entities: any, { time }: { time: { delta: number } }) => {
  const engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

interface PhysicsWorldProps {
  children: React.ReactNode;
}

export const PhysicsWorld: React.FC<PhysicsWorldProps> = ({ children }) => {
  const { engine } = usePhysicsContext();

  useEffect(() => {
    // Create boundaries
    const walls = [
      Matter.Bodies.rectangle(width / 2, -30, width, 60, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true }),
      Matter.Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true })
    ];
    Matter.World.add(engine.world, walls);

    return () => {
      Matter.World.clear(engine.world, false);
    };
  }, [engine]);

  return (
    <GameEngine
      style={{ flex: 1 }}
      systems={[Physics]}
      entities={{
        physics: { engine }
      }}
    >
      {children}
    </GameEngine>
  );
};
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import { usePhysicsContext } from '../../contexts/PhysicsContext';
import { PHYSICS_CONFIG } from '../../constants/physics.constants';
import Physics from './Physics';
import Charm from './Charm';
import { usePhysicsAnimation } from '@/src/hooks/usePhysicsAnimation';

const { width, height } = Dimensions.get('window');

interface PhysicsWorldProps {
  charms: Matter.Body[];
}

export const PhysicsWorld: React.FC<PhysicsWorldProps> = ({ charms }) => {
  const { engine } = usePhysicsContext();
  const positions = usePhysicsAnimation(engine, charms);

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
      running={true}
      entities={{
        physics: { engine: engine, world: engine.world },
        charms: { bodies: charms }
      }}
    >
      {charms.map((charm, index) => (
        <Charm
          key={charm.id}
          position={positions[charm.id] || {
            x: charm.position.x,
            y: charm.position.y,
            angle: charm.angle
          }}
        />
      ))}
    </GameEngine>
  );
};
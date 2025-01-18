import { useState, useEffect, useRef } from 'react';
import { CharmPosition, CharmPositions } from '../types/charms.types';
import Matter from 'matter-js';

export const usePhysicsAnimation = (
  engine: Matter.Engine,
  charms: Matter.Body[]
) => {
  const [positions, setPositions] = useState<CharmPositions>({});
  const animationFrameId = useRef<number>();
  const previousPositions = useRef<CharmPositions>({});

  useEffect(() => {
    const updatePhysics = () => {
      Matter.Engine.update(engine, 1000 / 60);
      
      // Only update state if positions have actually changed
      const newPositions: CharmPositions = {};
      let hasChanges = false;

      charms.forEach(charm => {
        const id = charm.id.toString();
        const newPosition: CharmPosition = {
          x: charm.position.x,
          y: charm.position.y,
          angle: charm.angle
        };

        const prevPosition = previousPositions.current[id];
        if (!prevPosition ||
            prevPosition.x !== newPosition.x ||
            prevPosition.y !== newPosition.y ||
            prevPosition.angle !== newPosition.angle) {
          hasChanges = true;
        }

        newPositions[id] = newPosition;
      });

      if (hasChanges) {
        previousPositions.current = newPositions;
        setPositions(newPositions);
      }

      animationFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [engine, charms]);

  return positions;
};
import React, { useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import { usePhysicsContext } from '../../contexts/PhysicsContext';
import Physics from './Physics';
import Charm from './Charm';
import { usePhysicsAnimation } from '@/src/hooks/usePhysicsAnimation';
import { mockCharms } from '@/src/constants/constants';

// Get screen dimensions
const { width, height: screenHeight } = Dimensions.get('window');
// Account for status bar height
const statusBarHeight = StatusBar.currentHeight || 0;
// Usable height (accounting for status bar and some bottom padding for UI)
const height = screenHeight - statusBarHeight - 200; // 180px bottom padding for UI elements

interface PhysicsWorldProps {
  charms: Matter.Body[];
}

export const PhysicsWorld: React.FC<PhysicsWorldProps> = ({ charms }) => {
  const { engine } = usePhysicsContext();
  const positions = usePhysicsAnimation(engine, charms);

  // Set up walls with proper positioning
  useEffect(() => {
    // Wall thickness
    const WALL_THICKNESS = 40;

    // Create walls to form a bounded container
    const walls = [
      // Top wall - centered horizontally, positioned at top
      Matter.Bodies.rectangle(
        width / 2,
        statusBarHeight,
        width,
        WALL_THICKNESS,
        { isStatic: true }
      ),
      // Bottom wall - centered horizontally, positioned at bottom
      Matter.Bodies.rectangle(
        width / 2,
        height + statusBarHeight,
        width,
        WALL_THICKNESS,
        { isStatic: true }
      ),
      // Left wall - positioned at left edge + half thickness
      Matter.Bodies.rectangle(
        0,  // Changed from 0 to WALL_THICKNESS/2
        height / 2 + statusBarHeight,
        WALL_THICKNESS,
        height,
        { isStatic: true }
      ),
      // Right wall - positioned at right edge - half thickness
      Matter.Bodies.rectangle(
        width - WALL_THICKNESS / 2,  // Changed from width to width - WALL_THICKNESS/2
        height / 2 + statusBarHeight,
        WALL_THICKNESS,
        height,
        { isStatic: true }
      ),
    ];

    // Add walls to the world
    Matter.World.add(engine.world, walls);

    // Adjust world bounds
    engine.world.bounds = {
      min: { x: 0, y: statusBarHeight },
      max: { x: width, y: height + statusBarHeight }
    };

    // Cleanup function
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
          source={mockCharms[index % mockCharms.length].image}
          key={charm.id}
          radius={charm.circleRadius || 0}
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
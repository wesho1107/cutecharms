// src/hooks/useDeviceMotion.ts
import { useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { usePhysicsContext } from '../contexts/PhysicsContext';

export const useDeviceMotion = () => {
  const { engine } = usePhysicsContext();

  useEffect(() => {
    let subscription: ReturnType<typeof DeviceMotion.addListener>;

    const setupDeviceMotion = async () => {
      try {
        await DeviceMotion.requestPermissionsAsync();
        
        // Set update interval (in milliseconds)
        DeviceMotion.setUpdateInterval(16); // approximately 60 FPS

        subscription = DeviceMotion.addListener(({ accelerationIncludingGravity }) => {
          if (accelerationIncludingGravity) {
            // Scale and invert acceleration for realistic feel
            // Note: Coordinates might need adjustment based on device orientation
            engine.gravity.x = (accelerationIncludingGravity.x || 0) * 0.1;
            engine.gravity.y = (accelerationIncludingGravity.y || 0) * -0.1;
          }
        });
      } catch (error) {
        console.warn('Failed to set up device motion:', error);
      }
    };

    setupDeviceMotion();

    // Cleanup
    return () => {
      subscription?.remove();
    };
  }, [engine]);
};
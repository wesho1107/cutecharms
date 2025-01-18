import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PhysicsProvider, usePhysicsContext } from '../contexts/PhysicsContext';
import { PhysicsWorld } from '../components/physics/PhysicsWorld';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { PHYSICS_CONFIG } from '../constants/physics.constants';
import Matter from 'matter-js';

export const ShakeScreen = () => {
  const [charms, setCharms] = useState<Matter.Body[]>([]);
  const { addBody } = usePhysicsContext();
  useDeviceMotion();

  const addCharm = () => {
    const charm = Matter.Bodies.circle(
      Math.random() * 300 + 50,
      Math.random() * 300 + 50,
      20,
      {
        restitution: PHYSICS_CONFIG.bounce,
        friction: PHYSICS_CONFIG.friction,
        frictionAir: PHYSICS_CONFIG.airFriction,
        density: PHYSICS_CONFIG.density,
      }
    );
    
    addBody(charm);
    setCharms(prev => [...prev, charm]);
  };

  return (
    <View style={styles.container}>
      <PhysicsWorld>
        {charms.map((charm, index) => (
          <View
            key={index}
            style={[
              styles.charm,
              {
                transform: [
                  { translateX: charm.position.x - 20 },
                  { translateY: charm.position.y - 20 },
                  { rotate: `${charm.angle}rad` }
                ]
              }
            ]}
          />
        ))}
      </PhysicsWorld>
      <TouchableOpacity style={styles.addButton} onPress={addCharm}>
        <Text style={styles.buttonText}>Add Charm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  charm: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF69B4',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
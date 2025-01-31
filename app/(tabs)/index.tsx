import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PhysicsWorld } from '../../src/components/physics/PhysicsWorld';
import { useDeviceMotion } from '../../src/hooks/useDeviceMotion';
import { usePhysicsContext } from '../../src/contexts/PhysicsContext';
import { PHYSICS_CONFIG } from '../../src/constants/physics.constants';
import Matter from 'matter-js';
import { useState } from 'react';
import SelectionModal from '@/src/components/SelectionModal';

export default function ShakeScreen() {
  const [charms, setCharms] = useState<Matter.Body[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { addBody } = usePhysicsContext();
  useDeviceMotion();

  const addCharm = () => {
    const charmRadius = 30;

    const charm = Matter.Bodies.circle(
      Math.random() * 300 + 50,
      Math.random() * 300 + 50,
      charmRadius,
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
      <PhysicsWorld charms={charms} />
      <SelectionModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Charm</Text>
      </TouchableOpacity>
    </View>
  );
}

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
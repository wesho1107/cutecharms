import React from 'react';
import { View, StyleSheet } from 'react-native';

const Charm = ({ position, angle }: { position: Matter.Vector; angle: number }) => {
  return (
    <View
      style={[
        styles.charm,
        {
          transform: [
            { translateX: position.x - 20 },
            { translateY: position.y - 20 },
            { rotate: `${angle}rad` }
          ]
        }
      ]}
    />
  )
};

const styles = StyleSheet.create({
  charm: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF69B4',
  },
});

export default Charm;
import React, { memo } from 'react';
import { View } from 'react-native';
import { CharmPosition } from '@/src/types/charms.types';

interface CharmProps {
  position: CharmPosition;
}

const Charm = memo(({ position }: CharmProps) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FF69B4',
          left: position.x - 20,
          top: position.y - 20,
          transform: [{ rotate: `${position.angle}rad` }]
        }
      ]}
    />
  );
});

export default Charm;
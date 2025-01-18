import React, { memo } from 'react';
import { View, Image } from 'react-native';
import { CharmPosition } from '@/src/types/charms.types';

interface CharmProps {
  position: CharmPosition;
  source: any; // ImageSourcePropType would be more precise, but requires additional import
}

const Charm = memo(({ position, source }: CharmProps) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: 40,
          height: 40,
          left: position.x - 20,
          top: position.y - 20,
          transform: [{ rotate: `${position.angle}rad` }],
        },
      ]}
    >
      <Image
        source={source}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
      />
    </View>
  );
});

export default Charm;

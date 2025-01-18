import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const mockCharms = [
  { id: 1, image: require('@/assets/charms/animal1.png'), name: 'Animal 1' },
  { id: 2, image: require('@/assets/charms/animal2.png'), name: 'Animal 2' },
  { id: 3, image: require('@/assets/charms/animal3.png'), name: 'Animal 3' },
  { id: 4, image: require('@/assets/charms/animal4.png'), name: 'Animal 4' },
  { id: 5, image: require('@/assets/charms/animal5.png'), name: 'Animal 5' },
  { id: 6, image: require('@/assets/charms/animal6.png'), name: 'Animal 6' },
  { id: 7, image: require('@/assets/charms/animal7.png'), name: 'Animal 7' },
  { id: 8, image: require('@/assets/charms/animal8.png'), name: 'Animal 8' },
  { id: 9, image: require('@/assets/charms/animal9.png'), name: 'Animal 9' },
  { id: 10, image: require('@/assets/charms/emotion1.png'), name: 'Emotion 1' },
  { id: 11, image: require('@/assets/charms/emotion2.png'), name: 'Emotion 2' },
  { id: 12, image: require('@/assets/charms/emotion3.png'), name: 'Emotion 3' },
  { id: 13, image: require('@/assets/charms/emotion4.png'), name: 'Emotion 4' },
  { id: 14, image: require('@/assets/charms/emotion5.png'), name: 'Emotion 5' },
  { id: 15, image: require('@/assets/charms/emotion6.png'), name: 'Emotion 6' },
  { id: 16, image: require('@/assets/charms/emotion7.png'), name: 'Emotion 7' },
  { id: 17, image: require('@/assets/charms/emotion8.png'), name: 'Emotion 8' },
  { id: 18, image: require('@/assets/charms/emotion9.png'), name: 'Emotion 9' },
];

function getRandomCharm(rangeStart: number, rangeEnd: number) {
  const filteredCharms = mockCharms.filter(
    (charm) => charm.id >= rangeStart && charm.id <= rangeEnd
  );
  const randomIndex = Math.floor(Math.random() * filteredCharms.length);
  return filteredCharms[randomIndex];
}

const CharmBox = ({ rangeStart, rangeEnd, currency, onBoxClick }: { rangeStart: number; rangeEnd: number; currency: number; onBoxClick: () => void; }) => {
  const [selectedCharm, setSelectedCharm] = useState<{ id: number; image: any; name: string } | null>(null);

  const scale = useSharedValue(1);
  const charmScale = useSharedValue(0);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const charmStyle = useAnimatedStyle(() => ({
    transform: [{ scale: charmScale.value }],
  }));

  const handlePress = () => {
    if (currency > 0) {
      const charm = getRandomCharm(rangeStart, rangeEnd);
      setSelectedCharm(charm);

      scale.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.quad) });
      charmScale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) });

      onBoxClick();
    }
  };

  return (
    <View style={styles.container}>
      {selectedCharm ? (
        <Animated.View style={[styles.resultContainer, charmStyle]}>
          <Image source={selectedCharm.image} style={styles.resultImage} />
          <Text style={styles.resultText}>{selectedCharm.name}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.box, currency === 0 && styles.disabledBox, boxStyle]}>
          <TouchableOpacity onPress={handlePress} disabled={currency === 0}>
            <Text style={styles.boxText}>Click To Open Your Daily Pack</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
  </View>
  );
};

const AnimalsScreen = ({ currency, onBoxClick }: { currency: number; onBoxClick: () => void }) => (
  <CharmBox rangeStart={1} rangeEnd={9} currency={currency} onBoxClick={onBoxClick} />
);

const EmotionsScreen = ({ currency, onBoxClick }: { currency: number; onBoxClick: () => void }) => (
  <CharmBox rangeStart={10} rangeEnd={18} currency={currency} onBoxClick={onBoxClick} />
);

const AllScreen = ({ currency, onBoxClick }: { currency: number; onBoxClick: () => void }) => (
  <CharmBox rangeStart={1} rangeEnd={18} currency={currency} onBoxClick={onBoxClick} />
);

export default function Daily() {
  const [currency, setCurrency] = useState(1);

  const handleBoxClick = () => {
    setCurrency(0);
  };


  return (
    <>
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyText}>Currency: {currency}</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicator: () => null,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarPressColor: 'transparent',
        }}
      >
        <Tab.Screen name="Animals">
          {() => <AnimalsScreen currency={currency} onBoxClick={handleBoxClick} />}
        </Tab.Screen>
        <Tab.Screen name="Emotions">
          {() => <EmotionsScreen currency={currency} onBoxClick={handleBoxClick} />}
        </Tab.Screen>
        <Tab.Screen name="All">
          {() => <AllScreen currency={currency} onBoxClick={handleBoxClick} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyContainer: {
    padding: 10,
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  tabItem: {
    width: 'auto',
    padding: 0,
    marginHorizontal: 4,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBarLabel: {
    textTransform: 'none',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  disabledBox: {
    backgroundColor: 'gray',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
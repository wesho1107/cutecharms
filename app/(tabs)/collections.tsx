import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function CharmsScreen() {
  return (
    <View style={styles.container}>
      <Text>Charms Collection</Text>
    </View>
  );
}

function WallpapersScreen() {
  return (
    <View style={styles.container}>
      <Text>Wallpapers Collection</Text>
    </View>
  );
}

export default function CollectionsTab() {
  return (
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
      <Tab.Screen name='Charms' component={CharmsScreen} />
      <Tab.Screen name='Wallpapers' component={WallpapersScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    marginTop: 20,
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
});

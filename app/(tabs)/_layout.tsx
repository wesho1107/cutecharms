import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      // Do your stuff here
      navigation.dispatch(e.data.action);
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'darkblue',
        headerTitleAlign: 'center',
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Active Wallpaper',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='image' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='collections'
        options={{
          title: 'Collections',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='folder-open' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='store'
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='shopping-cart' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='user' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

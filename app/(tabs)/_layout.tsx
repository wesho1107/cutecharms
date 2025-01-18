import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useNavigation } from 'expo-router';
import { listenToAuthState } from "../../config/authFunctions";
import LoginScreen from "../login";
import { User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";

export default function TabLayout() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = listenToAuthState((authUser: User | null) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      // Do your stuff here
      navigation.dispatch(e.data.action);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

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

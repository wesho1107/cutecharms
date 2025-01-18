import { Stack } from 'expo-router';
import { PhysicsProvider } from '../src/contexts/PhysicsContext';

export default function RootLayout() {
  return (
    <PhysicsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="index"
          options={{
            title: 'Shaker App',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="shake"
          options={{
            title: 'Shake Screen',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="collection"
          options={{
            title: 'My Collection',
            headerShown: true,
          }}
        />
      </Stack>
    </PhysicsProvider>
  );
}
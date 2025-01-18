import { Stack } from 'expo-router';
import { PhysicsProvider } from '../src/contexts/PhysicsContext';

export default function RootLayout() {
  return (
    <PhysicsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='login'
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name='(tabs)'
          options={{
            title: 'Tabs',
          }}
        />
      </Stack>
    </PhysicsProvider>
  );
}

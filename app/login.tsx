import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { login, signup, listenToAuthState } from '../config/authFunctions';
import { User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthState(async (authUser: User | null) => {
      setUser(authUser);
      setLoading(false);

      if (authUser) {
        // Store user data in AsyncStorage
        try {
          const userData = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          };
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          console.error('Error storing user data:', error);
        }
      } else {
        // Remove user data when logged out
        try {
          await AsyncStorage.removeItem('userData');
        } catch (error) {
          console.error('Error removing user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const loggedInUser = await login(email, password);
      console.log('User logged in:', loggedInUser.email);
    } catch (err) {
      console.error('Error during login:', err);
      Alert.alert(
        'Login Failed',
        'Please check your email and password and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSignup = async () => {
    try {
      const signedUpUser = await signup(email, password);
      console.log('User signed up:', signedUpUser.email);
    } catch (err) {
      console.error('Error during signup:', err);
      Alert.alert(
        'Signup Failed',
        'An error occurred during signup. Please check your password is at least 6 characters and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size='large' />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.toggleText, isLogin && styles.activeText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.toggleText, !isLogin && styles.activeText]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleSignup}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'darkblue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'darkblue',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: 'darkblue',
  },
  toggleText: {
    color: 'darkblue',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'white',
  },
});

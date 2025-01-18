import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  login,
  signup,
  listenToAuthState,
  logout,
} from "../config/authFunctions";
import { User } from "firebase/auth";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Tracks whether auth state is being checked
  const [error, setError] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = listenToAuthState((authUser: User | null) => {
      setUser(authUser);
      setLoading(false); // Stop showing the loading indicator
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  // Handles user login
  const handleLogin = async () => {
    try {
      setError(null);
      const loggedInUser = await login(email, password);
      console.log("User logged in:", loggedInUser.email);
    } catch (err) {
      console.error("Unknown error occurred during login");
    }
  };

  // Handles user signup
  const handleSignup = async () => {
    try {
      setError(null);
      const signedUpUser = await signup(email, password);
      console.log("User signed up:", signedUpUser.email);
    } catch (err) {
      console.error("Unknown error occurred during login");
    }
  };

  // Handles user logout
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (err) {
      console.error("Unknown error occurred during log out");
    }
  };

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Show welcome screen if the user is authenticated
  if (user) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Welcome, {user.email}!</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  // Show login/signup form if the user is not authenticated
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "80%",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shaker App</Text>
      <Link href="/shake" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Shaker</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Collection</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
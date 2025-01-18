import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { logout } from "../../config/authFunctions";

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
      router.push("/");

    } catch (err) {
      console.error("Error during logout:", err);
      Alert.alert(
        "Logout Failed",
        "An error occurred during logout. Please try again.",
        [{ text: "OK" }]
      );

    }
  };

  const menuItems = [
    { icon: 'gear', label: 'Settings' },
    { icon: 'bell', label: 'Notifications' },
    { icon: 'heart', label: 'Favorites' },
    { icon: 'history', label: 'Purchase History' },
    { icon: 'question-circle', label: 'Help & Support' },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => console.log(`${item.label} pressed`)}
          >
            <FontAwesome name={item.icon as any} size={24} color='darkblue' />
            <Text style={styles.menuText}>{item.label}</Text>
            <FontAwesome name='chevron-right' size={16} color='#666' />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name='sign-out' size={24} color='white' />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

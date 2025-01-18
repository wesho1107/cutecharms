import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useCharms } from '@/hooks/useCharms';

const Tab = createMaterialTopTabNavigator();

function CharmsScreen() {
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 80) / numColumns;
  const { charms, loading, error } = useCharms();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.charmsContainer}>
        {charms.map((charm) => (
          <View key={charm.id} style={[styles.charmItem, { width: itemWidth }]}>
            <View style={styles.charmImageContainer}>
              <Image source={charm.image} style={styles.charmImage} />
            </View>
            <Text style={styles.charmName}>{charm.name}</Text>
            <Text style={styles.charmQuantity}>x{charm.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  charmsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  charmItem: {
    aspectRatio: 1,
    alignItems: 'center',
  },
  charmImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  charmImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  charmName: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  charmQuantity: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

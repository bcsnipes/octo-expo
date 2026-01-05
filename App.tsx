import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Couple Screen Component
function CoupleScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Couple</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Actions Screen Component (Main Hub)
function ActionsScreen(): React.JSX.Element {
  const [apiStatus, setApiStatus] = React.useState<string>('Testing...');

  React.useEffect(() => {
    // Test API connection
    const testApi = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3010/api/couple');
        const data = await response.json();

        if (response.status === 400 && data.error === 'User ID is required') {
          setApiStatus('✅ Connected! API is reachable.');
        } else if (response.ok) {
          setApiStatus('✅ Connected to API!');
        } else {
          setApiStatus(`⚠️ Unexpected: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        setApiStatus(`❌ Connection failed - is Next.js running?`);
      }
    };
    testApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actions</Text>
      <Text style={styles.apiStatus}>{apiStatus}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// History Screen Component
function HistoryScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Settings Screen Component
function SettingsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Main App Component with Navigation
export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}): React.ReactNode => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Couple') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Actions') {
              iconName = focused ? 'flash' : 'flash-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else {
              iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Couple" component={CoupleScreen} />
        <Tab.Screen name="Actions" component={ActionsScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  apiStatus: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

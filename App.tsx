import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Home Screen Component
function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Couple Screen Component
function CoupleScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Couple</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Actions Screen Component
function ActionsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actions</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Price Screen Component
function PriceScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Price</Text>
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

// Main App Component with Navigation
export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Couple" component={CoupleScreen} />
        <Tab.Screen name="Actions" component={ActionsScreen} />
        <Tab.Screen name="Price" component={PriceScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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

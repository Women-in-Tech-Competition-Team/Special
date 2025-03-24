import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import screens (we'll create these next)
import HomeScreen from './src/screens/HomeScreen';
import LearningScreen from './src/screens/LearningScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case 'Learning':
                    iconName = focused ? 'book' : 'book-outline';
                    break;
                  case 'Progress':
                    iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    break;
                  case 'Settings':
                    iconName = focused ? 'settings' : 'settings-outline';
                    break;
                  default:
                    iconName = 'help-circle';
                }

                return <Ionicons name={iconName as any} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Learning" component={LearningScreen} />
            <Tab.Screen name="Progress" component={ProgressScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#157cdb',
            inactiveTintColor: '#262626',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Trang chủ',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              tabBarLabel: 'Thông báo',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="notifications" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Cá nhân',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="person" size={26} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


export default App;

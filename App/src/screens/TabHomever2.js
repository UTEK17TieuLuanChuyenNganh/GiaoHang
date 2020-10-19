import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import Home from './Home';
const Tab = createBottomTabNavigator();
class TabHome extends Component {
    render() {
        return (
        <Tab.Navigator
          initialRouteName="Profile"
          tabBarOptions={{
            activeTintColor: '#157cdb',
            inactiveTintColor: '#262626',
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
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
        );
    }
}

export default TabHome;
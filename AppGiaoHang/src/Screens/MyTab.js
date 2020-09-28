import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import MapScreens from './MapScreens';
import Logictics from './Logictics';

const Tab = createBottomTabNavigator();
class MyDrawer extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="MapScreens"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="MapScreens"
          component={MapScreens}
          options={{
            tabBarLabel: 'MapScreens',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="home" color={color} size={size} />
            //   ),
          }}
        />
        <Tab.Screen
          name="Logictics"
          component={Logictics}
          options={{
            tabBarLabel: 'Logictics',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons name="bell" color={color} size={size} />
            //   ),
          }}
        />

      </Tab.Navigator>
    );
  }
}

export default MyDrawer;
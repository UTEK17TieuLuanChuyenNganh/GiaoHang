import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from'react-native-vector-icons/FontAwesome'

import MapScreens from './MapScreens';
import Logictics from './Logictics';
import CheckStatus from './CheckStatus';
import CusInformation from './CusInformation';
const Tab = createBottomTabNavigator();
class MyDrawer extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="MapScreens"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          showIcon:true
        }}
      >
        <Tab.Screen
          name="MapScreens"
          component={MapScreens}
          options={{
            tabBarLabel: 'MapScreens',
            tabBarIcon: () => <Icon name="map" color="#333" size={24} />,
          }}
        />
        <Tab.Screen
          name="Logictics"
          component={Logictics}
          options={{
            tabBarLabel: 'Logictics',
            tabBarIcon: () => <Icon name="list" color="#333" size={24} />,
          }}
        />
        <Tab.Screen
          name="CheckStatus"
          component={CheckStatus}
          options={{
            tabBarLabel: 'CheckStatus',
            tabBarIcon: () => <Icon name="check-circle" color="#333" size={24} />,
          }}
        />

      </Tab.Navigator>
    );
  }
}

export default MyDrawer;
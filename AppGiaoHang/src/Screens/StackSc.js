import React, { Component } from 'react';
import Login from './Login';
import MyDrawer from './MyDrawer';
import Setting from'./Setting';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
const Stack = createStackNavigator();
class StackSc extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='MyDrawer' component={MyDrawer} />
                    <Stack.Screen name='Setting' component={Setting} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default StackSc
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import Home from './Home';
const Stack = createStackNavigator();
class HomeScreen extends Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Cart' component={Cart} />
            </Stack.Navigator>
        );
    }
}

export default HomeScreen;
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import Home from './Home';
import ProductDetail from './ProductDetail';
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
                <Stack.Screen name='ProductDetail' component={ProductDetail} />                
            </Stack.Navigator>
        );
    }
}


export default HomeScreen;
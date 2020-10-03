import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import Home from './Home';
import ProductDetail from './ProductDetail';
import DiaChiUocLuong from './DiaChiUocLuong';
import { NavigationContainer } from '@react-navigation/native';
import TabHome from './TabHome';
import Adress from './Adress';
import NewAddress from './NewAddress';
const Stack = createStackNavigator();
class HomeScreen extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name='TabHome' component={TabHome} />
                    <Stack.Screen name='Cart' component={Cart} />
                    <Stack.Screen name='ProductDetail' component={ProductDetail} />
                    <Stack.Screen name='Adress' component={Adress}/>
                    <Stack.Screen name='NewAddress' component={NewAddress}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


export default HomeScreen;
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from './Cart';
import ProductDetail from './ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import TabHome from './TabHome';
import Adress from './Adress';
import NewAddress from './NewAddress';
import ProfileItem from '../components/ProfileItem';
import QLDonhang from './QLDonhang';
import DSSanphamdamua from './DSSanphamdamua';
import Login from './Login';
import ProfileScreen from './ProfileScreen';
import TabHomever2 from './TabHomever2';
import Payment from './Payment';
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
                    <Stack.Screen name='TabHomeVer2' component={TabHomever2} />
                    <Stack.Screen name='Cart' component={Cart} />
                    <Stack.Screen name='ProductDetail' component={ProductDetail} />
                    <Stack.Screen name='Adress' component={Adress}/>
                    <Stack.Screen name='NewAddress' component={NewAddress}/>
                    <Stack.Screen name='ProfileItem' component={ProfileItem}/>
                    <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
                    <Stack.Screen name='QLDH' component={QLDonhang}/>
                    <Stack.Screen name='DSSP' component={DSSanphamdamua}/>
                    <Stack.Screen name='Login' component={Login}/> 
                    <Stack.Screen name='Payment' component={Payment}/>                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


export default HomeScreen;
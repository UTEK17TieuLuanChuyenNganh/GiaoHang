import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from './Cart';
import ProductDetail from './ProductDetail';
import { NavigationContainer } from '@react-navigation/native';
import TabHome from './TabHome';
import NewAddress from './NewAddress';
import ProfileItem from '../components/ProfileItem';
import QLDonhang from './QLDonhang';
import DSSanphamdamua from './DSSanphamdamua';
import Login from './Login';
import ProfileScreen from './ProfileScreen';
import Profile from './Profile';
import Payment from './Payment';
import Register from './Register';
import PaymentNotice from './PaymentNotice';
import UpdateAddressTime from './UpdateAddressTime';
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
                    <Stack.Screen name='NewAddress' component={NewAddress} />
                    <Stack.Screen name='TTCN' component={Profile} />
                    <Stack.Screen name='ProfileItem' component={ProfileItem} />
                    <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                    <Stack.Screen name='QLDH' component={QLDonhang} />
                    <Stack.Screen name='DSSP' component={DSSanphamdamua} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Payment' component={Payment} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='PaymentNotice' component={PaymentNotice} />
                    <Stack.Screen name='UpdateAddressTime' component={UpdateAddressTime} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}


export default HomeScreen;
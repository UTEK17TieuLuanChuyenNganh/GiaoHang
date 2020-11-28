import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//import MapScreens from './MapScreens';
import MyTab from './MyTab';
import Setting from './Setting';
import Profile from './Profile';


const Drawer = createDrawerNavigator();

class MyDrawer extends Component {
   
    componentDidMount(){
       
    }
    render() {
        return (
            <Drawer.Navigator initialRouteName="MyTab" >
                <Drawer.Screen
                    name="MyTab"
                    component={MyTab}
                    options={{ drawerLabel: 'Giao Hàng' }}
                />
                
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{ drawerLabel: 'Hồ Sơ' }}
                />
                <Drawer.Screen
                    name="Setting"
                    component={Setting}
                    options={{ drawerLabel: 'Cài Đặt' }}
                />
            </Drawer.Navigator>

        );
    }
}

export default MyDrawer;
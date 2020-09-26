import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import MapScreens from './MapScreens';
import LogOut from './LogOut';
import Profile from './Profile';
import Avatar from './Avatar';

const Drawer = createDrawerNavigator();
class MyDrawer extends Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="MapScreens" >
                 <Drawer.Screen
                    name="Avatar"
                    component={Avatar}
                    options={{ drawerLabel: 'Ảnh' }}
                />
                <Drawer.Screen
                    name="MapScreens"
                    component={MapScreens}
                    options={{ drawerLabel: 'Bản Đồ' }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{ drawerLabel: 'Hồ Sơ' }}
                />
                <Drawer.Screen
                    name="LogOut"
                    component={LogOut}
                    options={{ drawerLabel: 'Đăng Xuất' }}
                />
                
            </Drawer.Navigator>
        );
    }
}

export default MyDrawer;
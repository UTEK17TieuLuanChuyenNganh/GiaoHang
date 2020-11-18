import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import Home from './Home';
import { connect } from 'react-redux';
import store from '../redux/store'
const Tab = createBottomTabNavigator();
class TabHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      newNotification: []
    }
  }
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('focus', async () => {
      await this.checkUser();
    });
  }
  componentWillUnmount() {
    this.props.navigation.removeListener(this._subscribe);
  }
  async checkUser() {
    try {      
      if (this.props.user.user.length > 0) {
        return;
      } else {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          let data = JSON.parse(value);
          store.dispatch({
            type: 'LOGIN',
            payload: data
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#157cdb',
          inactiveTintColor: '#262626',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({ color }) => (
              this.props.notice.newNotice.length > 0 ?
                <MaterialIcons name="notifications-on" size={26} color={'red'} /> :
                <MaterialIcons name="notifications" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Cá nhân',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={26} color={color} />
            ),
          }}
        />

      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    notice: state.notice
  };
};

export default connect(mapStateToProps, null)(TabHome);
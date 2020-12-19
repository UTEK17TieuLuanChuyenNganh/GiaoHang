import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../Component/Logo';
import { connect } from 'react-redux';
import store from '../redux/store';
class Setting extends Component {
  logoutclick() {
    store.dispatch({
      type: 'CLEARORDER',
    })
    store.dispatch({
      type: 'CLEARCHUOI',
    })
    store.dispatch({
      type: 'CLEARSTT',
    })
    store.dispatch({
      type: 'CLEARUSER',
    })
    this.props.navigation.replace('Login');

  }
  showmenu = () => {
    this.props.navigation.openDrawer();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.logost}>
          <Logo openDrawerclick={() => { this.showmenu() }} />
        </View>
        <TouchableOpacity onPress={() => { this.logoutclick() }} >
          <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white' }}>Đăng Xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  logost: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 50,
  },

})
export default Setting;
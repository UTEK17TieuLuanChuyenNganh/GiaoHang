import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
class Setting extends Component {
  logoutclick() {
    this.props.navigation.replace('Login');
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { this.logoutclick() }} >
          <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize:25, color:'white'}}>Đăng Xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Setting;
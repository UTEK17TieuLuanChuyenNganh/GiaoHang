import { StyleSheet, View, Text, StatusBar } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../components/HeaderComponent';
import ProfileItem from '../components/ProfileItem';

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ProfileScreen extends Component {

  loginPress(){
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        {/*  */}
        <HeaderComponent title="Cá nhân" />
        {/*  */}
        {/* <TouchableOpacity> */}
        <View style={styles.bodyContainer}>
          <View>
            <TouchableOpacity onPress={()=>{this.loginPress()}}>
              <View style={styles.userContainer}>
                <View style={styles.avatarContainer}>
                  <MaterialIcons name="person" size={26} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.welcomeText}>Chào mừng bạn đến với Tiki</Text>
                  <Text style={styles.authText}>Đăng nhập/Đăng ký</Text>
                </View>
                <FontAwesome name="angle-right" size={26} color="#1e88e5" />
              </View>
            </TouchableOpacity>
          </View>
          {/*  */}
          <View style={styles.divider} />
          <ProfileItem navigation={this.props.navigation} icon="format-list-bulleted" name="Quản lý đơn hàng" />
          <ProfileItem navigation={this.props.navigation} icon="cart-outline" name="Sản phẩm đã mua" />
          <ProfileItem navigation={this.props.navigation} icon="eye-outline" name="Sản phẩm đã xem" />
          <ProfileItem navigation={this.props.navigation} icon="heart-outline" name="Sản phẩm yêu thích" />
          <ProfileItem navigation={this.props.navigation} icon="bookmark-outline" name="Sản phẩm mua sau" />
          <ProfileItem navigation={this.props.navigation} icon="star-outline" name="Sản phẩm đánh giá" />
          {/*  */}
          <View style={styles.divider} />
          <ProfileItem navigation={this.props.navigation} name="Ưu đãi cho chủ thẻ ngân hàng" />
          <ProfileItem navigation={this.props.navigation} name="Cài đặt" />
          {/*  */}
          <View style={styles.divider} />
          <ProfileItem navigation={this.props.navigation} icon="headphones" name="Hỗ trợ" />
          <ProfileItem navigation={this.props.navigation} icon="logout" name="Đăng xuất" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  //
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    color: '#828282',
  },
  authText: {
    color: '#1e88e5',
    fontSize: 18,
    fontWeight: '500',
  },
  //

  //
  divider: {
    height: 10,
  },
});

export default ProfileScreen;

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/HeaderComponent';
import { connect } from 'react-redux';
import store from '../redux/store';
class Profile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      user: []
    }
  }
  renderElement() {
    if (this.props.user.user) {
      let acc = this.props.user.user
      return (
        <View style={styles.Information}>
          <Text style={styles.detailaccount}>{(acc.SinhNhat !== {}) ? acc.SinhNhat.split('T')[0].trim() : ''}</Text>
          <Text style={styles.detailaccount}>{acc.GioiTinh}</Text>
          <Text style={styles.detailaccount}>{acc.Email}</Text>
          <Text style={styles.detailaccount}>{acc.SDT}</Text>
          <Text style={styles.detailaccount}>{acc.Username}</Text>
        </View>
      )
    }
    else return null;
  }
  render() {    
    return (
      <View style={{ flex: 1 }}>
        <Header title="Thông tin cá nhân" />
        <View style={{ flex: 1, alignItems: "center" }}>
          {this.props.user.user.Avatar ?
            <Image style={styles.avatar} source={{ uri: `data:image/jpg;base64,${this.props.user.user.Avatar}` }} /> :
            <Image style={styles.avatar} source={require('../img/user.png')} />}
          <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>
            <View style={styles.LabelIndfor}>
              <Text style={styles.detailaccount}>Ngày Sinh:</Text>
              <Text style={styles.detailaccount}>Giới Tính:</Text>
              <Text style={styles.detailaccount}>Email:</Text>
              <Text style={styles.detailaccount}>Số Điện Thoại:</Text>
              <Text style={styles.detailaccount}>Tên Tài Khoản:</Text>
            </View>
            <View style={styles.Information}>
              {this.renderElement()}
            </View>
          </View>
        </View>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    margin: 10,
    backgroundColor: 'green'
  },
  nameShipper: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  circleImageLayout: {
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
    margin: 10,
    marginLeft: -30,
    marginTop: 25
  },
  Information: {
    //backgroundColor: 'yellow',
    marginRight: 10,
    justifyContent: 'flex-end',
    flex: 1
  },
  LabelIndfor: {
    //backgroundColor: 'red',
    marginLeft: 10,
    flex: 1 / 2
  },
  detailaccount: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  avatar: {
    marginTop: 10,
    width: 170,
    height: 200,
    resizeMode: 'stretch',
    borderWidth: 5,
    borderColor: "black"
  }
})


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Profile);
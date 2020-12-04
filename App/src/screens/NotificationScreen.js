import React, { Component } from 'react';
import {
  StyleSheet, View, StatusBar, FlatList,
  Text, ActivityIndicator, TouchableOpacity
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderComponent from '../components/HeaderComponent';
import { connect } from 'react-redux';

class NotificationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }
  componentDidMount() {
    this.fetchData()
    this._subscribe = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }
  componentWillUnmount() {
    this.props.navigation.removeListener(this._subscribe);
  }
  fetchData() {
    return fetch('https://servertlcn.herokuapp.com/thongbao/' + this.props.user.user.id + '/nguoidung', { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data
          })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  clickNotice(item) {
    let data = {
      isNew: false
    }
    return fetch('https://servertlcn.herokuapp.com/thongbao/' + item.id,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }

      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  NotificationItem = (item) => (
    <TouchableOpacity onPress={() => { this.clickNotice(item) }}>
      <View style={[styles.itemContainer, {
        backgroundColor: item.isNew ? '#ADC3F0' : '#fff'
      }]}>
        <View style={styles.itemTopContainer}>
          <View
            style={[
              styles.itemTypeContainer,
              {
                backgroundColor: '#fc820a'
              },
            ]}>
            <MaterialCommunityIcons
              name={item.Type === 'giao hang' ? 'van-utility' : 'backup-restore'}
              color="#fff"
              size={22}
            />
          </View>
          <View style={styles.itemTopTextContainer}>
            <Text style={styles.itemName}>{item.NoiDung}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.screenContainer}>
          <StatusBar barStyle="light-content" />
          <HeaderComponent title="Thông báo" />
          <View style={{ marginTop: 200, flexDirection: "column", alignItems: "center" }}>
            <ActivityIndicator size={70} color="#0000ff" />
            <Text style={{ fontSize: 20, color: "#0000ff" }}>Loading...</Text>
          </View>
        </View>);
    }
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <HeaderComponent title="Thông báo" />
        <View style={styles.bodyContainer}>
          <View>
            <View style={styles.buttonActiveContainer}>
              <View style={styles.activeMark} />
              <MaterialCommunityIcons
                name="home"
                color="#949494"
                size={22}
                style={styles.activeIcon}
              />
            </View>
            <View style={styles.buttonInactiveContainer}>
              <MaterialCommunityIcons
                name="backup-restore"
                color="#949494"
                size={22}
              />
            </View>
            <View style={styles.buttonInactiveContainer}>
              <MaterialCommunityIcons name="sale" color="#949494" size={22} />
            </View>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => this.NotificationItem(item)}
            />
          </View>
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
    flexDirection: 'row',
  },
  buttonActiveContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonInactiveContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  activeMark: {
    backgroundColor: '#1e88e5',
    width: 4,
  },
  activeIcon: {
    padding: 12,
    // trick
    marginLeft: -4,
  },
  //
  listContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
  },
  //
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  itemTopContainer: {
    flexDirection: 'row',
  },
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTopTextContainer: {
    marginRight: 40,
    marginLeft: 4,
  },
  itemName: {
    color: '#000',
    fontWeight: '500',
  },
  itemDate: {
    color: '#787878',
    fontSize: 12,
    marginTop: 8,
  },
  itemDetail: {
    color: '#787878',
    // fontSize: 12,
    marginTop: 12,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(NotificationScreen);

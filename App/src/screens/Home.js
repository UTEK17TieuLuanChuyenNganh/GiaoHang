import React, { Component } from 'react';
import {
  StyleSheet, View, Text, StatusBar,
  ScrollView, TouchableOpacity, TextInput,
  Dimensions, Image, BackHandler
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeSectionComponents from '../components/HomeSectionComponents';
import Sanpham from '../components/Sanpham';
import store from '../redux/store';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
const { width } = Dimensions.get('window');
const section_banner = require('../assets/section_banner.png');
class HomeScreen extends Component {

  backHandler = null;
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchSubmit: false,
    }
    this.handleBackPress = this.handleBackPress.bind(this);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._subscribe = this.props.navigation.addListener('focus', async () => {
      await this.fetchNewNotification();
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    this.props.navigation.removeListener(this._subscribe);
  }
  async handleBackPress() {
    await this.setState({
      searchSubmit: false
    })
    return true;
  }
  fetchNewNotification() {
    console.log
    return fetch('https://servertlcn.herokuapp.com/thongbao/' + this.props.user.user.id + '/new', { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        store.dispatch({
          type: 'ADDNEWNOTICE',
          payload: responseJson.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  cartclick() {
    this.props.navigation.navigate('Cart', { isClick: false });
  }
  searchClick() {
    this.setState({
      searchSubmit: true
    })
    this.forceUpdate()
  }

  searched() {
    this.setState({
      searchSubmit: false
    })
  }
  renderSearch() {
    const params = {
      navigation: this.props.navigation,
      search: this.state.searchSubmit,
      searchText: this.state.searchText,
    }
    return (
      <View>
        <Text style={styles.sectionTitle}>Tìm kiếm: {this.state.searchText}</Text>
        <Sanpham params={params} />
      </View>
    );
  }
  renderComponent() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Điện thoại - Máy tính bảng</Text>
        <Image source={section_banner} style={styles.sectionImage} />
        {this.state.searchSubmit ?
          this.renderSearch() :
          <HomeSectionComponents navigation={this.props.navigation} />}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => this.setState({ searchSubmit: false, searchText: text })}
              placeholder="Bạn muốn tìm gì?"
              returnKeyType="search"
              onSubmitEditing={() => { this.searchClick() }}
              style={styles.TextInputStyle} />
          </View>
          {/*  */}
          <TouchableOpacity onPress={() => { this.cartclick() }}>
            <View style={styles.cartContainer}>
              <FontAwesome name="shopping-cart" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        {/*  */}
        <View style={styles.bodyContainer}>
          <ScrollView>
            {this.renderComponent()}
          </ScrollView>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#242424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#5a5a5a',
  },
  //
  listItemContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: '#1e88e5',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
  },
  TextInputStyle: {
    backgroundColor: 'white',
    height: 40,
    width: 330,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft: 15,
    fontSize: 18
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //
  bodyContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user,
    notice: state.notice
  };
};

export default connect(mapStateToProps, null)(HomeScreen);

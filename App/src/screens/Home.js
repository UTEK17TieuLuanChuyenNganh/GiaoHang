import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeSectionComponents from '../components/HomeSectionComponents';
class HomeScreen extends Component {

  cartclick() {
    this.props.navigation.navigate('Cart',{isClick:false});
  }
  render() {
    return (
        <View style={styles.screenContainer}>
          <StatusBar barStyle="light-content" />
          {/*  */}
          <View style={styles.headerContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome name="search" size={24} color="#969696" />
              <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
            </View>
            {/*  */}
            <TouchableOpacity onPress={() => { this.cartclick() }}>
              <View style={styles.cartContainer}>
                <FontAwesome name="shopping-cart" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          {/*  */}
          <View style={styles.bodyContainer}>
            <ScrollView>
              <HomeSectionComponents navigation={this.props.navigation}/>
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
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#1e88e5',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
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

export default HomeScreen;

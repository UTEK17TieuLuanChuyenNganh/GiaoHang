import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title
    }
  }
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{this.state.title}</Text>
      </View>
    );
  }
}


export default HeaderComponent;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 25,
    backgroundColor: '#1e88e5',
    justifyContent: 'space-between',
    paddingBottom: 12,  
    alignItems: "center"  
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
});

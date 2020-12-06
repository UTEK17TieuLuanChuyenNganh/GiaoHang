import React, { Component } from 'react';
import { Image,View,StyleSheet } from 'react-native';

class BackgroundBegin extends Component {
  navigateLogin(){
    this.props.navigation.replace('Login');
  }
  componentDidMount(){
    setTimeout(
      function() {
          this.navigateLogin()
      }
      .bind(this),
      5000
    );
  }
  render() {
    return (
      <View style={{backgroundColor:"red", flex:1,justifyContent: "center",alignItems: "center",}}>
          <Image source={require('../../Image/Image/Logo1.png')}
          style={styles.ImageLayout}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  ImageLayout: {
      width: 170,
      height: 170,
      
  },
  
})

export default BackgroundBegin;
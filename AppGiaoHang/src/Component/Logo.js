import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Linking ,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Logo extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: props.title
        }
      }
    render() {
        return (
            <View style={styles.logo}>
                <Icon.Button name='bars'
                    backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
                    onPress={this.props.openDrawerclick}
                    size={25}
                >
                </Icon.Button>
                
                <Text style={styles.headerText}>{this.state.title}</Text>
                <View style={styles.Imageback}>
                    <Image source={require('../../Image/Image/Logo2.png')}
                        style={styles.ImageLayout} />
                        
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo: {
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'red',
        paddingLeft: 10,
        flexDirection:"row"
    },
    ImageLayout: {
        width: 50,
        height: 50,
    },
    Imageback:{
        justifyContent: "center", 
        alignItems: "center",
        flexDirection:"row"
    },
    
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
})
export default Logo;



import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Logo extends Component {
    
    render() {
        return (
            <View style={styles.logo}>
                <Icon.Button name='bars'
                    backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
                    onPress={this.props.openDrawerclick}
                    size={25}
                >
                </Icon.Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'red',
        paddingLeft: 10
    },
})
export default Logo;



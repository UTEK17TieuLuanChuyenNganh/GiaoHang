import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
class Login extends Component {
    loginclick() {
        this.props.navigation.replace('MyDrawer');
    }
    render() {
        return (
            <View style={styles.BackgroundScreens}>
                <View style={{ flex: 1 / 4 }}></View>
                <View style={styles.top}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 10, fontSize: 40 }}>Đăng Nhập</Text>
                        <TextInput style={styles.TextInputstyle} />
                        <TextInput secureTextEntry={true} style={styles.TextInputstyle} />
                        <TouchableOpacity onPress={() => { this.loginclick() }} >
                            <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: 'white' }}>Đăng Nhập</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <Button title="Đăng Nhập" onPress={nav}/> */}
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    BackgroundScreens: {
        flex: 1,
        backgroundColor: 'red'
    },
    TextInputstyle: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize:19,
        
    },
    top: {
        flex: 1,
        backgroundColor: "#EEEBEB",
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        justifyContent: 'flex-end'
    }
})
export default Login;
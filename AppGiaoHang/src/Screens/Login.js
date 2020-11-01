import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {
    isLoading = false;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: "",
            message: {
                wrongInfo: "Sai ten tai khoan hoac mat khau",
                wrongFormat: "Nhap khong dung cu phap"
            }
        }
    }

    loginclick() {
        this.isLoading = true;
        console.log(this.state.username)
        return fetch('https://servertlcn.herokuapp.com/shipper/'+this.state.username+'/username',
             { method: 'GET' })
            .then(async (response) => {
                let data = await response.json()
                if (data.result != "failed") {                    
                   var decryptedPassword = Base64.decode(data.data.NguoiDung.Password);
                    if (this.isLoading && this.state.password.trim() == decryptedPassword) {
                        this.setData(data.data)
                        this.props.navigation.replace('MyDrawer');
                    }
                    else {
                        this.setState({
                            err: data.result
                        })
                    }
                    this.isLoading = false;
                }        
            })
            .catch((error) => {
                console.log(error);
            });
    }
    setData = async (data) => {
        try {
            await AsyncStorage.setItem(
                'user', JSON.stringify(data)
            );
        } catch (error) {
            console.log(error);
        }
    }
   
    render() {
        
        return (
            <View style={styles.BackgroundScreens}>
                <View style={{ flex: 1 / 4 }}></View>
                <View style={styles.top}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ marginBottom: 10, fontSize: 40 }}>Đăng Nhập</Text>
                        {this.state.err == "" ? null :
                            // <Text style={{ marginBottom: 10, fontSize: 20, color: "red" }}>
                            //     {this.state.message.wrongInfo}</Text>
                            Alert.alert(this.state.message.wrongInfo)
                        }
                        <TextInput
                            onChangeText={(text) => this.setState({ username: text.trim() })}
                            style={styles.TextInputstyle}
                        />
                        <TextInput
                            onChangeText={(text) => this.setState({ password: text.trim() })}
                            secureTextEntry={true}
                            style={styles.TextInputstyle}

                        />
                        <TouchableOpacity onPress={() => {this.loginclick() }} >
                            <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 25, color: 'white' }}>Đăng Nhập</Text>
                            </View>
                        </TouchableOpacity>
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
        fontSize: 19,

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
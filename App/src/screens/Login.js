import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';
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
    loginPress() {
        this.isLoading = true;
        fetch('https://servertlcn.herokuapp.com/nguoidung/' + this.state.username + "/username",
            {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result != "failed") {
                    var decryptedPassword = Base64.decode(responseJson.data.Password);
                    if (this.isLoading && this.state.password.trim() == decryptedPassword) {
                        this.setData(responseJson.data)
                        this.props.navigation.navigate("TabHomeVer2");
                    }
                    else {
                        this.setState({
                            err: responseJson.result
                        })
                    }
                    this.isLoading = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    registPress() {
        this.props.navigation.navigate("Register");
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginBottom: 10, fontSize: 40 }}>Đăng Nhập</Text>
                {this.state.err == "" ? null :
                    <Text style={{ marginBottom: 10, fontSize: 20, color: "red" }}>
                        {this.state.message.wrongInfo}</Text>}
                <TextInput
                    onChangeText={(text) => this.setState({ username: text.trim() })}
                    style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                <TextInput
                    onChangeText={(text) => this.setState({ password: text.trim() })}
                    secureTextEntry={true}
                    style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                <TouchableOpacity onPress={() => { this.loginPress() }} >
                    <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: 'white' }}>Đăng Nhập</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.registPress() }} >
                    <Text style={{ fontStyle: "italic", fontSize: 20, color: 'black', margin: 20 }}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default Login;
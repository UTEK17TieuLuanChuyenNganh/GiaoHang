import React, { Component } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';
//redux
import store from '../redux/store';
import { connect } from 'react-redux'
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: "",
            password: "",
        }
    }
    async loginPress() {
        await this.setState({
            isLoading: true
        })
        fetch('https://servertlcn.herokuapp.com/nguoidung/' + this.state.username + "/username",
            {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result != "failed") {
                    var decryptedPassword = Base64.decode(responseJson.data.Password);
                    if (this.state.isLoading && this.state.password.trim() == decryptedPassword) {
                        this.setData(responseJson.data)
                        this.setState({
                            isLoading:false
                        })
                        this.props.navigation.goBack();
                    }
                    else {
                        Alert.alert(
                            'Đăng nhập',
                            'Mật khẩu không chính xác',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => { },
                                    style: 'cancel'
                                },
                            ],
                        );
                        this.setState({
                            isLoading:false
                        })
                    }
                }
                else {
                    Alert.alert(
                        'Đăng nhập',
                        'Không tìm thấy tài khoản',
                        [
                            {
                                text: 'OK',
                                onPress: () => { },
                                style: 'cancel'
                            },
                        ],
                    );
                    this.setState({
                        isLoading:false
                    })
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
            store.dispatch({
                type: 'LOGIN',
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginBottom: 10, fontSize: 40 }}>Đăng Nhập</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ username: text.trim() })}
                    style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                <TextInput
                    onChangeText={(text) => this.setState({ password: text.trim() })}
                    secureTextEntry={true}
                    style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                {this.state.isLoading ?
                    <ActivityIndicator animating={true} size="large" color="#0000ff" /> :
                    <TouchableOpacity onPress={() => { this.loginPress() }} >
                        <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: 'white' }}>Đăng Nhập</Text>
                        </View>
                    </TouchableOpacity>}
                <TouchableOpacity onPress={() => { this.registPress() }} >
                    <Text style={{ fontStyle: "italic", fontSize: 20, color: 'black', margin: 20 }}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default Login;
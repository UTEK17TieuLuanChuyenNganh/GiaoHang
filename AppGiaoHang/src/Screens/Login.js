import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image
} from 'react-native';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import store from '../redux/store';
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

    async loginclick() {
        await this.setState({
            isLoading: true
        })
        return fetch('https://servertlcn.herokuapp.com/shipper/' + this.state.username + "/username",
            {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.result != "failed") {
                    var decryptedPassword = Base64.decode(responseJson.data.NguoiDung.Password);
                    if (this.state.isLoading && this.state.password.trim() == decryptedPassword) {
                        this.setData(responseJson.data)
                        this.addid(responseJson.data.id)
                        this.props.navigation.replace('MyDrawer');
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
                            isLoading: false
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
                        isLoading: false
                    })
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
    addid(data) {
        store.dispatch({
            type: 'ADDUSER',
            payload: data
        })
    }
    render() {

        return (
            <View style={styles.BackgroundScreens}>
                <View style={{ flex: 1 / 4, justifyContent: "center", alignItems: "center", }}>
                    <Image source={require('../../Image/Image/Logo2.png')}
                        style={styles.ImageLayout} />
                </View>
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
                        {this.state.isLoading ?
                            <ActivityIndicator animating={true} size="large" color="#0000ff" /> :
                            <TouchableOpacity onPress={() => { this.loginclick() }} >
                                <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25, color: 'white' }}>Đăng Nhập</Text>
                                </View>
                            </TouchableOpacity>}

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
    },
    ImageLayout: {
        width: 100,
        height: 100,

    },
})
export default Login;
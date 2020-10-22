import React, { Component } from 'react';
import {
    View, ScrollView, TouchableOpacity, Text,
    StyleSheet, TextInput, ActivityIndicator, Alert
} from 'react-native';
import Header from '../components/HeaderComponent';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-community/async-storage';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            HoTen: "",
            SinhNhat: "",
            GioiTinh: "",
            Username: "",
            Password: "",
            ConfirmPassword: "",
            Avatar: "",
            Email: "",
            SDT: "",
        }
    }
    fetchData() {
        if (this.state.Password.trim() != "" && this.state.HoTen != ""
            && this.state.Username != "" && this.state.Password == this.state.ConfirmPassword) {
            let encryptedPassword = Base64.encode(this.state.Password);;
            let data = {
                HoTen: this.state.HoTen,
                SinhNhat: "10/22/2020",
                GioiTinh: this.state.GioiTinh,
                Username: this.state.Username,
                Password: encryptedPassword,
                Avatar: this.state.Avatar,
                Email: this.state.Email,
                SDT: this.state.SDT,
            }
            fetch('https://servertlcn.herokuapp.com/nguoidung',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    Alert.alert(
                        'Đăng Ký',
                        'Thành công!',
                        [
                            {
                                text: 'OK',
                                onPress: () => { this.confirmPress() },

                            },
                        ],
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            Alert.alert(
                'Đăng Ký',
                'Thiếu thông tin!',
                [
                    {
                        text: 'OK',
                        onPress: () => { },

                    },
                ],
            );
        }
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
    confirmPress() {
        this.props.navigation.navigate("Login")
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Header title='Đăng ký' />
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Họ tên:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ HoTen: text })}
                                value={this.state.HoTen}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Sinh nhật:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ SinhNhat: text })}
                                value={this.state.SinhNhat}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Giới tính:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ GioiTinh: text })}
                                value={this.state.GioiTinh}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Username:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ Username: text })}
                                value={this.state.Username}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Password:</Text>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ Password: text })}
                                value={this.state.Password}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={{ fontSize: 20 }}>Confirm{"\n"}Password:</Text>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ ConfirmPassword: text })}
                                value={this.state.ConfirmPassword}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Avatar:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ Avatar: text })}
                                value={this.state.Avatar}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>Email:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ Email: text })}
                                value={this.state.Email}
                                style={styles.TextInputStyle} />
                        </View>
                        <View style={styles.AddressStyle}>
                            <Text style={styles.TextStyle}>SĐT:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ SDT: text })}
                                value={this.state.SDT}
                                style={styles.TextInputStyle} />
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { this.fetchData() }}>
                    <View style={styles.SaveStyle}>
                        <Text style={{ fontSize: 35, color: 'white' }}>Đăng ký</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    Adress: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 10
    },
    AdressTitle: {
        fontSize: 15
    },
    TextInputStyle: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 20,
        fontSize: 17,
        paddingLeft: 10,
        paddingRight: 10
    },
    AddressStyle: {
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    TextStyle: {
        fontSize: 25
    },
    SaveStyle: {
        marginTop: 20,
        height: 60,
        width: 200,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    hintAddress: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    }
})
export default Register;
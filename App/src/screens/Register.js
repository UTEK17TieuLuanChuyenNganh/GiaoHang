import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Header from '../components/HeaderComponent';
import LoadingView from 'react-native-loading-view'
import AsyncStorage from '@react-native-community/async-storage';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            HoTen: "",
            SinhNhat: "",
            GioiTinh: "",
            Username: "",
            Password: "",
            Avatar: "",
            Email: "",
            SDT: "",
        }
    }
    fetchData() {
        this.isLoading = true;
        fetch('https://servertlcn.herokuapp.com/nguoidung',
            {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this.isLoading && responseJson.data.Password == this.state.password) {
                    this.setData(responseJson.data)
                    this.props.navigation.navigate("TabHomeVer2");
                }
                else {
                    this.setState({
                        err: responseJson.result
                    })
                }
                this.isLoading = false;
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
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <ActivityIndicator
                        color='black'
                        size='large' />
                </LoadingView>
            );
        }
        return (
            <View>
                <Header title='Đăng ký' />
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
                            onChangeText={(text) => this.setState({ Password: text })}
                            value={this.state.Password}
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
                    <TouchableOpacity style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { }}>
                        <View style={styles.SaveStyle}>
                            <Text style={{ fontSize: 35, color: 'white' }}>Đăng ký</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    TextStyle: {
        fontSize: 22
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
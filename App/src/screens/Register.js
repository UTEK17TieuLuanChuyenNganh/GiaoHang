import React, { Component } from 'react';
import {
    View, ScrollView, TouchableOpacity, Text,
    StyleSheet, TextInput, ActivityIndicator, Alert, Image
} from 'react-native';
import Header from '../components/HeaderComponent';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
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
            ConfirmPassword: "",
            Avatar: "",
            Email: "",
            SDT: "",
            isVisible: false,
            styleContent: "center"
        }
    }
    regist(data) {
        return fetch('https://servertlcn.herokuapp.com/nguoidung',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then((responseJson) => {
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
                this.setState({
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async fetchData() {
        await this.setState({
            isLoading: true
        })
        if (this.state.Password == this.state.ConfirmPassword) {
            if (this.state.Password.trim() != "" && this.state.HoTen != ""
                && this.state.Username != "") {
                let encryptedPassword = Base64.encode(this.state.Password);;
                let data = {
                    HoTen: this.state.HoTen,
                    SinhNhat: this.state.SinhNhat,
                    GioiTinh: this.state.GioiTinh,
                    Username: this.state.Username,
                    Password: encryptedPassword,
                    Avatar: this.state.Avatar,
                    Email: this.state.Email,
                    SDT: this.state.SDT,
                }
                fetch('https://servertlcn.herokuapp.com/nguoidung/' + this.state.Username + '/username',
                    {
                        method: 'GET',
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.result == "ok") {
                            Alert.alert(
                                'Đăng Ký',
                                'Username đã tồn tại!',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => { },

                                    },
                                ],
                            );
                            this.setState({
                                isLoading: false
                            })
                        }
                        else {
                            this.regist(data)
                        }
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
                this.setState({
                    isLoading: false
                })
            }
        } else {
            Alert.alert(
                'Đăng Ký',
                'Mật khẩu xác nhận không chính xác!',
                [
                    {
                        text: 'OK',
                        onPress: () => { },

                    },
                ],
            );
            this.setState({
                isLoading: false
            })
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
    pickImage() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.data;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    Avatar: source,
                });
            }
        })
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
                            <TouchableOpacity style={{
                                marginBottom: 10, justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onPress={() => {
                                    this.setState({
                                        isVisible: true,
                                        styleContent: 'space-around'
                                    })
                                }}>
                                <View style={{
                                    height: 50,
                                    width: 249,
                                    flexDirection: "row",
                                    backgroundColor: 'white',
                                    justifyContent: this.state.styleContent,
                                    alignItems: 'center',
                                    borderRadius: 30,
                                }}>
                                    <Icon name="calendar" size={24} color="blue" />
                                    <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.SinhNhat}</Text>
                                </View>
                            </TouchableOpacity>
                            {this.state.isVisible ?
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    display="default"
                                    onTouchCancel={() => { this.setState({ displayCalendar: "flex" }) }}
                                    onChange={(event, value) => {

                                        var dt = Moment(value).format("MM-DD-YYYY")
                                        this.setState({
                                            SinhNhat: dt,
                                            isVisible: false
                                        })
                                    }}
                                /> : null}
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
                            {this.state.Avatar == "" ?
                                <TouchableOpacity style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.pickImage() }}>
                                    <View style={styles.selectPhotoStyle}>
                                        <Text style={{ fontSize: 25, color: 'white' }}>Chọn hình ảnh</Text>
                                    </View>
                                </TouchableOpacity> :
                                <Image source={{ uri: `data:image/jpg;base64,${this.state.Avatar}` }} style={styles.itemImage} />}
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
                {this.state.isLoading ?
                    <ActivityIndicator animating={true} size="large" color="#0000ff" /> :
                    <TouchableOpacity style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.fetchData() }}>
                        <View style={styles.SaveStyle}>
                            <Text style={{ fontSize: 35, color: 'white' }}>Đăng ký</Text>
                        </View>
                    </TouchableOpacity>}
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
    itemImage: {
        width: 200,
        height: 75,
        paddingBottom: 10,
        paddingRight: 50
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
    selectPhotoStyle: {
        height: 50,
        width: 249,
        backgroundColor: 'green',
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
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../Component/Logo';
class CusInformation extends Component {
    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    makeCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1234567890}';
        } else {
            phoneNumber = 'telprompt:${1234567890}';
        }

        Linking.openURL(phoneNumber);
    };
    render() {
        return (
            <View style={styles.BackgroundScreens}>
                <Logo openDrawerclick={()=>{this.showmenu()}}/>
                <View style={styles.top}>
                    <View style={styles.ThongTin}>
                        <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                        <Text style={{ fontSize: 20 }}> 0987513566</Text>
                        <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>
                        <Text style={{ fontSize: 15, marginLeft: 4, marginRight: 4 }}> Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => { }} >
                                <View style={styles.Buttonstyle}>
                                    <Text style={{ fontSize: 15, color: 'white' }}>Xác Nhận Giao Hàng</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.makeCall} activeOpacity={0.7} style={styles.touchableButton}>
                                <View style={styles.Buttonstyle}>
                                    <Text style={{ fontSize: 15, color: 'white' }}>Liên Hệ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    ThongTin: {
        flex: 1 / 2.2,
        justifyContent: 'flex-end',
        marginBottom: 10,
        alignItems: 'center'
    },
    map1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',


    },
    logo: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'red',
        paddingLeft: 10
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    Buttonstyle: {
        width: 150,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: -5,
        marginTop: 8
    },
    BackgroundScreens: {
        flex: 1,
        backgroundColor: 'red'
    },
    top: {
        flex: 1,
        backgroundColor: "#EEEBEB",
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})

export default CusInformation;
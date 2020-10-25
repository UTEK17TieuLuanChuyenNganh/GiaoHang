import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Logo from '../Component/Logo';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckInternet from '../Component/CheckInternet';
import Slider from 'react-native-slide-to-unlock';
navigator.geolocation = require('@react-native-community/geolocation');
const adrr1 = '10.889919, 106.775659'
const adrr2 = '10.850114, 106.765102'
const adrr3 = '10.850732, 106.771305'
const adrr4 = '10.857018, 106.756880'
const adrr5 = '10.919504, 106.783242'



class MapScreens extends Component {
    _isMounted = true;
    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    makeCall = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${0987513566}';
        } else {
            phoneNumber = 'telprompt:${0987513566}';
        }
        Linking.openURL(phoneNumber);
    };
    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Access Permission',
                    'message': 'We would like to use your location ' +
                        'so you we track you.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                await navigator.geolocation.getCurrentPosition(
                    (position) => {
                        //Alert.alert('latitiude:  ',position.coords.latitude.toFixed(2));
                    },
                    (error) => console.log(error),
                    { enableHighAccuracy: true, timeout: 10000 }
                );
            }
            else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        this.requestLocationPermission();
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    link1 = `https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4}`
    link2 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1`
    link3 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml`
    getggmap() {
        Linking.openURL(this.link2);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref={ref => { }}
                    source={{ uri: this.link1 }}
                    style={styles.Webview}
                    geolocationEnabled={true}
                />
                <View style={styles.logost}>
                    <Logo openDrawerclick={() => { this.showmenu() }} />
                </View>
                <View style={styles.ThongTin}>
                    <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                    <Text style={{ fontSize: 20 }}> 0987513566</Text>
                    <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>

                </View>
                <View style={styles.buttonaccess}>
                    <Text style={{ fontSize: 15, marginLeft: 2, marginRight: 2 }}> Địa chỉ: 07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                    <View style={styles.direc}>
                        <Slider
                            onEndReached={() => {
                                this.getggmap()
                            }}
                            containerStyle={{
                                backgroundColor: '#E0E1DF',
                                borderRadius: 20,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "80%"
                            }}
                            sliderElement={
                                <View style={{ backgroundColor: 'red', borderRadius: 20 ,margin:2}}>
                                    <Icon
                                        name='directions'
                                        size={50}
                                        color='black'
                                    />
                                </View>
                            }
                        >
                            <Text style={{ fontSize: 30 }}>  {'>>'} Chỉ Đường {'>>'}</Text>
                        </Slider>
                    </View>
                    <View style={styles.control}>
                        <TouchableOpacity onPress={() => { }} >
                            <View style={styles.Buttonstyle}>
                                <Text style={{ fontSize: 15, color: 'white' }}>Xác Nhận Giao Hàng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.makeCall()} activeOpacity={0.7} style={styles.touchableButton}>
                            <View style={styles.Buttonstyle}>
                                <Text style={{ fontSize: 15, color: 'white' }}>Liên Hệ</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <CheckInternet />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    control: {
        justifyContent: "space-around",
        flexDirection: "row"
    },
    noInternet: {
        position: "absolute",
        right: 0,
        left: 0,
        top: 125,
        height: 25,
        backgroundColor: "#FCB0B0",
        alignItems: 'center'
    },
    direc: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        left: 0,
        bottom: 58
    },
    logost: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 50,
    },
    buttonaccess: {
        height: 150,
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "#F4F4F4",
        paddingBottom: 10,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft: 0
    },
    ThongTin: {
        flexDirection: "column",
        backgroundColor: "#F4F4F4",
        position: "absolute",
        left: 0,
        right: 0,
        top: 60,
        height: 90,
        justifyContent: "space-around",
        alignItems: "flex-start",
    },

    logo: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'red',
        paddingLeft: 10
    },

    Buttonstyle: {
        width: 170,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',

    },
    Webview: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    container1: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default MapScreens;
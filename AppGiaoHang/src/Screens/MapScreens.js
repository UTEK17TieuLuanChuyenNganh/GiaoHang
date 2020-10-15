import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking, Platform, ToastAndroid
    , PermissionsAndroid
} from 'react-native';
//import navigator.geolocation from '@react-native-community/geolocation';
import Logo from '../Component/Logo';
import { WebView } from 'react-native-webview';
import { event } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
navigator.geolocation = require('@react-native-community/geolocation');
const adrr1 = '10.889919, 106.775659'
const adrr2 = '10.850114, 106.765102'
const adrr3 = '10.850732, 106.771305'
const adrr4 = '10.857018, 106.756880'
const adrr5 = '10.919504, 106.783242'
const del2 = `
            function getElementByXpath(path) {
                return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            };
            function formatStyle(){ 
                getElementByXpath("//*[@id='app']/div[1]").style.display="none";
                getElementByXpath("//*[@id='app']/div[2]").style.display="none";
                getElementByXpath("//*[@id='app']/div[11]").style.display="none"; 
                getElementByXpath("//*[@id='app']/div[3]").style.transform="translateY(0px)";
                getElementByXpath("//*[@id='app']/div[3]").style.maxWidth="100%";
                getElementByXpath("//*[@id='app']/div[3]").style.maxHeight="100%";
                getElementByXpath("//*[@id='app']/div[4]/div/div/button").style.top="100px";
            };
            formatStyle();
        `;
class MapScreens extends Component {
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
                    { enableHighAccuracy: false, timeout: 10000 }
                );
            }
            else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    formatmap() {
        this.webview.injectJavaScript(del2);
    }


    componentDidMount() {
        this.requestLocationPermission();
        setTimeout(() => {
            this.formatmap();
        }, 5000);

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
                <Logo openDrawerclick={() => { this.showmenu() }} />
                <WebView
                   // originWhitelist={['intent://']}
                    // ref={'Map_Ref'}
                    ref={ref => { this.webview = ref; }}
                    source={{ uri: this.link1 }}
                    style={styles.Webview}
                    geolocationEnabled={true}
                    onMessage={(event) => console.log(event.nativeEvent.data)}
                    scalesPageToFit={true}
                    javaScriptEnabledAndroid={true}
                    javaScriptEnabled={true}
                //injectedJavaScript={del2}
                >
                </WebView>
                <View style={{ alignItems: "space-between" ,paddingRight:5,paddingTop:5}}>
                    <Icon.Button name='directions'
                        onPress={() => this.getggmap()}
                        size={25}
                        
                    />
                </View>
                <View style={styles.ThongTin}>

                    <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                    <Text style={{ fontSize: 20 }}> 0987513566</Text>
                    <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>
                    <Text style={{ fontSize: 15, marginLeft: 4, marginRight: 4 }}> Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { this.formatmap() }} >
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


            </View >
        );
    }
}
const styles = StyleSheet.create({
    ThongTin: {
        height: 140,
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
    Buttonstyle: {
        width: 150,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -5,
        marginTop: 8
    },
    Webview: {
        flex: 1,

    }
})

export default MapScreens;
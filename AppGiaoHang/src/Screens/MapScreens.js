import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking, Platform, ActivityIndicator
    , PermissionsAndroid
} from 'react-native';
//import navigator.geolocation from '@react-native-community/geolocation';
import Logo from '../Component/Logo';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
                    // originWhitelist={['intent://']}
                    ref={ref => { }}
                    source={{ uri: this.link1 }}
                    style={styles.Webview}
                    geolocationEnabled={true}
                />
                <View style={styles.logost}>
                    <Logo openDrawerclick={() => { this.showmenu() }} />
                </View>
                <View style={styles.buttonaccess}>
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
                <View style={styles.ThongTin}>
                    <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                    <Text style={{ fontSize: 20 }}> 0987513566</Text>
                    <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>
                    <Text style={{ fontSize: 15, marginLeft: 4, marginRight: 4 }}> Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                </View>
                <View style={styles.direc}>
                    <Icon.Button name='directions'
                        onPress={() => this.getggmap()}
                        size={25}
                        style={{width:55}}
                        color="white"
                        backgroundColor="#004DFF"
                    />
                </View>
            </View>




        );
    }
}
const styles = StyleSheet.create({
    direc:{
        position: "absolute",
        right: 0,
        bottom: 95,
        height: 50,
        marginRight:5,
    },
    logost: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 50,
    },
    buttonaccess: {
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
        position: "absolute",
        left: 0,
        right: 0,
        top: 60,
        height: 65,
        justifyContent: "space-around",
        alignItems: 'center',

    },
    ThongTin: {
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: "#F4F4F4",
        paddingBottom: 10,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft:5
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
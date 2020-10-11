import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking, Platform, ToastAndroid
    , PermissionsAndroid } from 'react-native';
//import navigator.geolocation from '@react-native-community/geolocation';

import { WebView } from 'react-native-webview';
navigator.geolocation = require('@react-native-community/geolocation');
const adrr1 = '10.889919, 106.775659'
const adrr2 = '10.850114, 106.765102'
const adrr3 = '10.850732, 106.771305'
const adrr4 = '10.857018, 106.756880'
const adrr5 = '10.919504, 106.783242'
class MapScreens extends Component {
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
                    { enableHighAccuracy: false, timeout: 50000 }
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
    }

    link4 = `https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4}`
    link5 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4}`
    render() {
        const del1='document.getElementsByClassName("ml-directions-searchbox ml-multi-waypoint").remove();';
        const del2=`var a=document.getElementById("ml-directions-searchbox"); a.remove();`; 
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    originWhitelist={['intent://']}
                    ref={'Map_Ref'}
                    source={{ uri: this.link4 }}
                    style={styles.Webview}
                    geolocationEnabled={true}
                    onMessage={(event) => console.log(event.nativeEvent.data)}
                    scalesPageToFit={true}
                    javaScriptEnabledAndroid={true}
                    javaScriptEnabled={true}
                    injectJavaScript='var a=document.getElementById("ml-directions-searchbox"); a.remove();'
                    injectJavaScript={()=>{
                       return 'var a=document.getElementById("ml-directions-searchbox"); a.remove();'}
                    }
                    >
                    
                </WebView>
            </View >
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
    Webview: {
        flex: 1,

    }
})

export default MapScreens;
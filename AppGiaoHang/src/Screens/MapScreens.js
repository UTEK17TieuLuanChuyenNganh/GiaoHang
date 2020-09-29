import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking, Platform,ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Market } from 'react-native-maps';
//import navigator.geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
navigator.geolocation = require('@react-native-community/geolocation');

class MapScreens extends Component {
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

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            region: {
                latitude: 10.919355,
                longitude: 106.783319,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width/Dimensions.get('window')
            },
            marginBottom:1
        };
    }

    onChangeValue=initialRegion=>{
        ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)
        this.setState({
            initialRegion
        })
    }

    componentDidMount() {
        this.handleUserLocation();
        setTimeout(()=>this.setState({marginBottom:0}),100)
    }

    handleUserLocation=()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            ///alert(JSON.stringify(pos))
            this.map.animateToRegion({
                ...this.state.initialRegion,
                latitude:pos.coords.latitude,
                longitude:pos.coords.longitude
            })

            this.setState({
                ...this.state.initialRegion,
                latitude:pos.coords.latitude,
                longitude:pos.coords.longitude
            })
        },
            err=>{
                console.log(err);
                alert("Some thing Went wrong! Please select location manually")
            }
        )
    }
    render() {
        console.disableYellowBox=true
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.logo}>
                    <Icon.Button name='bars'
                        backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
                        onPress={this.showmenu}
                        size={25}
                    >
                    </Icon.Button>
                </View>

                <View style={styles.map1}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={[styles.map,{marginBottom: this.state.marginBottom}]}
                        //style={{flex:1,marginBottom:this.state.marginBottom}}
                        initialRegion={this.state.initialRegion}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        onMapReady={()=>{this.setState({marginBottom:0})}}
                        //onRegionChangeComplete={this.onChangeValue}
                        ref={ref=>this.map=ref}
                        >
                        <MapView.Marker
                            coordinate={{
                                "latitude": this.state.region.latitude,
                                "longitude": this.state.region.longitude
                            }}
                            title={"Your Location"}
                            draggable />
                    </MapView>
                </View>

                <View style={styles.ThongTin}>
                    <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                    <Text style={{ fontSize: 20 }}> 0987513566</Text>
                    <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>
                    <Text style={{ fontSize: 15, marginLeft: 4, marginRight: 4 }}> Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                    <View style={{flexDirection:"row"}}>
                    <TouchableOpacity  onPress={()=>{}} >
                    <View style = {styles.Buttonstyle}>
                        <Text style={{fontSize:15, color:'white'}}>Xác Nhận Giao Hàng</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity   onPress={this.makeCall} activeOpacity={0.7} style={styles.touchableButton}>
                    <View style = {styles.Buttonstyle}>
                        <Text style={{fontSize:15, color:'white'}}>Liên Hệ</Text>
                    </View>
                    </TouchableOpacity>
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
    Buttonstyle:{
        width: 150,
        height: 30, 
        borderRadius: 50, 
        backgroundColor: 'blue', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft:20,
        marginRight:20,
        marginBottom:-5,
        marginTop:8
    }
})

export default MapScreens;
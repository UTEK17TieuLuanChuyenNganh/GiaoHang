import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Platform,
    PermissionsAndroid,
    Alert,
    unstable_enableLogBox,
    Image, 
    ImageBackground 
} from 'react-native';
import Logo from '../Component/Logo';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckInternet from '../Component/CheckInternet';
import Slider from 'react-native-slide-to-unlock';
import AsyncStorage from '@react-native-community/async-storage';
import { parse } from '@babel/core';

navigator.geolocation = require('@react-native-community/geolocation');
const adrr1 = '10.889919, 106.775659'
const adrr2 = '10.850114, 106.765102'
const adrr3 = '10.850732, 106.771305'
const adrr4 = '10.857018, 106.756880'
const adrr5 = '10.919504, 106.783242'



class MapScreens extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            chuoiId: '',
            user: [],
            index: 0,
            status: false
        }
    }
    async demo() {
        await this.checkUser()
        await this.fetchData()
        await this.createLinkAddress()
    }
    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    user: data,
                    //isLoading: false
                })
            }
            else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.state.user.id + '/shipper',
            { method: 'GET' })
            .then(async (responseJson) => {
                responseJson = await responseJson.json()
                if (responseJson.data.length != 0) {
                    let data = responseJson.data.Chuoi
                    data = await JSON.parse(data)
                    if (this._isMounted) {
                        this.setState(
                            {
                                isLoading: false,
                                dataSource: data.chuoidonhang,
                                chuoiId: responseJson.data.id,
                                status: true
                            })
                    }
                }
                else {
                    if (this._isMounted) {
                        this.setState(
                            {
                                isLoading: false,
                                status: false
                            })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    makeCall = () => {
        if (this.state.status == true) {
            let phoneNumber = '';
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${' + this.state.dataSource[this.state.index].reciver.sdt + '}';
            } else {
                phoneNumber = 'telprompt:${' + this.state.dataSource[this.state.index].reciver.sdt + '}';
            }
            Linking.openURL(phoneNumber);
        }
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
        this._isMounted = true;
        // this.checkUser();
        // this.fetchData(this.state.user.id)
        this.demo()
        this.requestLocationPermission();
        this.getcurrentlocal()
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    addressOrder = ''
    link = 'https://www.google.com/maps/dir'
    linkDirect = 'https://maps.app.goo.gl/?link=https://www.google.com/maps/dir'
    link1 = `https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4}`
    link2 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1`
    link3 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml`
    getggmap() {
        Linking.openURL(this.linkDirect);
    }
    createLinkAddress() {
        if (this.state.status == true) {
            try {
                for (i = 0; i < this.state.dataSource.length; i++) {
                    this.addressOrder = this.addressOrder + '/' + this.state.dataSource[i].address.KinhDo + ',' + this.state.dataSource[i].address.ViDo
                }
                this.link += this.addressOrder;
                this.linkDirect += this.addressOrder + ',11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1'
                this.setState({
                    isLoading: false
                })
            } catch (error) {
                console.log(error)
            }
        }

    }
    Xacnhan() {
        Alert.alert(
            'Giao Hang',
            'Xac Nhan',
            [
                {
                    text: 'Thanh Cong',
                    onPress: () => { this.PutJson('thanh cong') },

                },
                {
                    text: 'That Bai',
                    onPress: () => { this.PutJson('that bai') },

                },
            ],
        );
    }
    getcurrentlocal(){
        // navigator.geolocation.getCurrentPosition((position)=>{
        //     var lat = parseFloat(position.coords.latitude)
        //     var long = parseFloat(position.coords.longitude)
        //     console.log(lat,long)
        // })
    }
    async PutJson(str) {
        if (this.state.status == true) {
            let temp = { chuoidonhang: this.state.dataSource }
            temp.chuoidonhang[this.state.index].donhang.TinhTrangDon = str
            let a = await JSON.stringify(temp)
            let data = {
                Chuoi: a
            }
            fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.state.chuoiId,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.forceUpdate();
                    console.log(responseJson)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    renderElement() {
        if (this.state.status == true) {
            if (this.state.dataSource.length > 0) {
                return (
                    <View style={styles.ThongTin}>
                        <Text style={{ fontSize: 25 }}>{this.state.dataSource[this.state.index].reciver.name}</Text>
                        <Text style={{ fontSize: 20 }}> {this.state.dataSource[this.state.index].reciver.sdt}</Text>
                        <Text style={{ fontSize: 20 }}> {this.state.dataSource[this.state.index].donhang.TongTien} VND</Text>
                    </View>
                )
            }
        }
        return null;
    }
    renderdiachi() {
        if (this.state.status == true) {
            <Text style={{ fontSize: 15, marginLeft: 2, marginRight: 2 }}> {this.state.dataSource[this.state.index].address.TenDiaChi}</Text>
        }
    }
    
    render() {
        if (this.state.status == true) {
            if (!this.state.isLoading) {
                return (
                    <View style={{ flex: 1 }}>
                        <WebView
                            ref={ref => { }}
                            source={{ uri: this.link }}
                            style={styles.Webview}
                            geolocationEnabled={true}
                        />
                        <View style={styles.logost}>
                            <Logo openDrawerclick={() => { this.showmenu() }} />
                        </View>
                        {this.renderElement()}

                        <View style={styles.buttonaccess}>
                            {this.renderdiachi()}
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
                                        <View style={{ backgroundColor: 'red', borderRadius: 20, margin: 2 }}>
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
                                <TouchableOpacity onPress={() => { this.Xacnhan() }} >
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
        return (
            
            <View style={{ flex: 1 ,justifyContent: "center",alignItems:"center" }}>
                <View style={styles.logost}>
                            <Logo openDrawerclick={() => { this.showmenu() }} />
                </View>
                <Image source={require('../../Image/Image/NotFound.png')} style={styles.circleImageLayout}/>
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
    circleImageLayout: {
        position: "absolute",
        height:300,
        width:300
 
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
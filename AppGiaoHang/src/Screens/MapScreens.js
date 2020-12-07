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
import { connect } from 'react-redux';
import store from '../redux/store';
navigator.geolocation = require('@react-native-community/geolocation');
var adrr1 = '10.889919,106.775659'
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
            chuoiid: 0,
            user: 0,
            order: [],
            index: 0,
            status: false,
            stt: 0,
            beginaddr: "",
            link: 'https://www.google.com/maps/dir/',
            linkDirect: 'https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/'
        }
    }
    async demo() {
        this.setState({
            beginaddr: "",
            link: 'https://www.google.com/maps/dir/',
            linkDirect: 'https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/',
            isLoading: true,
            status: false
        })
        await this.fetchData()
        await this.requestLocationPermission()


    }
    fetchData() {
        if (this.props.order.order.length > 0) {
            this.checkIndex()
            this.setState(
                {
                    isLoading: false,
                    status: true
                })
        }
        else {
            return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.user.user + '/shipper',
                { method: 'GET' })
                .then(async (responseJson) => {
                    responseJson = await responseJson.json()
                    //console.log(responseJson.data )
                    if (this._isMounted) {
                        if (responseJson.data.length > 0) {
                            let data = responseJson.data[0].Chuoi
                            data = await JSON.parse(data)
                            this.setState(
                                {
                                    isLoading: false,
                                    status: true
                                })
                            store.dispatch({
                                type: 'ADDORDER',
                                payload: data.chuoidonhang
                            })
                            store.dispatch({
                                type: 'ADDCHUOI',
                                payload: responseJson.data[0].id
                            })
                            this.checkIndex()
                        }
                        else {
                            this.setState(
                                {
                                    isLoading: true,
                                    status: false
                                })
                        }
                    }
                    else {
                        this.setState(
                            {
                                isLoading: true,
                                status: false
                            })
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    makeCall = () => {
        if (this.state.status == true && !this.state.isLoading && this.props.order.order.length > 0) {
            let phoneNumber = '';
            if (Platform.OS === 'android') {
                phoneNumber = 'tel:${' + this.props.order.order[this.props.stt.stt].reciver.SDT + '}';
            } else {
                phoneNumber = 'telprompt:${' + this.props.order.order[this.props.stt.stt].reciver.SDT + '}';
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
                        this.setState({
                            beginaddr: position.coords.latitude.toFixed(7) + "," + position.coords.longitude.toFixed(7)
                        })
                        this.createLinkAddress()
                    },
                    (error) => console.log(error),
                    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1500 }
                );
            }
            else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    checkIndex() {
        if (this.state.status == true && !this.state.isLoading && this.props.order.order.length > 0) {
            var count = 0
            for (var i = 0; i < this.props.order.order.length; i++) {
                if (this.props.order.order[i].donhang.TinhTrangDon == 'dang giao') {
                    store.dispatch({
                        type: 'ADDSTT',
                        payload: i
                    })
                    break;
                }
                else { count += 1 }
            }
            if (count == this.props.order.order.length) {
                store.dispatch({
                    type: 'ADDSTT',
                    payload: count - 1
                })
                this.setState({
                    isLoading: true,
                    status: false
                })
            }

        }
    }
    componentDidMount() {
        this._isMounted = true;
        this._subscribe = this.props.navigation.addListener('focus', () => {
            this.demo();

        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.props.navigation.removeListener(this._subscribe);
    }

    // link = 'https://www.google.com/maps/dir/'
    // linkDirect = 'https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/'
    link1 = `https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4}`
    link2 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1`
    link3 = `https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/${adrr5}/${adrr1}/${adrr3}/${adrr2}/${adrr4},11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml`
    getggmap() {
        Linking.openURL(this.state.linkDirect);
    }
    createLinkAddress() {
        var addressOrder = ''
        var linktemp = ''
        var linkDirecttemp = ''
        if (this.state.status == true && !this.state.isLoading && this.props.order.order.length > 0) {
            if (this.props.order.order.length < 2) {
                addressOrder += this.state.beginaddr + "/" + this.props.order.order[0].address.ViDo + ',' + this.props.order.order[0].address.KinhDo + "/"
                addressOrder = addressOrder.slice(0, addressOrder.length - 1)
                linktemp = this.state.link + addressOrder;
                linkDirecttemp = this.state.linkDirect + addressOrder //+ ',11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1'
                this.setState({
                    link: linktemp,
                    linkDirect: linkDirecttemp,
                    isLoading: false
                })

            }
            else {
                addressOrder += this.state.beginaddr + "/"
                for (var i = 0; i < this.props.order.order.length; i += 1) {
                    addressOrder = addressOrder + this.props.order.order[i].address.ViDo + ',' + this.props.order.order[i].address.KinhDo + '/'
                }
                addressOrder = addressOrder.slice(0, addressOrder.length - 1)
                linktemp = this.state.link + addressOrder;
                linkDirecttemp = this.state.linkDirect + addressOrder + ',11z/data%3D!4m2!4m1!3e0!11m1!6b1?entry%3Dml&apn=com.google.android.apps.maps&amv=914018424&isi=585027354&ibi=com.google.Maps&ius=comgooglemapsurl&utm_campaign=ml_promo&ct=ml-nav-nopromo-dr-nlu&mt=8&pt=9008&efr=1'
                this.setState({
                    link: linktemp,
                    linkDirect: linkDirecttemp,
                    isLoading: false
                })

            }
        }

    }
    async nextOrder() {
        var so = this.props.stt.stt
        so += 1
        var data = this.props.order.order

        if (this.props.order.order.length - so >= 2) {
            data[so].donhang.TinhTrangDon = 'dang giao'
            data[so + 1].donhang.TinhTrangDon = 'chuan bi giao'
        }
        else if (this.props.order.order.length - so >= 1) {
            data[so].donhang.TinhTrangDon = 'dang giao'
        }
        else {
            so -= 1
        }
        await store.dispatch({
            type: 'ADDSTT',
            payload: so
        })
        await store.dispatch({
            type: 'ADDORDER',
            payload: data
        })

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
    PutOrderStatus(id, str) {
        let data = {
            TinhTrangDon: str
        }
        console.log(id)
        fetch('http://servertlcn.herokuapp.com/donhang/' + id,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async PutJson(str) {
        if (this.state.status == true) {
            let temp = { chuoidonhang: this.props.order.order }
            temp.chuoidonhang[this.props.stt.stt].donhang.TinhTrangDon = str
            var so = this.props.stt.stt
            console.log("so:" + so)
            console.log("lenght:" + this.props.order.order.length)
            if (this.props.order.order.length - so >= 3) {
                temp.chuoidonhang[so + 1].donhang.TinhTrangDon = 'dang giao'
                this.PutOrderStatus(temp.chuoidonhang[so].donhang.id, 'dang giao')
                temp.chuoidonhang[so + 2].donhang.TinhTrangDon = 'chuan bi giao'
                this.PutOrderStatus(temp.chuoidonhang[so + 1].donhang.id, 'chuan bi giao')
            }
            else if (this.props.order.order.length - so >= 2) {
                temp.chuoidonhang[so + 1].donhang.TinhTrangDon = 'dang giao'
                this.PutOrderStatus(temp.chuoidonhang[so + 1].donhang.id, 'dang giao')
            }
            else if (this.props.order.order.length - so >= 1) {

            }
            if (this.props.order.order.length <= so + 1) {
                await store.dispatch({
                    type: 'ADDSTT',
                    payload: so
                })
                this.setState({
                    link: 'https://www.google.com/maps/dir/',
                    linkDirect: 'https://maps.app.goo.gl/?link=https://www.google.com/maps/dir/',
                    status: false,
                    isLoading: true
                })
            }
            else {
                await store.dispatch({
                    type: 'ADDSTT',
                    payload: so+1
                })
            }
            await store.dispatch({
                type: 'ADDORDER',
                payload: temp.chuoidonhang
            })

            let a = await JSON.stringify(temp)
            let data = {
                Chuoi: a,
                ShipperId: this.props.user.user,
                isShipped: false
            }
            fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.chuoiid.chuoiid,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.forceUpdate();
                })
                .catch((error) => {
                    console.log(error);
                });
            this.PutOrderStatus(temp.chuoidonhang[so].donhang.id, 'thanh cong')

        }
    }
    renderElement() {
        if (this.state.status == true && !this.state.isLoading && this.props.order.order.length > 0) {
            if (this.props.order.order.length > 0) {
                return (
                    <View style={styles.ThongTin}>
                        <Text style={{ fontSize: 25 }}>{this.props.order.order[this.props.stt.stt].reciver.name}</Text>
                        <Text style={{ fontSize: 20 }}> {this.props.order.order[this.props.stt.stt].reciver.SDT}</Text>
                        <Text style={{ fontSize: 20 }}> {this.props.order.order[this.props.stt.stt].donhang.TongTien} VND</Text>
                    </View>
                )
            }
        }
        return null;
    }

    renderdiachi() {
        if (this.state.status == true && !this.state.isLoading && this.props.order.order.length > 0) {
            return (

                <Text style={{ fontSize: 15, marginLeft: 2, marginRight: 2 }}> {this.props.order.order[this.props.stt.stt].address.TenDiaChi}</Text>
            )

        }
    }

    render() {
        if (this.state.status == true) {
            if (this.state.isLoading == false) {
                return (
                    <View style={{ flex: 1 }}>
                        <WebView
                            ref={ref => { }}
                            source={{ uri: this.state.link }}
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
        else {
            return (

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.logost}>
                        <Logo openDrawerclick={() => { this.showmenu() }} title="Bản Đồ" />
                    </View>
                    <Image source={require('../../Image/Image/NotFound.png')} style={styles.circleImageLayout} />
                </View>
            );
        }
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
        height: 160,
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
        height: 300,
        width: 300

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

const mapStateToProps = (state) => {
    return {
        order: state.order,
        chuoiid: state.chuoiid,
        user: state.user,
        stt: state.stt
    };
};

export default connect(mapStateToProps, null)(MapScreens);
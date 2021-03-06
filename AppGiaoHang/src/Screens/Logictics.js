import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import MapScreens from './MapScreens';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';
import { connect } from 'react-redux';
import store from '../redux/store';
import Logo from '../Component/Logo';
class Logictics extends Component {
    _isMounted = true;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            user: [],
            soluong: 0,
            order: []
        }
    }


    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    fetchData() {
        //Kiem tra cai redux o day    
        if (this.props.order.order.length > 0) {
            this.setState(
                {
                    isLoading: false,
                    //dataSource: this.props.order.order,
                })
        }
        else {
            console.log(this.props.user.user)
            return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.user.user + '/shipper',
                { method: 'GET' })
                .then(async (responseJson) => {
                    responseJson = await responseJson.json()
                    if (this._isMounted) {
                        if (responseJson.data.length > 0) {
                            let data = responseJson.data[0].Chuoi
                            data = await JSON.parse(data)
                            this.setState(
                                {
                                    isLoading: false,
                                    //dataSource: data.chuoidonhang,
                                    soluong: responseJson.data[0].SoLuong
                                })
                            store.dispatch({
                                type: 'ADDORDER',
                                payload: data.chuoidonhang
                            })
                        }
                        else {
                            this.setState(
                                {
                                    isLoading: false,
                                })
                        }
                    }
                    else {
                        this.setState(
                            {
                                isLoading: false,
                            })
                    }


                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    renderSoLuong() {
        return (
            <View style={styles.ViewSoLuong}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{this.props.order.order.length}</Text>

            </View>
        )
    }
    routeIcon(str) {
        switch (str) {
            case 'thanh cong': return (<Icon name="check-circle" size={30} color="green" />)
            case 'that bai': return (<Icon name="times-circle" size={30} color="red" />)
            case 'dang giao': return (<Icon name="truck" size={30} color="#581BB2" />)
            case 'chuan bi giao': return (<Icon name="angle-double-right" size={30} color="blue" />)
            default: return null
        }
    }
    renderElement() {
        //isLoading day nay
        if (this.props.order.order.length > 0 && !this.state.isLoading) {
            return (
                <ScrollView>
                    {
                        this.props.order.order.map((e, id) => (
                            <View key={id.toString()}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.detailaccount}>{e.reciver.name}</Text>
                                    <Text style={styles.detailaccount1}>{e.address.TenDiaChi}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <Text style={styles.detailaccount1}>{e.donhang.TongTien}</Text>
                                        {this.routeIcon(e.donhang.TinhTrangDon)}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))

                    }
                </ScrollView>
            )
        }
        return null
    }

    render() {

        if (this.state.isLoading == true) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={70} color="red" />
                </View>
            )
        }
        return (
            <View style={styles.BackgroundScreens}>
                <Logo openDrawerclick={() => { this.showmenu() }} title="Chuỗi Đơn Hàng" />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>

                        {this.renderSoLuong()}
                        {this.renderElement()}
                        {/* <View style={styles.LabelIndfor}>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                                <Icon name="check-circle" size={30} color="green" />
                            </View>

                            <Icon name="times-circle" size={30} color="red" />
                            <Icon name="truck" size={30} color="#581BB2" />
                            <Icon name="angle-double-right" size={30} color="blue" />
                        </View> */}
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        //backgroundColor: 'red',
        padding: 10,
        flexDirection: "row",

    },
    detailaccount: {
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',
        borderTopColor: 'black',
        borderTopWidth: 1

    },
    detailaccount1: {
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',

    },
    LabelIndfor: {
        //backgroundColor: 'red',
        marginLeft: 10,
        marginRight: 10,
        flex: 1 / 2,

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
    ViewSoLuong: {
        flexDirection: "row",
        marginTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        borderBottomWidth: 3
    },
    container: {
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
        user: state.user
    };
};

export default connect(mapStateToProps, null)(Logictics);
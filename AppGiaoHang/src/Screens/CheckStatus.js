import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../Component/Logo';
import { connect } from 'react-redux';
import store from '../redux/store';

class CheckStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: [],
            _isHoanTat: false
        }
    }
    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    isTiepNhan() {
        if (this.props.order.order.length > 0)
            return (<Icon name="check-circle"
                size={30}
                color="green"
                style={{ margin: 13 }} />)
        else
            return (<Icon name="times-circle"
                size={30}
                color="red"
                style={{ margin: 13 }} />)
    }
    DaHoanTat() {
        if (this.props.stt.stt == this.props.order.order.length - 1) {
            this.setState({
                _isHoanTat: true
            })
        }
    }
    CheckHoanTat() {
        if (this.props.stt.stt == this.props.order.order.length - 1) {
            this.PutJson()
            this.setState({
                _isHoanTat: false
            })
            Alert.alert("Xác Nhận Thành Công")
        }
        else Alert.alert("Đảm bảo rằng bạn đã giao hết đơn")
    }
    isHoanTat() {
        if (this.state._isHoanTat) {
            return (<Icon name="check-circle"
                size={30}
                color="green"
                style={{ margin: 13 }} />)
        }
        else
            return (<Icon name="times-circle"
                size={30}
                color="red"
                style={{ margin: 13 }} />)
    }
    componentDidMount() {
        this._isMounted = true;
        this._subscribe = this.props.navigation.addListener('focus', () => {
            this.fetchData()
            this.DaHoanTat()
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.props.navigation.removeListener(this._subscribe);
    }
    async PutJson() {
        let data = {
            isShipped: true
        }
        fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.chuoiid.chuoiid,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.forceUpdate();
                store.dispatch({
                    type: 'CLEARORDER',
                })
                store.dispatch({
                    type: 'CLEARCHUOI',
                })
                store.dispatch({
                    type: 'CLEARSTT',
                })
            })
            .catch((error) => {
                console.log(error);
            });


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
            return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.user.user + '/shipper',
                { method: 'GET' })
                .then(async (responseJson) => {
                    responseJson = await responseJson.json()
                    if (responseJson.result != "failed") {
                        let data = responseJson.data.Chuoi
                        data = await JSON.parse(data)
                        if (this._isMounted) {
                            this.setState(
                                {
                                    isLoading: false,
                                    //dataSource: data.chuoidonhang,
                                    soluong: responseJson.data.SoLuong
                                })
                            store.dispatch({
                                type: 'ADDORDER',
                                payload: data.chuoidonhang
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

    render() {
        return (
            <View style={styles.BackgroundScreens}>
                <Logo openDrawerclick={() => { this.showmenu() }} title="Tình Trạng Giao Hàng" />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <View>
                            <View style={styles.BoxCheck}>
                                {/* {this.props.order.order.length>0?
                                <Text style={styles.detailaccount}>{this.props.order.order[0].address.TenDiaChi}</Text>: */}
                                <Text style={styles.detailaccount}>Tiếp nhận chuỗi</Text>
                                {this.isTiepNhan()}
                            </View>
                            <View style={styles.BoxCheck}>
                                <Text style={styles.detailaccount}>Đang Thực Hiện</Text>
                                {this.isTiepNhan()}
                            </View>
                            <View style={styles.BoxCheck}>
                                <Text style={styles.detailaccount}>Hoàn Tất</Text>
                                {this.isHoanTat()}
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} onPress={() => { this.CheckHoanTat() }}>
                            <View style={styles.Buttonstyle}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Xác Nhận Hoàn Tắt</Text>
                                <Icon name="angle-double-right" size={25} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    detailaccount: {
        fontSize: 17,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    BoxCheck: {
        justifyContent: 'space-between',
        flexDirection: "row",
        margin: 5
    },
    Buttonstyle: {
        width: 250,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row"
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
    }
})

const mapStateToProps = (state) => {
    return {
        order: state.order,
        stt: state.stt,
        user: state.user,
        chuoiid: state.chuoiid
    };
};

export default connect(mapStateToProps, null)(CheckStatus);
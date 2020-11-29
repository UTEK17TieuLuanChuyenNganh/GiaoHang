import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../Component/Logo';
import { connect } from 'react-redux';
import store from '../redux/store';
class CheckStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: []
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
    
    componentDidMount() {
        this.fetchData()
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
            return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.state.user.id + '/shipper',
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
                <Logo openDrawerclick={() => { this.showmenu() }} />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <View>
                            <View style={styles.BoxCheck}>
                                {/* {this.props.order.order.length>0?
                                <Text style={styles.detailaccount}>{this.props.order.order[0].address.TenDiaChi}</Text>: */}
                                <Text style={styles.detailaccount}>Tiếp nhận chuỗi:</Text>
                                {this.isTiepNhan()}
                            </View>
                            <View style={styles.BoxCheck}>
                                <Text style={styles.detailaccount}>Đang Thực Hiện</Text>
                                <Icon name="check-circle"
                                    size={30}
                                    color="green"
                                    style={{ margin: 13 }} />
                            </View>
                            <View style={styles.BoxCheck}>
                                <Text style={styles.detailaccount}>Hoàn Tất</Text>
                                <Icon name="times-circle"
                                    size={30}
                                    color="red"
                                    style={{ margin: 13 }} />
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <View style={styles.Buttonstyle}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Xác Nhận</Text>
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
        width: 200,
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
        order: state.order
    };
};

export default connect(mapStateToProps, null)(CheckStatus);
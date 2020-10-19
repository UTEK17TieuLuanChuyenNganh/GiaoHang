import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Header from '../components/HeaderComponent';
import LoadingView from 'react-native-loading-view'
class DSSanphamdamua extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            user: props.route.params.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/dssanpham/' + this.state.user.id + '/nguoidung', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    renderDonHang() {
        return (
            <ScrollView>
                {this.state.dataSource.map((e, id) => (
                    <View style={{ flex: 1 }}>
                        <View style={styles.top}>
                            <View style={styles.ViewSoLuong}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Mã đơn hàng:  </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{e.DonHang.id} </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>/ Số Lượng:  </Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{e.listSanpham.length}</Text>
                            </View>
                            {this.renderListSanPham(e)}
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    }
    renderListSanPham(element) {
        return (
            <ScrollView>
                {element.listSanpham.map((e, id) => (
                    <View
                        style={{
                            flexDirection: "row",
                            borderTopColor: 'black',
                            borderTopWidth: 1,
                            marginLeft: 10,
                        }}
                        key={id.toString()}>
                        <View style={styles.LabelIndfor}>
                            <Text style={styles.detailaccount}>Người mua: {this.state.user.HoTen}</Text>
                            <Text style={styles.detailaccount1}>Tên sản phẩm: {e.SanPham.TenSanPham}</Text>
                            <Text style={styles.detailaccount1}>Số lượng: {e.SoLuong}</Text>
                            <Text style={styles.detailaccount1}>Giá: {e.SanPham.Gia}</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.detailaccount1}>Tổng tiền: {e.SoLuong * e.SanPham.Gia}VND</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: "column" }}>
                            <Image source={{ uri: `data:image/jpg;base64,${e.SanPham.Hinh}` }} style={styles.itemImage} />
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.detailaccount1} >Tình trạng: </Text>
                                <Icon name="check-circle" size={30} color="green" />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    }
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <Text>Loading...!</Text>
                </LoadingView>
            );
        }
        return (
            <View style={styles.BackgroundScreens}>
                <Header title="Sản phẩm đã mua" />
                {this.renderDonHang()}
                <Icon name="times-circle" size={30} color="red" />
                <Icon name="truck" size={30} color="#581BB2" />
                <Icon name="angle-double-right" size={30} color="blue" />
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

        backgroundColor: 'white'
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
    itemImage: {
        marginTop: 10,
        width: 140,
        height: 120,
    },
})
export default DSSanphamdamua;
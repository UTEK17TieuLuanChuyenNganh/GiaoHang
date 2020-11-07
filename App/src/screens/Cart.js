import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    BackHandler, StyleSheet, Image, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import DiaChiUocLuong from './DiaChiUocLuong';

import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
class Cart extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            address: [],
            dataSource: [],
            user: [],
            isClick: props.isClick,
            totalPrice: 0,
            dataPayment: [],
            dataOrder: [],
            dataListItems: []
        };
        this.handleBackPress = this.handleBackPress.bind(this);
    }
    //Event Click    
    handleBackPress() {
        this.props.navigation.goBack();
        return true;
    }
    async ClickDiaChi() {
        if (this.props.user.id) {
            this.setState({
                isClick: !this.state.isClick
            })
            await this.importData()
        }
        else {
            Alert.alert(
                'Tài khoản',
                'Bạn chưa đăng nhập',
                [
                    {
                        text: 'OK',
                        onPress: () => { },
                        style: 'cancel'
                    },
                ],
            );
        }
    }
    diachi() {
        if (this.state.isClick)
            return (
                <DiaChiUocLuong
                    navigation={this.props.navigation}
                    close={() => { this.ClickDiaChi() }} />
            );
        else
            return null
    }

    //Come to new Screen
    showDetailClick(id) {
        this.props.navigation.navigate('ProductDetail', { id });
    }

    //Load Data
    componentDidMount() {
        this._isMounted = true;
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this._subscribe = this.props.navigation.addListener('focus', () => {
            this.importData();
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        //this._subscribe();
        this.props.navigation.removeListener(this._subscribe);
    }
    importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys)
            let data = [];
            let currentUser = [];
            let chosedAddress = []
            let total = 0;
            stores.map((result, i, store) => {
                if (store[i][0] != "user" && store[i][0] != "address") {
                    let value = JSON.parse(store[i][1]);
                    data.push(value);
                    total += parseFloat(value.TotalPrice);
                }
                else if (store[i][0] == "address") {
                    let value = JSON.parse(store[i][1])
                    chosedAddress = value
                }
                else {
                    let value = JSON.parse(store[i][1])
                    currentUser = value;
                }
            });
            this.setState({
                dataSource: data,
                total: total,
                user: currentUser,
                address: chosedAddress,
                isLoading: false
            })
        } catch (error) {
            console.error(error)
        }
    }

    //Payment
    thanhtoan = async () => {
        let items = []
        let listitems = []
        const promises = this.state.dataSource.map(async (e) => {
            let quantity = 0;
            await AsyncStorage.getItem('dataCart' + e.id.toString())
                .then(data => {
                    data = JSON.parse(data)
                    quantity = data.Quantity
                })
            let value = {
                name: e.TenSanPham,
                price: e.Gia,
                currency: "USD",
                quantity: quantity
            }
            let valueListItem = {
                SanPhamId: e.id,
                SoLuong: quantity,
                DonHangId: null
            }
            items.push(value)
            listitems.push(valueListItem)
        })
        const results = await Promise.all(promises)
        let shippingCost = 100
        dataPayment = {
            reciver: this.props.user.HoTen,
            address: this.state.address.TenDiaChi,
            shipping: shippingCost,
            items: items
        }
        dataOrder = {
            NgayDatHang: Date.now(),
            TienVanChuyen: shippingCost,
            TongTien: shippingCost + this.state.total,
            GhiChu: "",
            DanhGia: "",
            NguoiDungId: this.props.user.id,
            DiaChiId: this.state.address.id
        }
        dataListItems = listitems;
        this.setState({
            dataPayment: dataPayment,
            dataOrder: dataOrder,
            dataListItems: dataListItems,
            isLoading: false
        })
    }

    async thanhtoanImplement() {
        if (this.state.dataSource.length > 0) {
            await this.thanhtoan();
            if (this.state.dataPayment.items) {
                this.props.navigation.navigate("Payment", { dataPayment: this.state.dataPayment, dataOrder: this.state.dataOrder, dataListItems: this.state.dataListItems });
            }
            else {
                console.log(this.state.dataPayment)
            }
        }
    }
    thanhtoanPress() {
        if (this.props.user.id) {
            if (this.state.address.TenDiaChi) {
                Alert.alert(
                    'Thanh toán',
                    'Xác nhận thanh toán ?',
                    [
                        {
                            text: 'Hủy',
                            onPress: () => { },
                            style: 'cancel'
                        },
                        {
                            text: 'Xác nhận',
                            onPress: () => { this.thanhtoanImplement() },

                        },
                    ],
                );
            }
            else {
                Alert.alert(
                    'Địa chỉ',
                    'Bạn chưa chọn địa chỉ giao hàng',
                    [
                        {
                            text: 'OK',
                            onPress: () => { },
                            style: 'cancel'
                        },
                    ],
                );
            }
        }
        else {
            Alert.alert(
                'Tài khoản',
                'Bạn chưa đăng nhập',
                [
                    {
                        text: 'OK',
                        onPress: () => { },
                        style: 'cancel'
                    },
                ],
            );

        }
    }
    //Change Cart Data
    removeFromCart = async (id) => {
        try {
            await AsyncStorage.removeItem('dataCart' + id.toString());
            this.importData();
        } catch (error) {
            console.error(error)
        }
    }
    increaseQuantity = async (id) => {
        await AsyncStorage.getItem('dataCart' + id.toString())
            .then(data => {
                data = JSON.parse(data);
                data.Quantity++;
                data.TotalPrice = data.Gia * data.Quantity
                //save the value to AsyncStorage again
                AsyncStorage.setItem('dataCart' + id.toString(), JSON.stringify(data));

            }).done();
        this.importData();
    }
    decreaseQuantity = async (id) => {
        await AsyncStorage.getItem('dataCart' + id.toString())
            .then(data => {
                data = JSON.parse(data);
                if (data.Quantity > 0) {
                    data.Quantity--;
                    data.TotalPrice = data.Gia * data.Quantity
                }
                //save the value to AsyncStorage again
                AsyncStorage.setItem('dataCart' + id.toString(), JSON.stringify(data));

            }).done();
        this.importData();
    }

    //Render Screen
    renderAddress() {
        if (this.state.address.TenDiaChi) {
            return (
                <TouchableOpacity onPress={() => { }}
                    style={{ padding: 5, backgroundColor: '#EAEAEA', height: 50 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={styles.checkoutTitle}>Địa chỉ giao hàng: {this.state.address.TenDiaChi}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }
    rederELement() {
        if (this.state.dataSource.length > 0) {
            let total = 0;
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            this.state.dataSource.map((e, id) => (
                                <View key={id.toString()} style={styles.product} >
                                    <Image source={{ uri: `data:image/jpg;base64,${e.Hinh}` }} style={styles.itemImage} />
                                    <View style={styles.mainRight}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={styles.txtName}>{e.TenSanPham}</Text>
                                            <TouchableOpacity onPress={() => { this.removeFromCart(e.id) }}>
                                                <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={styles.txtPrice}>Giá/1: {e.Gia} VND</Text>
                                            <Text style={styles.txtPrice}>Tổng: {e.TotalPrice} VND</Text>
                                        </View>
                                        <View style={styles.productController}>
                                            <View style={styles.numberOfProduct}>
                                                <TouchableOpacity onPress={() => { this.decreaseQuantity(e.id) }}>
                                                    <Icon name="minus" />
                                                </TouchableOpacity>
                                                <Text style={styles.txtQuantity}>{e.Quantity}</Text>
                                                <TouchableOpacity onPress={() => { this.increaseQuantity(e.id) }}>
                                                    <Icon name="plus" />
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.showDetailContainer}
                                                onPress={() => { this.showDetailClick(e.id) }}
                                            >
                                                <Text style={styles.txtShowDetail} >SHOW DETAILS</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </ScrollView >
                    <View >
                        <TouchableOpacity onPress={() => { this.ClickDiaChi() }}
                            style={{ padding: 5, backgroundColor: '#EAEAEA', height: 35 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                                <Text style={styles.checkoutTitle}>Chọn Địa Chỉ</Text>
                                <Icon name={this.state.isClick ? "chevron-down" : "chevron-up"} size={20} />
                            </View>
                        </TouchableOpacity>
                        {this.renderAddress()}
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={styles.TotalPrice}>
                                <Text style={styles.checkoutTitle}> Tổng cộng: {this.state.total} VND</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.thanhtoanPress() }} >
                                <View style={styles.checkoutButton}>
                                    <Text style={styles.checkoutTitle}>Thanh Toán</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            );
        }
        return null;
    }
    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator animating={true} size="large" color="#0000ff" />
            );
        }
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => { this.CloseAdress() }}>
                    <HeaderComponent title='Giỏ Hàng' />
                </TouchableOpacity>
                {this.rederELement()}
                {this.diachi()}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    itemImage: {
        width: 100,
        height: 120,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    TotalPrice: {
        flex: 1,
        backgroundColor: "#EAEAEA",
        width: 200,
        height: 50,
        justifyContent: 'center'
    },
    checkoutButton: {
        flex: 1,
        backgroundColor: "#70F1F8",
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        marginRight: 10
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },

    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtQuantity: {
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(Cart);



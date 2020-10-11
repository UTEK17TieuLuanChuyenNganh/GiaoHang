import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    Dimensions, StyleSheet, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import DiaChiUocLuong from './DiaChiUocLuong';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Cart extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            refresh: false,
            dataSource: [],
            isClick: false,
            totalPrice:0,
        };
    }
    //Event Click
    ClickDiaChi() {
        this.setState({
            isClick: !this.state.isClick
        })
    }
    diachi() {
        if (this.state.isClick)
            return (
                <DiaChiUocLuong navigation={this.props.navigation} />
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
        if (this._isMounted) {
            this.importData();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys)
            let data = [];
            let total = 0;
            stores.map((result, i, store) => {
                let value = JSON.parse(store[i][1]);
                data.push(value);                
                total += parseFloat(value.TotalPrice);
            });
            this.setState({
                dataSource: data,
                total: total
            })
        } catch (error) {
            console.error(error)
        }
    }

    //Change Cart Data
    clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys));
        this.setState({
            dataSource: []
        })
    }
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
                data.TotalPrice= data.Gia*data.Quantity
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
                    data.TotalPrice= data.Gia*data.Quantity
                }
                //save the value to AsyncStorage again
                AsyncStorage.setItem('dataCart' + id.toString(), JSON.stringify(data));

            }).done();
        this.importData();
    }
    //Render Screen
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
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={styles.TotalPrice}>
                                <Text style={styles.checkoutTitle}> Tổng cộng: {this.state.total} VND</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.clearAllData() }} >
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

export default Cart;

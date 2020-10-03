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
            isClick: false
        };
    }
    adressclick() {
        this.props.navigation.navigate('NewAddress');
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.importData();
        }
    }
    componentWillUnmount() {
        this.clearAllData();
    }
    importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys)
            let data = [];

            stores.map((result, i, store) => {
                let value = JSON.parse(store[i][1]);
                data.push(value);
            });
            this.setState({
                dataSource: data
            })
        } catch (error) {
            console.error(error)
        }
    }
    clearAllData() {
        // AsyncStorage.getAllKeys()
        //     .then(keys => AsyncStorage.multiRemove(keys))
    }

    ClickDiaChi() {
        this.setState({
            isClick: true
        })

    }
    CloseAdress() {
        this.setState({
            isClick: false
        })
    }
    rederELement() {
        if (this.state.dataSource.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {

                            this.state.dataSource.map((e, id) => (
                                <TouchableOpacity onPress={() => { this.CloseAdress() }}>
                                    <View key={id.toString()} style={styles.product} >
                                        <Image source={{ uri: `data:image/jpg;base64,${e.Hinh}` }} style={styles.itemImage} />
                                        <View style={styles.mainRight}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Text style={styles.txtName}>{e.TenSanPham}</Text>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <Text style={styles.txtPrice}>{e.Gia} VND</Text>
                                            </View>
                                            <View style={styles.productController}>
                                                <View style={styles.numberOfProduct}>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <Text>+</Text>
                                                    </TouchableOpacity>
                                                    <Text>5</Text>
                                                    <TouchableOpacity onPress={() => { }}>
                                                        <Text>-</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.showDetailContainer}
                                                    onPress={() => { }}
                                                >
                                                    <Text style={styles.txtShowDetail} >SHOW DETAILS</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}


                    </ScrollView >
                    <View >
                        <TouchableOpacity onPress={() => { this.ClickDiaChi() }}
                            style={{ padding: 5, backgroundColor: '#EAEAEA' ,height:35}}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                                <Text style={styles.checkoutTitle}>Chọn Địa Chỉ</Text>
                                <Icon name="chevron-down" size={20} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={styles.TotalPrice}>
                                <Text style={styles.checkoutTitle}> Tổng</Text>
                            </View>
                            <TouchableOpacity onPress={() => { }} >
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

    diachi() {
        if (this.state.isClick)
            return (
                <DiaChiUocLuong clickaddress={() => { this.adressclick() }} />
            );
        else
            return null
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
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
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

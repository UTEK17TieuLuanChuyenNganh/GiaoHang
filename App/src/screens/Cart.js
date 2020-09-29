import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView,
    Dimensions, StyleSheet, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderComponent from '../components/HeaderComponent';

class Cart extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refresh: false,
            dataSource: []
        };
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
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
    }
    rederELement() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        if (this.state.dataSource.length > 0) {
            return (
                <View>
                    <ScrollView style={main}>
                        {
                            this.state.dataSource.map((e, id) => (
                                <View key={id.toString()} style={product} >
                                    <Image source={{ uri: `data:image/jpg;base64,${e.Hinh}` }} style={styles.itemImage} />
                                    <View style={mainRight}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text style={txtName}>{e.TenSanPham}</Text>
                                            <TouchableOpacity onPress={() => { }}>
                                                <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={txtPrice}>{e.Gia} VND</Text>
                                        </View>
                                        <View style={productController}>
                                            <View style={numberOfProduct}>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <Text>+</Text>
                                                </TouchableOpacity>
                                                <Text>5</Text>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <Text>-</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity
                                                style={showDetailContainer}
                                                onPress={() => { }}
                                            >
                                                <Text style={txtShowDetail} >SHOW DETAILS</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            ))}
                    </ScrollView>
                    <TouchableOpacity style={checkoutButton} onPress={() => { }}>
                        <Text style={checkoutTitle}>TOTAL 0$ CHECKOUT NOW</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            product, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        return (
            <View style={wrapper}>
                <HeaderComponent title='Giỏ Hàng' />
                { this.rederELement()}

            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    itemImage: {
        width: 100,
        height: 120,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: 'darkviolet',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
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
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
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

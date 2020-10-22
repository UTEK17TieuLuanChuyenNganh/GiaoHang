import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderComponent from '../components/HeaderComponent';
class ProductDetail extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            navigation: props.navigation,
            route: props.route
        };
    }
    componentDidMount() {
        this._isMounted = true;
        return fetch('https://servertlcn.herokuapp.com/sanpham/' + this.state.route.params.id, { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    addtoCart = async (data) => {
        try {
            data.Quantity = 1;
            data.TotalPrice = data.Gia;
            await AsyncStorage.setItem(
                'dataCart' + data.id.toString(), JSON.stringify(data)
            );
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const {
            wrapper, cardStyle, header,
            footer, imageContainer, textBlack,
            textSmoke, textHighlight, textMain, titleContainer,
            descContainer, descStyle, txtMaterial, txtColor
        } = styles;
        if (this.state.isLoading) {
            return (
                <ActivityIndicator animating={true} size="large" color="#0000ff" />
            );
        }
        return (
            <View style={wrapper}>
                <HeaderComponent title="Chi tiết sản phẩm" />
                <View style={cardStyle}>
                    <View style={header}>
                        <TouchableOpacity
                            onPress={() => { this.addtoCart(this.state.dataSource) }}>
                            <FontAwesome name="cart-plus" size={50} color="#274FEA" />
                        </TouchableOpacity>
                    </View>
                    <View style={imageContainer}>
                        <ScrollView style={{ flexDirection: 'row', padding: 10, height: swiperHeight }} horizontal >
                            <Image source={{ uri: `data:image/jpg;base64,${this.state.dataSource.Hinh}` }} style={styles.itemImage} />
                        </ScrollView>
                    </View>
                    <View style={footer}>
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={textBlack}>{this.state.dataSource.TenSanPham}</Text>
                                <Text style={textHighlight}> / </Text>
                                <Text style={textSmoke}>{this.state.dataSource.Gia} VND</Text>
                            </Text>
                        </View>
                        <View style={descContainer}>
                            <Text style={descStyle}>Mô tả: {this.state.dataSource.MoTa}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                                <Text style={txtMaterial}>Loại sản phẩm: {this.state.dataSource.LoaiSanPhamId}</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={txtColor}>...</Text>
                                    <View style={{ height: 15, width: 15, backgroundColor: "white", borderRadius: 15, marginLeft: 10 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default ProductDetail;

const { width } = Dimensions.get('window');
const swiperWidth = (width / 1.8) - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: "row-reverse",
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    footer: {
        flex: 6
    },
    imageContainer: {
        flex: 6,
        alignItems: 'center',
        marginHorizontal: 10
    },
    itemImage: {
        width: 300,
        height: 200,
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10
    },
    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46'
    },
    textSmoke: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#9A9A9A'
    },
    textHighlight: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: '#7D59C8'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    }
});
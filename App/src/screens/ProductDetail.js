import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, Dimensions,
    ScrollView, TouchableOpacity, ActivityIndicator,
    BackHandler
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
        this.handleBackPress = this.handleBackPress.bind(this);
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress() {
        this.state.navigation.goBack();
        return true;
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
                <View style={wrapper}>
                    <HeaderComponent title="Chi tiết sản phẩm" />
                    <View style={{ marginTop: 200, flexDirection: "column", alignItems: "center" }}>
                        <ActivityIndicator size={70} color="#0000ff" />
                        <Text style={{ fontSize: 20, color: "#0000ff" }}>Loading...</Text>
                    </View>
                </View>
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
                        <Text style={[textBlack, { fontSize: 30 }]}>{this.state.dataSource.TenSanPham}</Text>
                    </View>
                    <View style={footer}>
                        <View style={descContainer}>
                            <Text style={textBlack}>Giá: {this.state.dataSource.Gia} VND</Text>
                            <Text style={textBlack}>Mô tả: {this.state.dataSource.MoTa}</Text>
                            <Text style={textBlack}>Kích cỡ: {this.state.dataSource.KichCo}</Text>
                            <Text style={textBlack}>Khối lượng: {this.state.dataSource.KhoiLuong}</Text>
                            {this.state.dataSource.KhuyenMai ?
                                <Text style={textBlack}>Khuyến mãi: {this.state.dataSource.KhuyenMai}%</Text> :
                                <Text style={textBlack}>Khuyến mãi: 0%</Text>}
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
        color: '#3F3F46',
        marginTop: 5
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
        color: 'black',
        fontSize: 20
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
    },
});
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Moment from 'moment';
import store from '../redux/store'
class DiaChi extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            navigation: props.params.navigation,
            //user: props.params.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.props.user.user.id + '/nguoidung', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data,
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
    updateAddressTime(id) {
        this.props.close();
        this.props.params.navigation.navigate("UpdateAddressTime", { id: id })
    }
    //Chose Address 
    addAddressToAsyncStore = async (data) => {
        try {
            let flagExist = true
            let flagTime = true
            await AsyncStorage.setItem(
                'address', JSON.stringify(data)
            );
            let addressData = this.props.address.address;
            addressData.forEach(element => {
                if (element.id == data.id) {
                    flagExist = false;
                    return;
                }
                console.log(element)
                if (element.ThoiGianKetThuc.split(":")[0] > data.ThoiGianBatDau.split(":")[0]) {
                    flagTime = false;
                    return;
                }
            });
            if (flagExist) {
                if (flagTime) {
                    if (addressData.length >= 3) {
                        Alert.alert(
                            'Chọn địa chỉ',
                            'Bạn đã chọn 3 địa chỉ rồi!',
                            [
                                {
                                    text: 'Xác nhận',
                                },
                            ],
                        );
                    }
                    else {
                        addressData.push(data);
                        store.dispatch({
                            type: 'CHOSEADDRESS',
                            payload: addressData
                        })
                    }
                }
                else
                {                    
                    Alert.alert(
                        'Chọn địa chỉ',
                        'Khung giờ không phù hợp - Trùng khung giờ của địa chỉ khác',
                        [
                            {
                                text: 'Xác nhận',
                            },
                        ],
                    );
                }
            }
            else {
                Alert.alert(
                    'Chọn địa chỉ',
                    'Bạn đã chọn địa này chỉ rồi!',
                    [
                        {
                            text: 'Xác nhận',
                        },
                    ],
                );
            }
        } catch (error) {
            console.log(error);
        }
    }
    async choseAddress(item) {
        let data = {
            id: item.id,
            TenDiaChi: item.TenDiaChi,
            ThoiGianBatDau: item.ThoiGianBatDau,
            ThoiGianKetThuc: item.ThoiGianKetThuc,
        }
        await this.addAddressToAsyncStore(data)
        this.props.close();
    }
    clickMe(id, TenDiaChi) {
        Alert.alert(
            'Chọn địa chỉ',
            'Xác nhận chọn địa chỉ này ?',
            [
                {
                    text: 'Hủy',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Xác nhận',
                    onPress: () => { this.choseAddress(id) },
                },
                {
                    text: 'Cập nhật',
                    onPress: () => { this.updateAddressTime(id) },
                }
            ],
        );
    }
    render() {
        return (
            <View>
                {this.state.dataSource.map((e, id) => (
                    <View key={id.toString()}>
                        <TouchableOpacity onPress={() => { this.clickMe(e) }}>
                            <View style={styles.Adress}>
                                <View style={styles.adddressContainer}>
                                    <Text style={styles.title}>
                                        Tên địa chỉ:
                                    </Text>
                                    <Text style={styles.AdressTitle}>
                                        {e.TenDiaChi}
                                    </Text>
                                    <Text style={styles.title}>
                                        Ngày: {e.ThoiGianBatDau ? e.ThoiGianBatDau.split("T")[0] : null}
                                    </Text>
                                    <Text style={styles.title}>
                                        Khung giờ:
                                    </Text>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                                        <Text style={styles.AdressTitle}>
                                            {e.ThoiGianBatDau ? e.ThoiGianBatDau.split("T")[1].replace("Z", "").substr(0, 5) : "00:00"}
                                        </Text>
                                        <Text style={styles.title}>
                                            -
                                        </Text>
                                        <Text style={styles.AdressTitle}>
                                            {e.ThoiGianKetThuc ? e.ThoiGianKetThuc.split("T")[1].replace("Z", "").substr(0, 5) : "00:00"}
                                        </Text>
                                    </View>
                                </View>
                                <Icon name="angle-right" size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    Adress: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 10
    },
    AdressTitle: {
        fontSize: 15
    },
    adddressContainer: {
        flexDirection: 'column',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user,
        address: state.address
    };
};

export default connect(mapStateToProps, null)(DiaChi);
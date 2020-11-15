import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Header from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import store from '../redux/store';
class PaymentNotice extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataPayment: props.route.params.dataPayment,
            dataOrder: props.route.params.dataOrder,
            dataListItems: props.route.params.dataListItems,
        }
    }
    async clearCart() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys)
            var promises = stores.map(async (result, i, store) => {
                if (store[i][0] != "user") {
                    await AsyncStorage.removeItem(store[i][0])
                }
            });
            var result = await Promise.all(promises)
            store.dispatch({
                type: 'CLEARADDRESS',
            })
        } catch (error) {
            console.error(error)
        }
    }
    componentDidMount() {
        this._isMounted = true
        this.fetchDataDonhang();
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    fetchDataDssanpham() {
        let data = {
            "data": this.state.dataListItems
        }
        return fetch('https://servertlcn.herokuapp.com/dssanpham/multi',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (this._isMounted) {
                    await this.clearCart();
                    this.setState({
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    fetchDataDonhang() {
        let data = this.state.dataOrder
        return fetch('https://servertlcn.herokuapp.com/donhang',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then(async (responseJson) => {
                let data = this.state.dataListItems
                await data.map(e => {
                    e.DonHangId = responseJson.data.id
                })
                this.setState({
                    dataListItems: data
                })
                if (this._isMounted) {
                    await this.updateDataDiaChi(responseJson.data.id)
                    await this.fetchDataDssanpham();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async updateDataDiaChi(idDonhang) {
        let addressData = this.props.address.address
        const promises = addressData.map(async (e) => {
            const data = {
                DonhangId: idDonhang,
                laMacDinh: true
            };
            return fetch('https://servertlcn.herokuapp.com/diachi/' + e.id,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                })
        })
        const results = await Promise.all(promises)
    }
    goBackToHome() {
        if (!this.state.isLoading) {
            this.props.navigation.navigate("TabHome")
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator animating={true} size="large" color="#0000ff" />
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Header title="Thông báo" />
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <Icon name="check-circle" size={200} color="green" />
                    <Text style={{ paddingTop: 20, fontSize: 35 }}>Giao dịch thành công!</Text>
                    <TouchableOpacity style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.goBackToHome() }}>
                        <View style={{
                            marginTop: 20,
                            height: 60,
                            width: 200,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30
                        }}>
                            <Text style={{ fontSize: 35, color: 'white' }}>Trang chủ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        address: state.address
    };
};

export default connect(mapStateToProps, null)(PaymentNotice);
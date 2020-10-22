import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Header from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome5';

class PaymentNotice extends Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataPayment: props.route.params.dataPayment
        }
    }
    componentDidMount() {
        this._isMounted = true
        this.fetchData()
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    fetchData() {

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
                        onPress={() => { this.props.navigation.navigate("TabHome") }}>
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

export default PaymentNotice;
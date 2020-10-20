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
class DiaChi extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            navigation: props.params.navigation,
            user: props.params.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.state.user.id + '/nguoidung', { method: 'GET' })
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

    //Chose Address 
    addAddressToAsyncStore = async (data) => {
        try {                             
            await AsyncStorage.setItem(
                'address', JSON.stringify(data)
            );
        } catch (error) {
            console.log(error);
        }
    }
    async choseAddress(id, TenDiaChi) {        
        let data = {
            id: id,
            TenDiaChi:TenDiaChi
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
                    onPress: () => { this.choseAddress(id, TenDiaChi) },

                },
            ],
        );
    }
    render() {
        return (
            <View>
                {this.state.dataSource.map((e, id) => (
                    <View key={id.toString()}>
                        <TouchableOpacity onPress={() => { this.clickMe(e.id, e.TenDiaChi) }}>
                            <View style={styles.Adress}>
                                <Text style={styles.AdressTitle}>
                                    {e.TenDiaChi}
                                </Text>
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
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 10
    },
    AdressTitle: {
        fontSize: 15
    }
})
export default DiaChi;
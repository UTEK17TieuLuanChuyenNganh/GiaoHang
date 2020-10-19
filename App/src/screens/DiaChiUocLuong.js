import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput, LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
LogBox.ignoreAllLogs();
import Diachi from '../components/DiaChi';
import AsyncStorage from '@react-native-community/async-storage';
class DiaChiUocLuong extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            addNewAddressClick: true,
            user: props.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    adressclick() {
        this.props.close();
        this.props.navigation.navigate('NewAddress',{user:this.state.user});
    }
    addNewAddress() {
        this.setState({
            addNewAddressClick: !this.state.addNewAddressClick
        })
    }
    renderElement() {
        const params = {
            navigation: this.props.navigation,     
            user: this.state.user  
        }        
        return (            
            <Diachi params={params}/>
        );
    }
    renderAddNewAddress() {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.adressclick() }}>
                    <View style={styles.Adress}>
                        <Text style={styles.AdressTitle}>
                            Thêm Địa Chỉ Mới
                                </Text>
                        <Icon name="angle-right" size={20} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={{ backgroundColor: '', flex: 1 / 0.5 }}>
                <ScrollView>
                    {this.renderAddNewAddress()}
                    {this.renderElement()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AddressContainer: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "column",
        padding: 10
    },
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
    },
    TextInputStyle: {
        height: 35,
        width: 300,
        borderColor: 'black',
        borderWidth: 2,
    },
    ButtonContainer: {
        width: 100,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10
    },
    SaveStyle: {
        height: 40,
        width: 80,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})
export default DiaChiUocLuong;
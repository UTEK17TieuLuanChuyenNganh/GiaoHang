import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, BackHandler, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import HeaderComponent from '../components/HeaderComponent';
class NewAddress extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            sonha: "",
            duong: "",
            phuong: "",
            quan: "",
            thanhpho: "",
            hintAddress: "",
            formattedAddress: "",
            add: {
                lat: "",
                lng: ""
            },
            //user: props.route.params.user
        }
        this.handleBackPress = this.handleBackPress.bind(this);
    }
    handleBackPress() {
        this.props.navigation.goBack();
        return true;
    }
    componentDidMount() {
        this._isMounted = true;
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    //input data
    getlatlong() {
        this._isMounted = true;
        const address = this.state.hintAddress
        var add = {
            lat: "",
            lng: ""
        };
        Geocoder.geocodeAddress(address).then(res => {
            // res is an Array of geocoding object (see below)
            add.lat = Math.round(res[0].position.lat * 10000000) / 10000000
            add.lng = Math.round(res[0].position.lng * 10000000) / 10000000
            if (this._isMounted) {
                this.setState({
                    formattedAddress: res[0].formattedAddress,
                    add: add
                })
            }
            this.fetchData();
            this.props.navigation.navigate("Cart");
            this._isMounted = false;
        })
            .catch(err => console.log(err))
    }
    getHintAddress(address) {
        this._isMounted = true;
        Geocoder.geocodeAddress(address).then(res => {
            if (this._isMounted) {
                this.setState({
                    hintAddress: res[0].formattedAddress
                })
            }
            this._isMounted = false;
        })
            .catch(err => console.log(err))
    }

    //fetch
    fetchData() {
        this._isMounted = true;
        const data = {
            TenDiaChi: this.state.formattedAddress,
            KinhDo: this.state.add.lng,
            ViDo: this.state.add.lat,
            NguoiDungId: this.props.user.id
        };
        return fetch('https://servertlcn.herokuapp.com/diachi',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    // console.log(responseJson)
                }
                this._isMounted = false;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //Hint
    renderHintAddress() {
        if (this.state.sonha != null && this.state.duong != null &&
            this.state.phuong != null) {
            const address = this.state.sonha + " Đường" + this.state.duong
                + " Phường" + this.state.phuong + " Quận" + this.state.quan
                + " " + this.state.thanhpho
            if (address.length > 25) {
                this.getHintAddress(address);
                return (
                    <View style={styles.hintAddress}>
                        <Text>Địa chỉ:</Text>
                        <Text>{this.state.hintAddress}</Text>
                    </View>
                )
            }
            return null;
        }
        return null;
    }
    renderLatLng() {
        if (this.state.add.lat != "" && this.state.add.lng != "") {
            return (
                <View>
                    <Text>lat: {this.state.add.lat}  </Text>
                    <Text>lng: {this.state.add.lng}  </Text>
                </View>
            )
        }
    }
    render() {
        return (
            <View>
                <HeaderComponent title='Thêm địa chỉ' />
                <View style={{ flex: 1 }}>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Số nhà:</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ sonha: text })}
                            value={this.state.sonha}
                            style={styles.TextInputStyle} />
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Đường:</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ duong: text })}
                            value={this.state.duong}
                            style={styles.TextInputStyle} />
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Phường:</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ phuong: text })}
                            value={this.state.phuong}
                            style={styles.TextInputStyle} />
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Quận:</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({ quan: text })}
                            value={this.state.quan}
                            style={styles.TextInputStyle} />
                    </View>
                    <View style={styles.AddressStyle}>
                        {this.renderHintAddress()}
                    </View>
                    <TouchableOpacity style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.getlatlong() }}>
                        <View style={styles.SaveStyle}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Lưu</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    TextInputStyle: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 20
    },
    AddressStyle: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    TextStyle: {
        fontSize: 19
    },
    SaveStyle: {
        height: 40,
        width: 80,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    hintAddress: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    }
})
const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(NewAddress);
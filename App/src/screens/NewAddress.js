import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import HeaderComponent from '../components/HeaderComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
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
            Ngay: "",
            ThoiGianBatDau: "",
            ThoiGianKetThuc: "",
            isVisible: false,
            isVisible1: false,
            isVisible2: false,
            styleContent: "center",
            styleContent1: "center",
            styleContent2: "center"
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
        if (this.state.Ngay == "" || this.state.ThoiGianBatDau == "" || this.state.ThoiGianKetThuc == "") {
            Alert.alert(
                'Khung giờ',
                'Bạn chưa nhập thông tin khung giờ!',
                [
                    {
                        text: 'Xác nhận',
                    },
                ],
            );
        } else {
            if (this.timediff(this.state.ThoiGianKetThuc, this.state.ThoiGianBatDau)) {
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
            else {
                Alert.alert(
                    'Khung Giờ',
                    'Bạn phải chọn khung giờ ít nhất 3 tiếng!',
                    [
                        {
                            text: 'Xác nhận',
                        },
                    ],
                );
            }
        }
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
    timediff(start, end) {
        start = start.split(":");
        end = end.split(":");        
            
        let hours = parseInt(start[0])-parseInt(end[0])
        console.log(hours)
        if (hours < 3)
            return false;
        else
            return true;
    }
    //fetch
    fetchData() {
        this._isMounted = true;

        const data = {
            TenDiaChi: this.state.formattedAddress,
            KinhDo: this.state.add.lng,
            ViDo: this.state.add.lat,
            NguoiDungId: this.props.user.user.id,
            ThoiGianBatDau: this.state.Ngay + " " + this.state.ThoiGianBatDau + "Z",
            ThoiGianKetThuc: this.state.Ngay + " " + this.state.ThoiGianKetThuc + "Z"
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
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Khung giờ:</Text>
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Ngày:</Text>
                        <TouchableOpacity style={{
                            marginBottom: 10, justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    isVisible: true,
                                    styleContent: 'space-around'
                                })
                            }}>
                            <View style={{
                                height: 40,
                                width: 249,
                                flexDirection: "row",
                                backgroundColor: 'white',
                                justifyContent: this.state.styleContent,
                                alignItems: 'center',
                                borderRadius: 30,
                            }}>
                                <Icon name="calendar" size={24} color="blue" />
                                <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.Ngay}</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.isVisible ?
                            <DateTimePicker
                                value={new Date().setDate(new Date().getDate() + 3)}
                                mode="date"
                                minimumDate={new Date().setDate(new Date().getDate() + 3)}
                                display="default"
                                onTouchCancel={(event, value) => { }}
                                onChange={(event, value) => {
                                    var dt;
                                    if (value == undefined) {
                                        dt = Moment(new Date().setDate(new Date().getDate() + 3)).format("MM-DD-YYYY")
                                    }
                                    else { dt = Moment(value).format("MM-DD-YYYY") }
                                    this.setState({
                                        Ngay: dt,
                                        isVisible: false
                                    })
                                }}
                            /> : null}
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Bắt đầu:</Text>
                        <TouchableOpacity style={{
                            marginBottom: 10, justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    isVisible1: true,
                                    styleContent1: 'space-around'
                                })
                            }}>
                            <View style={{
                                height: 40,
                                width: 249,
                                flexDirection: "row",
                                backgroundColor: 'white',
                                justifyContent: this.state.styleContent1,
                                alignItems: 'center',
                                borderRadius: 30,
                            }}>
                                <Icon name="calendar" size={24} color="blue" />
                                <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.ThoiGianBatDau}</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.isVisible1 ?
                            <DateTimePicker
                                value={new Date()}
                                mode="time"
                                display="default"
                                onTouchCancel={() => { this.setState({ displayCalendar: "flex" }) }}
                                onChange={(event, value) => {

                                    var dt = Moment(value).format("HH:mm")
                                    this.setState({
                                        ThoiGianBatDau: dt,
                                        isVisible1: false
                                    })
                                }}
                            /> : null}
                    </View>
                    <View style={styles.AddressStyle}>
                        <Text style={styles.TextStyle}>Kết thúc:</Text>
                        <TouchableOpacity style={{
                            marginBottom: 10, justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                this.setState({
                                    isVisible2: true,
                                    styleContent2: 'space-around'
                                })
                            }}>
                            <View style={{
                                height: 40,
                                width: 249,
                                flexDirection: "row",
                                backgroundColor: 'white',
                                justifyContent: this.state.styleContent2,
                                alignItems: 'center',
                                borderRadius: 30,
                            }}>
                                <Icon name="calendar" size={24} color="blue" />
                                <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.ThoiGianKetThuc}</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.isVisible2 ?
                            <DateTimePicker
                                value={new Date()}
                                mode="time"
                                display="default"
                                onTouchCancel={() => { this.setState({ displayCalendar: "flex" }) }}
                                onChange={(event, value) => {

                                    var dt = Moment(value).format("HH:mm")
                                    this.setState({
                                        ThoiGianKetThuc: dt,
                                        isVisible2: false
                                    })
                                }}
                            /> : null}
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
        height: 50,
        width: 10,
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
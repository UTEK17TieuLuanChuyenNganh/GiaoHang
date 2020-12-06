import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoder';
import HeaderComponent from '../components/HeaderComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
class UpdateAddressTime extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            id: props.route.params.item.id,
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
    async updateTime() {
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
                await this.fetchData();
                this.props.navigation.navigate("Cart");
                this._isMounted = false;
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
    timediff(start, end) {
        start = start.split(":");
        end = end.split(":");

        let hours = parseInt(start[0]) - parseInt(end[0])
        if (hours < 3)
            return false;
        else
            return true;
    }
    //fetch
    fetchData() {
        this._isMounted = true;
        const data = {
            ThoiGianBatDau: this.state.Ngay + " " + this.state.ThoiGianBatDau + "Z",
            ThoiGianKetThuc: this.state.Ngay + " " + this.state.ThoiGianKetThuc + "Z"
        };        
        console.log(this.state.id)
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.state.id,
            {
                method: 'PUT',
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
    render() {
        return (
            <View>
                <HeaderComponent title='Cập nhật khung giờ' />
                <View style={{ flex: 1 }}>
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
                        onPress={() => { this.updateTime() }}>
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

export default connect(mapStateToProps, null)(UpdateAddressTime);
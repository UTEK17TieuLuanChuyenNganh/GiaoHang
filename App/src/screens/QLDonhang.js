import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, BackHandler, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/HeaderComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Pagination from '../components/Pagination';
import AsyncStorage from '@react-native-community/async-storage';

//redux 
import { connect } from 'react-redux';

class QLDonhang extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            user: [],
            checkSearchByDate: false,
            isVisible: false,
            dateStart: null,
            dateEnd: null,
            page: 1,
            pageAmount: 0,
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
        this._subscribe = this.props.navigation.addListener('focus', async () => {
            //await this.checkUser();
            await this.getAmountPage();
            await this.fetchData();
            //this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        //this._subscribe();
        this.props.navigation.removeListener(this._subscribe);
    }
    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    user: data,
                })
            }
            else {
                console.log("Chua dang nhap")
            }
        } catch (error) {
            console.log(error)
        }
    }
    //search implement
    searchByDate() {
        this.setState({
            checkSearchByDate: !this.state.checkSearchByDate
        })
        this.forceUpdate();
    }
    confirmSearchByDate() {
        if (this.state.dateStart == null || this.state.dateEnd == "" ||
            this.state.dateEnd == null || this.state.dateStart == "") {
            return;
        }
        else {
            let dateS = Moment(this.state.dateStart, "MM/DD/YY");
            let dateE = Moment(this.state.dateEnd, "MM/DD/YY");
            let diff = dateE.diff(dateS);
            if (diff >= 0) {
                this.setState({
                    isLoading: true
                })
                this.getAmountPageByDate();
                this.fetchDataPost();
            }
            else {
                return;
            }
        }
    }

    //fetchData
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/donhang/' + this.props.user.user.id + '/nguoidung/' + this.state.page + '/page', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    fetchDataPost() {
        let data = {
            id: this.props.user.user.id,
            date: {
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd
            },
            dateCheck: true
        }
        return fetch('https://servertlcn.herokuapp.com/donhang/search/' + this.state.page + '/page',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Pagination
    getAmountPage() {
        return fetch('https://servertlcn.herokuapp.com/donhang/' + this.props.user.user.id + '/nguoidung', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                let count = responseJson.length / 10
                let page = Math.round(responseJson.length / 10)
                let resultPage = 0;
                if (count > page) {
                    resultPage = page + 1
                }
                else {
                    resultPage = page
                }
                if (this._isMounted) {
                    this.setState(
                        {
                            pageAmount: resultPage
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getAmountPageByDate() {
        let data = {
            id: this.props.user.user.id,
            date: {
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd
            },
            dateCheck: true
        }
        return fetch('https://servertlcn.herokuapp.com/donhang/search/count',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }

            })
            .then((response) => response.json())
            .then((responseJson) => {
                let count = responseJson.length / 10
                let page = Math.round(responseJson.length / 10)
                let resultPage = 0;
                if (count > page) {
                    resultPage = page + 1
                }
                else {
                    resultPage = page
                }
                if (this._isMounted) {
                    this.setState(
                        {
                            pageAmount: resultPage
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async setCurrentPage(pageIndex) {
        await this.setState({
            page: pageIndex
        })
        if (this.state.checkSearchByDate) {
            this.fetchDataPost();
        }
        else {
            this.fetchData()
        }
    }


    //render
    renderDatetimePicker() {
        if (this.state.isVisible) {
            return (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onTouchCancel={() => { this.setState({ displayCalendar: "flex" }) }}
                    onChange={(event, value) => {
                        var dt = Moment(value).format("MM-DD-YYYY")
                        if (this.state.dateStart == "") {
                            this.setState({
                                dateStart: dt,
                                isVisible: false
                            })
                        }
                        if (this.state.dateEnd == "") {
                            this.setState({
                                dateEnd: dt,
                                isVisible: false
                            })
                        }
                    }}
                />
            )
        } else return null
    }
    renderSearchByDate() {
        if (this.state.checkSearchByDate) {
            return (
                <View>
                    <TouchableOpacity style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                isVisible: true,
                                dateStart: "",
                            })
                        }}>
                        <View style={{
                            height: 50,
                            width: 249,
                            flexDirection: "row",
                            backgroundColor: 'white',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            borderRadius: 30,
                        }}>
                            <Text style={{ fontSize: 17 }}>Ngày bắt đầu:</Text>
                            <Icon name="calendar" size={24} color="blue" />
                            <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.dateStart}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => {
                            this.setState({
                                isVisible: true,
                                dateEnd: "",
                            })
                        }}>
                        <View style={{
                            height: 50,
                            width: 249,
                            flexDirection: "row",
                            backgroundColor: 'white',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            borderRadius: 30,
                        }}>
                            <Text style={{ fontSize: 17 }}>Ngày kết thúc:</Text>
                            <Icon name="calendar" size={24} color="blue" />
                            <Text style={{ fontSize: 17, paddingRight: 20 }}>{this.state.dateEnd}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.confirmSearchByDate() }}>
                        <View style={styles.SaveStyle}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Tìm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } return null;
    }
    renderTinhTrang(tinhtrang) {
        switch (tinhtrang) {
            case null:
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailaccount1}>Đang xử lý   </Text>
                        <Icon name="exclamation-circle" size={30} color="orange" />
                    </View>);
            case 'thanh cong':
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailaccount1}>Giao thành công  </Text>
                        <Icon name="check-circle" size={30} color="green" />
                    </View>);
            case 'that bai':
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailaccount1}>Giao thất bại   </Text>
                        <Icon name="times-circle" size={30} color="red" />
                    </View>);
            case 'chuan bi giao':
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailaccount1}>Chuẩn bị giao   </Text>
                        <Icon name="info-circle" size={30} color="blue" />
                    </View>);
            case 'dang giao':
                return (
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.detailaccount1}>Đang giao   </Text>
                        <Icon name="truck" size={30} color="orange" />
                    </View>);
        }        
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.BackgroundScreens}>
                    <Header title="Quản lý đơn hàng" />
                    <View style={{ marginTop: 200, flexDirection: "column", alignItems: "center" }}>
                        <ActivityIndicator size={70} color="#0000ff" />
                        <Text style={{ fontSize: 20, color: "#0000ff" }}>Loading...</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.BackgroundScreens}>
                <Header title="Quản lý đơn hàng" />
                {this.renderSearchByDate()}
                {this.renderDatetimePicker()}
                <TouchableOpacity onPress={() => { this.searchByDate() }}
                    style={{ padding: 5, backgroundColor: '#EAEAEA', height: 35 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={styles.checkoutTitle}>Tìm theo ngày/tháng</Text>
                        <Icon name={this.state.checkSearchByDate ? "chevron-up" : "chevron-down"} size={20} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <ScrollView>
                            {this.state.dataSource.map((e, id) => (
                                <View key={id.toString()}>
                                    <View style={styles.LabelIndfor}>
                                        <View style={styles.detailaccount}>
                                            <Text style={styles.detailaccount1}>{e.NguoiDung.HoTen}</Text>
                                            <Text style={styles.detailaccount1}>Địa chỉ:{e.DiaChi.TenDiaChi}</Text>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text style={styles.detailaccount1}>Tổng tiền: {e.TongTien} VND</Text>
                                            </View>
                                            <Text style={styles.detailaccount1}>Tình trạng đơn:</Text>
                                            {this.renderTinhTrang(e.TinhTrangDon)}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={{ height: 80, alignItems: "center", flexDirection: "column", backgroundColor: "#1e88e5" }}>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingBottom: 5, color: "white" }}>Page:</Text>
                            <View>
                                <Pagination pageAmount={this.state.pageAmount}
                                    setCurrentPage={(pageIndex) => { this.setCurrentPage(pageIndex) }} />
                            </View>
                        </View>
                        {/* <Icon name="times-circle" size={30} color="red" />
                        <Icon name="truck" size={30} color="#581BB2" />
                        <Icon name="angle-double-right" size={30} color="blue" /> */}
                    </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    SaveStyle: {
        height: 40,
        width: 80,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    checkoutTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
        marginRight: 10
    },
    ThongTin: {
        flex: 1 / 2.2,
        justifyContent: 'flex-end',
        marginBottom: 10,
        alignItems: 'center'
    },
    map1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {

        height: 60,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        //backgroundColor: 'red',
        padding: 10,
        flexDirection: "row",

    },
    detailaccount: {
        fontSize: 17,
        paddingBottom: 10,
        fontWeight: 'bold',
        borderColor: 'black',
        borderBottomWidth: 1

    },
    detailaccount1: {
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',

    },
    LabelIndfor: {
        //backgroundColor: 'red',
        marginLeft: 10,
        marginRight: 10,
        flex: 1 / 2,

    },
    BackgroundScreens: {
        flex: 1,
        backgroundColor: 'white'
    },
    top: {
        flex: 1,
        backgroundColor: "#EEEBEB",
        borderWidth: 2,
    },
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, null)(QLDonhang);
import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Header from '../components/HeaderComponent';
class QLDonhang extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            user: props.route.params.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/donhang/' + this.state.user.id + '/nguoidung', { method: 'GET' })
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
    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator animating={true} size="large" color="#0000ff" />
            );
        }
        return (
            <View style={styles.BackgroundScreens}>
                <Header title="Quản lý đơn hàng" />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <ScrollView>
                            {this.state.dataSource.map((e, id) => (
                                <View key={id.toString()}>
                                    <View style={styles.LabelIndfor}>
                                        <View style={styles.detailaccount}>
                                            <Text style={styles.detailaccount1}>{e.NguoiDung.HoTen}</Text>
                                            <Text style={styles.detailaccount1}>{e.DiaChi.TenDiaChi}</Text>
                                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                <Text style={styles.detailaccount1}>{e.TongTien} VND</Text>
                                                <Icon name="check-circle" size={30} color="green" />
                                            </View>
                                        </View>
                                        <Icon name="times-circle" size={30} color="red" />
                                        <Icon name="truck" size={30} color="#581BB2" />
                                        <Icon name="angle-double-right" size={30} color="blue" />
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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
export default QLDonhang;
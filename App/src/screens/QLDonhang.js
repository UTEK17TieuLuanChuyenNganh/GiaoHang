import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Header from '../components/HeaderComponent';
class QLDonhang extends Component {
    showmenu = () => {

    }
    render() {
        return (
            <View style={styles.BackgroundScreens}>
                <Header title="Quản lý đơn hàng" />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <ScrollView>
                            <View>
                                <View style={styles.LabelIndfor}>
                                    <View style={styles.detailaccount}>
                                        <Text style={styles.detailaccount1}>Trần Cao Quyền</Text>
                                        <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                                            <Icon name="check-circle" size={30} color="green" />
                                        </View>
                                    </View>
                                    <Icon name="times-circle" size={30} color="red" />
                                    <Icon name="truck" size={30} color="#581BB2" />
                                    <Icon name="angle-double-right" size={30} color="blue" />
                                </View>
                            </View>
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
        backgroundColor: 'red'
    },
    top: {
        flex: 1,
        backgroundColor: "#EEEBEB",
        borderWidth: 2,
    },
})
export default QLDonhang;
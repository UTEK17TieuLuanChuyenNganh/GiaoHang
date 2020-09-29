import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
class Logictics extends Component {
    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.logo}>
                    <Icon.Button name='bars'
                        backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
                        onPress={this.showmenu}
                        size={25}
                    >
                    </Icon.Button>
                    <Icon1.Button
                        name='retweet'
                        backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"
                        onPress={this.showmenu}
                        size={25}
                    />

                </View>
                <ScrollView>
                    <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 5, marginBottom: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>13</Text>
                    </View>
                    <View>
                        <View style={styles.LabelIndfor}>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                                <Text style={styles.detailaccount1}>Đã Giao</Text>
                            </View>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                                <Text style={styles.detailaccount1}>Đã Giao</Text>
                            </View>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>
                            <Text style={styles.detailaccount}>Trần Cao Quyền</Text>
                            <Text style={styles.detailaccount1}>Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                            <Text style={styles.detailaccount1}>1.000.000Đ</Text>


                        </View>
                    </View>
                </ScrollView>
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
        backgroundColor: 'red',
        padding: 10,
        flexDirection: "row",

    },
    detailaccount: {
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',
        borderTopColor: 'black',
        borderTopWidth: 1

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
})
export default Logictics;
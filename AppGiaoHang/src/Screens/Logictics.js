import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
class Logictics extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.logo}>

                </View>
                <ScrollView>
                <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 5,marginBottom:15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>13</Text>
                </View>
                <View>
                    <View style={styles.LabelIndfor}>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    detailaccount: {
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',
        borderTopColor:'black',
        borderTopWidth:1
        
    },
    detailaccount1:{
        fontSize: 17,
        marginTop: 5,
        fontWeight: 'bold',
       
    },
    LabelIndfor: {
        //backgroundColor: 'red',
        marginLeft: 10,
        marginRight:10,
        flex: 1 / 2,
        
    },
})
export default Logictics;
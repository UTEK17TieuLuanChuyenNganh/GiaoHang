import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
class MapScreens extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.logo}>

                </View>
                <View style={styles.map1}>
                    {/* <View style={styles.container}> */}
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 10.919355,
                                longitude: 106.783319,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                        </MapView>
                    {/* </View> */}
                </View>
                <View style={styles.ThongTin}>
                    <Text style={{ fontSize: 25 }}> Trần Cao Quyền</Text>
                    <Text style={{ fontSize: 20 }}> 0987513566</Text>
                    <Text style={{ fontSize: 20 }}> Tổng Thu: 10.000.000Đ</Text>
                    <Text style={{ fontSize: 15, marginLeft: 4, marginRight: 4 }}> Địa chỉ:07, đường N8, KDC:Đông An, P. Tân Đông Hiệp, Dĩ An, Bình Dương</Text>
                    <Button title="Xác Nhận Giao Hàng" />
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
        height:60,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default MapScreens;
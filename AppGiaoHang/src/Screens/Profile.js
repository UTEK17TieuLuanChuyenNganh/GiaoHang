import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

class Profile extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../Image/Image/anhbia.jpg')} style={{ flexDirection: 'row' }}>
                    {/* <View style={{ flexDirection: 'row' }}> */}
                    <Image source={require('../../Image/Image/avaPro.jpg')}
                        style={styles.circleImageLayout} />
                    <View style={styles.nameShipper}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }}>Trần Cao Quyền</Text>
                    </View>
                    {/* </View> */}
                </ImageBackground>
                <View style={{ flexDirection: 'row', marginTop: 15,marginLeft:5 }}>
                    <View style={styles.LabelIndfor}>
                        <Text style={styles.detailaccount}>Sinh Nhật:</Text>
                        <Text style={styles.detailaccount}>Giới Tính:</Text>
                        <Text style={styles.detailaccount}>Email:</Text>
                        <Text style={styles.detailaccount}>Số Điện Thoại:</Text>
                        <Text style={styles.detailaccount}>CMND:</Text>
                        <Text style={styles.detailaccount}>Số Tài Khoản:</Text>
                        <Text style={styles.detailaccount}>Phương Tiện:</Text>
                    </View>
                    <View style={styles.Information}>
                        <Text>Profile Screen</Text>
                    </View>
                </View>

            </View>


        );
    }
}
const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        margin: 10,
        backgroundColor: 'green'
    },
    nameShipper: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    circleImageLayout: {
        width: 150,
        height: 150,
        borderRadius: 200 / 2,
        margin: 10,
        marginLeft:15
    },
    Information: {
        //backgroundColor: 'yellow',
        marginRight: 10,
        justifyContent: 'flex-end',
        flex: 1
    },
    LabelIndfor: {
        //backgroundColor: 'red',
        marginLeft: 10,
        flex: 1 / 2
    },
    detailaccount: {
        fontSize: 17,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    }
})



export default Profile;
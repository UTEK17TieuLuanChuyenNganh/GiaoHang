import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
class CheckStatus extends Component {
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
                    />
                </View>
                <View>
                    <View style={styles.BoxCheck}>
                        <Text style={styles.detailaccount}>Tiếp Nhận Chuỗi</Text>
                        <Icon name="check-circle"
                            size={30}
                            color="green"
                            style={{ margin: 13 }} />
                    </View>
                    <View style={styles.BoxCheck}>
                        <Text style={styles.detailaccount}>Đang Thực Hiện</Text>
                        <Icon name="check-circle"
                            size={30}
                            color="green"
                            style={{ margin: 13 }} />
                    </View>
                    <View style={styles.BoxCheck}>
                        <Text style={styles.detailaccount}>Hoàn Tất</Text>
                        <Icon name="times-circle"
                            size={30}
                            color="red"
                            style={{ margin: 13 }} />
                    </View>

                </View>

                <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <View style={styles.Buttonstyle}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Xác Nhận</Text>
                        <Icon name="angle-double-right" size={25} color="white"/>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({


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
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    BoxCheck: {
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    Buttonstyle: {
        width: 200,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'blue',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft:15,
        paddingRight:15,
        flexDirection:"row"
    }
})
export default CheckStatus;
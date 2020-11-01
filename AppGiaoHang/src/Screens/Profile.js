import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
class Profile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: [],
            dataSource: []
        }
    }
    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    user: data,
                    //isLoading: false
                })
                this.fetchData(this.state.user.id);
            }
            else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchData(id) {
        //console.log(this.state.user.Username)
        return fetch('https://servertlcn.herokuapp.com/shipper/'+id,
            { method: 'GET' })
            .then(async (response) => {
                let data = await response.json()
                console.log(data)
                if (data.result != "failed") {
                    if (this._isMounted) {
                        this.setState({
                            dataSource: data.data,
                            isLoading: false
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.checkUser();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    showmenu = () => {
        this.props.navigation.openDrawer();
    }
    renderElement() {
        let acc = this.state.dataSource
        return (
                <View style={styles.Information}>
                    <Text style={styles.detailaccount}>{(acc.NguoiDung.SinhNhat !== {}) ? acc.NguoiDung.SinhNhat.split('T')[0].trim() : ''}</Text>
                    <Text style={styles.detailaccount}>{acc.NguoiDung.GioiTinh}</Text>
                    <Text style={styles.detailaccount}>{acc.NguoiDung.Email}</Text>
                    <Text style={styles.detailaccount}>{acc.NguoiDung.SDT}</Text>
                    <Text style={styles.detailaccount}>{acc.CMND}</Text>
                    <Text style={styles.detailaccount}>{acc.STK}</Text>
                    <Text style={styles.detailaccount}>{acc.PhuongTienVanChuyen}</Text>
                </View>
        )
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={70} color="red" />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground source={require('../../Image/Image/anhbia.jpg')}
                    style={{}}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 50 }}>
                            <Icon.Button name='menu'
                                backgroundColor="rgba(0.0, 0.0, 0.0, 0.0)"

                                onPress={this.showmenu}
                                size={30}
                                style={{ padding: 5 }}

                            />
                        </View>
                        <Image source={require('../../Image/Image/avaPro.jpg')}
                            style={styles.circleImageLayout} />
                        <View style={styles.nameShipper}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }}>{this.state.dataSource.NguoiDung.HoTen}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 5 }}>
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
                        {this.renderElement()}
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
        marginLeft: -30,
        marginTop: 25
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
    },container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})



export default Profile;
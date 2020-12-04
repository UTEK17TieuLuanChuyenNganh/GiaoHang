import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../Component/Logo';
import { connect } from 'react-redux';
import store from '../redux/store';
import Icon1 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
let idShipper = 0
var isLoading = true
const forceUpdateHandler = () => {

};
class listOrder extends Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            soluong: 0,
            user: 0,
            content: [],
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
        }
    }
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        if (section.ShipperId == null) {
            return (
                <Animatable.View
                    duration={400}
                    style={[styles.header, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor"
                >
                    <Text style={styles.detailaccount}>
                        Id: {section.id} {"\n"}
                    Thời Gian Giao Hàng: {section.ThoiGianBatDau}
                    </Text>
                </Animatable.View>
            );
        }
    };

    renderContent(section, _, isActive) {
        if (section.ShipperId == null) {
            let str = JSON.parse(section.Chuoi)
            let chuoi = str.chuoidonhang
            let chuoitemp = ""
            let soluong = 0
            chuoi.map((e, id) => (
                chuoitemp += e.address.TenDiaChi,
                chuoitemp += "  -->  ",
                soluong += 1
            ))
            chuoitemp = chuoitemp.slice(0, chuoitemp.length - 7)
            return (
                <Animatable.View
                    duration={400}
                    style={[styles.content, isActive ? styles.active : styles.inactive]}
                    transition="backgroundColor"
                >
                    <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.detailaccount1}>
                        Số Lượng: {soluong} {"\n"}
                        {chuoitemp}
                    </Animatable.Text>
                    <TouchableOpacity
                        onPress={() => {
                            let temp = { chuoidonhang: chuoi }
                            if (temp.chuoidonhang.length > 2) {
                                temp.chuoidonhang[0].donhang.TinhTrangDon = 'dang giao'
                                temp.chuoidonhang[1].donhang.TinhTrangDon = 'chuan bi giao'
                            }
                            else temp.chuoidonhang[0].donhang.TinhTrangDon = 'dang giao'
                            let a = JSON.stringify(temp)
                            let data = {
                                Chuoi: a,
                                ShipperId: idShipper
                            }

                            fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + idShipper + '/shipper',
                                { method: 'GET' })
                                .then(async (responseJson) => {
                                    responseJson = await responseJson.json()
                                    let a = responseJson.data
                                    if (responseJson.result != "failed") {
                                        Alert.alert("Bạn Đã Đăng Ký Chuỗi Trước Đó")
                                    }
                                    else {
                                        fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + section.id,
                                            { method: 'GET' })
                                            .then(async (responseJson) => {
                                                responseJson = await responseJson.json()
                                                let a = responseJson.data
                                                if (responseJson.data.ShipperId != null) {
                                                    Alert.alert("Đã có Shipper khác đăng kí chuỗi đơn này")
                                                }
                                                else {
                                                    fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + section.id,
                                                        {
                                                            method: 'PUT',
                                                            body: JSON.stringify(data),
                                                            headers: { 'Content-Type': 'application/json' }
                                                        })
                                                        .then((response) => response.json())
                                                        .then((responseJson) => {
                                                            console.log(responseJson)
                                                            Alert.alert("Đã Đăng Ký Thành Công")
                                                            store.dispatch({
                                                                type: 'ADDORDER',
                                                                payload: temp.chuoidonhang

                                                            })
                                                            store.dispatch({
                                                                type: 'ADDCHUOI',
                                                                payload: section.id
                                                            })
                                                            forceUpdateHandler()
                                                        })
                                                        .catch((error) => {
                                                            console.log(error);
                                                        });
                                                }
                                            });

                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                        }} >
                        <View style={{ width: 60, height: 30, borderRadius: 100, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>Chọn</Text>
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            );
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this._subscribe = this.props.navigation.addListener('focus', () => {
            this.fetchData()
            idShipper = this.props.user.user
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.props.navigation.removeListener(this._subscribe);
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/',
            { method: 'GET' })
            .then(async (responseJson) => {
                responseJson = await responseJson.json()
                if (responseJson.result != "failed") {
                    let data = responseJson.data
                    if (this._isMounted) {
                        isLoading = false
                        this.setState(
                            {
                                dataSource: data,
                                soluong: data.length
                            })
                    }
                }
                else {
                    this.setState(
                        {
                            isLoading: false,
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    showmenu = () => {
        this.props.navigation.openDrawer();
    }

    renderSoLuong() {
        return (
            <View style={styles.ViewSoLuong}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{this.state.soluong}</Text>

            </View>
        )
    }
    renderAcordion() {
        const { multipleSelect, activeSections } = this.state;
        return (
            <Accordion
                activeSections={activeSections}
                sections={this.state.dataSource}
                touchableComponent={TouchableOpacity}
                //expandMultiple={multipleSelect}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                duration={400}
                onChange={this.setSections}
            />
        )
    }
    render() {

        if (isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={70} color="red" />
                </View>
            )
        }
        return (
            <View style={styles.BackgroundScreens}>
                <Logo openDrawerclick={() => { this.showmenu() }} title="Đăng Ký Giao Hàng" />
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        {this.renderSoLuong()}
                        <ScrollView>
                            {this.renderAcordion()}
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
        fontSize: 20,
        marginBottom: 10,
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
    BackgroundScreens: {
        flex: 1,

        backgroundColor: 'red'
    },
    top: {
        flex: 1,
        backgroundColor: "#EEEBEB",
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    ViewSoLuong: {
        flexDirection: "row",
        marginTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        borderBottomWidth: 3
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },




})

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    };
};

export default connect(mapStateToProps, null)(listOrder);
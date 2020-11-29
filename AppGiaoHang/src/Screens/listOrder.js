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
class listOrder extends Component {
    _isMounted = true;
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            soluong: 0,
            user: 0,
            content: [],
            activeSections: [],
            collapsed: true,
            multipleSelect: false,
        }
    }
    asdasd(data) {
        store.dispatch({
            type: 'ADDORDER',
            payload: data
        })
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
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <Text style={styles.detailaccount}>
                    Id: {section.id} {"\n"}
                    Thời Gian Giao Hàng:
                </Text>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
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
                <TouchableOpacity onPress={() => {

                    let data = {
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
                                    {
                                        method: 'PUT',
                                        body: JSON.stringify(data),
                                        headers: { 'Content-Type': 'application/json' }
                                    })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                        console.log(responseJson)
                                        store.dispatch({
                                            type: 'ADDORDER',
                                            payload: chuoi

                                        })
                                        store.dispatch({
                                            type: 'ADDCHUOI',
                                            payload: section.id
                                        })
                                    })
                                    .catch((error) => {
                                        console.log(error);
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

    // render() {
    //     return (
    //         <View>
    //             <TouchableOpacity onPress={() => { this.asdasd(this.state.dataSource) }}>
    //                 <Text>chuoi1</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => { this.asdasd(this.state.dataSource2) }}>
    //                 <Text>chuoi2</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }
    componentDidMount() {
        this.fetchData()
        this.checkUser()
        idShipper = this.props.user.user
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
                this.fetchData()
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
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/',
            { method: 'GET' })
            .then(async (responseJson) => {
                responseJson = await responseJson.json()
                if (responseJson.result != "failed") {
                    let data = responseJson.data
                    //data = await JSON.parse(data)
                    //console.log(data)
                    if (this._isMounted) {
                        this.setState(
                            {
                                isLoading: false,
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
    async PutJson(index) {
        if (this.state.status == true) {
            let temp = { chuoidonhang: this.state.dataSource }
            temp.chuoidonhang[index].ShipperId = this.state.user.id
            let a = await JSON.stringify(temp)
            let data = {
                Chuoi: a
            }
            fetch('https://servertlcn.herokuapp.com/chuoigiaohang/',
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }

                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.forceUpdate();
                    console.log(responseJson)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    renderSoLuong() {
        return (
            <View style={styles.ViewSoLuong}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{this.state.soluong}</Text>

            </View>
        )
    }
    renderElement() {
        return (
            <ScrollView>
                {
                    this.state.dataSource.map((e, id) => (
                        <View key={id.toString()}>
                            <TouchableOpacity onPress={() => { }}>
                                {/* <Text style={styles.detailaccount}>{this.state.dataSource.id}</Text> */}
                                <Text style={styles.detailaccount1}>{e.Chuoi}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={styles.detailaccount1}>3</Text>
                                    <Icon name="check-circle" size={30} color="green" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }

    render() {
        const { multipleSelect, activeSections } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={70} color="red" />
                </View>
            )
        }
        return (
            <View style={styles.BackgroundScreens}>
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
                        onPress={() => { }}
                        size={25}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.top}>
                        {this.renderSoLuong()}

                        {/* {this.renderElement()} */}
                        <ScrollView>
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
        user: state.user
    };
};

export default connect(mapStateToProps, null)(listOrder);
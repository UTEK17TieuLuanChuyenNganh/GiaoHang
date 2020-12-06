import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import Logo from '../Component/Logo';
import { Alert, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { connect } from 'react-redux';
import store from '../redux/store';
class listOrder extends Component {
  _isMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      soluong: 0,
      isLoading: true,
      dataSource: [],
    }
  }

  async ahihi() {
    var a = this.state.dataSource;
    var b = []
    for (var i = 0; i < a.length; i++) {
      var aaa = {
        Chuoi: a[i].Chuoi,
        isActive: false,
        BuuCucId: a[i].BuuCucId,
        ShipperId: a[i].ShipperId,
        SoLuong: a[i].SoLuong,
        ThoiGianBatDau: a[i].ThoiGianBatDau,
        id: a[i].id,
        isShipped: a[i].isShipped
      }
      b.push(aaa)
    }
    await this.setState({
      dataSource: b
    })
  }
  fetchData() {
    return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/',
      { method: 'GET' })
      .then(async (responseJson) => {
        responseJson = await responseJson.json()

        if (responseJson.result != "failed") {
          let data = responseJson.data

          if (this._isMounted) {
            this.setState(
              {
                isLoading: false,
                dataSource: data,
                soluong: data.length
              })
            this.ahihi()
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
  componentDidMount() {
    this._isMounted = true;
    this._subscribe = this.props.navigation.addListener('focus', () => {
      this.fetchData()
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.props.navigation.removeListener(this._subscribe);
  }
  sangjson(Chuoi) {
    let str = JSON.parse(Chuoi)
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
      <Animatable.Text style={styles.detailaccount1} >
        Số Lượng: {soluong} {"\n"}
        {chuoitemp}
      </Animatable.Text>
    )
  }
  showmenu = () => {
    this.props.navigation.openDrawer();
  }
  PutOrderStatus(id, str) {
    console.log(id)
    data = {
      TinhTrangDon: str
    }
    console.log(id)
    fetch('http://servertlcn.herokuapp.com/donhang/' + id,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }

      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  PutJson(e) {
    let str = JSON.parse(e.Chuoi)
    let chuoi = str.chuoidonhang
    let temp = { chuoidonhang: chuoi }
    if (temp.chuoidonhang.length > 2) {
      temp.chuoidonhang[0].donhang.TinhTrangDon = 'dang giao'
      this.PutOrderStatus(temp.chuoidonhang[0].donhang.id, 'dang giao')
      temp.chuoidonhang[1].donhang.TinhTrangDon = 'chuan bi giao'
      this.PutOrderStatus(temp.chuoidonhang[1].donhang.id, 'chuan bi giao')
    }
    else {
      temp.chuoidonhang[0].donhang.TinhTrangDon = 'dang giao'
      this.PutOrderStatus(temp.chuoidonhang[0].donhang.id, 'dang giao')
    }
    let a = JSON.stringify(temp)
    let data = {
      Chuoi: a,
      ShipperId: this.props.user.user
    }

    fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.props.user.user + '/shipper',
      { method: 'GET' })
      .then(async (responseJson) => {
        responseJson = await responseJson.json()
        let a = responseJson.data
        if (responseJson.result != "failed") {
          Alert.alert("Bạn Đã Đăng Ký Chuỗi Trước Đó")
        }
        else {
          fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + e.id,
            { method: 'GET' })
            .then(async (responseJson) => {
              responseJson = await responseJson.json()
              let a = responseJson.data
              if (responseJson.data.ShipperId != null) {
                Alert.alert("Đã có Shipper khác đăng kí chuỗi đơn này")
                this.setState({
                  isLoading: true
                })
                this.fetchData()
              }
              else {
                fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + e.id,
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
                      payload: e.id
                    })
                    this.setState({
                      isLoading: true
                    })
                    this.fetchData()
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
  }
  openList(id) {
    var a = this.state.dataSource
    a[id].isActive = !a[id].isActive
    this.setState({
      dataSource: a
    })
  }
  renderelement() {
    return (
      <Animatable.View>
        {this.state.dataSource.map((e, id) => (
          <Animatable.View key={id.toString()}>
            <TouchableOpacity onPress={() => { this.openList(id) }}>
              <Text style={styles.detailaccount}>
                Id: {e.id} {"\n"}
                Thời Gian Giao Hàng: {e.ThoiGianBatDau}
              </Text>
            </TouchableOpacity>
            {e.isActive ? <Animatable.View animation={e.isActive ? "bounceIn" : "bounceOut"} duration={400}>
              {this.sangjson(e.Chuoi)}
              <TouchableOpacity onPress={() => { this.PutJson(e) }}>
                <View style={{ width: 60, height: 30, borderRadius: 100, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                  <Text style={{ fontSize: 12, color: 'white' }}>Chọn</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View> : null}
          </Animatable.View>
        ))}
      </Animatable.View>
    )
  }
  renderSoLuong() {
    return (
      <View style={styles.ViewSoLuong}>

        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Số Lượng:  </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{this.state.soluong}</Text>

      </View>
    )
  }
  render() {
    //console.log(this.state.dataSource)
    if (!this.state.isLoading) {
      return (

        <View style={styles.BackgroundScreens}>
          <Logo openDrawerclick={() => { this.showmenu() }} title="Đăng Ký Giao Hàng" />
          <View style={{ flex: 1 }}>
            <View style={styles.top}>
              {this.renderSoLuong()}
              <ScrollView>
                {this.renderelement()}
              </ScrollView>
            </View>

          </View>
        </View>
      );
    }
    else return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={70} color="red" />
      </View>
    )
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
    borderTopWidth: 1,


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
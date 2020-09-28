import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

class Sanpham extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loaisanpham: 1,
            dataSource: [],
            navigation: props.navigation,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        return fetch('https://servertlcn.herokuapp.com/sanpham', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.data
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    clickMe(id,tensanpham) {
        this.props.navigation.navigate('ProductDetail',{id:id,tensanpham:tensanpham});
    }
    render() {
        return (
            <View style={styles.listItemContainer}>
                {this.state.dataSource.map((e, id) => (
                    <View key={id.toString()}>
                        <TouchableOpacity onPress={()=>{this.clickMe(e.id,e.TenSanPham)}}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: `data:image/jpg;base64,${e.Hinh}` }} style={styles.itemImage} />
                                <Text style={styles.itemName} numberOfLines={2}>
                                    {e.TenSanPham}
                                </Text>
                                <Text style={styles.itemPrice}>{e.Gia} VND</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainer: {
        width: 100,
        marginRight: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    itemImage: {
        width: 100,
        height: 120,
    },
    itemName: {
        fontSize: 14,
        color: '#484848',
        marginVertical: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2a2a2a',
    },
    //
    seeMoreContainer: {
        marginTop: 10,
        padding: 12,
        borderTopWidth: 0.6,
        borderTopColor: '#ededed',
        alignItems: 'center',
    },
    seeMoreText: {
        color: '#0e45b4',
    },

});

export default Sanpham;
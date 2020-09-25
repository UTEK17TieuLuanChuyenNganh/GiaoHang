import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';

class Sanpham extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }
    componentDidMount(){
        return fetch('http://192.168.1.9:3000/sanpham', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        dataSource: responseJson.data
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <ScrollView horizontal={true}>
                <View style={styles.listItemContainer}>
                    {this.state.dataSource.map((e,id) => (
                        <View key={id.toString()}>
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: `data:image/jpg;base64,${e.Hinh}` }} style={styles.itemImage} />
                                <Text style={styles.itemName} numberOfLines={2}>
                                    {e.TenSanPham}
                                </Text>
                                <Text style={styles.itemPrice}>{e.Gia}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 100,
        marginRight: 12,
        marginTop: 10,
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
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class Sanpham extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loaisanpham: props.params.loaisanpham,
            dataSource: [],
            navigation: props.params.navigation,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/sanpham/' + this.state.loaisanpham + '/type', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {         
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.params.loaisanpham !== prevState.loaisanpham) {
            return { loaisanpham: nextProps.params.loaisanpham };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.loaisanpham !== this.props.params.loaisanpham) {
            this.setState({ loaisanpham: prevProps.params.loaisanpham });
            this.fetchData();
        }
    }
    clickMe(id) {
        this.state.navigation.navigate('ProductDetail', { id });
    }
    render() {
        return (
            <View>
                <View style={styles.listItemContainer}>
                    {this.state.dataSource.map((e, id) => (
                        <View key={id.toString()}>
                            <TouchableOpacity onPress={() => { this.clickMe(e.id) }}>
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
            </View>

        );
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
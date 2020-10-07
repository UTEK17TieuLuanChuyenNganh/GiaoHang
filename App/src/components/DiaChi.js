import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

class DiaChi extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            idNguoidung: props.idNguoidung,
            dataSource: [],
            navigation: props.navigation,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.props.idNguoidung + '/nguoidung', { method: 'GET' })
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
    clickMe(id) {
        
    }
    render() {
        this.componentDidMount();
        return (
            <View>
                {this.state.dataSource.map((e, id) => (
                    <View key={id.toString()}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.Adress}>
                                <Text style={styles.AdressTitle}>
                                    Say Hi!
                                </Text>
                                <Icon name="angle-right" size={20}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    Adress: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 10
    },
    AdressTitle: {
        fontSize: 15
    }
})
export default DiaChi;
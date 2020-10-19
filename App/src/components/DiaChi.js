import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class DiaChi extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            navigation: props.navigation,
            user: props.params.user
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    fetchData() {       
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.state.user.id + '/nguoidung', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data,
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
        return (
            <View>
                {this.state.dataSource.map((e, id) => (
                    <View key={id.toString()}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.Adress}>
                                <Text style={styles.AdressTitle}>
                                    {e.TenDiaChi}
                                </Text>
                                <Icon name="angle-right" size={20} />
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
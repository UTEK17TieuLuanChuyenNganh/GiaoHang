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
            idNguoidung: props.idNguoidung,
            dataSource: [],
            refresh: 0,
            navigation: props.navigation,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }
    fetchData() {
        console.log("refresh")
        return fetch('https://servertlcn.herokuapp.com/diachi/' + this.state.idNguoidung + '/nguoidung', { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: responseJson.data,
                            refresh: false
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
        if (nextProps.params.refresh !== prevState.refresh) {
            return { refresh: nextProps.params.refresh };
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.refresh !== this.state.refresh) {
            this.setState({ refresh: this.props.params.refresh });
            this.fetchData();
        }
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
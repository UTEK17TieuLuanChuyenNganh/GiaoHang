import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Sanpham from './Sanpham'
import LoadingView from 'react-native-loading-view'
class Loaisanpham extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            check: 1,
            dataSource: [],
            navigation: props.navigation,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        return fetch('https://servertlcn.herokuapp.com/loaisanpham', { method: 'GET' })
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

    clickme(id) {
        this.setState({
            check: id
        });
    }
    renderSanpham() {
        const params = {
            navigation: this.props.navigation,
            loaisanpham: this.state.check
        }
        return (
            <Sanpham params={params} />
        )
    }
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <Text>Loading...!</Text>
                </LoadingView>
            );
        }
        return (
            <View>
                <ScrollView horizontal={true}>
                    <View style={styles.filterContainer}>
                        {this.state.dataSource.map((e, id) => (
                            <View
                                key={id.toString()}
                                style={
                                    this.state.check == e.id
                                        ? styles.filterActiveButtonContainer
                                        : styles.filterInactiveButtonContainer
                                }>
                                <TouchableOpacity onPress={() => { this.clickme(e.id) }}>
                                    <Text style={
                                        this.state.check == e.id
                                            ? styles.filterActiveText
                                            : styles.filterInactiveText
                                    }>
                                        {e.TenLoai}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                {this.renderSanpham()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    filterActiveButtonContainer: {
        backgroundColor: '#242424',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginRight: 10,
    },
    filterInactiveButtonContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderColor: '#5a5a5a',
        borderWidth: 1,
        marginRight: 10,
    },
    filterActiveText: {
        color: '#fff',
    },
    filterInactiveText: {
        color: '#5a5a5a',
    },
});
export default Loaisanpham;
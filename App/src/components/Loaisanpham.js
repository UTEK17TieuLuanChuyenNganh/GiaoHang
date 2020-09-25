import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
class Loaisanpham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            dataSource: [],
        }
    }
    componentDidMount() {
        return fetch('http://192.168.1.9:3000/loaisanpham', { method: 'GET' })
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
    clickme() {
        console.log("clicked");
        this.setState({
            count: this.state.count += 100
        });
    }
    render() {
        return (
            <ScrollView horizontal={true}>
                <View style={styles.filterContainer}>
                    {this.state.dataSource.map((e, id) => (
                        <View
                            key={id.toString()}
                            style={
                                id === 0
                                    ? styles.filterActiveButtonContainer
                                    : styles.filterInactiveButtonContainer
                            }>
                            <TouchableOpacity>
                                <Text style={
                                    id === 0
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
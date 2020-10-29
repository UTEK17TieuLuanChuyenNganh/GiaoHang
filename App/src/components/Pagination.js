import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageAmount: props.pageAmount,
            chose: 1,
        }
    }
    async click(index) {
        await this.setState({
            chose: index
        })
        this.props.setCurrentPage(index)
    }
    async previousClick() {
        if (this.state.chose > 7) {
            await this.setState({
                chose: this.state.chose - 7
            })
        }
        else
        {
            await this.setState({
                chose: 1
            })
        }        
        this.forceUpdate()    
    }
    render() {
        var pages = [];
        let tabPage = 0;
        if (this.state.pageAmount - this.state.chose > 7) {
            tabPage = this.state.chose + 7
        }
        else {
            tabPage = this.state.pageAmount
        }
        for (let i = this.state.chose; i <= tabPage; i++) {
            pages.push(
                <View key={i}>
                    <TouchableOpacity onPress={() => { this.click(i) }}>
                        <Text style={
                            this.state.chose == i ?
                                styles.chosedPageStyle :
                                styles.pageStyle}>[{i}]</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.wrapper}>
                {this.state.chose > 1 ?
                    <TouchableOpacity onPress={() => { this.previousClick() }}>
                        <Icon name="chevron-left" size={20} color="blue" />
                    </TouchableOpacity> : null}
                {pages}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    pageStyle: {
        fontSize: 20,
        color: "white",

    },
    chosedPageStyle: {
        fontSize: 20,
        color: "black"
    }
})

export default Pagination;
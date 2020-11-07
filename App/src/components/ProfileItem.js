import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
class ProfileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon,
            name: props.name,
            user: props.user
        }
    }
    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    user: data,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    async onclick(name) {
        //await this.checkUser();
        if (this.props.user.id) {
            switch (name) {
                case "Quản lý đơn hàng":
                    this.props.navigation.navigate("QLDH"); break;
                case "Sản phẩm đã mua":
                    this.props.navigation.navigate("DSSP"); break;
            }
        }
        else return;
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.onclick(this.state.name) }}>
                    <View style={styles.itemContainer}>
                        <MaterialCommunityIcons name={this.state.icon} size={26} color="#1e1e1e" />
                        <Text style={[styles.itemText, { marginLeft: this.state.icon ? 20 : 0 }]}>{this.state.name}</Text>
                        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    itemText: {
        flex: 1,
        color: '#1e1e1e',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps, null)(ProfileItem);
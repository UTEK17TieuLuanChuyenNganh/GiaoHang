import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
class ProfileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: props.icon,
            name: props.name,
            user: props.user
        }
    }    
    onclick(name) {
        switch(name)
        {
            case "Quản lý đơn hàng":
                this.props.navigation.navigate("QLDH",{user:this.state.user});break;
            case "Sản phẩm đã mua":
                this.props.navigation.navigate("DSSP",{user:this.state.user});break;                            
        }
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

export default ProfileItem;
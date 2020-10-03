import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Adress extends Component {
    cartclick() {
        this.props.navigation.navigate('Cart');
      }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <ScrollView style={{ flex: 1, }}>
                    <TouchableOpacity onPress={() => {this.cartclick() }}>
                        <View style={styles.Adress}>
                        <View>
                        <Text style={styles.AdressTitle}>
                                Số Điện Thoại
                            </Text>
                            <Text style={styles.AdressTitle}>
                                Địa Chỉ
                            </Text>
                        </View>
                            <Icon name="angle-right" size={20} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
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
export default Adress;
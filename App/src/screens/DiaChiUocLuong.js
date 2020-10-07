import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, StyleSheet, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class DiaChiUocLuong extends Component {  
    render() {
        return (
            <View style={{backgroundColor:'', flex:1/0.5}}>              
                <ScrollView style={{flex:1,}}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.Adress}>
                                <Text style={styles.AdressTitle}>
                                    Say Hi!
                                </Text>
                                <Icon name="angle-right" size={20}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {this.props.clickaddress()}}>
                            <View style={styles.Adress}>
                                <Text style={styles.AdressTitle}>
                                    Thêm Địa Chỉ Mới
                                </Text>
                                <Icon name="angle-right" size={20}/>
                            </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    Adress:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:"row",
        padding:10
    },
    AdressTitle:{
        fontSize:15
    }
})
export default DiaChiUocLuong;
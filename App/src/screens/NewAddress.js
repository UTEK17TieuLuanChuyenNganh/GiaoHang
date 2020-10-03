import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text ,TouchableOpacity} from 'react-native';

class NewAddress extends Component {
    cartclick() {
        this.props.navigation.navigate('Cart');
      }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.AddressStyle}>
                    <Text style={styles.TextStyle}>Quận/Huyện:</Text>
                    <TextInput style={styles.TextInputStyle} />
                </View>
                <View style={styles.AddressStyle}>
                    <Text style={styles.TextStyle}>Phường:</Text>
                    <TextInput style={styles.TextInputStyle} />
                </View>
                <View style={styles.AddressStyle}>
                    <Text style={styles.TextStyle}>Đường:</Text>
                    <TextInput style={styles.TextInputStyle} />
                </View>
                <View style={styles.AddressStyle}>
                    <Text style={styles.TextStyle}>Số Điện Thoại:</Text>
                    <TextInput style={styles.TextInputStyle} />
                </View>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}
                onPress={()=>{this.cartclick()}}>
                    <View style={styles.SaveStyle}>
                        <Text style={{fontSize:20, color:'white'}}>Lưu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    TextInputStyle: {
        height: 30,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 20
    },
    AddressStyle: {
        height:60,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    TextStyle: {
        fontSize: 19
    },
    SaveStyle:{
        height:40,
        width:80,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    }
})
export default NewAddress;
import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
class Login extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginBottom: 10, fontSize: 40 }}>Đăng Nhập</Text>
                <TextInput style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                <TextInput style={{ height: 50, width: 300, borderColor: 'gray', borderWidth: 1, borderRadius: 100, marginBottom: 20 }} />
                <TouchableOpacity onPress={()=>{this.loginclick()}} >
                    <View style={{ width: 150, height: 50, borderRadius: 100, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontSize:25, color:'white'}}>Đăng Nhập</Text>
                    </View>
                </TouchableOpacity>
                {/* <Button title="Đăng Nhập" onPress={nav}/> */}

            </View>

        );
    }
}

export default Login;
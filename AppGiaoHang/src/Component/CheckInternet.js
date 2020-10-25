import { useNetInfo } from "@react-native-community/netinfo";
import React  from 'react';
import {
    View, Text, StyleSheet,
} from 'react-native';
const CheckInternet = () => {
    
    const netInfo = useNetInfo();
    if (netInfo.isConnected.toString() == "true"){
        return null;
       }
    else {
        return (
            <View style={styles.noInternet}>
                <Text style={{ color: "white", fontSize: 18 }}>Không có Internet</Text>
            </View>
        );
    }
    
    
};
const styles = StyleSheet.create({
    noInternet: {
        position: "absolute",
        right: 0,
        left: 0,
        top: 150,
        height: 25,
        backgroundColor: "#FCB0B0",
        alignItems: 'center'
    },
})
export default CheckInternet;
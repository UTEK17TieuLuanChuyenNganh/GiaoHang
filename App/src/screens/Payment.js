import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import LoadingView from 'react-native-loading-view';
import Header from '../components/HeaderComponent';
const del2 = `            
            function formatStyle(){ 
                getElementByXpath("//*[@id='app']/div[1]").style.display="none";                
            };
            formatStyle();
        `;
class Payment extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataPayment: props.route.params.dataPayment,
            url: "",
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData();                
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    async fetchData() {
        return await fetch('https://servertlcn.herokuapp.com/thanhtoan/pay',
            {
                method: 'POST',
                body: JSON.stringify(this.state.dataPayment),
                headers: { 'Content-Type': 'application/json' }

            })
            .then(async (response) => {
                let data = await response.json()
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        url: data.url
                    })
                }                
            })
            .catch((error) => {
                console.log(error);
            });
    }    
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <Text>Loading...!</Text>
                </LoadingView>
            );
        }
        else {
            console.log(this.state.url)
            return (
                <View style={{ flex: 1 }}>
                    <Header title="Thanh toán" />
                    <WebView
                        ref={ref => { this.webview = ref; }}
                        source={{ uri: this.state.url }}
                        style={styles.Webview}
                        injectedJavaScript={del2} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    Webview: {
        flex: 1,
    }
})
export default Payment;
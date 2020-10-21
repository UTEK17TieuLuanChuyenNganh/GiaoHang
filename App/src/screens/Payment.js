import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import LoadingView from 'react-native-loading-view';
import Header from '../components/HeaderComponent';
const hideJS = `
    function formatStyle(){ 
        getElementByXpath("/html/body/pre").style.display="none";
    };
    formatStyle();`;
class Payment extends Component {
    webviewRef = null;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataPayment: props.route.params.dataPayment,
            url: "",
            result: []
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
    closeWebView = async newNavState => {
        const { url } = newNavState;
        if (!url) return;
        if (url.includes('thanhtoan/execute?paymentId')) {
            this.props.navigation.navigate("PaymentNotice",{dataPayment:this.state.dataPayment})
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={styles.flexContainer}
                    />
                </LoadingView>
            );
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Header title="Thanh toán" />
                    <WebView
                        ref={ref => this.webviewRef = ref}
                        source={{ uri: this.state.url }}
                        style={styles.Webview}
                        renderLoading={() => (
                            <ActivityIndicator
                                color='black'
                                size='large'
                                style={styles.Webview} />)}
                        onNavigationStateChange={this.closeWebView} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    Webview: {
        flex: 1,
    },
    flexContainer: {
        flex: 1
    }
})
export default Payment;
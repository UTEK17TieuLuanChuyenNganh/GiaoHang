import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/HeaderComponent';
const { width } = Dimensions.get('window').width;
const { height } = Dimensions.get('window').height;
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
            visible: true,
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
            this.props.navigation.navigate("PaymentNotice", { dataPayment: this.state.dataPayment })
        }
    }
    hideSpinner() {
        this.setState({ visible: false });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <LoadingView loading={this.state.isLoading}>
                    <ActivityIndicator animating={true} size="large" color="#0000ff" style={{marginBottom:height/2,marginLeft:width/2}} />
                </LoadingView>
            );
        }
        else {
            return (
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <Header title="Thanh toán" />
                    <WebView
                        ref={ref => this.webviewRef = ref}
                        source={{ uri: this.state.url }}
                        style={styles.Webview}
                        onLoad={() => { this.hideSpinner() }}
                        startInLoadingState={true}
                        onNavigationStateChange={this.closeWebView} />
                    {this.state.visible && (
                        <View style={{alignItems:"center"}}>
                            <ActivityIndicator animating={true} size="large" color="#0000ff" style={{marginBottom:300}} />
                        </View>
                    )}
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    Webview: {
        flex: 1, backgroundColor: "green"
    },
    flexContainer: {
        flex: 1
    }
})
export default Payment;
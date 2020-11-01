import React, { Component } from 'react';
import { View } from 'react-native';

class GetOrderByIdShipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            user: [],
            index: 0
        }
    }
    async demo() {
        await this.checkUser()
        this.fetchData()
    }
    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                let data = JSON.parse(value);
                this.setState({
                    user: data,
                    isLoading: false
                })
            }
            else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchData() {
        return fetch('https://servertlcn.herokuapp.com/chuoigiaohang/' + this.state.user.id + '/shipper',
            { method: 'GET' })
            .then(async (responseJson) => {
                responseJson = await responseJson.json()
                //console.log(responseJson.data.Chuoi)
                let data = responseJson.data.Chuoi

                data = await JSON.parse(data)
                if (this._isMounted) {
                    this.setState(
                        {
                            isLoading: false,
                            dataSource: data.chuoidonhang,

                        })
                    //console.log(this.state.dataSource)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <View>

            </View>
        );
    }
}

export default GetOrderByIdShipper;
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/Screens/MyDrawer';
import StackSc from './src/Screens/StackSc';
import { Provider } from 'react-redux';
import store from './src/redux/store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StackSc />
      </Provider>
    );
  }
}

export default App;
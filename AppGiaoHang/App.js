import React,{ Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/Screens/MyDrawer';
import StackSc from './src/Screens/StackSc';
class App extends Component {
  render() {
    return (     
        <StackSc/>
    );
  }
}

export default App;
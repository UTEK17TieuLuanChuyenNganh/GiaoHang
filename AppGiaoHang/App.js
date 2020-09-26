
import React,{ Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/Screens/MyDrawer';
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    );
  }
}

export default App;

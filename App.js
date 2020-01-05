import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import React from 'react';
const RootStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

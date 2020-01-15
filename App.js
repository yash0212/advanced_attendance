import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterGuard from './src/screens/RegisterGuard';
import RegisterTeacher from './src/screens/RegisterTeacher';

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {headerShown: false},
    },
    RegisterGuard: {
      screen: RegisterGuard,
      navigationOptions: {title: 'Create Guard Account'},
    },
    RegisterTeacher: {
      screen: RegisterTeacher,
      navigationOptions: {title: 'Create Teacher Account'},
    },
  },
  {initialRouteName: 'Home'},
);
const RootStack = createSwitchNavigator(
  {
    Login: LoginScreen,
    Home: HomeStackNavigator,
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
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}

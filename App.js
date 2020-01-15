import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {store, persistor} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

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

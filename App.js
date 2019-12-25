import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const App = createAppContainer(AppNavigator);

export default App;

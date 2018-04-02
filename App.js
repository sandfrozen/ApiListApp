import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './Screens/HomeScreen'
import DetailsScreen from './Screens/DetailsScreen'
import ExtraModalScreen from './Screens/ExtraModalScreen'

const mainColor = "#bababa"
const secdColor = "#000"
const linkColor = "#4F8EF7"

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTintColor: secdColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ExtraModalScreen,
    },
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


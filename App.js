import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Profile from './components/Profile';

const Application = StackNavigator(
  {
    Home: { screen: Login },
    Profile: { screen: Profile }
  },
  {
    navigationOptions: {
      header: false,
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}

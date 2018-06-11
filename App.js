import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import Main from './src/Main';

export default class App extends React.Component {

  state = {
    isLoggedIn: false,
    token: ''
  }

  setToken = (t) => {
    this.setState({
      token: t,
      isLoggedIn: true
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Main style={{paddingTop: Expo.Constants.statusBarHeight}} />)
    } else {
      return (<Login style={{paddingTop: Expo.Constants.statusBarHeight}} setToken = {this.setToken} onLoginPress={() => this.setState({isLoggedIn: true})} />)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

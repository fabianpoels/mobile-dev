import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import Main from './src/Main';
import { COLOR, ThemeProvider } from 'react-native-material-ui';


const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50
    }
  }
}

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

  _logout = () => {
    this.setState({
      token: '',
      isLoggedIn: false
    })
  }

  componentDidMount() {
    console.disableYellowBox = true
  }


  render() {
    if (this.state.isLoggedIn) {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <Main
            screenProps={{
              token: this.state.token,
              logout: this._logout
            }}
          />
        </ThemeProvider>
      )
    } else {
      return (
        <ThemeProvider uiTheme={uiTheme}>
          <Login uiTheme={uiTheme} style={{paddingTop: Expo.Constants.statusBarHeight}} setToken = {this.setToken} onLoginPress={() => this.setState({isLoggedIn: true})} />
        </ThemeProvider>
      )
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

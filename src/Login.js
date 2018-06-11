import React from 'react'
import Axios from 'axios'
import Globals from '../Globals'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'

export default class Login extends React.Component {

  state = {
    email: '',
    password: '',
    loggingIn: false,
    errorMessage: ''
  }

  _userLogin = () => {
    this.setState({loggingIn: true, errorMessage: ''})
    let params = {
            email: this.state.email,
            password: this.state.password
    }
    Axios.post(Globals.API_URL+'/auth', params).then( response => {
      this.props.setToken(response.data.token)
    }).catch(e => {
      this.setState({
        loggingIn: false,
        errorMessage: e.message
      })
    })
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Text style={{fontSize: 27}}>
          Login
        </Text>
        <TextInput placeholder='email' onChangeText={(email) => this.setState({email})} />
        <TextInput placeholder='password' onChangeText={(password) => this.setState({password})} secureTextEntry={true} />
        <View style={{margin:7}} />
          {!!this.state.errorMessage && (
            <Text styel={{fontSize: 14, color: 'red', padding: 5}}>
              Wronger email and/or password
            </Text>
          )}
          {this.state.loggingIn && <ActivityIndicator />}
          <Button
            disabled={this.state.loggingIn || !this.state.email || !this.state.password}
            onPress={this._userLogin}
            title="Login"
          />
        </ScrollView>
    )
  }
}

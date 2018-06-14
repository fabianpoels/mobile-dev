import React from 'react'
import Axios from 'axios'
import Globals from '../Globals'
import { ActivityIndicator, View, StyleSheet, Text, TextInput, Modal } from 'react-native'
import { PropTypes } from 'prop-types'
import { Button } from 'react-native-material-ui'
import { COLOR } from 'react-native-material-ui';
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
      <View style={{padding: 20}}>
        <Text style={{fontSize: 27}}>
          Kami - Login
        </Text>
        <TextInput
          style={{height:50}}
          placeholder='email'
          onChangeText={(email) => this.setState({email})}
          underlineColorAndroid={COLOR.green500}
          blurOnSubmit = {true}
          autoCorrect={false}
        />
        <TextInput
          style={{height:50}}
          placeholder='password'
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          underlineColorAndroid={COLOR.green500}
          blurOnSubmit = {true}
        />
        <View style={{margin:7}} />
          <Button
            raised primary
            disabled={this.state.loggingIn || !this.state.email || !this.state.password}
            onPress={this._userLogin}
            text="Login"
          />
          {!!this.state.errorMessage && (
            <Text style={{fontSize: 14, color: 'red', padding: 5}}>
              {this.state.errorMessage}
            </Text>
          )}
          <Modal
            transparent={true}
            visible={this.state.loggingIn}
            style={styles.modalStyle}
            onRequestClose = {() =>{}}
          >
            <View style={styles.modalStyle}>
              <ActivityIndicator
                color={COLOR.green500}
                size="large"
              />
            </View>
          </Modal>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    modalStyle:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    }
})

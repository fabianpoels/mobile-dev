import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card, Button, Avatar } from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView, TextInput } from 'react-native'
import { PropTypes } from 'prop-types'

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

class AddCustomer extends React.Component {

  state = {
    saving: false,
    errorMessage: '',
    customer : {
      name: ''
    }
  }

  render () {
    return (
      <View>
        <View>
          <Toolbar
            leftElement='clear'
            onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement='Add customer'
            rightElement={
              <Button
                text='Save'
                style={{ text: { color: 'white' } }}
              />
            }
          />
          {!!this.state.errorMessage && (
            <Text style={{fontSize: 14, color: 'red', padding: 5}}>
              {this.state.errorMessage}
            </Text>
          )}
        </View>
        <ScrollView>
          <View style={styles.avatarContainer}>
            <Avatar icon="person" iconSize={20} size={28} />
            <TextInput
              style={{height:50}}
              placeholder='name'
              onChangeText={(name) => {
                const newCustomer = Object.assign({}, this.state.customer, {name: name})
                this.setState({
                  customer: newCustomer,
                  errorMessage: ''
                })
              }}
              underlineColorAndroid={COLOR.green500}
              blurOnSubmit = {true}
              autoCorrect={false}
            />
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.saving}
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
    },
    avatarContainer: {
        paddingLeft: 12,
        paddingTop: 16
    },
})

AddCustomer.propTypes = propTypes

export default AddCustomer

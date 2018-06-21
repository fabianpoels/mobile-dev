import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card, Button } from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView, TextInput, Picker } from 'react-native'
import { PropTypes } from 'prop-types'
import GenerateForm from 'react-native-form-builder'

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

const formFields = [
  {
    type: 'text',
    name: 'firstName',
    label: 'First name',
    required: true
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'Last name',
    required: true
  },
  {
    type: 'email',
    name: 'email',
    label: 'E-mail',
    required: true
  },
  {
    type: 'text',
    name: 'phone',
    label: 'Phone number'
  },
  {
    type: 'text',
    name: '_id',
    label: '_id',
    editable: false
  },
  {
    type: 'text',
    name: 'customer',
    label: 'customer',
    editable: false
  }
]

class EditContact extends React.Component {

  state = {
    saving: false,
    errorMessage: '',
    errors: {}
  }

  _updateContact = () => {
    this.setState({saving: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.put(Globals.API_URL+'/contactPerson/', this.formGenerator.getValues()).then( response => {
      this.setState({saving: false, errorMessage: ''})
      this.props.navigation.state.params.onNavigateBack(response.data)
      this.props.navigation.goBack()
    }).catch(e => {
      if (e.response) {
        if(e.response.data.error.errors) {
          this.setState({
            errorMessage: 'Error updating contact',
            saving: false,
            errors: e.response.data.error.errors
          })
        } else {
          this.setState({
            errorMessage: e.response.data.error,
            saving: false
          })
        }
      } else {
        error = e.message
      }
    })
  }

  render () {
    return (
      <View style={{flex:1}}>
        <View>
          <Toolbar
            leftElement='arrow-back'
            onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement='Edit contact'
            rightElement='check'
            onRightElementPress={() => this._updateContact()}
          />
        </View>
        {
          !!this.state.errorMessage && (
            <Card
              onPress={() => this.setState({
                errorMessage: '',
                errors: '',
              })}
            >
              <ListItem
                style={{
                  primaryText: {
                    fontSize: 14, color: 'red',
                  }
                }}
                centerElement={{ primaryText: this.state.errorMessage}}
              />
              {
                !!this.state.errors.firstName && (
                  <ListItem
                    style={{
                      primaryText: {
                        fontSize: 14, color: 'red',
                      }
                    }}
                    centerElement={{ primaryText: this.state.errors.firstName.message}}
                  />
                )
              }
              {
                !!this.state.errors.lastName && (
                  <ListItem
                    style={{
                      primaryText: {
                        fontSize: 14, color: 'red',
                      }
                    }}
                    centerElement={{ primaryText: this.state.errors.lastName.message}}
                  />
                )
              }
              {
                !!this.state.errors.email && (
                  <ListItem
                    style={{
                      primaryText: {
                        fontSize: 14, color: 'red',
                      }
                    }}
                    centerElement={{ primaryText: this.state.errors.email.message}}
                  />
                )
              }
            </Card>
          )
        }
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <GenerateForm
            ref={(c) => {this.formGenerator = c}}
            fields={formFields}
            autoValidation={true}
            formData={{
              _id: this.props.navigation.state.params.contact._id,
              firstName: this.props.navigation.state.params.contact.firstName,
              lastName: this.props.navigation.state.params.contact.lastName,
              email: this.props.navigation.state.params.contact.email,
              phone: this.props.navigation.state.params.contact.phone,
              customer: this.props.navigation.state.params.contact.customer
            }}
          />
        </View>
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
        backgroundColor:'rgba(255,255,255,0.5)'
    }
})

EditContact.propTypes = propTypes

export default EditContact

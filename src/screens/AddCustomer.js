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
    name: 'name',
    label: 'Name',
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
      name: 'vat',
      label: 'VAT'
  },
  {
    type: 'text',
    name: 'phone',
    label: 'Phone number'
  },
  {
    type: 'picker',
    name: 'type',
    mode: 'dropdown',
    label: 'Type',
    options: ['VZW', 'BVBA', 'NV', 'Private', 'Other']
  },
  {
    type: 'group',
    name: 'address',
    label: 'Address',
    fields: [
      {
        type: 'text',
        name: 'street',
        label: 'Street'
      },
      {
        type: 'text',
        name: 'houseNumber',
        label: 'Number'
      },
      {
        type: 'text',
        name: 'city',
        label: 'City'
      },
      {
        type: 'text',
        name: 'postalCode',
        label: 'Zip code'
      },
      {
        type: 'text',
        name: 'country',
        label: 'Country'
      }
    ]
  }
]

class AddCustomer extends React.Component {

  state = {
    saving: false,
    errorMessage: '',
    errors: {}
  }

  _addCustomer = () => {
    this.setState({saving: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.post(Globals.API_URL+'/customer/add', this.formGenerator.getValues()).then( response => {
      this.setState({saving: false, errorMessage: ''})
      this.props.navigation.state.params.onNavigateBack()
      this.props.navigation.goBack()
    }).catch(e => {
      if (e.response) {
        if(e.response.data.error.errors) {
          this.setState({
            errorMessage: 'Error adding customer',
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
            leftElement='clear'
            onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement='Add customer'
            rightElement='check'
            onRightElementPress={() => this._addCustomer()}
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
                !!this.state.errors.name && (
                  <ListItem
                    style={{
                      primaryText: {
                        fontSize: 14, color: 'red',
                      }
                    }}
                    centerElement={{ primaryText: this.state.errors.name.message}}
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
            formData={{
              name: '',
              email: ''
            }}
            autoValidation={true}
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

AddCustomer.propTypes = propTypes

export default AddCustomer

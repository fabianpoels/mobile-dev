import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card, Icon, Avatar, Dialog, DialogDefaultActions } from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView, RefreshControl } from 'react-native'
import { PropTypes } from 'prop-types'

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

class ViewCustomer extends React.Component {

  state = {
    loading: false,
    delete: false,
    errorMessage: '',
    customer: {},
    contactPersons: []
  }

  _loadCustomer = () => {
    this.setState({loading: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.get(Globals.API_URL+'/customer/'+this.props.navigation.state.params.customer._id).then( response => {
      this.setState({
        customer: response.data,
        contactPersons: response.data.contactPersons,
        loading: false
      })
    }).catch(e => {
      let error
      if (e.response) {
        error = e.response.data.error
      } else {
        error = e.message
      }
      this.setState({
        errorMessage: error,
        loading: false
      })
    })
  }

  _updateCustomer = (c) => {
    this.setState({
      customer: c,
      contactPersons: c.contactPersons
    })
  }

  _deleteCustomer = () => {
    this.setState({delete: false, loading: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.delete(Globals.API_URL+'/customer/'+this.state.customer._id).then( response => {
      this.setState({
        loading: false
      })
      this.props.navigation.goBack()
    }).catch(e => {
      let error
      if (e.response) {
        error = e.response.data.error
      } else {
        error = e.message
      }
      this.setState({
        errorMessage: error,
        loading: false
      })
    })
  }



  componentDidMount() {
    this._loadCustomer()
  }

  render () {
    return (
      <View style={{flex:1}}>
        <View>
          <Toolbar
            leftElement='arrow-back'
            centerElement={this.state.customer.name}
            onLeftElementPress={() => this.props.navigation.goBack()}
            rightElement={{actions: ['edit', 'delete']}}
            onRightElementPress={(action) => {
              if (action.action=='edit') {
                this.props.navigation.navigate('EditCustomer', {
                  token: this.props.navigation.state.params.token,
                  customer: this.state.customer,
                  onNavigateBack: this._updateCustomer
                })
              } else {
                this.setState({delete: true})
              }
            }}
          />
          {!!this.state.errorMessage && (
            <Card>
              <Text style={{fontSize: 14, color: 'red', padding: 5}}>
                {this.state.errorMessage}
              </Text>
            </Card>
          )}
        </View>
        <ScrollView style={{flex:1}}>
          <Card>
            <ListItem
              leftElement={<Icon name='domain'/>}
              centerElement={{
                primaryText: this.state.customer.name,
              }}
              onPress={() => {}}
            />
            <ListItem
              leftElement={<Icon name='email'/>}
              centerElement={{
                primaryText: this.state.customer.email
              }}
              onPress={() => {}}
            />
            {(!!this.state.customer.vat && this.state.customer.vat!='') && (
              <ListItem
                leftElement={<Text>VAT</Text>}
                centerElement={{
                  primaryText: this.state.customer.vat
                }}
                onPress={() => {}}
              />
            )}
            {(!!this.state.customer.phone && this.state.customer.phone!='') && (
              <ListItem
                leftElement={<Icon name='phone'/>}
                centerElement={{
                  primaryText: this.state.customer.phone
                }}
                onPress={() => {}}
              />
            )}
            {(!!this.state.customer.type && this.state.customer.type!='') && (
              <ListItem
                leftElement={<Text></Text>}
                centerElement={{
                  primaryText: this.state.customer.type
                }}
                onPress={() => {}}
              />
            )}
          </Card>
          {!!this.state.customer.address && (
            <Card>
              {(!!this.state.customer.address.street && !!this.state.customer.address.houseNumber) && (
                <ListItem
                  leftElement={<Icon name='location-on'/>}
                  centerElement={{
                    primaryText: this.state.customer.address.street,
                    secondaryText: this.state.customer.address.houseNumber
                  }}
                  onPress={() => {}}
                />
              )}
              {(!!this.state.customer.address.postalCode && !!this.state.customer.address.city) && (
                <ListItem
                  leftElement={<Icon name='location-city'/>}
                  centerElement={{
                    primaryText: this.state.customer.address.postalCode,
                    secondaryText: this.state.customer.address.city
                  }}
                  onPress={() => {}}
                />
              )}
              {!!this.state.customer.address.country && (
                <ListItem
                  leftElement={<Icon name='public'/>}
                  centerElement={{
                    primaryText: this.state.customer.address.country
                  }}
                  onPress={() => {}}
                />
              )}
            </Card>
          )}
          <Card>
            <ListItem
              divider
              leftElement={<Icon name='contacts'/>}
              centerElement={{
                primaryText: 'Contacts'
              }}
              onPress={() => {}}
            />
            {this.state.contactPersons.map((contactPerson) => {
              return (
                <ListItem
                  key={contactPerson._id}
                  centerElement={{ primaryText: contactPerson.firstName + ' ' + contactPerson.lastName }}
                  onPress={() => {}}
                  rightElement={
                    <Icon name='chevron-right' />
                  }
                />)
            })}
            <ListItem
              divider
              leftElement={<Icon name='person-add'/>}
              centerElement={{
                primaryText: 'Add contact'
              }}
              rightElement={
                <Icon name='chevron-right' />
              }
              onPress={() => {}}
            />
          </Card>
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.loading}
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
        <Modal
          transparent={true}
          visible={this.state.delete}
          style={styles.modalStyle}
          onRequestClose = {() =>{}}
        >
          <View style={styles.modalStyle}>
            <Dialog>
              <Dialog.Title><Text>Are you sure?</Text></Dialog.Title>
              <Dialog.Content>
                <Text>
                  This will permanently delete the customer. Are you sure you want to continue?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <DialogDefaultActions
                  actions={['cancel', 'delete']}
                  onActionPress={(action) => {
                    if (action=='delete') {
                      this._deleteCustomer()
                    } else {
                      this.setState({delete: false})
                    }
                  }}
                />
              </Dialog.Actions>
            </Dialog>
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

ViewCustomer.propTypes = propTypes

export default ViewCustomer

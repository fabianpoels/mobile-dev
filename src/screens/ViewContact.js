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

class ViewContact extends React.Component {

  state = {
    loading: false,
    delete: false,
    errorMessage: '',
    contact: {}
  }

  _loadContact = () => {
    this.setState({loading: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.get(Globals.API_URL+'/contactPerson/'+this.props.navigation.state.params.contact._id).then( response => {
      this.setState({
        contact: response.data,
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

  _updateContact = (c) => {
    this.setState({
      contact: c,
    })
  }

  _deleteContact = () => {
    this.setState({delete: false, loading: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.delete(Globals.API_URL+'/contactPerson/'+this.state.contact._id).then( response => {
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
    this._loadContact()
  }

  render () {
    return (
      <View style={{flex:1}}>
        <View>
          <Toolbar
            leftElement='arrow-back'
            centerElement={this.state.contact.firstName + ' ' + this.state.contact.lastName}
            onLeftElementPress={() => this.props.navigation.goBack()}
            rightElement={{actions: ['edit', 'delete']}}
            onRightElementPress={(action) => {
              if (action.action=='edit') {
                this.props.navigation.navigate('EditContact', {
                  token: this.props.navigation.state.params.token,
                  contact: this.state.contact,
                  onNavigateBack: this._updateContact
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
              leftElement={<Icon name='person'/>}
              centerElement={{
                primaryText: this.state.contact.firstName + ' ' + this.state.contact.lastName,
              }}
              onPress={() => {}}
            />
            <ListItem
              leftElement={<Icon name='email'/>}
              centerElement={{
                primaryText: this.state.contact.email
              }}
              onPress={() => {}}
            />
            {(!!this.state.contact.phone && this.state.contact.phone!='') && (
              <ListItem
                leftElement={<Icon name='phone'/>}
                centerElement={{
                  primaryText: this.state.contact.phone
                }}
                onPress={() => {}}
              />
            )}
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
                  This will permanently delete the contact. Are you sure you want to continue?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <DialogDefaultActions
                  actions={['cancel', 'delete']}
                  onActionPress={(action) => {
                    if (action=='delete') {
                      this._deleteContact()
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

ViewContact.propTypes = propTypes

export default ViewContact

import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card, Icon } from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView, RefreshControl } from 'react-native'
import { PropTypes } from 'prop-types'

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

class Customers extends React.Component {

  state = {
    customersList: [],
    loading: false,
    refreshing: false,
    errorMessage: '',
    addCustomer: false
  }

  _loadCustomers = () => {
    this.setState({loading: true, errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.get(Globals.API_URL+'/customer/list').then( response => {
      this.setState({
        customersList: response.data,
        loading: false
      })
    }).catch(e => {
      let error;
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

  _refreshCustomers = () => {
    this.setState({errorMessage: ''})
    const API = Axios.create({
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.navigation.state.params.token
      }
    })
    API.get(Globals.API_URL+'/customer/list').then( response => {
      this.setState({
        customersList: response.data,
      })
    }).catch(e => {
      let error;
      if (e.response) {
        error = e.response.data.error
      } else {
        error = e.message
      }
      this.setState({
        errorMessage: error,
      })
    })
  }

  componentDidMount() {
    this._loadCustomers()
  }

  render () {
    return (
      <View style={{flex:1}}>
        <View>
          <Toolbar
            leftElement='arrow-back'
            centerElement='Customers'
            onLeftElementPress={() => this.props.navigation.goBack()}
            rightElement='add'
            onRightElementPress={() => this.props.navigation.navigate('AddCustomer', {token: this.props.navigation.state.params.token})}
          />
          {!!this.state.errorMessage && (
            <Text style={{fontSize: 14, color: 'red', padding: 5}}>
              {this.state.errorMessage}
            </Text>
          )}
        </View>
        <View>

        </View>
        <ScrollView style={{flex:1}}
          refreshControl={
            <RefreshControl
              onRefresh={() => this._refreshCustomers()}
              refreshing={this.state.refreshing}
            />
            }
        >
          {
             (this.state.customersList.length > 0) && (this.state.customersList.map((c) => {
              return (
                <ListItem
                  key={c._id}
                  divider
                  centerElement={{ primaryText: c.name }}
                  onPress={() => this.props.navigation.navigate('ViewCustomer', {token: this.props.screenProps.token, customer: c})}
                  rightElement={
                    <Icon name='chevron-right' />
                  }
                />)
            }))
          }
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

Customers.propTypes = propTypes

export default Customers

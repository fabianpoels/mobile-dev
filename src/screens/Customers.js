import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card} from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView } from 'react-native'
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
    errorMessage: '',
    addCustomer: false
  }

  componentDidMount() {
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

  render () {
    return (
      <View>
        <View>
          <Toolbar
            leftElement='arrow-back'
            centerElement='Customers'
            onLeftElementPress={() => this.props.navigation.goBack()}
          />
          {!!this.state.errorMessage && (
            <Text style={{fontSize: 14, color: 'red', padding: 5}}>
              {this.state.errorMessage}
            </Text>
          )}
        </View>
        <ScrollView>
          {
            this.state.customersList.map((c) => {
              return (
                <ListItem
                  key={c._id}
                  divider
                  centerElement={{ primaryText: c.name }}
                />)
            })
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
        {!(this.state.errorMessage && !this.state.loading) && (
        <ActionButton
          onPress={() => this.props.navigation.navigate('AddCustomer', {token: this.props.navigation.state.params.token})}
        />)}
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

Customers.propTypes = propTypes

export default Customers

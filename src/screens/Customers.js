import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem } from 'react-native-material-ui'
import { ActivityIndicator, StyleSheet, View, Text, Modal, ScrollView } from 'react-native'
import { COLOR } from 'react-native-material-ui';
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
    errorMessage: ''
  }

  componentDidMount() {
    this.setState({loading: true, errorMessage: ''})
    Axios.get(
      Globals.API_URL+'/customer/list',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.props.navigation.state.params.token
        }
      }
    ).then( response => {
      this.setState({
        customersList: response.data,
        loading: false
      })
    }).catch(e => {
      this.setState({
        errorMessage: e.message,
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

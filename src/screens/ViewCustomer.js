import React from 'react'
import Axios from 'axios'
import Globals from '../../Globals'
import { Toolbar, ListItem, COLOR, ActionButton, Card, Icon, Avatar } from 'react-native-material-ui'
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
    errorMessage: '',
    customer: {}
  }

  componentDidMount() {
    this.setState({
      customer: this.props.navigation.state.params.customer
    })
  }

  render () {
    return (
      <View>
        <View>
          <Toolbar
            leftElement='arrow-back'
            centerElement={this.state.customer.name}
            onLeftElementPress={() => this.props.navigation.goBack()}
          />
          {!!this.state.errorMessage && (
            <Text style={{fontSize: 14, color: 'red', padding: 5}}>
              {this.state.errorMessage}
            </Text>
          )}
        </View>
        <ScrollView>
          <Card>
            <ListItem
              leftElement={<Icon name='domain'/>}
              centerElement={{
                primaryText: this.state.customer.name,
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
            <ListItem
              leftElement={<Icon name='email'/>}
              centerElement={{
                primaryText: this.state.customer.email
              }}
              onPress={() => {}}
            />
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
              <ListItem
                leftElement={<Icon name='location-on'/>}
                centerElement={{
                  primaryText: this.state.customer.address.street,
                  secondaryText: this.state.customer.address.houseNumber
                }}
                onPress={() => {}}
              />
              <ListItem
                leftElement={<Icon name='location-city'/>}
                centerElement={{
                  primaryText: this.state.customer.address.postalCode,
                  secondaryText: this.state.customer.address.city
                }}
                onPress={() => {}}
              />
              <ListItem
                leftElement={<Icon name='map'/>}
                centerElement={{
                  primaryText: this.state.customer.address.country
                }}
                onPress={() => {}}
              />
            </Card>
          )}
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

ViewCustomer.propTypes = propTypes

export default ViewCustomer

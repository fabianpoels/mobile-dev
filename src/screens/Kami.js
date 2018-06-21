import React from 'react'
import { Toolbar, ListItem, Icon } from 'react-native-material-ui'
import { View } from 'react-native'
import { PropTypes } from 'prop-types'

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

class Kami extends React.Component {
  render () {
    return (
      <View>
        <Toolbar
          centerElement='Kami'
          leftElement='menu'
          rightElement='exit-to-app'
          onRightElementPress={() => this.props.screenProps.logout()}
        />
        <ListItem
          divider
          centerElement={{
            primaryText: 'Customers'
          }}
          onPress={() => this.props.navigation.navigate('Customers', {token: this.props.screenProps.token})}
          rightElement={
            <Icon name='chevron-right' />
          }
        />
        <ListItem
          divider
          centerElement={{
            primaryText: 'Contacts'
          }}
          onPress={() => this.props.navigation.navigate('Contacts', {token: this.props.screenProps.token})}
          rightElement={
            <Icon name='chevron-right' />
          }
        />
      </View>
    )
  }
}

Kami.propTypes = propTypes

export default Kami

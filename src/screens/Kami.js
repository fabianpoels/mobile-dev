import React from 'react'
import { Toolbar, ListItem } from 'react-native-material-ui'
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
        />
        <ListItem
          divider
          centerElement={{
            primaryText: 'Customers'
          }}
          onPress={() => this.props.navigation.navigate('Customers', {token: this.props.screenProps.token})}
        />
      </View>
    )
  }
}

Kami.propTypes = propTypes

export default Kami

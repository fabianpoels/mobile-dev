import React from 'react'
import { View } from 'react-native'
import { Toolbar, Drawer } from 'react-native-material-ui'
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
          onLeftElementPress={() => this.props.navigation.openDrawer()}
        />
        <Drawer>
          <Drawer.Section
            divider
            items={[
              { icon: 'bookmark-border', value: 'Notifications' },
              { icon: 'today', value: 'Calendar', active: true },
              { icon: 'people', value: 'Clients' }
            ]}
          />
          <Drawer.Section
            title='Personal'
            items={[
              { icon: 'info', value: 'Info' },
              { icon: 'settings', value: 'Settings' }
            ]}
          />
        </Drawer>
      </View>
    )
  }
}

Kami.propTypes = propTypes

export default Kami

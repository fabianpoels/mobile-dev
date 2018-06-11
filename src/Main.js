import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { Text, View } from 'react-native'

class Main extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}

class Details extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    )
  }
}

export default createMaterialTopTabNavigator(
  {
    Home: Main,
    Details: Details
  },
  {
    initialRouteName: 'Home'
  }
)

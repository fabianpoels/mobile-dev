import { createStackNavigator } from 'react-navigation'
import Kami from './screens/Kami'

export default createStackNavigator(
  {
    Kami: { screen: Kami }
  },
  {
    headerMode: 'none'
  }
)

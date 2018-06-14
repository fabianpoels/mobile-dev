import { createStackNavigator } from 'react-navigation'
import Kami from './screens/Kami'
import Customers from './screens/Customers'

export default createStackNavigator(
  {
    Kami: { screen: Kami },
    Customers: { screen: Customers }
  },
  {
    headerMode: 'none'
  }
)

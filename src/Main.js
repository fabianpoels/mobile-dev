import { createStackNavigator } from 'react-navigation'
import Kami from './screens/Kami'
import Customers from './screens/Customers'
import AddCustomer from './screens/AddCustomer'
import ViewCustomer from './screens/ViewCustomer'

export default createStackNavigator(
  {
    Kami: { screen: Kami },
    Customers: { screen: Customers },
    AddCustomer: { screen: AddCustomer },
    ViewCustomer: { screen: ViewCustomer}
  },
  {
    headerMode: 'none'
  }
)

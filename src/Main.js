import { createStackNavigator } from 'react-navigation'
import Kami from './screens/Kami'
import Customers from './screens/Customers'
import AddCustomer from './screens/AddCustomer'
import ViewCustomer from './screens/ViewCustomer'
import EditCustomer from './screens/EditCustomer'

export default createStackNavigator(
  {
    Kami: { screen: Kami },
    Customers: { screen: Customers },
    AddCustomer: { screen: AddCustomer },
    ViewCustomer: { screen: ViewCustomer },
    EditCustomer: { screen: EditCustomer }
  },
  {
    headerMode: 'none'
  }
)

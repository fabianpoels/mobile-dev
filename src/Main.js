import { createStackNavigator } from 'react-navigation'
import Kami from './screens/Kami'
import Customers from './screens/Customers'
import Contacts from './screens/Contacts'
import AddCustomer from './screens/AddCustomer'
import ViewCustomer from './screens/ViewCustomer'
import EditCustomer from './screens/EditCustomer'
import AddContact from './screens/AddContact'
import ViewContact from './screens/ViewContact'

export default createStackNavigator(
  {
    Kami: { screen: Kami },
    Customers: { screen: Customers },
    Contacts: { screen: Contacts },
    AddCustomer: { screen: AddCustomer },
    ViewCustomer: { screen: ViewCustomer },
    EditCustomer: { screen: EditCustomer },
    AddContact: { screen: AddContact },
    ViewContact: { screen: ViewContact }
  },
  {
    headerMode: 'none'
  }
)

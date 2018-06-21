import Expo from 'expo'

export default {
  // url for the heroku deployment
  API_URL: 'https://mysterious-reaches-16049.herokuapp.com/api/v1',
  // url for local development: (localhost doesn't work in the emulator)
  // API_URL: 'http://10.0.2.2:3000/api/v1',
  statusBarHeight: Expo.Constants.statusBarHeight
}

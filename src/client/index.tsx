import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import reducer from './reducers'

const container = document.createElement('div')
container.id = 'root'
const body = document.getElementsByTagName('body')[0].appendChild(container)

render(
  <Provider store={ createStore(reducer) }>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  container)

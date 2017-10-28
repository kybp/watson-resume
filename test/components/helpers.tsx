import configureStore, { MockStore } from 'redux-mock-store'
import * as enzyme from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import { Provider } from 'react-redux'
import reducer from '../../src/client/reducers'
import { testInit } from '../../src/client/actions'

const mockStore = configureStore()

export const mount = (
  element: React.ReactElement<any>,
): [enzyme.ReactWrapper<any>, MockStore<any>] => {
  const store = mockStore(reducer(undefined, testInit()))
  store.dispatch = jest.fn()

  return [
    enzyme.mount(
      <Provider store={ store }>
        <MuiThemeProvider>
          { element }
        </MuiThemeProvider>
      </Provider>
    ),
    store,
  ]
}

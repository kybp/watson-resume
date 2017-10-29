import configureStore from 'redux-mock-store'
import * as enzyme from 'enzyme'
import { ReactWrapper } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { createStore, Dispatch, Store } from 'redux'
import Actions, { testInit } from '../../../src/client/actions'
import reducer from '../../../src/client/reducers'

const mountWithStore = (
  element: ReactElement<any>,
  store: Store<any>,
): ReactWrapper<any> => (
  enzyme.mount(
    <Provider store={ store }>
      <MuiThemeProvider>
        { element }
      </MuiThemeProvider>
    </Provider>
  )
)

/**
 * Mount the given element wrapped in necessary containers.
 */
export const mount = (element: ReactElement<any>): ReactWrapper<any> => (
  mountWithStore(element, createStore(reducer))
)

const mockStore = configureStore()

/**
 * Mount the given element wrapped in necessary containers with a mocked
 * dispatch function and return an array of the mounted Enzyme wrapper and the
 * dispatch mock.
 */
export const mountWithMockedDispatch = (
  element: ReactElement<any>,
): [ReactWrapper<any>, Dispatch<Actions>] => {
  const store = mockStore(reducer(undefined, testInit()))
  store.dispatch = jest.fn()
  return [mountWithStore(element, store), store.dispatch]
}

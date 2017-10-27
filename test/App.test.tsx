import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import { render } from 'enzyme'
import App from '../src/App'

describe('<App />', () => {
  it('renders an h1 with text "Watson Resume Checker"', () => {
    const app = render(<MuiThemeProvider><App /></MuiThemeProvider>)
    expect(app.find('h1').text()).toBe('Watson Resume Checker')
  })
})

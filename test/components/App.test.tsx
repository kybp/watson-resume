import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import App from '../../src/client/components/App'
import { mount } from './helpers'
import ResumeForm from '../../src/client/components/ResumeForm'

describe('<App />', () => {
  const title = "Watson Resume Checker"
  const app = mount(<App />)

  it(`renders an AppBar with title ${title}`, () => {
    expect(app.find(AppBar).props().title).toBe(title)
  })

  it('renders a ResumeForm', () => {
    expect(app.find(ResumeForm).exists()).toBe(true)
  })
})

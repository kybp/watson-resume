import { shallow } from 'enzyme'
import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'
import * as React from 'react'
import { App } from '../../../src/client/components/App'
import Results from '../../../src/client/components/Results'
import ResumeForm from '../../../src/client/components/ResumeForm'

describe('<App />', () => {
  const title = "Watson Resume Checker"

  it(`renders an AppBar with title ${title}`, () => {
    const app = shallow(<App />)
    expect(app.find(AppBar).props().title).toBe(title)
  })

  describe('when loadingState is "not requested"', () => {
    const app = shallow(<App loadingState="not requested" />)

    it('renders a ResumeForm', () => {
      expect(app.find(ResumeForm).exists()).toBe(true)
    })

    it('does not render a CircularProgress', () => {
      expect(app.find(CircularProgress).exists()).toBe(false)
    })

    it('does not render a Results', () => {
      expect(app.find(Results).exists()).toBe(false)
    })
  })

  describe('when loadingState is "loading"', () => {
    const app = shallow(<App loadingState="loading" />)

    it('renders a CircularProgress', () => {
      expect(app.find(CircularProgress).exists()).toBe(true)
    })

    it('does not render a ResumeForm', () => {
      expect(app.find(ResumeForm).exists()).toBe(false)
    })

    it('does not render a Results', () => {
      expect(app.find(Results).exists()).toBe(false)
    })
  })

  describe('when loadingState is "received"', () => {
    const app = shallow(<App loadingState="received" />)

    it('renders a Results', () => {
      expect(app.find(Results).exists()).toBe(true)
    })

    it('does not render a ResumeForm', () => {
      expect(app.find(ResumeForm).exists()).toBe(false)
    })

    it('does not render a CircularProgress', () => {
      expect(app.find(CircularProgress).exists()).toBe(false)
    })
  })
})

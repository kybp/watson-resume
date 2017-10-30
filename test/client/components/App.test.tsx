import { shallow } from 'enzyme'
import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import { App } from '../../../src/client/components/App'
import ErrorDialog from '../../../src/client/components/ErrorDialog'
import LoadingDisplay from '../../../src/client/components/LoadingDisplay'
import Results from '../../../src/client/components/Results'
import ResumeForm from '../../../src/client/components/ResumeForm'

describe('<App />', () => {
  const title = "Watson Resume Checker"

  it(`renders an AppBar with title ${title}`, () => {
    const app = shallow(<App />)
    expect(app.find(AppBar).props().title).toBe(title)
  })

  it('renders an ErrorDialog', () => {
    const app = shallow(<App />)
    expect(app.find(ErrorDialog).exists()).toBe(true)
  })

  describe('when loadingState is "not requested"', () => {
    const app = shallow(<App loadingState="not requested" />)

    it('renders a ResumeForm', () => {
      expect(app.find(ResumeForm).exists()).toBe(true)
    })

    it('does not render a LoadingDisplay', () => {
      expect(app.find(LoadingDisplay).exists()).toBe(false)
    })

    it('does not render a Results', () => {
      expect(app.find(Results).exists()).toBe(false)
    })
  })

  describe('when loadingState is "loading"', () => {
    const app = shallow(<App loadingState="loading" />)

    it('renders a LoadingDisplay', () => {
      expect(app.find(LoadingDisplay).exists()).toBe(true)
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

    it('does not render a LoadingDisplay', () => {
      expect(app.find(LoadingDisplay).exists()).toBe(false)
    })
  })
})

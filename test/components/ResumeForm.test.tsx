import FlatButton from 'material-ui/FlatButton'
import { MockStore } from 'redux-mock-store'
import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import { mount } from './helpers'
import reducer from '../../src/client/reducers'
import ResumeForm from '../../src/client/components/ResumeForm'
import { setCoverLetterText, TypeKeys } from '../../src/client/actions'

describe('<ResumeForm />', () => {
  let onSubmit: any
  let resumeForm: ReactWrapper<any>
  let store: MockStore<any>

  beforeEach(() => {
    onSubmit = jest.fn()
    const temp = mount(<ResumeForm onSubmit={ onSubmit } />)
    resumeForm = temp[0]
    store = temp[1]
  })

  afterEach(() => {
    resumeForm.unmount()
  })

  it('renders a form', () => {
    expect(resumeForm.find('form').exists()).toBe(true)
  })

  it('calls onSubmit when its "Submit" button is clicked', () => {
    resumeForm.find('FlatButton[label="Submit"]').simulate('click')
    expect(onSubmit).toBeCalled();
  })

  it('dispatches setCoverLetterText when cover-letter-input changes', () => {
    const text = 'some new cover letter text'
    resumeForm.find('textarea#cover-letter-input').simulate('change', {
      event: { target: { value: text } }
    })
    expect(store.dispatch).toBeCalledWith({
      text: '',                 // FIXME
      type: TypeKeys.SET_COVER_LETTER_TEXT,
    })
  })

  it('dispatches setResumeText when resume-input changes', () => {
    const text = 'some resume text'
    resumeForm.find('textarea#resume-input').simulate('change', {
      event: { target: { value: text } }
    })
    expect(store.dispatch).toBeCalledWith({
      text: '',                 // FIXME
      type: TypeKeys.SET_RESUME_TEXT,
    })
  })
})

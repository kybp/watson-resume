import { ReactWrapper } from 'enzyme'
import FlatButton from 'material-ui/FlatButton'
import * as React from 'react'
import { Dispatch } from 'redux'
import { mountWithMockedDispatch } from './helpers'
import ResumeForm from '../../src/client/components/ResumeForm'
import reducer from '../../src/client/reducers'
import Actions, { TypeKeys } from '../../src/client/actions'
import { setCoverLetterText } from '../../src/client/actions'

describe('<ResumeForm />', () => {
  let onSubmit: any
  let resumeForm: ReactWrapper<any>
  let dispatch: Dispatch<Actions>

  beforeEach(() => {
    onSubmit = jest.fn()
    const temp = mountWithMockedDispatch(<ResumeForm onSubmit={ onSubmit } />)
    resumeForm = temp[0]
    dispatch = temp[1]
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
    expect(dispatch).toBeCalledWith({
      text: '',                 // FIXME
      type: TypeKeys.SET_COVER_LETTER_TEXT,
    })
  })

  it('dispatches setResumeText when resume-input changes', () => {
    const text = 'some resume text'
    resumeForm.find('textarea#resume-input').simulate('change', {
      event: { target: { value: text } }
    })
    expect(dispatch).toBeCalledWith({
      text: '',                 // FIXME
      type: TypeKeys.SET_RESUME_TEXT,
    })
  })
})

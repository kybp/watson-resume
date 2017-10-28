import Actions, { TypeKeys } from '../actions'
import { QueryOptions } from '../types'

const initialState = {
  coverLetter: '',
  options: new Map<QueryOptions, boolean>([
    ['categories', true ],
    ['concepts',   false],
    ['emotion',    false],
    ['keywords',   true ],
    ['sentiment',  false],
  ]),
  resume: '',
}

/**
 * A reducer to manage the current query, including the resume text, cover
 * letter text, and the options defined in [[QueryOptions]].
 */
const currentQuery = (state = initialState, action: Actions) => {
  switch (action.type) {
  case TypeKeys.TOGGLE_OPTION:
    return { ...state, options: new Map(
      Array.from(state.options).map(([key, value]) => (
        [key, key === action.option ? !value : value] as [QueryOptions, boolean]
      )),
    ) }
  case TypeKeys.SET_COVER_LETTER_TEXT:
    return { ...state, coverLetter: action.text }
  case TypeKeys.SET_RESUME_TEXT:
    return { ...state, resume: action.text }
  default:
    return state
  }
}

export default currentQuery

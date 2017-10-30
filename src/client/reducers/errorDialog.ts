import Actions, { TypeKeys } from '../actions'

interface IState {
  message: string
  open: boolean
}

const initialState: IState = {
  message: null,
  open: false,
}

/**
 * A reducer to manage the state of the [[ErrorDialog]].
 */
const errorDialog = (state = initialState, action: Actions) => {
  switch (action.type) {
  case TypeKeys.FAIL_LOADING_RESULTS:
    return {
      message: action.reason,
      open: true,
    }
  case TypeKeys.CLOSE_ERROR_DIALOG:
    return initialState
  default:
    return state
  }
}

export default errorDialog

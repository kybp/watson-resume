import { IQueryResults } from '../../shared/types'
import Actions, { TypeKeys } from '../actions'
import { ResultsLoadingStates } from '../types'

export interface IState {
  loadingState: ResultsLoadingStates
  results: IQueryResults
}

const initialState: IState = {
  loadingState: 'not requested',
  results: null,
}

/**
 * A reducer to manage the results returned from submitted queries. If
 * `loadingState` is something other than `received`, then `results` will be
 * null, otherwise it will contain the results of the previously submitted
 * query. If a query request fails, then this will keep `results` null and set
 * `loadingState` to `not requested` so that the user can modify their query and
 * try again.
 */
const results = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
  case TypeKeys.BEGIN_LOADING_RESULTS:
    return { ...state, loadingState: 'loading' }
  case TypeKeys.FAIL_LOADING_RESULTS:
    return {
      loadingState: 'not requested',
      results: null,
    }
  case TypeKeys.SUCCEED_LOADING_RESULTS:
    return {
      loadingState: 'received',
      results: action.results,
    }
  default:
    return state
  }
}

export default results

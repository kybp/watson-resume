import axios from 'axios'
import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { QueryOptions } from '../../shared/types'
import Actions from '../actions'
import { beginLoadingResults } from '../actions'
import { failLoadingResults } from '../actions'
import { succeedLoadingResults } from '../actions'
import * as ResultsReducer from '../reducers/results'
import { IWatsonQuery, ResultsLoadingStates } from '../types'
import Results from './Results'
import ResumeForm from './ResumeForm'

interface IProps {
  dispatch?: Dispatch<Actions>
  loadingState?: ResultsLoadingStates
}

/**
 * The main app component. All interface components should be direct or indirect
 * children of this component.
 */
export const App = ({ dispatch, loadingState }: IProps) => (
  <div>
    <AppBar title="Watson Resume Checker" />
    { loadingState === 'not requested'
      ? <ResumeForm onSubmit={ submitQuery(dispatch) } />
      : loadingState === 'loading'
      ? <CircularProgress />
      : <Results /> }
  </div>
)

/**
 * Submit the current query to the backend for analysis by IBM Watson.
 * Currently, if there is an error this simply shows it to the user in an
 * `alert`.
 */
const submitQuery = (dispatch: Dispatch<Actions>) => (query: IWatsonQuery) => {
  const json: any = {
    coverLetter: query.coverLetter,
    options: {},
    resume: query.resume,
  }
  query.options.forEach((value: any, key: any) => {
    json.options[key] = value
  })

  dispatch(beginLoadingResults())

  axios.post('/analyze', json)
       .then(({ data }) => dispatch(succeedLoadingResults(data)))
       .catch(({ response }) => {
         alert(response.data.error)
         dispatch(failLoadingResults())
       })
}

const mapStateToProps = (
  { results }: { results: ResultsReducer.IState },
): IProps => ({
  loadingState: results.loadingState,
})

export default connect(mapStateToProps)(App)

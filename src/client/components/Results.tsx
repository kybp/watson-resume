import * as React from 'react'
import { connect } from 'react-redux'
import { IQueryResults } from '../../shared/types'
import * as ResultsReducer from '../reducers/results'

interface IProps {
  results: IQueryResults
}

const Results = ({ results }: IProps) => (
  // FIXME
  <pre>
    { JSON.stringify(results) }
  </pre>
)

const mapStateToProps = (
  { results }: { results: ResultsReducer.IState },
): IProps => ({
  results: results.results,
})

export default connect(mapStateToProps)(Results)

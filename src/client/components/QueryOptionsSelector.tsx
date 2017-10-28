import Checkbox from 'material-ui/Checkbox'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Actions, { toggleOption } from '../actions'
import { IWatsonQuery, QueryOptions } from '../types'

interface IProps {
  dispatch?: Dispatch<Actions>
  query?: IWatsonQuery
}

/**
 * A collection of checkboxes allowing the user to toggle the query options
 * defined in [[QueryOptions]].
 */
const QueryOptionsSelector = ({ dispatch, query }: IProps) => (
  <div>
    { Array.from(query.options).map(([option, checked], index) => (
      <Checkbox
        key={ index }
        label={ option }
        checked={ checked }
        onCheck={ () => dispatch(toggleOption(option)) }
      />
    )) }
  </div>
)

const mapStateToProps = (
  { currentQuery }: { currentQuery: IWatsonQuery },
  oldProps: IProps,
): IProps => (
  { ...oldProps, query: currentQuery }
)

export default connect(mapStateToProps, undefined)(QueryOptionsSelector)

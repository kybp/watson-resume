import { combineReducers } from 'redux'
import currentQuery from './currentQuery'
import results from './results'

export default combineReducers({ currentQuery, results })

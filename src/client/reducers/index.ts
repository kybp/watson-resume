import { combineReducers } from 'redux'
import currentQuery from './currentQuery'
import errorDialog from './errorDialog'
import results from './results'

export default combineReducers({ currentQuery, errorDialog, results })

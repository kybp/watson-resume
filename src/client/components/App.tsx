import axios from 'axios'
import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import { connect } from 'react-redux'
import { IWatsonQuery, QueryOptions } from '../types'
import ResumeForm from './ResumeForm'

/**
 * Submit the current query to the backend for analysis by IBM Watson.
 * Currently, this doesn't do anything with the response and makes no attempt to
 * handle errors.
 */
const submitQuery = (query: IWatsonQuery) => {
  const text = query.coverLetter + ' ' + query.resume
  const features: any = {}

  const addFeature = (feature: QueryOptions, body = () => { return }) => {
    if (query.options.get(feature)) {
      features[feature] = {}
      body()
    }
  }

  addFeature('keywords')
  addFeature('emotion', () => {
    if (query.options.get('keywords')) {
      features.keywords.emotion = true
    }
  })
  addFeature('sentiment')
  addFeature('categories')
  addFeature('concepts')

  axios
    .post('/analyze', { text, features })
    .then((data) => {
      // TODO
    })
}

/**
 * The main app component. All interface components should be direct or indirect
 * children of this component.
 */
const App = () => (
  <div>
    <AppBar title="Watson Resume Checker" />
    <ResumeForm onSubmit={ submitQuery } />
  </div>
)

export default App

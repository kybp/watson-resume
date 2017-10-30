import { isQueryOption, QueryOptions } from '../shared/types'

/**
 * Validate the given request body and do nothing if it is valid. If it is
 * invalid, throw an `Error` explaining why.
 */
const validateQuery = (requestBody: any) => {
  if (!requestBody.options ||
      Object.keys(requestBody.options).filter(isQueryOption).length === 0) {
    throw Error('Query options must be supplied.')
  }

  if (!(requestBody.coverLetter || requestBody.resume)) {
    throw Error('Either a resume or cover letter must be supplied.')
  }
}

/**
 * Validate and normalise a query from the frontend. Throws an `Error` if the
 * query was invalid.
 */
export const prepareQuery = (requestBody: any) => {
  validateQuery(requestBody)

  const features: any = {}

  const addFeature = (feature: QueryOptions, body = () => { return }) => {
    if (requestBody.options[feature]) {
      features[feature] = {}
      body()
    }
  }

  addFeature('keywords')
  addFeature('emotion', () => {
    if (requestBody.options.keywords) {
      features.keywords.emotion = true
    }
  })
  addFeature('sentiment', () => {
    if (requestBody.options.keywords) {
      features.keywords.sentiment = true
    }
  })
  addFeature('categories')
  addFeature('concepts')

  let text
  if (!requestBody.coverLetter) {
    text = requestBody.resume
  } else if (!requestBody.resume) {
    text = requestBody.coverLetter
  } else {
    text = requestBody.coverLetter + ' ' + requestBody.resume
  }

  return { features, text }
}

export default prepareQuery

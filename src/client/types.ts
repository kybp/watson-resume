/**
 * The kinds of insights that can be requested from Watson Natural Language
 * Understanding. The user sets these using the [[QueryOptionsSelector]]
 * component, and the current settings are managed by the `currentQuery`
 * reducer.
 */
export type QueryOptions =
  | 'categories'
  | 'concepts'
  | 'emotion'
  | 'keywords'
  | 'sentiment'

/**
 * A query ready to be submitted to IBM Watson Natural Language Understanding.
 */
export interface IWatsonQuery {
  coverLetter: string
  options: Map<QueryOptions, boolean>
  resume: string
}

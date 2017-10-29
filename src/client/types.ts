import { QueryOptions } from '../shared/types'

/**
 * A query ready to be submitted to IBM Watson Natural Language Understanding.
 */
export interface IWatsonQuery {
  coverLetter: string
  options: Map<QueryOptions, boolean>
  resume: string
}

/**
 * The possible loading states of the query results:
 *
 * - `not requested` means that the user is still setting up their query for
 *    submission.
 *
 * - `loading` means that a query has been submitted and we are waiting for a
 *   response.
 *
 * - `received` means that query results have been successfully received.
 *
 * These changes are handled by the `results` reducer.
 */
export type ResultsLoadingStates =
  | 'not requested'
  | 'loading'
  | 'received'

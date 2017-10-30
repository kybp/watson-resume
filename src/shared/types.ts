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
 * Return true or false depending on whether the given object is a valid
 * [[QueryOptions]].
 */
export const isQueryOption = (object: any): boolean => ([
  'categories',
  'concepts',
  'emotion',
  'keywords',
  'sentiment',
].indexOf(object) !== -1)

interface ICategoryResult {
  label: string
  score: number
}

interface IConceptResult {
  dbpedia_resource: string
  relevance: number
  text: string
}

interface IEmotionResult {
  anger: number
  disgust: number
  fear: number
  joy: number
  sadness: number
}

interface IEntityResult {
  type: string
  text: string
  sentiment?: ISentimentResult
  relevance: number
  emotion?: IEmotionResult
  count: number
}

interface IKeywordResult {
  emotion?: IEmotionResult
  relevance: number
  sentiment: ISentimentResult
  text: string
}

interface ISentimentResult {
  score: number
  label: string
}

/**
 * A query results response that our server sends to our client. The full
 * response from IBM Watson has several more keys that we strip. All keys are
 * optional; their inclusion depends on the [[QueryOptions]] specified in the
 * request. Note that some options may activate data in multiple parts of the
 * response, see [[prepareQuery]] for details.
 */
export interface IQueryResults {
  categories?: ICategoryResult[]
  concepts?: IConceptResult[]
  emotion?: {
    document: {
      emotion: IEmotionResult,
    },
  }
  entities?: IEntityResult[]
  keywords?: IKeywordResult[]
  sentiment?: {
    document: ISentimentResult,
  }
}

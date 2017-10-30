import { IQueryResults, isQueryOption, QueryOptions } from '../shared/types'

const prepareResponse = (data: any, options: any): IQueryResults => {
  const result: IQueryResults = {}

  Object.keys(options).filter(isQueryOption).forEach((key: QueryOptions) => {
    result[key] = data[key]
  })

  return result
}

export default prepareResponse

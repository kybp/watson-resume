import Actions, { TypeKeys } from '../../../src/client/actions'
import { beginLoadingResults } from '../../../src/client/actions'
import { failLoadingResults } from '../../../src/client/actions'
import { succeedLoadingResults } from '../../../src/client/actions'
import { testInit } from '../../../src/client/actions'
import reducer from '../../../src/client/reducers/results'
import { IQueryResults } from '.../../../src/shared/types'

const queryResults: IQueryResults = {
  emotion: {
    document: {
      emotion: {
        anger: 0.013098,
        fear: 0.011164,
        disgust: 0.006509,
        joy: 0.638297,
        sadness: 0.030108,
      },
    },
  },
  keywords: [{
    emotion: {
      anger: 0.047964,
      disgust: 0.003598,
      fear: 0.005675,
      joy: 0.212818,
      sadness: 0.124894,
    },
    relevance: 0.933292,
    sentiment: {
      score: 0.438975,
    },
    text: 'software development industry',
  }, {
    emotion: {
      anger: 0.061529,
      disgust: 0.191387,
      fear: 0.211518,
      joy: 0.306209,
      sadness: 0.177839,
    },
    relevance: 0.816909,
    sentiment: {
      score: 0,
    },
    text: 'full-stack developer',
  }],
  sentiment: {
    document: {
      label: 'positive',
      score: 0.901371,
    },
  },
}

describe('results reducer', () => {
  const initialState = reducer(undefined, testInit())

  describe('initially', () => {
    describe('loadingState', () => {
      it('is "not requested"', () => {
        expect(initialState.loadingState).toBe('not requested')
      })
    })

    describe('results', () => {
      it('is null', () => {
        expect(initialState.results).toBeNull()
      })
    })
  })

  describe(TypeKeys.BEGIN_LOADING_RESULTS, () => {
    it('sets loadingState to "loading"', () => {
      const updated = reducer(initialState, beginLoadingResults())
      expect(updated.loadingState).toBe('loading')
    })
  })

  describe(TypeKeys.SUCCEED_LOADING_RESULTS, () => {
    const loading = reducer(initialState, beginLoadingResults())
    const updated = reducer(loading, succeedLoadingResults(queryResults))

    it('sets loadingState to "received"', () => {
      expect(updated.loadingState).toBe('received')
    })

    it('sets results to the given results', () => {
      expect(updated.results).toBe(queryResults)
    })
  })

  describe(TypeKeys.FAIL_LOADING_RESULTS, () => {
    const loading = reducer(initialState, beginLoadingResults())
    const updated = reducer(loading, failLoadingResults('message'))

    it('sets loadingState to "not requested"', () => {
      expect(updated.loadingState).toBe('not requested')
    })

    it('sets results to null', () => {
      expect(updated.results).toBeNull()
    })
  })
})

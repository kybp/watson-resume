import Actions, { TypeKeys } from '../../../src/client/actions'
import { closeErrorDialog } from '../../../src/client/actions'
import { failLoadingResults } from '../../../src/client/actions'
import { testInit } from '../../../src/client/actions'
import reducer from '../../../src/client/reducers/errorDialog'

describe('error dialog reducer', () => {
  const initialState = reducer(undefined, testInit())

  describe('initially', () => {
    describe('message', () => {
      it('is null', () => {
        expect(initialState.message).toBeNull()
      })
    })

    describe('open', () => {
      it('is false', () => {
        expect(initialState.open).toBe(false)
      })
    })
  })

  describe(TypeKeys.FAIL_LOADING_RESULTS, () => {
    const reason = 'error message'
    const updated = reducer(initialState, failLoadingResults(reason))

    it('sets message to the given reason', () => {
      expect(updated.message).toBe(reason)
    })

    it('sets open to true', () => {
      expect(updated.open).toBe(true)
    })
  })

  describe(TypeKeys.CLOSE_ERROR_DIALOG, () => {
    const before = reducer(initialState, failLoadingResults('reason'))
    const updated = reducer(before, closeErrorDialog())

    it('sets message to null', () => {
      expect(updated.message).toBeNull()
    })

    it('sets open to false', () => {
      expect(updated.open).toBe(false)
    })
  })
})

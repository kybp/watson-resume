import Actions, { TypeKeys } from '../../src/client/actions'
import reducer from '../../src/client/reducers/currentQuery'
import { QueryOptions } from '../../src/client/types'
import { setCoverLetterText, setResumeText } from '../../src/client/actions'
import { testInit, toggleOption } from '../../src/client/actions'

describe('current query reducer', () => {
  const initialState = reducer(undefined, testInit())

  describe('initially', () => {
    describe('cover letter', () => {
      it('is the empty string', () => {
        expect(initialState.coverLetter).toBe('')
      })
    })

    describe('resume', () => {
      it('is the empty string', () => {
        expect(initialState.resume).toBe('')
      })
    })

    describe('options', () => {
      it('sets "categories" to true', () => {
        expect(initialState.options.get('categories')).toBe(true)
      })

      it('sets "concepts" to false', () => {
        expect(initialState.options.get('concepts')).toBe(false)
      })

      it('sets "emotion" to false', () => {
        expect(initialState.options.get('emotion')).toBe(false)
      })

      it('sets "keywords" to true', () => {
        expect(initialState.options.get('keywords')).toBe(true)
      })

      it('sets "sentiment" to false', () => {
        expect(initialState.options.get('sentiment')).toBe(false)
      })
    })
  })

  describe(TypeKeys.TOGGLE_OPTION, () => {
    it('sets a false option to true', () => {
      const option: QueryOptions = 'sentiment'
      const before = { ...initialState, options: new Map([[option, false]]) }
      const after = reducer(before, toggleOption(option))
      expect(after.options.get(option)).toBe(true)
    })

    it('sets a true option to false', () => {
      const option: QueryOptions = 'sentiment'
      const before = { ...initialState, options: new Map([[option, true]]) }
      const after = reducer(before, toggleOption(option))
      expect(after.options.get(option)).toBe(false)
    })

    it('does not mutate the state', () => {
      const option: QueryOptions = 'sentiment'
      const state = { ...initialState, options: new Map([[option, false]]) }
      reducer(state, toggleOption(option))
      expect(state.options.get(option)).toBe(false)
    })

    it('leaves other options unchanged', () => {
      const option = 'sentiment'
      const updatedState = reducer(initialState, toggleOption(option))

      updatedState.options.forEach((value, key) => {
        if (key === option) {
          expect(value).toBe(!initialState.options.get(key))
        } else {
          expect(value).toBe(initialState.options.get(key))
        }
      })
    })
  })

  describe(TypeKeys.SET_COVER_LETTER_TEXT, () => {
    it('sets coverLetter to the given text', () => {
      const text = initialState.coverLetter + '1'
      const updated = reducer(initialState, setCoverLetterText(text))
      expect(updated.coverLetter).toBe(text)
    })

    it('does not mutate the state', () => {
      const originalText = initialState.coverLetter
      reducer(initialState, setCoverLetterText(initialState.coverLetter + '1'))
      expect(initialState.coverLetter).toBe(originalText)
    })

    it('does not affect other properties', () => {
      const text = initialState.coverLetter + '1'
      const updated = reducer(initialState, setCoverLetterText(text))
      expect(updated.resume).toBe(initialState.resume)
      expect(updated.options).toBe(initialState.options)
    })
  })

  describe(TypeKeys.SET_RESUME_TEXT, () => {
    it('sets resume to the given text', () => {
      const text = initialState.resume + '1'
      const updated = reducer(initialState, setResumeText(text))
      expect(updated.resume).toBe(text)
    })

    it('does not mutate the state', () => {
      const originalText = initialState.resume
      reducer(initialState, setResumeText(initialState.resume + '1'))
      expect(initialState.resume).toBe(originalText)
    })

    it('does not affect other properties', () => {
      const text = initialState.resume + '1'
      const updated = reducer(initialState, setResumeText(text))
      expect(updated.coverLetter).toBe(initialState.coverLetter)
      expect(updated.options).toBe(initialState.options)
    })
  })
})

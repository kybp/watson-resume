import { prepareQuery } from '../../src/server/prepareQuery'

describe('prepareQuery', () => {
  const coverLetter = 'cover letter text'
  const resume = 'resume text'

  describe('validation', () => {
    it('throws when no options are passed', () => {
      expect(() => {
        prepareQuery({ coverLetter, resume })
      }).toThrowError('Query options must be supplied.')
    })

    it('throws when options is empty', () => {
      expect(() => {
        prepareQuery({ coverLetter, resume, options: {} })
      }).toThrowError('Query options must be supplied.')
    })

    it('throws when options has no valid keys', () => {
      expect(() => {
        prepareQuery({ coverLetter, resume, options: {
          a: 'a',
          b: 'b',
        }})
      }).toThrowError('Query options must be supplied.')
    })

    it('throws when all options are false', () => {
      expect(() => {
        prepareQuery({ coverLetter, resume, options: {
          emotion: false,
          keywords: false,
        }})
      }).toThrowError('Query options must be supplied.')
    })

    it('throws when neither resume nor cover letter is passed', () => {
      expect(() => {
        prepareQuery({ options: { emotion: true } })
      }).toThrowError('Either a resume or cover letter must be supplied.')
    })
  })

  describe('text combination', () => {
    it('joins coverLetter and resume with a space into a text property', () => {
      const query = { coverLetter, resume, options: { emotion: true } }
      const prepared = prepareQuery(query)
      expect(prepared.text).toBe(coverLetter + ' ' + resume)
    })

    it('returns just coverLetter as text when resume is not passed', () => {
      const query = { coverLetter, options: { emotion: true } }
      const prepared = prepareQuery(query)
      expect(prepared.text).toBe(coverLetter)
    })

    it('returns just resume as text when coverLetter is not passed', () => {
      const query = { resume, options: { emotion: true } }
      const prepared = prepareQuery(query)
      expect(prepared.text).toBe(resume)
    })
  })

  describe('feature setting', () => {
    it('sets keywords to {} when it is requested', () => {
      const query = { coverLetter, resume, options: { keywords: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.keywords).toEqual({})
    })

    it('sets emotion to {} when it is requested', () => {
      const query = { coverLetter, resume, options: { emotion: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.emotion).toEqual({})
    })

    it('sets sentiment to {} when it is requested', () => {
      const query = { coverLetter, resume, options: { sentiment: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.sentiment).toEqual({})
    })

    it('sets categories to {} when it is requested', () => {
      const query = { coverLetter, resume, options: { categories: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.categories).toEqual({})
    })

    it('sets concepts to {} when it is requested', () => {
      const query = { coverLetter, resume, options: { concepts: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.concepts).toEqual({})
    })

    it('sets all requested options', () => {
      const query = { coverLetter, resume, options: {
        categories: true,
        keywords: true,
      }}
      const prepared = prepareQuery(query)
      expect(new Set(Object.keys(prepared.features)))
        .toEqual(new Set(Object.keys(query.options)))
    })

    it('ignores invalid options', () => {
      const option = 'categories'
      const query = { coverLetter, resume, options: {
        'foo': true,
        [option]: true,
      }}
      const prepared = prepareQuery(query)
      expect(Object.keys(prepared.features)).toEqual([option])
    })

    it('sets keywords.emotion to true when both are requested', () => {
      const query = { coverLetter, resume, options: {
        emotion: true,
        keywords: true,
      }}
      const prepared = prepareQuery(query)
      expect(prepared.features.keywords.emotion).toBe(true)
    })

    it('does not create keywords when not requested but emotion is', () => {
      const query = { coverLetter, resume, options: { emotion: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.keywords).toBeUndefined()
    })

    it('sets keywords.sentiment to true when both are requested', () => {
      const query = { coverLetter, resume, options: {
        sentiment: true,
        keywords: true,
      }}
      const prepared = prepareQuery(query)
      expect(prepared.features.keywords.sentiment).toBe(true)
    })

    it('does not create keywords when not requested but sentiment is', () => {
      const query = { coverLetter, resume, options: { sentiment: true } }
      const prepared = prepareQuery(query)
      expect(prepared.features.keywords).toBeUndefined()
    })
  })
})

import { shallow, ShallowWrapper } from 'enzyme'
import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import EmotionItem from '../../../src/client/components/EmotionItem'
import Keywords from '../../../src/client/components/Keywords'
import { SentimentScoreItem } from '../../../src/client/components/Keywords'
import { IEmotionResult } from '../../../src/shared/types'
import { IKeywordResult } from '../../../src/shared/types'
import { IScore } from '../../../src/shared/types'

describe('<Keywords />', () => {
  const itemTypes = (component: ShallowWrapper<any>) => (
    component
      .find(ListItem).props().nestedItems
      .map((element) => element.type)
  )

  const emotion: IEmotionResult = {
    anger: 0.32,
    disgust: 0.6,
    fear: 0.12,
    joy: 0.4,
    sadness: 0.2,
  }

  const sentiment: IScore = {
    score: 0.12,
  }

  describe('with a list of plain keywards', () => {
    const keywords: IKeywordResult[] = [{
      relevance: 0.2,
      text: 'keyword one',
    }, {
      relevance: 0.1,
      text: 'keyword two',
    }, {
      relevance: 0.3,
      text: 'keyword three'
    }]

    const component = shallow(<Keywords keywords={ keywords } />)

    it('renders a List', () => {
      expect(component.find(List).exists()).toBe(true)
    })

    it('renders each keyword as a ListItem in the List', () => {
      const renderedKeywords = component
        .find(List)
        .find(ListItem)
        .map((item) => [item.props().primaryText, item.props().secondaryText])
        .sort()
      const givenKeywords = keywords
        .map(({ text, relevance }) => [text, `Relevance: ${relevance}`])
        .sort()

      expect(renderedKeywords).toEqual(givenKeywords)
    })

    it('renders keywords in descending order of relevance', () => {
      const keywordRelevancies = component
        .find(List)
        .find(ListItem)
        .map((item) => item.props().secondaryText.toString())
        .map((relevance) => Number(relevance.match(/\d+\.?\d*/)[0]))
      const sortedRelevancies = keywordRelevancies.slice().sort((x, y) => y - x)

      expect(keywordRelevancies).toEqual(sortedRelevancies)
    })
  })

  describe('with a keyword that has emotion and sentiment', () => {
    it('renders an EmotionItem and a SentimentScoreItem in a sub-list', () => {
      const keywords: IKeywordResult[] = [{
        emotion,
        relevance: 0.123,
        sentiment,
        text: 'keyword text',
      }]
      const component = shallow(<Keywords keywords={ keywords } />)
      expect(itemTypes(component)).toEqual([EmotionItem, SentimentScoreItem])
    })
  })

  describe('with a keyword that has only emotion', () => {
    it('renders an EmotionItem in a sub-list', () => {
      const keywords: IKeywordResult[] = [{
        emotion,
        relevance: 0.123,
        text: 'keyword text',
      }]
      const component = shallow(<Keywords keywords={ keywords } />)
      expect(itemTypes(component)).toEqual([EmotionItem])
    })
  })

  describe('with a keyword that only sentiment', () => {
    it('renders a SentimentScoreItem in a sub-list', () => {
      const keywords: IKeywordResult[] = [{
        relevance: 0.123,
        sentiment,
        text: 'keyword text',
      }]
      const component = shallow(<Keywords keywords={ keywords } />)
      expect(itemTypes(component)).toEqual([SentimentScoreItem])
    })
  })
})

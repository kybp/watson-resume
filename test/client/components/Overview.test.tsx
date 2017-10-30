import { shallow, ShallowWrapper } from 'enzyme'
import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import EmotionItem from '../../../src/client/components/EmotionItem'
import Overview from '../../../src/client/components/Overview'
import { SentimentItem } from '../../../src/client/components/Overview'
import { IEmotionResult } from '../../../src/shared/types'
import { ISentimentResult } from '../../../src/shared/types'

describe('<Document />', () => {
  const checkOverview = (
    expect: jest.Expect,
    component: ShallowWrapper<any>,
  ) => {
    expect(component.find(ListItem)).toHaveLength(1)
    expect(
      component.find('ListItem[primaryText="Overview"]').exists()
    ).toBe(true)
  }

  const itemTypes = (component: ShallowWrapper<any>) => (
    component
      .find(List).children()
      .map((item) => item.getElement().type)
  )

  const emotion = {
    document: {
      emotion: {
        anger: 0.4,
        disgust: 0.2,
        fear: 0.5,
        joy: 0.3,
        sadness: 0.1,
      } as IEmotionResult,
    },
  }

  const sentiment = {
    document: {
      label: 'sentiment',
      score: 0.32,
    } as ISentimentResult,
  }

  describe('with emotion and sentiment', () => {
    const component = shallow(
      <Overview emotion={ emotion } sentiment={ sentiment } />
    )

    it('renders a List', () => {
      expect(component.find(List).exists()).toBe(true)
    })

    it('renders a ListItem saying "Overview" at the top of the List', () => {
      checkOverview(expect, component)
    })

    it('renders an EmotionItem and a SentimentItem after "Overview"', () => {
      expect(itemTypes(component))
        .toEqual([ListItem, EmotionItem, SentimentItem])
    })
  })

  describe('with only emotion', () => {
    it('renders an EmotionItem after "Overview"', () => {
      const component = shallow(
        <Overview emotion={ emotion } sentiment={ undefined } />
      )
      checkOverview(expect, component)
      expect(itemTypes(component)).toEqual([ListItem, EmotionItem])
    })
  })

  describe('with only sentiment', () => {
    it('renders an SentimentItem after "Overview"', () => {
      const component = shallow(
        <Overview emotion={ undefined } sentiment={ sentiment } />
      )
      checkOverview(expect, component)
      expect(itemTypes(component)).toEqual([ListItem, SentimentItem])
    })
  })

  describe('without emotion or sentiment', () => {
    it('only renders the "Overview" items', () => {
      const component = shallow(
        <Overview emotion={ undefined } sentiment={ undefined } />
      )
      checkOverview(expect, component)
      expect(itemTypes(component)).toEqual([ListItem])
    })
  })
})

import { shallow } from 'enzyme'
import { ListItem } from 'material-ui/List'
import * as React from 'react'
import EmotionItem from '../../../src/client/components/EmotionItem'
import { capitalize } from '../../../src/client/components/helpers'
import { IEmotionResult } from '../../../src/shared/types'

describe('<EmotionItem />', () => {
  const emotion: IEmotionResult = {
    anger: 0.4,
    disgust: 0.2,
    fear: 0.5,
    joy: 0.3,
    sadness: 0.1,
  }

  const component = shallow(<EmotionItem emotion={ emotion } />)

  it('renders a ListItem', () => {
    expect(component.find(ListItem).exists()).toBe(true)
  })

  it('shows "Emotion" as its primary text', () => {
    expect(component.find(ListItem).props().primaryText).toBe('Emotion')
  })

  it('renders each specific emotion score as a nested ListItem', () => {
    const nestedItems = component
      .find(ListItem)
      .props().nestedItems
      .map((item) => [item.props.primaryText, Number(item.props.secondaryText)])
      .sort()
    const emotionScores = (Object.keys(emotion) as Array<keyof IEmotionResult>)
      .map((key) => [capitalize(key), emotion[key]])
      .sort()

    expect(nestedItems).toEqual(emotionScores)
  })

  it('renders specific emotions in descending order of score', () => {
    const itemScores = component
      .find(ListItem)
      .props().nestedItems
      .map((item) => Number(item.props.secondaryText))
    const sortedScores = itemScores.slice().sort((x, y) => y - x)

    expect(itemScores).toEqual(sortedScores)
  })
})

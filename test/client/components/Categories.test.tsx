import { shallow } from 'enzyme'
import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import Categories from '../../../src/client/components/Categories'
import { ICategoryResult } from '../../../src/shared/types'

describe('<Categories />', () => {
  const categories: ICategoryResult[] = [{
    label: 'label one',
    score: 0.123,
  }, {
    label: 'label two',
    score: 0.456,
  }]

  const component = shallow(<Categories categories={ categories } />)

  it('renders a List', () => {
    expect(component.find(List).exists()).toBe(true)
  })

  it('renders each category as a ListItem in the List', () => {
    const renderedCategories = component
      .find(List)
      .find(ListItem)
      .map((item) => [item.props().primaryText, item.props().secondaryText])
      .sort()
    const givenCategories = categories
      .map(({ label, score }) => [label, `Score: ${score}`])
      .sort()

    expect(renderedCategories).toEqual(givenCategories)
  })

  it('renders categories in descending order of score', () => {
    const categoryScores = component
      .find(List)
      .find(ListItem)
      .map((item) => item.props().secondaryText.toString())
      .map((score) => Number(score.match(/\d+\.?\d*/)[0]))
    const sortedScores = categoryScores.slice().sort((x, y) => y - x)

    expect(categoryScores).toEqual(sortedScores)
  })
})

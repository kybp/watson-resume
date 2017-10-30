import { Tab, Tabs } from 'material-ui/Tabs'
import * as React from 'react'
import { connect } from 'react-redux'
import { IQueryResults, QueryOptions } from '../../shared/types'
import * as ResultsReducer from '../reducers/results'
import Categories from './Categories'
import Concepts from './Concepts'
import EmotionItem from './EmotionItem'
import { sortByRelevance } from './helpers'
import Keywords from './Keywords'
import Overview from './Overview'

interface IProps {
  results: IQueryResults
}

interface IState {
  selected: QueryOptions
}

/**
 * A component to display the results of a query.
 */
class Results extends React.Component<IProps, IState> {
  /**
   * This array defines the left-to-right order in which option tabs should be
   * placed, and the constructors to use for the tab content.
   */
  private tabPrecedence: Array<[QueryOptions, React.ReactType]> = [
    ['keywords',   Keywords],
    ['categories', Categories],
    ['concepts',   Concepts],
  ]

  constructor(props: IProps) {
    super(props)

    this.state = { selected: this.firstOption() }
  }

  public render() {
    return (
      <div style={ { display: 'flex' } }>
        <Overview
          emotion={ this.props.results.emotion }
          sentiment={ this.props.results.sentiment }
        />
        <Tabs
          value={ this.state.selected }
          onChange={ this.handleTabChange }
          style={ { flexGrow: 1 } }
        >
          { this.availableOptions()
                .map((option: QueryOptions, index) => (
                  <Tab key={ index } label={ option } value={ option }>
                    { React.createElement(this.optionComponent(option), {
                        [option]: this.props.results[option],
                    }) }
                  </Tab>
                )) }
        </Tabs>
      </div>
    )
  }

  /**
   * Return the option that should be initially selected. This is the first
   * option in [[tabPrecedence]] that is present in `this.props.result`.
   */
  private firstOption = (): QueryOptions => {
    for (const [key, _] of this.tabPrecedence) {
      if (this.props.results[key]) {
        return key
      }
    }
  }

  /**
   * Return the component type corresponding to the given option in
   * [[tabPrecedence]].
   */
  private optionComponent = (option: QueryOptions) => {
    for (const [key, component] of this.tabPrecedence) {
      if (key === option) {
        return component
      }
    }
  }

  /**
   * Return the options present in `this.props.results` in the order they are
   * given in [[tabPrecedence]].
   */
  private availableOptions = () => {
    const givenOptions = Object.keys(this.props.results) as QueryOptions[]
    return this
      .tabPrecedence
      .map(([option, _]) => option)
      .filter((option) => givenOptions.indexOf(option) !== -1)
  }

  private handleTabChange = (selected: QueryOptions) => {
    this.setState({ selected })
  }
}

const mapStateToProps = (
  { results }: { results: ResultsReducer.IState },
): IProps => ({
  results: results.results,
})

export default connect(mapStateToProps)(Results)

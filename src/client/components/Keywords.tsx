import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import { IKeywordResult } from '../../shared/types'
import EmotionItem from './EmotionItem'
import { sortByRelevance } from './helpers'

/**
 * A list item that displays the sentiment score for a keyword as a nested item.
 */
export const SentimentScoreItem = ({ score }: { score: number }) => (
  <ListItem
    primaryText="Sentiment score"
    primaryTogglesNestedList={ true }
    nestedItems={ [<ListItem key="score" primaryText={ score } />] }
  />
)

/**
 * Return an array of elements that should be nested items for the given
 * keyword, corresponding to its emotion and sentiment information if they are
 * present.
 */
const getNestedItems = (keyword: IKeywordResult) => {
  const items = []

  if (keyword.emotion) {
    items.push(<EmotionItem key="emotion" emotion={ keyword.emotion } />)
  }

  if (keyword.sentiment) {
    const score = keyword.sentiment.score
    items.push(<SentimentScoreItem key="sentiment" score={ score } />)
  }

  return items
}

/**
 * A component for displaying a list of keyword results sorted in descending
 * order of relevance. If the keywords have emotion or sentiment data attached,
 * it will be rendered as a collapsible sub-list of each keyword item.
 */
const Keywords = ({ keywords }: { keywords: IKeywordResult[] }) => (
  <List>
    { sortByRelevance(keywords).map((keyword, index) => (
      <ListItem
        key={ index }
        primaryText={ keyword.text }
        secondaryText={ `Relevance: ${keyword.relevance}` }
        primaryTogglesNestedList={ true }
        nestedItems={ getNestedItems(keyword) }
      />
    )) }
  </List>
)

export default Keywords

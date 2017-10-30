import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import { IEmotionResult, ISentimentResult } from '../../shared/types'
import EmotionItem from './EmotionItem'

export const SentimentItem = (
  { sentiment }: { sentiment: ISentimentResult },
) => (
  <ListItem
    primaryText={ `Sentiment: ${sentiment.label}` }
    secondaryText={ `Score: ${sentiment.score}` }
  />
)

/**
 * A component to display document-level insights.
 */
const Overview = (
  { emotion, sentiment }:
  { emotion: { document: { emotion: IEmotionResult } },
    sentiment: { document: ISentimentResult } },
) => (
  <List>
    <ListItem primaryText="Overview" />
    { (!emotion ? null : <EmotionItem emotion={ emotion.document.emotion } />) }
    { (!sentiment ? null : <SentimentItem sentiment={ sentiment.document } />) }
  </List>
)

export default Overview

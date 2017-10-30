import { ListItem } from 'material-ui/List'
import * as React from 'react'
import { IEmotionResult } from '../../shared/types'
import { capitalize } from './helpers'

/**
 * Return an array of `[key, score]` pairs corresponding to the keys in the
 * given emotion sorted in descending order of score.
 */
const sortedScores = (emotion: IEmotionResult) => (
  (Object.keys(emotion) as Array<keyof IEmotionResult>)
    .sort((x, y) => emotion[y] - emotion[x])
    .map((key) => [key, emotion[key]] as [keyof IEmotionResult, number])
)

/**
 * A component for displaying an emotion result in a Material-UI `ListItem`. The
 * specific scores for each emotion are displayed in a sub-list which is
 * initially folded.
 */
const EmotionItem = ({ emotion }: { emotion: IEmotionResult }) => (
  <ListItem
    primaryText="Emotion"
    primaryTogglesNestedList={ true }
    nestedItems={ sortedScores(emotion).map(([key, score], index) => (
      <ListItem
        key={ index }
        primaryText={ capitalize(key) }
        secondaryText={ score }
      />
    )) }
  />
)

export default EmotionItem

import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import { IConceptResult } from '../../shared/types'
import { sortByRelevance } from './helpers'

const Concepts = ({ concepts }: { concepts: IConceptResult[] }) => (
  <List>
    { sortByRelevance(concepts).map((concept: IConceptResult, index) => (
      <ListItem
        key={ index }
        primaryText={ concept.text }
        secondaryText={ `Relevance: ${concept.relevance}` }
      />
    )) }
  </List>
)

export default Concepts

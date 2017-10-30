import { List, ListItem } from 'material-ui/List'
import * as React from 'react'
import { ICategoryResult } from '../../shared/types'
import { sortByScore } from './helpers'

/**
 * A component for displaying a list of categories and their scores, sorted in
 * descending order of score.
 */
const Categories = ({ categories }: { categories: ICategoryResult[] }) => (
  <List>
    { sortByScore(categories).map((category, index) => (
      <ListItem
        key={ index }
        primaryText={ category.label }
        secondaryText={ `Score: ${category.score}` }
      />
    )) }
  </List>
)

export default Categories

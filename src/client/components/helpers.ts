/**
 * Return a copy of the given string with the first letter capitalized and the
 * remaining letters unchanged.
 */
export const capitalize = (text: string) => (
  text.charAt(0).toUpperCase() + text.slice(1)
)

// Ideally `items` would have a type something like Array<{ [key]: number }>,
// and then this function could be exposed and replace `sortByRelevance` and
// `sortByScore`, but I'm not sure if that's doable with Typescript's type
// system.
const sortByKey = (items: any[], key: string) => (
  items.slice().sort((x, y) => y[key] - x[key])
)

/**
 * Return a copy of the given array sorted in descending order of relevance.
 */
export const sortByRelevance = (items: Array<{ relevance: number }>) => (
  sortByKey(items, 'relevance')
)

/**
 * Return a copy of the given array sorted in descending order of score.
 */
export const sortByScore = (items: Array<{ score: number }>) => (
  sortByKey(items, 'score')
)

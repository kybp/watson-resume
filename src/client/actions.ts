import { IQueryResults, QueryOptions } from '../shared/types'

/**
 * This module contains action type definitions and action creators. All actions
 * have type [[Actions]], and have a `type` property of type [[TypeKeys]] for
 * dispatching.
 *
 * To add a new action type:
 *
 * 1. Add a type tag to [[TypeKeys]].
 *
 * 2. Define an interface giving the shape of the action. This interface should
 *    have a `type` attribute of the type key you added, as well as any
 *    additional properties.
 *
 * 3. Add the newly defined interface to the [[Actions]] enum.
 *
 * 4. Define an action creator that returns the newly defined interface.
 */

/**
 * The allowed type keys for actions.
 */
export enum TypeKeys {
  BEGIN_LOADING_RESULTS   = 'BEGIN_LOADING_RESULTS',
  FAIL_LOADING_RESULTS    = 'FAIL_LOADING_RESULTS',
  SET_COVER_LETTER_TEXT   = 'SET_COVER_LETTER_TEXT',
  SET_RESUME_TEXT         = 'SET_RESUME_TEXT',
  SUCCEED_LOADING_RESULTS = 'SUCCEED_LOADING_RESULTS',
  TEST_INIT               = 'TEST_INIT',
  TOGGLE_OPTION           = 'TOGGLE_OPTION',
}

/**
 * A union of every action type. All reducers should take an `Actions` as their
 * second argument. Every action creator should return an instance of `Actions`;
 * if you add a new action interface, make sure to add it to this union.
 */
type Actions =
  | IBeginLoadingResults
  | IFailLoadingResults
  | ISetCoverLetterText
  | ISetResumeText
  | ISucceedLoadingResults
  | ITestInit
  | IToggleOption
export default Actions

/**
 * See [[toggleOption]].
 */
interface IToggleOption {
  option: QueryOptions,
  type: TypeKeys.TOGGLE_OPTION,
}

/**
 * Toggle a given [[QueryOptions]].
 */
export const toggleOption = (option: QueryOptions): IToggleOption => ({
  option,
  type: TypeKeys.TOGGLE_OPTION,
})

/**
 * See [[setResumeText]].
 */
interface ISetResumeText {
  text: string
  type: TypeKeys.SET_RESUME_TEXT
}

/**
 * Set the current resume text to be submitted.
 */
export const setResumeText = (text: string): ISetResumeText => ({
  text,
  type: TypeKeys.SET_RESUME_TEXT,
})

/**
 * See [[setCoverLetterText]].
 */
interface ISetCoverLetterText {
  text: string
  type: TypeKeys.SET_COVER_LETTER_TEXT
}

/**
 * Set the current cover letter text to be submitted.
 */
export const setCoverLetterText = (text: string): ISetCoverLetterText => ({
  text,
  type: TypeKeys.SET_COVER_LETTER_TEXT,
})

/**
 * See [[beginLoadingResults]].
 */
interface IBeginLoadingResults {
  type: TypeKeys.BEGIN_LOADING_RESULTS
}

/**
 * Notify the app that a query has been submitted and we are waiting on the
 * response.
 */
export const beginLoadingResults = (): IBeginLoadingResults => ({
  type: TypeKeys.BEGIN_LOADING_RESULTS,
})

/**
 * See [[succeedLoadingResults]].
 */
interface ISucceedLoadingResults {
  results: IQueryResults
  type: TypeKeys.SUCCEED_LOADING_RESULTS
}

/**
 * Notify the app that results have been successfully loaded.
 */
export const succeedLoadingResults = (
  results: IQueryResults,
): ISucceedLoadingResults => ({
  results,
  type: TypeKeys.SUCCEED_LOADING_RESULTS,
})

/**
 * See [[failLoadingResults]].
 */
interface IFailLoadingResults {
  type: TypeKeys.FAIL_LOADING_RESULTS
}

/**
 * Notify the app that a query request failed.
 */
export const failLoadingResults = (): IFailLoadingResults => ({
  type: TypeKeys.FAIL_LOADING_RESULTS,
})

/**
 * See [[testInit]].
 */
interface ITestInit {
  type: TypeKeys.TEST_INIT
}

/**
 * Get a reducer's initial state for tests. This should not be called in
 * application code, and reducers should not handle actions of type
 * [[ITestInit]].
 */
export const testInit = (): ITestInit => ({
  type: TypeKeys.TEST_INIT,
})

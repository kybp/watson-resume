import { QueryOptions } from './types'

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
  SET_COVER_LETTER_TEXT = 'SET_COVER_LETTER_TEXT',
  SET_RESUME_TEXT       = 'SET_RESUME_TEXT',
  TEST_INIT             = 'TEST_INIT',
  TOGGLE_OPTION         = 'TOGGLE_OPTION',
}

/**
 * A union of every action type. All reducers should take an `Actions` as their
 * second argument. Every action creator should return an instance of `Actions`;
 * if you add a new action interface, make sure to add it to this union.
 */
type Actions =
  | ISetCoverLetterText
  | ISetResumeText
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

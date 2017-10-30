import axios from 'axios'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Actions from '../actions'
import { setCoverLetterText, setResumeText } from '../actions'
import { IWatsonQuery } from '../types'
import QueryOptionsSelector from './QueryOptionsSelector'

interface IProps {
  dispatch?: Dispatch<Actions>
  onSubmit: (query: IWatsonQuery) => void
  query?: IWatsonQuery
}

/**
 * A form for users to enter their resumes and cover letters, choose which
 * insights they are interested in, and submit the query to IBM Watson Natural
 * Language Understanding.
 */
const ResumeForm = ({ dispatch, onSubmit, query }: IProps) => {
  const handleCoverLetterChange = (event: any) => {
    dispatch(setCoverLetterText(event.target.value))
  }

  const handleResumeChange = (event: any) => {
    dispatch(setResumeText(event.target.value))
  }

  return (
    <div
      style={ {
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20px',
          width: '100%',
      } }
    >
      <Card
        style={ {
            maxWidth: '80%',
            paddingLeft: '20px',
            paddingRight: '20px',
        } }
      >
        <CardTitle
          title="Submit your cover letter and resume for analysis"
          subtitle="See what your application looks like to IBM Watson"
        />
        <form onSubmit={ () => onSubmit(query) }>
          <TextField
            id="cover-letter-input"
            multiLine={ true }
            rows={ 8 }
            rowsMax={ 8 }
            hintText="Cover Letter"
            value={ query.coverLetter }
            onChange={ handleCoverLetterChange }
          />
          <TextField
            id="resume-input"
            multiLine={ true }
            rows={ 8 }
            rowsMax={ 8 }
            hintText="Resume"
            value={ query.resume }
            onChange={ handleResumeChange }
          />
          <QueryOptionsSelector />
          <CardActions>
            <FlatButton label="Submit" onClick={ () => onSubmit(query) } />
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

const mapStateToProps = (
  { currentQuery }: { currentQuery: IWatsonQuery },
  oldProps: IProps,
): IProps => (
  { ...oldProps, query: currentQuery }
)

export default connect(mapStateToProps)(ResumeForm)

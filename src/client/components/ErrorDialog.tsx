import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Actions, { closeErrorDialog } from '../actions'

interface IProps {
  dispatch?: Dispatch<Actions>
  message?: string
  open?: boolean
}

const ErrorDialog = ({ dispatch, message, open }: IProps) => (
  <Dialog
    title="Error"
    open={ open }
    onRequestClose={ () => dispatch(closeErrorDialog()) }
    actions={ [
      <RaisedButton
        key="key"
        label="Ok"
        primary={ true }
        keyboardFocused={ true }
        onClick={ () => dispatch(closeErrorDialog()) }
      />,
    ] }
  >
    { message }
  </Dialog>
)

const mapStateToProps = (
  { errorDialog }: { errorDialog: { message: string, open: boolean } },
  oldProps: IProps,
): IProps => ({
  message: errorDialog.message,
  open: errorDialog.open,
})

export default connect(mapStateToProps)(ErrorDialog)

import CircularProgress from 'material-ui/CircularProgress'
import * as React from 'react'

const LoadingDisplay = () => (
  <div
    style={ {
        alignItems: 'center',
        display: 'flex',
        height: '80vh',
        justifyContent: 'center',
        width: '100%',
    } }
  >
    <CircularProgress />
  </div>
)

export default LoadingDisplay

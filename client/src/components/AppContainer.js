import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    'html': { 
      backgroundColor: theme.palette.bg,
      width: '100vw',
      overflowX: 'hidden'
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.primary
    }
  },
  root: {
    color: theme.palette.text.primary,
    width: '100%'
  }
  }))

const AppContainer = ({children}) => {
  const classes = useStyles()
  return (
    <Container className={classes.root} >
    {children}
    </Container>
  )
}

export default AppContainer

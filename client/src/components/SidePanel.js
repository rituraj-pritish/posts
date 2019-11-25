import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '290px',
    maxWidth: '300px',
    overflow: 'hidden',
    display: 'inline-block',
    overflowWrap: 'break-word',
    [theme.breakpoints.down('sm')] : {
      display: 'none'
    }
  }
}))

const SidePanel = () => {
  const classes = useStyles()
  return (
    <div className={classes.root} >
      sidepaneleppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
    </div>
  )
}

export default SidePanel

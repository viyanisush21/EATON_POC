import React from 'react'
import Substations from './Components/Substations'
import Grid from '@material-ui/core/Grid'
import * as classes from './App.module.css'

const App = () => {
    return (
        <Grid container spacing={1} className={classes.gridContainer}>
            <Substations />
        </Grid>
    )
}

export default App

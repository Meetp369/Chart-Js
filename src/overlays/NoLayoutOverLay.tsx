import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Inbox } from '@mui/icons-material'
import styles from '../pages/appStyles.module.scss'

const NoLayoutOverLay = (): JSX.Element => {
  return (
    <Grid container height='85vh' justifyContent='center' alignItems='center'>
      <Box className={styles.noLayoutOverLay}>
        <Inbox sx={{ fontSize: 40 }} />
        <Typography variant='h5'>No Charts</Typography>
      </Box>
    </Grid>
  )
}

export default NoLayoutOverLay

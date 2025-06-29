import React from 'react'
import { Grid, Typography, Button, Link, Breadcrumbs } from '@mui/material'
import { Dashboard as DashBoardIcon, Addchart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hook'
import ChartBox from '../../components/ChartBox/ChartBox'
import NoLayoutOverLay from '../../overlays/NoLayoutOverLay'
import { ChartOption } from '../../utils/common.type'

const Dashboard = (): JSX.Element => {
  const charts = useAppSelector(state => state.chart.charts)
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid container item justifyContent='space-between' m={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            color="inherit"
            onClick={() => navigate('/')}
          >
            <DashBoardIcon sx={{ mr: 0.5 }} fontSize="large" />
            <Typography fontSize='large'>DashBoard</Typography>
          </Link>
        </Breadcrumbs>
        <Button startIcon={<Addchart />} onClick={() => { navigate('/chart', { state: { options: {} as ChartOption, isEdit: false } }) }} variant='contained'>Add Chart</Button>
      </Grid>
      <Grid container item columns={2} rowGap='1vh' spacing={1} m={2} alignItems='center' justifyContent='center'>
        {charts.map((item, index) => (<ChartBox options={item} key={item.id} index={index} />))}
        {!charts.length && <NoLayoutOverLay />}
      </Grid>
    </Grid>
  )
}
export default Dashboard

import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts'
import { Button, Grid, Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook'
import ConfigurationPanel from '../../components/ConfigurationPanel/ConfigurationPanel'
import {
  addChart,
  setOptions,
  updateChart
} from '../../redux/ChartSlice/chartSlice'
import { LocationState } from './ChartConfiguration.type'
import styles from '../appStyles.module.scss'

const defaultState = {
  isEdit: false,
  options: {},
  index: 1
}

const ChartConfigure = (): JSX.Element => {
  const location = useLocation()

  const { isEdit, options, index } =
    (location.state as LocationState) || defaultState

  const [chart, setChart] = useState<echarts.ECharts>()
  const chartOptions = useAppSelector((state) => state.chart.options)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const chartContainerRef = useRef<HTMLDivElement>(null!)

  console.log({ chartOptions, chart, isEdit, options })

  const initializeChart = (): void => {
    const initChart = echarts.init(chartContainerRef.current)
    if (chartOptions) {
      initChart.setOption(options || {}, true)
      dispatch(setOptions(options))
    }
    setChart(initChart)
  }

  const renderChart = (): void => chart?.setOption(chartOptions, true)

  const onChartButtonClick = (): void => {
    if (isEdit) {
      dispatch(updateChart({ chartOptions, index }))
    } else {
      dispatch(addChart(chartOptions))
    }
    navigate('/', { replace: true })
  }

  useEffect(() => {
    console.log('useEffect')
    if (!chart) {
      console.log('useEffect !chart')
      initializeChart()
    }
    if (chartOptions) {
      console.log('useEffect chartOptions')
      renderChart()
    }
  }, [chartOptions])

  return (
    <Grid container height='100vh' spacing={2} columns={3}>
      <Grid item xs={2}>
        <Box className={styles.buttonBox}>
          <Button
            variant='contained'
            onClick={() => {
              navigate('/', { replace: true })
            }}
          >
            Cancel
          </Button>
          <Button variant='contained' onClick={onChartButtonClick}>
            {isEdit ? 'Update Chart' : 'Generate Chart'}
          </Button>
        </Box>
        <Grid ref={chartContainerRef} height='90vh' position='relative'/>
      </Grid>

      <ConfigurationPanel
        options={options}
        isEdit={isEdit}
        chartContainer={chart}
      />
    </Grid>
  )
}
export default ChartConfigure

import { Grid } from '@mui/material'
import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'
import styles from '../pages/appStyles.module.scss'

interface customModalType {
  options: echarts.EChartsCoreOption | undefined
}

const CustomModal = ({ options }: customModalType): JSX.Element => {
  const chartContainerRef1 = useRef<HTMLDivElement>(null!)
  let chart: echarts.EChartsType
  useEffect(() => {
    chart = echarts.init(chartContainerRef1.current)
    chart.setOption(options!)
  }, [])
  return (
        <Grid container width='55vw' padding="2vw" justifyContent="center" alignItems="center">
            <Grid ref={chartContainerRef1} className={styles.chartDialogItem}></Grid>
        </Grid>
  )
}

export default CustomModal

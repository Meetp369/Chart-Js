import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Paper, Grid, IconButton, Dialog, Tooltip } from '@mui/material'
import { Edit, Delete, OpenInFullOutlined, ContentCopy } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { deleteChart } from '../../redux/ChartSlice/chartSlice'
import { ChartBoxProps } from './ChartBox.type'
import styles from '../../pages/appStyles.module.scss'
import CustomModal from '../CustomModal'

const ChartBox = ({ options, index }: ChartBoxProps): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const chartContainerRef1 = useRef<HTMLDivElement>(null!)
  const [expand, setExpand] = useState(false)
  const [graph, setGraph] = useState<echarts.ECharts>()
  const [copySuccess, setCopySuccess] = useState(false)

  const initializeChart = (): void => {
    console.log(options)
    const chart = echarts.init(chartContainerRef1.current)
    chart.setOption(options)
    setGraph(chart)
  }

  const handleClose = (): void => {
    setExpand(false)
  }

  const handleCopyToClipboard = (): void => {
    const chartOptions = JSON.stringify(options, null, 2)
    navigator.clipboard.writeText(chartOptions)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  useEffect(() => {
    initializeChart()
  }, [])

  return (
    <Grid item xs={1} data-testid="charts">
      <Paper elevation={3} className={styles.chartBox}>
        <Grid className={styles.editOptionContainer}>
          <IconButton onClick={() => { navigate('chart', { state: { options, isEdit: true, index } }) }} color='primary'>
            <Edit />
          </IconButton>
          <IconButton color='error' onClick={() => { dispatch(deleteChart({ index })) }}>
            <Delete />
          </IconButton>
          <Tooltip title={copySuccess ? 'Copied!' : 'Copy Options'}>
            <IconButton color="success" onClick={handleCopyToClipboard}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <IconButton color="info" onClick={() => {
            setExpand(true)
          }}>
            <OpenInFullOutlined />
          </IconButton>
        </Grid>
        <Grid ref={chartContainerRef1} className={styles.chartBoxItem}></Grid>
      </Paper>
      <Dialog
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={expand}
        maxWidth='lg'
        onClose={handleClose}
      >
        <CustomModal options={graph?.getOption()} />
      </Dialog>
    </Grid>
  )
}

export default ChartBox

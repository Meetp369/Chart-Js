/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { SelectChangeEvent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useAppDispatch } from './redux-hook'
import shortid from 'shortid'
import { setOptions } from '../redux/ChartSlice/chartSlice'
import { ChartOption, ChartTypeOptions, ChartOptionkeys, xAxis, yAxis } from '../utils/common.type'
import { chartTypeId } from '../utils/constants'

const useChartConfiguration = (options: ChartOption) => {
  const dispatch = useAppDispatch()

  const getDataFieldValue = (): string | undefined => {
    if (options.series?.[0].type) {
      const id: number = chartTypeId[options.series?.[0].type as ChartTypeOptions]
      if (id !== 3) {
        return options?.series?.[0]?.data?.join(',')
      } else {
        return JSON.stringify(options?.series?.[0]?.data)
      }
    }
  }
  const [dataField, setDataField] = useState(getDataFieldValue())
  const [radius, setRadius] = useState<number | number[]>(Number(options.series?.[0].radius?.split('%')[0]) || 50)
  const [chartOptions, setChartOptions] = useState(options)
  const [legendEnabled, setLegendEnabled] = useState<boolean>(options?.legend?.data.length > 0 ? true : false)

  useEffect(() => {
    dispatch(setOptions(chartOptions))
  }, [chartOptions, dispatch])

  const onTitleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setChartOptions(prevState => ({
      ...prevState,
      title: {
        ...prevState.title,
        [name]: value
      }
    }))
  }
  const onTitleAlignmentChange = (_event: React.MouseEvent, newTitleAlignment: string) => {
    setChartOptions(prevState => ({
      ...prevState,
      title: {
        ...prevState.title,
        left: newTitleAlignment
      }
    }))
  }

  const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, tooltipValue?: string) => {
    const { value, checked } = event.target
    if (value === 'smooth') {
      setChartOptions(prevState => ({
        ...prevState,
        series: prevState?.series?.map(item => ({ ...item, [value]: checked }))
      }))
    } else {
      setChartOptions(prevState => ({
        ...prevState,
        [value]: {
          trigger: checked ? tooltipValue : ''
        }
      }))
    }
  }

  const onChartTypeChange = (event: SelectChangeEvent<number>) => {
    const type = Number(event.target.value)
    if (type !== 3) {
      setChartOptions({
        id: shortid.generate(),
        xAxis: {},
        yAxis: {},
        series: [
          {
            type: chartTypeId[type],
            id: type
          }
        ]
      })
    } else {
      setChartOptions({
        id: shortid.generate(),
        legend: {},
        series: [
          {
            type: chartTypeId[type],
            id: type,
            radius: radius.toString() + '%'
          }
        ]
      })
    }
  }
  const onAxisTypeChange = (event: SelectChangeEvent) => {
    const { value, name } = event.target
    const key: ChartOptionkeys = name as ChartOptionkeys
    setChartOptions(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[key] as xAxis | yAxis,
        type: value
      }
    }))
  }
  const onAxisFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    const chartField = name.split(' ')
    const key: ChartOptionkeys = chartField[0] as ChartOptionkeys
    setChartOptions(prevState => ({
      ...prevState,
      [chartField[0]]: {
        ...prevState[key] as xAxis | yAxis,
        [chartField[1]]: chartField[1] === 'data' ? value.split(',') : value
      }
    }))
  }
  const onSeriesDataChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, chartType: string, isJson: boolean) => {
    const { value } = event.target
    if (value) {
      setChartOptions(prevState => ({
        ...prevState,
        series: prevState?.series?.map(
          el => el.type === chartType ? { ...el, data: isJson ? JSON.parse(value) : value.split(',') } : el
        )
      }))
      setDataField(value)
    }
  }

  const onLegendHorizontalPositionChange = (_event: React.MouseEvent, newLegendAlignment: string) => {
    setChartOptions(prevState => ({
      ...prevState,
      legend: {
        ...prevState.legend,
        left: newLegendAlignment
      }
    }))
  }

  const onToolBoxHorizontalPositionChange = (_event: React.MouseEvent, newToolBoxAlignment: string) => {
    setChartOptions(prevState => ({
      ...prevState,
      toolbox: {
        ...prevState.toolbox,
        left: newToolBoxAlignment
      }
    }))
  }

  const onLegendVerticalPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setChartOptions(prevState => ({
      ...prevState,
      legend: {
        ...prevState.legend,
        top: value
      }
    }))
  }

  const onLegendLayoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setChartOptions(prevState => ({
      ...prevState,
      legend: {
        ...prevState.legend,
        orient: value
      }
    }))
  }

  const onLegendScrollable = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setChartOptions(prevState => ({
      ...prevState,
      legend: {
        ...prevState.legend,
        type: checked ? 'scroll' : 'plain'
      }
    }))
  }

  const onChartRadiusChange = (_event: Event, newValue: number | number[], chartType: string) => {
    setRadius(newValue)
    setChartOptions(prevState => ({
      ...prevState,
      series: prevState?.series?.map(
        el => el.type === chartType ? { ...el, radius: newValue.toString() + '%' } : el
      )
    }))
  }

  const onDataFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => setDataField(event.target.value)

  const onToolboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setChartOptions(prev => ({
      ...prev,
      toolbox: isChecked
        ? {
            show: true,
            orient: 'vertical',
            top: 'middle',
            feature: {
              saveAsImage: { type: 'png' },
              restore: { show: true },
              dataView: { title: 'raw data' },
              magicType: { type: ['line', 'bar', 'stack'] }
            }
          }
        : { show: false }
    }))
  }

  const onToolboxFieldChange = (e: any) => {
    const { name, value, checked } = e.target
    setChartOptions(prev => {
      const updatedToolbox = {
        ...prev.toolbox,
        show: true,
        orient: prev.toolbox?.orient ?? 'vertical',
        top: prev.toolbox?.top ?? 'middle',
        feature: {
          ...prev.toolbox?.feature
        }
      }

      if (name === 'orient' || name === 'top') {
        updatedToolbox[name] = value
      } else {
        if (!checked) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete updatedToolbox.feature[name]
        } else {
          if (name === 'restore') updatedToolbox.feature.restore = { show: true }
          if (name === 'saveAsImage') updatedToolbox.feature.saveAsImage = { type: 'png' }
          if (name === 'dataView') updatedToolbox.feature.dataView = { title: 'raw data' }
          if (name === 'magicType') updatedToolbox.feature.magicType = { type: ['line', 'bar', 'stack'] }
        }
      }

      return {
        ...prev,
        toolbox: updatedToolbox
      }
    })
  }

  const onUpdateSeriesField = (index: number, key: string, value: any) => {
    setChartOptions((prevOptions) => {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const updatedSeries = [...(prevOptions.series || [])]
      updatedSeries[index] = {
        ...updatedSeries[index],
        [key]: value
      }
      const updatedLegend = legendEnabled
        ? { ...prevOptions.legend, data: updatedSeries.map((s) => s.name).filter(Boolean) }
        : prevOptions.legend

      return {
        ...prevOptions,
        series: updatedSeries,
        legend: updatedLegend
      }
    })
  }

  const onRemoveSeries = (index: number) => {
    setChartOptions((prevOptions) => {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const updatedSeries = [...(prevOptions.series || [])]
      updatedSeries.splice(index, 1)
      return {
        ...prevOptions,
        series: updatedSeries
      }
    })
  }

  const onAddSeries = (chartType: string) => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ...(prevOptions.series || []),
        {
          name: '',
          type: chartType,
          data: [],
          smooth: true,
          stack: '',
          label: { show: false },
          emphasis: { focus: '' }
        }
      ]
    }))
  }

  const onLegendToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setLegendEnabled(checked)
    if (checked) {
      const legendNames = chartOptions.series?.map((s) => s.name).filter(Boolean) ?? []
      setChartOptions((prev) => ({
        ...prev,
        legend: {
          ...(prev.legend ?? {}),
          data: legendNames
        }
      }))
    } else {
      setChartOptions((prev) => {
        const updated = { ...prev }
        delete updated.legend
        return updated
      })
    }
  }

  return {
    onTitleFieldChange,
    onTitleAlignmentChange,
    onSwitchChange,
    onAxisFieldChange,
    onAxisTypeChange,
    onChartTypeChange,
    onSeriesDataChange,
    onLegendHorizontalPositionChange,
    onLegendVerticalPositionChange,
    onLegendLayoutChange,
    onLegendScrollable,
    dataField,
    onDataFieldChange,
    chartOptions,
    radius,
    onChartRadiusChange,
    onToolBoxHorizontalPositionChange,
    onToolboxChange,
    onToolboxFieldChange,
    onUpdateSeriesField,
    onRemoveSeries,
    onAddSeries,
    legendEnabled,
    onLegendToggle
  }
}

export default useChartConfiguration

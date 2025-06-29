import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chartData } from '../../data/chart'
import { ChartSliceInitialState, UpdateActionPayload, DeleteActionPayload, ChartOption } from './chartSlice.type'

const initialState: ChartSliceInitialState = {
  charts: chartData,
  options: {} as ChartOption
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<ChartOption>) => {
      state.charts.push(action.payload)
    },
    updateChart: (state, action: PayloadAction<UpdateActionPayload>) => {
      state.charts[action.payload.index as number] = action.payload.chartOptions
    },
    deleteChart: (state, action: PayloadAction<DeleteActionPayload>) => {
      state.charts.splice(action.payload.index, 1)
    },
    setOptions: (state, action: PayloadAction<ChartOption>) => {
      state.options = action.payload
    }
  }
})

export const { addChart, updateChart, deleteChart, setOptions } = chartSlice.actions

export default chartSlice.reducer

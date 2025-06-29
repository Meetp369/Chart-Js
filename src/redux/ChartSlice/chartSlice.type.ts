import { ChartOption } from '../../utils/common.type'

export type ChartSliceInitialState = {
  charts: ChartOption[]
  options: ChartOption | {}
}

export type UpdateActionPayload = {
  index: number | undefined
  chartOptions: ChartOption
}

export type DeleteActionPayload = {
  index: number
}

export type { ChartOption }

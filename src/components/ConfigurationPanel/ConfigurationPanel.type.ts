import { ChartOption, Series } from '../../utils/common.type'
export type ConfigurationPanelProps = {
  options: ChartOption
  chartContainer: echarts.ECharts | undefined
  isEdit: boolean
}

export interface SeriesConfigItemProps {
  index: number
  seriesItem: Series
  onUpdateSeriesField: (index: number, key: keyof Series, value: any) => void
  onRemoveSeries: (index: number) => void
  showDelete: boolean
}
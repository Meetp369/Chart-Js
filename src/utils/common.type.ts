
export type ChartOption = {
  id?: string
  xAxis?: xAxis
  yAxis?: yAxis
  toolbox?: any
  title?: Title
  legend?: Legend
  series?: Series[]
  tooltip?: Tooltip
}

export type ChartTypeOptions = 'line' | 'bar' | 'pie'

export type ChartOptionkeys = keyof ChartOption

export type xAxis = {
  type?: string
  name?: string
  data?: string[]
}

export type yAxis = {
  type?: string
  name?: string
}

type Title = {
  text?: string
  subtext?: string
  left?: string
}

type Legend = {
  orient?: string
  type?: string
  left?: string
  top?: string
  data?: any
}

export type Series = {
  id?: string | number
  type?: string
  data?: string[] | number[] | Array<{ value: number, name: string }>
  smooth?: boolean
  radius?: string
  name?: string
  stack?: string
  emphasis ?: {
    focus : string
  }
  label ?: {
    show : boolean
  }
}

type Tooltip = {
  trigger: string
}

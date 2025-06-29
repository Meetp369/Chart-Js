import shortid from 'shortid'

type chartType = {
  label?: string
  type?: string
  id?: number
  isAxis?: boolean
  axisType?: string[]
}

export const chart: chartType[] = [
  {
    label: 'Line Chart',
    type: 'line',
    id: 1,
    isAxis: true
  },
  {
    label: 'Bar Chart',
    type: 'bar',
    id: 2,
    isAxis: true
  },
  {
    label: 'Pie Chart',
    type: 'pie',
    id: 3,
    isAxis: false
  },
  {
    axisType: ['category', 'value', 'time', 'log']
  }
]

export const chartData = [
  {
    id: shortid.generate(),
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      top: 'middle',
      feature: {
        saveAsImage: {
          type: 'png'
        },
        restore: {
          show: true
        },
        dataView: {
          title: 'raw data'
        },
        magicType: {
          type: ['line', 'bar', 'stack']
        }
      }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  },
  {
    id: shortid.generate(),
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  },
  {
    id: shortid.generate(),
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  },
  {
    id: shortid.generate(),
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }
]

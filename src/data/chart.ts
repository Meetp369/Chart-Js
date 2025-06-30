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
    xAxis: {
      type: 'category',
      data: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        id: 1,
        smooth: true,
        name: 'Email',
        data: [
          120,
          132,
          101,
          134,
          90,
          230,
          210
        ],
        stack: ''
      },
      {
        name: 'Union Ads',
        type: 'line',
        data: [
          220,
          182,
          191,
          234,
          290,
          330,
          310
        ],
        smooth: true,
        stack: '',
        label: {
          show: false
        },
        emphasis: {
          focus: ''
        }
      },
      {
        name: 'Video Ads',
        type: 'line',
        data: [
          150,
          232,
          201,
          154,
          190,
          330,
          410
        ],
        smooth: true,
        stack: '',
        label: {
          show: false
        },
        emphasis: {
          focus: ''
        }
      },
      {
        name: 'Direct',
        type: 'line',
        data: [
          320,
          332,
          301,
          334,
          390,
          330,
          320
        ],
        smooth: true,
        stack: '',
        label: {
          show: false
        },
        emphasis: {
          focus: ''
        }
      },
      {
        name: 'Search Engine',
        type: 'line',
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320
        ],
        smooth: true,
        stack: '',
        label: {
          show: false
        },
        emphasis: {
          focus: ''
        }
      }
    ],
    title: {
      text: 'Stacked Line',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis'
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
          type: [
            'line',
            'bar',
            'stack'
          ]
        }
      }
    }
  },
  {
    id: shortid.generate(),
    title: {
      text: 'Referer of a Website',
      subtext: 'Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      top: 'bottom'
    },
    series: [
      {
        radius: '60%',
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
    xAxis: {
      type: 'category',
      data: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ]
    },
    yAxis: {
      type: 'value',
      name: ''
    },
    series: [
      {
        type: 'bar',
        id: 2,
        name: 'Direct',
        data: [
          320,
          302,
          301,
          334,
          390,
          330,
          320
        ],
        stack: 'total',
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Mail Ad',
        type: 'bar',
        data: [
          120,
          132,
          101,
          134,
          90,
          230,
          210
        ],
        smooth: true,
        stack: 'total',
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Affiliate Ad',
        type: 'bar',
        data: [
          220,
          182,
          191,
          234,
          290,
          330,
          310
        ],
        smooth: true,
        stack: 'total',
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Video Ad',
        type: 'bar',
        data: [
          150,
          212,
          201,
          154,
          190,
          330,
          410
        ],
        smooth: true,
        stack: 'total',
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Search Engine',
        type: 'bar',
        data: [
          820,
          832,
          901,
          934,
          1290,
          1330,
          1320
        ],
        smooth: true,
        stack: 'total',
        emphasis: {
          focus: 'series'
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [
        'Direct',
        'Mail Ad',
        'Affiliate Ad',
        'Video Ad',
        'Search Engine'
      ]
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
          type: [
            'line',
            'bar',
            'stack'
          ]
        }
      }
    }
  }
]

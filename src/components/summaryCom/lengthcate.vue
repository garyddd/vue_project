<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const data = store.state.name
// 获取map_alpha--画图数据
const map_alpha: { [key: string]: Record<string, unknown> } = {}
const map_beta: { [key: string]: Record<string, unknown> } = {}

Object.values(data).forEach(
  (item: { CDR3: string; Cate: string; Gene: string }) => {
    if (item.Gene === 'TRA') {
      if (!Object.prototype.hasOwnProperty.call(map_alpha, item.Cate)) {
        if (item.CDR3.length >= 7 && item.CDR3.length <= 20) {
          map_alpha[item.Cate] = {}
          map_alpha[item.Cate][item.CDR3.length] = 1
        }
      } else {
        if (item.CDR3.length >= 7 && item.CDR3.length <= 20) {
          if (
            !Object.prototype.hasOwnProperty.call(
              map_alpha[item.Cate],
              item.CDR3.length
            )
          ) {
            map_alpha[item.Cate][item.CDR3.length] = 1
          } else {
            map_alpha[item.Cate][item.CDR3.length] += 1
          }
        }
      }
    } else {
      if (!Object.prototype.hasOwnProperty.call(map_beta, item.Cate)) {
        if (item.CDR3.length >= 7 && item.CDR3.length <= 23) {
          map_beta[item.Cate] = {}
          map_beta[item.Cate][item.CDR3.length] = 1
        }
      } else {
        if (item.CDR3.length >= 7 && item.CDR3.length <= 23) {
          if (
            !Object.prototype.hasOwnProperty.call(
              map_beta[item.Cate],
              item.CDR3.length
            )
          ) {
            map_beta[item.Cate][item.CDR3.length] = 1
          } else {
            map_beta[item.Cate][item.CDR3.length] += 1
          }
        }
      }
    }
  }
)
// 处理map_alpha对象中所有x标签 不存在置为0
const xdata = new Set()
for (var k = 0; k < Object.keys(map_alpha).length; k++) {
  for (var j = 0; j < Object.keys(Object.values(map_alpha)[k]).length; j++) {
    // console.log(j)
    xdata.add(Number(Object.keys(Object.values(map_alpha)[k])[j]))
  }
}
for (let x of xdata) {
  for (var l = 0; l < Object.keys(map_alpha).length; l++) {
    if (Object.keys(Object.values(map_alpha)[l]).indexOf(String(x)) < 0) {
      Object.values(map_alpha)[l][x] = 0
    }
  }
}

const xdata_beta = new Set()
for (var kb = 0; kb < Object.keys(map_beta).length; kb++) {
  for (var jb = 0; jb < Object.keys(Object.values(map_beta)[kb]).length; jb++) {
    // console.log(j)
    xdata_beta.add(Number(Object.keys(Object.values(map_beta)[kb])[jb]))
  }
}
for (let xb of xdata_beta) {
  for (var lb = 0; lb < Object.keys(map_beta).length; lb++) {
    if (Object.keys(Object.values(map_beta)[lb]).indexOf(String(xb)) < 0) {
      Object.values(map_beta)[lb][xb] = 0
    }
  }
}
const legend = new Set()

const seriesa: {
  name: string
  type: string
  stack: string
  smooth: boolean
  data: Record<string, unknown>
}[] = []
for (var i = 0; i < Object.keys(map_alpha).length; i++) {
  seriesa.push({
    name: Object.keys(map_alpha)[i],
    type: 'bar',
    smooth: true,
    xAxisIndex: 0,
    yAxisIndex: 0,
    emphasis: {
      focus: 'series',
    },
    data: Object.values(Object.values(map_alpha)[i]),
  }),
    legend.add(Object.keys(map_alpha)[i])
}

for (var ib = 0; ib < Object.keys(map_beta).length; ib++) {
  seriesa.push({
    name: Object.keys(map_beta)[ib],
    type: 'bar',
    smooth: true,
    xAxisIndex: 1,
    yAxisIndex: 1,
    emphasis: {
      focus: 'series',
    },
    data: Object.values(Object.values(map_beta)[ib]),
  }),
    legend.add(Object.keys(map_beta)[ib])
}
// console.log(legend)
function sequence(a: number, b: number) {
  if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  } else {
    return 0
  }
}
const xd = Array.from(xdata).sort(sequence)
console.log(xd)
const xdb = Array.from(xdata_beta).sort(sequence)

const sizeValue = '55%'
const option = {
  // title: { text: 'Length of CDR3', x: 'center', y: 'top' },
  // toolbox: {
  //   show: true,
  //   orient: 'vertical',
  //   right: '0%',
  //   top: '15%',
  //   feature: {
  //     mark: { show: true },
  //     dataView: { show: true, title: 'dataView', readOnly: true },
  //     magicType: {
  //       show: true,
  //       title: { line: 'switch to line', bar: 'switch to bar' },
  //       type: ['line', 'bar'],
  //     },
  //     restore: { show: true, title: 'refresh' },
  //     saveAsImage: { show: true, title: 'save' },
  //   },
  // },
  tooltip: {
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: [{ right: sizeValue }, { left: sizeValue }],
  legend: {
    orient: 'horizontal',
    data: Array.from(legend),
    // x: '80%',
    y: '10%',
  },
  xAxis: [
    {
      type: 'category',
      data: xd,
      gridIndex: 0,
      name: 'α chain',
      nameLocation: 'middle',
      nameTextStyle: {
        color: 'black',
        fontSize: 16,
        padding: 10,
      },
      axisLine: {
        lineStyle: {
          color: '#000000',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#000000',
        },
      },
    },
    {
      type: 'category',
      data: xdb,
      gridIndex: 1,
      name: 'β chain',
      nameLocation: 'middle',
      nameTextStyle: {
        color: 'black',
        fontSize: 16,
        padding: 10,
      },
      axisLine: {
        lineStyle: {
          color: '#000000',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#000000',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      gridIndex: 0,
      axisLabel: {
        textStyle: {
          fontSize: '10',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#000000',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#000000',
        },
      },
    },
    {
      type: 'value',
      gridIndex: 1,
      axisLabel: {
        textStyle: {
          fontSize: '10',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#000000',
        },
      },
      axisTick: {
        lineStyle: {
          color: '#000000',
        },
      },
    },
  ],

  series: seriesa,
}
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();

const myCharts = ref<any>()
onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!)
  myCharts.value.setOption(option)
  myCharts.value.setOption(option)
})
</script>
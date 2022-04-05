<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const data = store.state.name
// 获取map--画图数据
const map: { [key: string]: Record<string, unknown> } = {}
Object.values(data).forEach((item: { CDR3: string; Species: string; Gene: string }) => {
  if (item.Gene === 'TRA') {
    if (!Object.prototype.hasOwnProperty.call(map, item.Species)) {
      map[item.Species] = {}
      map[item.Species][item.CDR3.length] = 1
    } else {
      if (
        !Object.prototype.hasOwnProperty.call(
          map[item.Species],
          item.CDR3.length
        )
      ) {
        map[item.Species][item.CDR3.length] = 1
      } else {
        map[item.Species][item.CDR3.length] += 1
      }
    }
  }
})
// 处理map对象中所有x标签 不存在置为0
const xdata = new Set()
for (var k = 0; k < Object.keys(map).length; k++) {
  for (var j = 0; j < Object.keys(Object.values(map)[k]).length; j++) {
    // console.log(j)
    xdata.add(Number(Object.keys(Object.values(map)[k])[j]))
  }
}
for (let x of xdata) {
  for (var l = 0; l < Object.keys(map).length; l++) {
    if (Object.keys(Object.values(map)[l]).indexOf(String(x)) < 0) {
      Object.values(map)[l][x] = 0
    }
  }
}
const legend: string[] = []

const series: {
  name: string
  type: string
  stack: string
  smooth: boolean
  data: Record<string, unknown>
}[] = []
for (var i = 0; i < Object.keys(map).length; i++) {
  series.push({
    name: Object.keys(map)[i],
    type: 'line',
    smooth: true,
    emphasis: {
      focus: 'series',
    },
    data: Object.values(Object.values(map)[i]),
  }),
    legend.push(Object.keys(map)[i])
}
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
const option = {
  title: { text: 'Length of CDR3α', x: 'center', y: 'top' },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: '0%',
    top: '15%',
    feature: {
      mark: { show: true },
      dataView: { show: true, title:'dataView',readOnly: true },
      magicType: { show: true, title:{line:'switch to line',bar:'switch to bar'},type: ['line', 'bar'] },
      restore: { show: true, title: 'refresh' },
      saveAsImage: { show: true, title:'save'  },
    },
  },
  tooltip: {
    axisPointer: {
      type: 'shadow',
    },
  },

  grid: {
    left: '10%',
    // right: '30%',
    bottom: '3%',
    containLabel: true,
  },
  legend: {
    orient: 'vertical',
    data: legend,
    x: '60%',
    y: '15%',
  },
  xAxis: {
    type: 'category',
    data: xd,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: '10',
      },
    },
  },

  series: series,
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
<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { ref } from 'vue'
const data = store.state.name

const map: { [key: string]: number } = {}
Object.values(data).forEach((item: { CDR3: string }) => {
  if (!Object.prototype.hasOwnProperty.call(map, item.CDR3.length)) {
    map[item.CDR3.length] = 1
  } else {
    map[item.CDR3.length] += 1
  }
})
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();

const myCharts = ref<any>()
setTimeout(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!)
  myCharts.value.setOption({
    title: { text: 'Length of CDR3β' },
    // tooltip: {
    //   trigger: 'axis',
    // },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: '0%',
      top: '15%',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '30%',
      right: '30%',
      bottom: '3%',
      containLabel: true,
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
    },
    xAxis: {
      // data: Object.keys(map),
      data: ['2012', '2013', '2014', '2015', '2016'],
    },
    yAxis: {
      type: 'value',
      // axisLabel: {
      //   show: true,
      //   textStyle: {
      //     fontSize: '10',
      //   },
      // },
    },
    series: [
      // {
      //   name: 'length',
      //   type: 'line',

      //   smooth: true,
      //   // data: Object.values(map),
      // },
      {
        name: 'Forest',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: 'Steppe',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: 'Desert',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190],
      },
      {
        name: 'Wetland',
        type: 'bar',
        emphasis: {
          focus: 'series',
        },
        data: [98, 77, 101, 99, 40],
      },
    ],
  })
})
</script>
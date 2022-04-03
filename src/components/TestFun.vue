<template>
  <div ref="myChart"
       :style="{ width: '400px', height: '400px' ,fontSize:'5px'}"></div>
  <echartsCom ></echartsCom>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import echartsCom from 'H:/vue/newvue/src/components/Test/ecahrtsCom.vue'

const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();

// console.log(myChart)
const myCharts = ref<any>()
setTimeout(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!)
  myCharts.value.setOption({
    title: { text: 'Length of CDR3β' },
    tooltip: {},
    xAxis: {
      data: [],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show:true,
        textStyle:{
          fontSize:'10'
        }
      }
    },
    series: [
      {
        name: 'Test',
        type: 'bar',
        data: [],
      },
    ],
  })
}, 10)
provide('map1','test')
axios.get('/test.json').then((res) => {
  const map: { [key: string]: number } = {}
  res.data.forEach((item: { CDR3b: string }) => {
    if (!Object.prototype.hasOwnProperty.call(map, item.CDR3b.length)) {
      map[item.CDR3b.length] = 1
    } else {
      map[item.CDR3b.length] += 1

    }
  })
  provide('map', map)
  myCharts.value.setOption({
    xAxis: {
      data: Object.keys(map),
    },
    series: {
      name: 'length',
      data: Object.values(map),
    },
  })
})

</script>
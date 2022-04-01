<template>
  <div ref="myChart"
       :style="{ width: '400px', height: '400px' ,fontSize:'5px'}"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'


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
const allData = ref([])
axios.get('/test.json').then((res) => {
  const arrNew: Array<string> = []
  const map: { [key: string]: number } = {}
  res.data.forEach((item: { CDR3b: string }) => {
    if (!Object.prototype.hasOwnProperty.call(map, item.CDR3b.length)) {
      map[item.CDR3b.length] = 1
    } else {
      map[item.CDR3b.length] += 1

    }
  })

  console.log(Object.values(map))
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
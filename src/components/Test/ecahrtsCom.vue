<template>
<div ref="myChart"
       :style="{ width: '400px', height: '400px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, inject, ref } from 'vue'
export default defineComponent({
  name: 'echartsCom',
  // props: ['map'],
  setup() {
    // console.log(a)
    const map = inject('map')
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
          data: Object.keys(map),
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
        series: [
          {
            name: 'length',
            data: Object.values(map),
          },
        ],
      })
    }, 10)
    return{
      myChart
    }
  },
})
</script>
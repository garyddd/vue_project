<template>
  <div ref="myChart"
       id='piePaired'
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const data = store.state.name
const data1 = store.state.name1

const plotData = { df: [] }

plotData.df.push({
  value: Object.values(data).length,
  name: 'Single β',
})
plotData.df.push({
  value: Object.values(data1).length,
  name: 'αβ paired',
})
let formatNumber = (num) => num.toString().replace(/(?=(\B)(\d{3})+$)/g, ',')
const option = {
  title: [
    {
      text: 'Category',
      left: 'center',
      top: '45%',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
  ],
  tooltip: {
    trigger: 'item',
  },
  color: ['rgb(255,230,128)', 'rgb(255,128,128)'],
  series: [
    {
      name: 'Records',
      type: 'pie',
      radius: [50, 100],
      data: plotData.df,
      startAngle: '50',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
      label: {
        formatter: '{name|{b}}\n{value|{d}%}',
        rich: { value: { fontSize: 10, color: '#fff' } },
        textStyle: {
          color: '#ffffff',
        },
      },
      labelLine: {
        length: 10,
        length2: 0,
      },
    },
  ],
}
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
onMounted(() => {
  // 绘制图表
  myCharts.value = echarts.init(myChart.value!)
  myCharts.value.setOption(option)
  // myCharts.value.setOption(option)
  const chartDom = document.getElementById('piePaired')
  const chartObserver = new ResizeObserver(() => {
    myCharts.value.resize()
  })
  chartObserver.observe(chartDom)
})
</script>
<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '500px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const data = store.state.name2

const option = {
  title: {
    text: 'Human TCR α chain (top50%)',
    left: '4%',
    textStyle: {
      fontStyle: 'oblique',
    },
    subtext: 'MAIT    |    NKT',
    subtextStyle: {
      // fontStyle: 'italic',
      fontWeight:'bold',
    },
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  toolbox: {
    show: true,
    orient: 'horizontal',
    right: '0%',
    top: '0%',
    feature: {
      mark: { show: true },
      dataView: { show: true, title: 'dataView', readOnly: true },
      saveAsImage: { show: true, title: 'save' },
    },
  },
  series: [
    {
      name:'First',
      type: 'sankey',
      layout: 'none',
      width: '20%',
      left: '4%',
      nodeGap: 10,
      top: '10%',
      emphasis: {
        focus: 'adjacency',
      },
      data: Object.values(data)['0']['MAITGene'],
      links: Object.values(data)['0']['MAIT'],
      nodeAlign: 'right',
      lineStyle: {
        color: 'source',
        curveness: 0.5,
      },
    },
    {
      type: 'sankey',
      layout: 'none',
      nodeGap: 10,
      width: '20%',
      left: '37%',
      top: '10%',
      emphasis: {
        focus: 'adjacency',
      },
      data: Object.values(data)['0']['NKTGene'],
      links: Object.values(data)['0']['NKT'],
      nodeAlign: 'right',
      lineStyle: {
        color: 'source',
        curveness: 0.5,
      },
    },
  ],
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
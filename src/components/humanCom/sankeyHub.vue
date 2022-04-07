<template>
  <div ref="myChart"
       style=" width: 100%; height: 500px; font-size:25px"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const data = store.state.name3
// const map_sankey ={source:[],target:[],value:[]}
const geneList = new Set()
const links: { source: string; target: string; value: number }[] = []
const dataG: { name: string }[] = []
Object.values(data).forEach((item) => {
  links.push({
    source: item.source,
    target: item.target,
    value: item.value,
  })
  geneList.add(item.source)
  geneList.add(item.target)
})
geneList.forEach((item) => {
  dataG.push({
    name: item,
  })
})
const option = {
  title: {
    text: 'Gene Usage',
    x: 'center',
    y: 'top',
    subtext: 'Human TCR β chain (top50%)',
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
      type: 'sankey',
      layout: 'none',
      width: '20%',
      left: '4%',
      emphasis: {
        focus: 'adjacency',
      },
      data: dataG,
      links: links,
      nodeAlign: 'right',
      lineStyle: {
        color: 'source',
        curveness: 0.5,
      },
    },
    {
      type: 'sankey',
      layout: 'none',
      width: '20%',
      left: '37%',
      emphasis: {
        focus: 'adjacency',
      },
      data: dataG,
      links: links,
      nodeAlign: 'right',
      lineStyle: {
        color: 'source',
        curveness: 0.5,
      },
    },
    {
      type: 'sankey',
      layout: 'none',
      width: '20%',
      left: '70%',
      emphasis: {
        focus: 'adjacency',
      },
      data: dataG,
      links: links,
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
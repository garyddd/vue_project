<template>
  <div id='test1'
       ref="myChart"
       :style="{ width: '100%', height: '600px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const data = store.state.name5
// Object.values(data)['0'].nodes.forEach(function (node) {
//   node.symbolSize = 5
// })
const option = {
  title: {
    text: 'CDR3 sequences graph View by length',
    subtext: 'α chain    |    β chain      Hamming Distance = 1   (scroll to zoom)',
    left: '4%',
    textStyle: {
      fontStyle: 'oblique',
    },
    subtextStyle: {
      // fontStyle: 'italic',
      fontWeight: 'bold',
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
    top: '5%',
    feature: {
      mark: { show: true },
      dataView: { show: true, title: 'dataView', readOnly: true },
      saveAsImage: { show: true, title: 'save' },
    },
  },
  legend: [
    {
      // selectedMode: 'single',
      data: Object.values(data)['0'].categories.map(function (a) {
        return a.name
      }),
      top:'10%',
    },
  ],
  series: [
    {
      name: 'CDR3α',
      type: 'graph',
      layout: 'force',
      focusNodeAdjacency:true,
      data: Object.values(data)['0'].nodes,
      links: Object.values(data)['0'].links,
      categories: Object.values(data)['0'].categories,
      roam: true,
      label: {
        position: 'right',
      },
      force: {
        repulsion: 10,
      },
      tooltip: {
        formatter: function (params) {
          return params.dataType == 'node' ? params.name : ''
        },
      },
    },
  ],
}
console.log(option.series)
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();

const myCharts = ref<any>()
onMounted(() => {
  // 绘制图表
  let myChart = echarts.init(document.getElementById('test1'))
  myChart.setOption(option)
  // myCharts.value.setOption(option)
})
</script>
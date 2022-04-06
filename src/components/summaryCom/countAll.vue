<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const data = store.state.name
const map_gene: { [key: string]: number } = {}
const map_species: { [key: string]: number } = {}
const map_cate: { [key: string]: number } = {}
Object.values(data).forEach((item: { Species: string; Gene: string; Cate: string }) => {
    if (!Object.prototype.hasOwnProperty.call(map_species, item.Species)) {
      map_species[item.Species] = 1
    } else {
      map_species[item.Species] += 1
    }
    if (!Object.prototype.hasOwnProperty.call(map_gene, item.Gene)) {
      map_gene[item.Gene] = 1
    } else {
      map_gene[item.Gene] += 1
    }
    if (!Object.prototype.hasOwnProperty.call(map_cate, item.Cate)) {
      map_cate[item.Cate] = 1
    } else {
      map_cate[item.Cate] += 1
    }
  }
)
const plotData = { species: [], gene: [], cate: [] }
for (var i = 0; i < Object.keys(map_species).length; i++) {
  plotData.species.push({
    value: Object.values(map_species)[i],
    name: Object.keys(map_species)[i],
  })
}
for (var j = 0; j < Object.keys(map_gene).length; j++) {
  plotData.gene.push({
    value: Object.values(map_gene)[j],
    name: Object.keys(map_gene)[j],
  })
}
for (var k = 0; k < Object.keys(map_cate).length; k++) {
  plotData.cate.push({
    value: Object.values(map_cate)[k],
    name: Object.keys(map_cate)[k],
  })
}

const option = {
  title: {
    text: 'All Records',
    subtext: 'Numbers : ' + Object.values(data).length,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  toolbox: {
    show: true,
    orient: 'horizontal',
    right: '0%',
    top: '0%',
    feature: {
      mark: { show: true },
      dataView: { show: true, title:'dataView',readOnly: false },
      saveAsImage: { show: true, title:'save'  },
    },
  },
  series: [
    {
      name: 'Records',
      type: 'pie',
      radius: '50%',
      center: ['50%', '50%'],
      data: plotData.species,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    {
      name: 'Records',
      type: 'pie',
      radius: '50%',
      center: ['80%', '50%'],
      data: plotData.gene,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    {
      name: 'Records',
      type: 'pie',
      radius: '50%',
      center: ['20%', '50%'],
      data: plotData.cate,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
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
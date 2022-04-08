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
const map_cate: { [key: string]: number } = {}
let counthu = 0
Object.values(data).forEach(
  (item: { Species: string; Gene: string; Cate: string }) => {
    if (item.Species == 'Human') {
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
      counthu++
    }
  }
)

const plotData = { gene: [], cate: [] }
const df_gene = { name: [], value: [] }

for (var j = 0; j < Object.keys(map_gene).length; j++) {
  plotData.gene.push({
    value: Object.values(map_gene)[j],
    name: Object.keys(map_gene)[j],
  })
  df_gene.name.push(Object.keys(map_gene)[j])
  df_gene.value.push(Object.values(map_gene)[j])
}
df_gene.value.push(4758)
df_gene.name.push('paired')
for (var k = 0; k < Object.keys(map_cate).length; k++) {
  plotData.cate.push({
    value: Object.values(map_cate)[k],
    name: Object.keys(map_cate)[k],
  })
}
const option = {
  title: {
    text: 'All Records of Human',
    subtext: 'Numbers : ' + counthu,
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
      dataView: { show: true, title: 'dataView', readOnly: false },
      saveAsImage: { show: true, title: 'save' },
    },
  },
  xAxis: { type: 'value' },
  yAxis: { data: df_gene.name },
  series: [
    {
      name: 'Records',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '20%'],
      // width: '80%',
      // height: '80%',
      data: plotData.gene,
      center: ['80%', '35%'],
      startAngle: '-60',
      label: {
        position: 'inner',
      },
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
      radius: ['30%', '45%'],

      // width: '80%',
      // height: '80%',
      center: ['80%', '35%'],
      data: plotData.cate,
      startAngle: '120',
      // label: {
      //   formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
      //   backgroundColor: 'white',
      //   borderColor: '#8C8D8E',
      //   borderWidth: 1,
      //   borderRadius: 4,
      //   rich: {
      //     a: {
      //       color: '#6E7079',
      //       lineHeight: 22,
      //       align: 'center',
      //     },
      //     hr: {
      //       borderColor: '#8C8D8E',
      //       width: '100%',
      //       borderWidth: 1,
      //       height: 0,
      //     },
      //     b: {
      //       color: '#4C5058',
      //       fontSize: 14,
      //       fontWeight: 'bold',
      //       lineHeight: 33,
      //     },
      //     per: {
      //       color: '#fff',
      //       backgroundColor: '#4C5058',
      //       padding: [3, 4],
      //       borderRadius: 4,
      //     },
      //   },
      // },
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
      type: 'bar',
      data: df_gene.value,
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
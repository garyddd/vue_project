<template>
  <div ref="myChart"
       :id='countLabel'
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  countLabel: String,
})

const label_obj = { Cate: 5, Gene: 3, Species: 4 }
const colors = ref()
if (props.countLabel === 'Cate') {
  colors.value = ['#5470c6', '#91cc75', '#fac858']
}
if (props.countLabel === 'Species') {
  colors.value = ['#ee6666', '#73c0de', '#3ba272']
}
if (props.countLabel === 'Gene') {
  colors.value = ['#fc8452', '#9a60b4']
}
const data = store.state.name
const map_data: { [key: string]: number } = {}
Object.values(data).forEach((item) => {
  if (
    !Object.prototype.hasOwnProperty.call(
      map_data,
      item[label_obj[props.countLabel]]
    )
  ) {
    map_data[item[label_obj[props.countLabel]]] = 1
  } else {
    map_data[item[label_obj[props.countLabel]]] += 1
  }
})
const plotData = { df: [] }

for (var j = 0; j < Object.keys(map_data).length; j++) {
  plotData.df.push({
    value: Object.values(map_data)[j],
    name: Object.keys(map_data)[j],
  })
}
const textName = { Species: 'Species', Gene: 'Chain', Cate: 'Cell type' }

let formatNumber = (num) => num.toString().replace(/(?=(\B)(\d{3})+$)/g, ',')
const option = {
  title: [
    {
      // text: `{name|Total}\n{val|${formatNumber(Object.values(data).length)}}`,
      text: textName[props.countLabel],
      left: 'center',
      top: '45%',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
      },
      // top: '38%',
      // textStyle: {
      //   rich: {
      //     name: {
      //       fontSize: 14,
      //       color: '#ffffff',
      //       padding: [10, 0],
      //     },
      //     val: {
      //       fontSize: 18,
      //       fontWeight: 'bold',
      //       color: '#ffffff',
      //     },
      //   },
    },
  ],
  color: colors.value,
  tooltip: {
    trigger: 'item',
  },

  series: [
    {
      name: 'Records',
      type: 'pie',
      radius: [50, 100],
      data: plotData.df,
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
        rich: { value: { fontSize: 10, color: '#ffffff' } },
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
  const chartDom = document.getElementById(props.countLabel)
  const chartObserver = new ResizeObserver(() => {
    myCharts.value.resize()
  })
  chartObserver.observe(chartDom)
})
</script>
<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  species: String,
})
const data = store.state.name
const data1 = props.species === 'Human' ? store.state.name1 : []
const map_gene: { [key: string]: number } = {}
const map_cate: { [key: string]: number } = {}
let counthu = 0
Object.values(data).forEach((item) => {
  if (item[4] == props.species) {
    if (!Object.prototype.hasOwnProperty.call(map_gene, item[3])) {
      map_gene[item[3]] = 1
    } else {
      map_gene[item[3]] += 1
    }
    if (!Object.prototype.hasOwnProperty.call(map_cate, item[5])) {
      map_cate[item[5]] = 1
    } else {
      map_cate[item[5]] += 1
    }
    counthu++
  }
})
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
for (var k = 0; k < Object.keys(map_cate).length; k++) {
  plotData.cate.push({
    value: Object.values(map_cate)[k],
    name: Object.keys(map_cate)[k],
  })
}
let formatNumber = (num) => num.toString().replace(/(?=(\B)(\d{3})+$)/g, ',')
const gaugeData = [
  {
    value: (counthu / (Object.values(data1).length + counthu)) * 100,
    name: 'Single β',
    title: {
      offsetCenter: ['0%', '20%'],
      color: '#ffffff',
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '40%'],
    },
  },
  {
    value:
      (Object.values(data1).length / (Object.values(data1).length + counthu)) *
      100,
    name: 'α β Paired',
    title: {
      offsetCenter: ['0%', '-30%'],
      color: '#ffffff',
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '-10%'],
    },
  },
]

const option = {
  tooltip: {
    trigger: 'item',
  },
  legeng: {
    textStyle: {
      color: '#ffffff',
    },
  },
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      radius: '75%',
      center: ['50%', '50%'],
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
        },
      },
      axisLine: {
        lineStyle: {
          width: 40,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      tooltip: {
        formatter: function (val) {
          return (
            val.name +
            '----' +
            formatNumber(
              (
                (val.value * (Object.values(data1).length + counthu)) /
                100
              ).toFixed(0)
            )
          )
        },
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: 'auto',
        borderColor: 'auto',

        borderRadius: 20,
        borderWidth: 1,
        formatter: function (value) {
          return formatNumber(
            ((value * (Object.values(data1).length + counthu)) / 100).toFixed(0)
          )
        },
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
  myCharts.value.setOption(option)
})
</script>
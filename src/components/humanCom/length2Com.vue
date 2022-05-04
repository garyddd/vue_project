<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px',margin:'auto'}"></div>

</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { reactive, ref, defineProps } from 'vue'
const props = defineProps({
  classID: String,
})

const colors = ref()
if (props.classID === 'cell') {
  colors.value = ['#5470c6', '#91cc75', '#fac858']
}
if (props.classID === 'spec') {
  colors.value = ['#ee6666', '#73c0de', '#3ba272']
}
const path =
  props.classID === 'cell' ? './lengthData/cate.json' : './lengthData/spec.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
axios.get(path).then((res) => {
  const legend = new Set()
  const seriesa: {
    name: string
    type: string
    stack: string
    smooth: boolean
    data: Record<string, unknown>
  }[] = []

  const max_a = ref(0)
  const max_b = ref(0)
  for (var i = 0; i < Object.keys(res.data.TRA[0]).length; i++) {
    seriesa.push({
      name: Object.keys(res.data.TRA[0])[i],
      type: 'bar',
      smooth: true,
      xAxisIndex: 0,
      yAxisIndex: 0,
      emphasis: {
        focus: 'series',
      },
      data: Object.values(Object.values(res.data.TRA[0])[i]),
    }),
      legend.add(Object.keys(res.data.TRA[0])[i])
    max_a.value = Math.max(
      max_a.value,
      Math.ceil(
        Object.values(Object.values(res.data.TRA[0])[i]).sort()[
          Object.values(Object.values(res.data.TRA[0])[i]).length - 1
        ] * 10
      ) / 10
    )
  }

  for (var ib = 0; ib < Object.keys(res.data.TRB[0]).length; ib++) {
    seriesa.push({
      name: Object.keys(res.data.TRB[0])[ib],
      type: 'bar',
      smooth: true,
      xAxisIndex: 1,
      yAxisIndex: 1,
      emphasis: {
        focus: 'series',
      },
      data: Object.values(Object.values(res.data.TRB[0])[ib]),
    }),
      legend.add(Object.keys(res.data.TRB[0])[ib])
    max_b.value = Math.max(
      max_b.value,
      Math.ceil(
        Object.values(Object.values(res.data.TRB[0])[ib]).sort()[
          Object.values(Object.values(res.data.TRB[0])[ib]).length - 1
        ] * 10
      ) / 10
    )
  }
  const sizeValue = '55%'
  const option = {
    tooltip: {
      // show: false,
    },
    grid: [{ right: sizeValue }, { left: sizeValue }],

    legend: {
      orient: 'horizontal',
      data: Array.from(legend),
      // x: '80%',
      y: '5%',
      textStyle: {
        color: '#000000',
      },
    },
    xAxis: [
      {
        type: 'category',
        data: Object.keys(res.data.TRA[0][Object.keys(res.data.TRA[0])[0]]),
        gridIndex: 0,
        name: 'α chain',
        nameLocation: 'middle',
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 10,
        },
        axisLine: {
          lineStyle: {
            color: ' #000000',
          },
        },
        axisTick: {
          lineStyle: {
            color: ' #000000',
          },
        },
      },
      {
        type: 'category',
        data: Object.keys(res.data.TRA[0][Object.keys(res.data.TRA[0])[0]]),
        gridIndex: 1,
        name: 'β chain',
        nameLocation: 'middle',
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 10,
        },
        axisLine: {
          lineStyle: {
            color: ' #000000',
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        gridIndex: 0,
        name: 'Fraction',
        nameLocation: 'middle',
        max: max_a.value,
        min: 0,
        splitNumber: max_a.value * 10,
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 10,
        },
        axisLabel: {
          textStyle: {
            fontSize: '10',
          },
        },
        axisLine: {
          // show:true,
          lineStyle: {
            color: ' #000000',
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: ' #000000',
          },
        },
      },
      {
        type: 'value',
        name: 'Fraction',
        max: max_b.value,
        min: 0,
        splitNumber: max_b.value * 10,
        nameLocation: 'middle',
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 10,
        },
        gridIndex: 1,
        axisLabel: {
          textStyle: {
            fontSize: '10',
          },
        },
        axisLine: {
          lineStyle: {
            color: ' #000000',
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: ' #000000',
          },
        },
      },
    ],

    series: seriesa,

    color: colors.value,
  }

  myCharts.value = echarts.init(myChart.value!)
  myCharts.value.setOption(option)
  myCharts.value.setOption(option)
})
</script>
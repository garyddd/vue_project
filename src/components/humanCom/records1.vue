<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px', align:'center'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  cate: String,
})
const colors = ['#ee6666', '#73c0de', '#3ba272']
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
const label = 'Gene'
let formatNumber = (num) => num.toString().replace(/(?=(\B)(\d{3})+$)/g, ',')
axios
  .post('http://127.0.0.1:5000/getData', {
    identifier: 'count',
    cate: props.cate,
    label: label,
  })
  .then((res) => {
    const option = {
      title: {
        text: 'Chain',
        left: 'center',
        top: '45%',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#000',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      color: colors,
      series: [
        {
          name: 'Records',
          type: 'pie',
          selectedMode: 'single',
          radius: [50, 100],
          data: res.data,
          center: ['50%', '50%'],
          startAngle: '-60',
          label: {
            formatter: '{name|{b}}\n{value|{d}%}',
            rich: { value: { fontSize: 10, color: '#000000' } },
            textStyle: {
              color: '#000000',
            },
          },
          labelLine: {
            length: 10,
            length2: 0,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        },
      ],
    }
    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
    myCharts.value.setOption(option)
  })
</script>
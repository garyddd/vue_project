<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '20rem' ,fontSize:'25px',margin:'auto'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  species: String,
  cate: String,
  gene:String,
})
const path = './tempData/aa3_' + props.species + '_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
axios
  // .get(
    // path
    .post('http://127.0.0.1:5000/getData', {
      identifier: 'aa3',
      species: props.species,
      cate: props.cate,
      gene:props.gene
    }
  )
  .then((res) => {
    const data = res.data
    const option = {
      title: {
        text: 'CDR3mr amino acid usage',
        left: 'center',
        top: '5%',
        textStyle: {
          color: '#000000',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.data[2]}</br>${params.marker}${
            data.label[0]
          }:${params.data[0].toFixed(2)}</br>Ref:${params.data[1].toFixed(2)}`
        },
      },
      xAxis: {
        name: data.label[0],
        nameLocation: 'middle',
        max: 0.3,
        min: 0,
        splitNumber: 3,
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 20,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        name: 'Ref',
        nameLocation: 'middle',
        max: 0.3,
        min: 0,
        splitNumber: 3,
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 16,
          padding: 0,
          // margin: 20
        },
        axisLine: {
          lineStyle: {
            // padding:20
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: [
            [0, 0],
            [0.3, 0.3],
          ],
          label: {
            show: false,
          },
          tooltip: {
            // formatter: 'y=x',
            show: false,
          },
          color: '#999',
          type: 'line',
          z: 0,
          symbolSize: 0,
        },
        {
          symbolSize: 20,
          label: {
            show: true,
            position: 'right',
            formatter: '{@value}',
          },
          data: data.value[0],
          type: 'scatter',
          colorBy: 'data',
        },
      ],
    }

    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
    myCharts.value.setOption(option)
  })
</script>
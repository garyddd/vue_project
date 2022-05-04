<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  cate: String,
})
// const path = './tempData/aa2_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
axios
  // .get(
  // path
  .post('http://localhost:5000/getData', {
    identifier: 'aa2',
    cate: props.cate,
  })
  .then((res) => {
    const aa = [
      'A',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'V',
      'W',
      'Y',
    ]
    // const cate = ['GEMT', 'iNKT', 'MAIT']
    const data = res.data
    const option = {
      title: {
        text: 'amino acid usage',
        left: 'center',
        textStyle: {
          color: '#000000',
          fontSize: 14,
        },
      },
      polar: [
        {
          show: true,
          center: ['25%', '50%'],
          // radius: ['20%', '70%'],
        },
        {
          show: true,
          center: ['75%', '50%'],
          // radius: ['20%', '70%'],
        },
      ],
      tooltip: {},
      angleAxis: [
        {
          type: 'category',
          data: aa,
          polarIndex: 0,
          boundaryGap: false,
          startAngle: -90,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000',
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#000000',
          },
        },
        {
          type: 'category',
          data: aa,
          polarIndex: 1,
          startAngle: -90,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000',
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#000000',
          },
        },
      ],
      radiusAxis: [
        {
          type: 'category',
          polarIndex: 0,
          data: data.TRAname[0],
          name: 'α chain',
          nameTextStyle: {
            // fontStyle: 'italic',
            color: '#000000',
            fontSize: 14,
            padding: 5,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            rotate: '-45',
            color: '#000000',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        {
          type: 'category',
          polarIndex: 1,
          data: data.TRBname[0],
          name: 'β chain',
          nameTextStyle: {
            // fontStyle: 'italic',
            color: '#000000',
            fontSize: 14,
            padding: 5,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            rotate: '-45',
            color: '#000000',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      ],
      series: [
        {
          type: 'scatter',
          polarIndex: 0,
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] * 2
          },
          data: data.TRA[0],
          animationDelay: function (idx) {
            return idx * 5
          },
          colorBy: 'data',
          tooltip: {
            formatter: function (params) {
              return (
                params.value[2].toFixed(2) +
                '% ' +
                aa[params.value[1]] +
                ' of ' +
                data.TRAname[0][params.value[0]]
              )
            },
          },
        },
        {
          type: 'scatter',
          polarIndex: 1,
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] * 2
          },
          data: data.TRB[0],
          animationDelay: function (idx) {
            return idx * 5
          },
          colorBy: 'data',
          tooltip: {
            formatter: function (params) {
              return (
                params.value[2].toFixed(2) +
                '% ' +
                aa[params.value[1]] +
                ' of ' +
                data.TRBname[0][params.value[0]]
              )
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
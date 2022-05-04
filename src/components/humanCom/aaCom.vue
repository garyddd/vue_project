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
  species: String,
  cate: String,
  gene: String,
})
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
axios
  .post('http://127.0.0.1:5000/getData', {
    identifier: 'aa',
    cate: props.cate,
    species: props.species,
    gene: props.gene,
  })
  .then((res) => {
    const option = {
      // title: {
      //   text:
      //     props.gene === 'TRA'
      //       ? 'α chain Amino acid usage'
      //       : 'β chain Amino acid usage',
      //   left: 'center',
      //   textStyle: {
      //     fontStyle: 'oblique',
      //   },
      // },
      xAxis: {
        type: 'category',
        data: Object.values(res.data.name),
        name: 'Amino acids',
        nameLocation: 'middle',
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#ffffff',
          fontSize: 16,
          padding: 10,
        },
        axisLine: {
          lineStyle: {
            color: ' #ffffff',
          },
        },
        axisTick: {
          lineStyle: {
            color: ' #ffffff',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'fraction',
        nameTextStyle: {
          // fontStyle: 'italic',
        },
        axisLine: {
          lineStyle: {
            color: ' #ffffff',
          },
        },
        axisTick: {
          lineStyle: {
            color: ' #ffffff',
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' --  ' + (params.value * 100).toFixed(2) + '%'
        },
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'bar',
          colorBy: 'data',
          data: Object.values(res.data.value),
          itemStyle: {
            normal: {
              color: function (params) {
                let colorList = {
                  A: '#000000',
                  C: '#008811',
                  D: '#ff0000',
                  E: '#ff0022',
                  F: '#333333',
                  G: '#007700',
                  H: '#220099',
                  I: '#111111',
                  K: '#0000aa',
                  L: '#002222',
                  M: '#220022',
                  N: '#009911',
                  P: '#080808',
                  Q: '#00aa00',
                  R: '#0022aa',
                  S: '#008f00',
                  T: '#006600',
                  V: '#222200',
                  W: '#080808',
                  Y: '#00a800',
                }
                return colorList[params.name]
              },
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
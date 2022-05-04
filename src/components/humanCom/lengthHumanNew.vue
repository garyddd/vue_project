<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '400px' ,fontSize:'25px'}"></div>
  <!-- <el-form :style="{width: '80%', marginLeft:'10%'}">
    <el-form-item label='CDR3 Length'>
      <el-slider @change="update"
                 v-model="value"
                 range
                 show-stops
                 :max="25"
                 :min="5"
                 :marks="marks" />
    </el-form-item>
  </el-form> -->

</template>
<script lang="ts" setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { reactive, ref, defineProps } from 'vue'
const props = defineProps({
  cate: String,
  species: String,
})

const colors = ['#ee6666', '#73c0de', '#3ba272']
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
const path = './tempData/len_' + props.cate + '.json'

axios

  .post('http://127.0.0.1:5000/getData', {
    identifier: 'length',
    cate: props.cate,
    species: props.species,
  })
  .then((res) => {
    const max_a = ref(0)
    const max_b = ref(0)
    max_a.value =
      Math.ceil(
        Object.values(res.data.TRA).sort()[
          Object.values(res.data.TRA).length - 1
        ] * 10
      ) / 10
    max_b.value =
      Math.ceil(
        Object.values(res.data.TRB).sort()[
          Object.values(res.data.TRB).length - 1
        ] * 10
      ) / 10
    const sizeValue = '55%'
    const option = {
      tooltip: {},
      grid: [{ right: sizeValue }, { left: sizeValue }],
      color: colors,
      xAxis: [
        {
          type: 'category',
          data: Object.keys(res.data.TRA),
          gridIndex: 0,
          name: props.cate === 'GD' ? 'γ chain' : 'α chain',
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
            lineStyle: {
              color: ' #000000',
            },
          },
        },
        {
          type: 'category',
          data: Object.keys(res.data.TRB),
          gridIndex: 1,
          name: props.cate === 'GD' ? 'δ chain' : 'β chain',
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
            lineStyle: {
              color: ' #000000',
            },
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
            formatter: '{value}',
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
        {
          type: 'value',
          name: 'Fraction',
          nameLocation: 'middle',
          max: max_b.value,
          min: 0,
          splitNumber: max_b.value * 10,
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

      series: [
        {
          type: 'bar',
          smooth: true,
          xAxisIndex: 0,
          yAxisIndex: 0,
          emphasis: {
            focus: 'series',
          },
          data: Object.values(res.data.TRA),
        },
        {
          type: 'bar',
          smooth: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          emphasis: {
            focus: 'series',
          },
          data: Object.values(res.data.TRB),
        },
      ],
    }

    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
    myCharts.value.setOption(option)
  })
</script>
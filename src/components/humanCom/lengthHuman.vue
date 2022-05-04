<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '300px' ,fontSize:'25px'}"></div>

</template>
<script lang="ts" setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { reactive, ref, defineProps } from 'vue'
const props = defineProps({
  cate: String,
})

const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
const path = './tempData/len_' + props.cate + '.json'

axios
  .get(
    path
    // .post('http://127.0.0.1:5000/getData', {
    //   identifier: 'length3',
    //   cate: props.cate,
    // }
  )
  .then((res) => {
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
      // title: { text: 'Length of CDR3', x: 'center', y: 'top' },
      // toolbox: {
      //   show: true,
      //   orient: 'vertical',
      //   right: '0%',
      //   top: '15%',
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: true, title: 'dataView', readOnly: true },
      //     magicType: {
      //       show: true,
      //       title: { line: 'switch to line', bar: 'switch to bar' },
      //       type: ['line', 'bar'],
      //     },
      //     restore: { show: true, title: 'refresh' },
      //     saveAsImage: { show: true, title: 'save' },
      //   },
      // },
      tooltip: {
        // show: false,
        // formatter: function (val) {
        //   return val.value.toFixed(2)
        // },
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
          data: Object.keys(res.data.TRA[0].Human),
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
          data: Object.keys(res.data.TRB[0].Human),
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
            lineStyle: {
              color: ' #000000',
            },
          },
        },
      ],

      series: seriesa,
    }

    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
    myCharts.value.setOption(option)
  })
</script>
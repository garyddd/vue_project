<template>
  <div ref="myChart"
       :style="{ width: '100%', height: '500px' ,fontSize:'25px'}"></div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { onMounted, ref, defineProps } from 'vue'
const props = defineProps({
  species: String,
  cate: String,
})
const nodeGap = ref()
if (props.species === 'Human') {
  nodeGap.value = 10
} else {
  nodeGap.value = -5
}
const path = './tempData/sankey_' + props.species + '_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
axios
  .get(
    path
    // .post('http://127.0.0.1:5000/getData', {
    //   identifier: 'sankey',
    //   cate: props.cate,
    //   species: props.species,
    // }
  )
  .then((res) => {
    const option = {
      // title: {
      //   text: 'Human ' + props.species + ' TCR',
      //   left: '4%',
      //   textStyle: {
      //     fontStyle: 'oblique',
      //   },
      //   subtext: `α chain  (${res.data[0].sumTRA})    |    β chain  (${res.data[0].sumTRB})`,
      //   subtextStyle: {
      //     // fontStyle: 'italic',
      //     fontWeight: 'bold',
      //   },
      // },
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
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          name: 'First',
          type: 'sankey',
          layout: 'none',
          width: '30%',
          left: '10%',
          draggable: true,
          nodeGap: nodeGap.value,
          top: '10%',
          emphasis: {
            focus: 'adjacency',
          },
          data: res.data[0].TRAGene,
          links: res.data[0].TRA,
          nodeAlign: 'right',
          lineStyle: {
            color: 'source',
            curveness: 0.5,
          },
          // label: {
          //   textStyle: {
          //     color: '#000000',
          //   },
          // },
        },
        {
          type: 'sankey',
          layout: 'none',
          nodeGap: 10,
          width: '30%',
          left: '60%',
          top: '10%',
          emphasis: {
            focus: 'adjacency',
          },
          data: res.data[0].TRBGene,
          links: res.data[0].TRB,
          nodeAlign: 'right',
          lineStyle: {
            color: 'source',
            curveness: 0.5,
          },
          // label: {
          //   textStyle: {
          //     color: '#000000',
          //   },
          // },
        },
      ],
    }

    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
    myCharts.value.setOption(option)
  })
</script>
<template>
  <div :style="{ width: '100%',align:'center'}">
    <el-row>
      <el-col :span='4'></el-col>
      <el-col :span="20">
        <el-form label-width="150px">
          <el-form-item label='CDR3α length'>
            <el-select v-model="lengthaa"
                       style="width:6rem">
              <el-option v-for="item in options"
                         :key='item.value'
                         :label='item.label'
                         :value='item.value' />
            </el-select>&nbsp;&nbsp;
            <el-button class='btn'
                       type='primary'
                       @click="doUpdate"
                       @focus="blurAgain">Show</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <div style='width:30rem;margin:auto'
       v-loading="loading"
       element-loading-text="Loading...">

    <div ref="myChart"
         :style="{ width: '100%', height: '450px' ,fontSize:'25px', align:'center',margin:'auto', marginTop:'-2.5rem'}"></div>
  </div>
</template>
<script lang="ts" setup>
import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { ref, defineProps } from 'vue'
const props = defineProps({
  species: String,
  cate: String,
  gene: String,
})
const default_len = {
  MAIT: 12,
  iNKT: 15,
  GD: 15,
}
const lengthaa = ref(default_len[props.cate])
const options = [
  {
    value: 12,
    label: 12,
  },
  {
    value: 13,
    label: 13,
  },
  {
    value: 14,
    label: 14,
  },
  {
    value: 15,
    label: 15,
  },
]
const label: string[] = []
const label1: string[] = []
for (var i = 1; i < lengthaa.value + 1; i++) {
  label.push('pos' + i)
  label1.push('pos' + `${lengthaa.value + 1 - i}`)
}
const path = './tempData/hm_' + props.species + '_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
const loading = ref(false)
axios
  // .get(
  // path
  .post('http://127.0.0.1:5000/getData', {
    identifier: 'hm',
    cate: props.cate,
    species: props.species,
    gene: props.gene,
    cdr_len: lengthaa.value,
  })
  .then((res) => {
    const option = {
      title: {
        // text: 'Normalized Mutual Infomation',
        // left: 'center',
      },
      tooltip: {},
      grid: {
        // height: '50%',
        top: '10%',
        left: '10%',
        right: '10%',
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: 'category',
        data: label,
        name: 'TCR position',
        nameLocation: 'middle',
        nameTextStyle: {
          // fontStyle: 'italic',
          color: '#000000',
          fontSize: 14,
          padding: 40,
        },
        splitArea: {
          show: true,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          //  alignWithLabel:true,
        },
        axisLabel: {
          color: '#000',
          rotate: -90,
          textStyle: {
            // fontStyle: 'italic',
            fontSize: 10,
          },
        },
      },
      yAxis: {
        type: 'category',
        data: label1,
        splitArea: {
          show: true,
        },
        axisLabel: {
          color: '#000',
          textStyle: {
            fontSize: 10,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        text: ['NMI:' + 1, 'NMI:' + 0],
        calculable: false,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
        orient: 'vertical',
        left: '90%',
        bottom: '30%',
      },
      series: [
        {
          name: 'NMI',
          type: 'heatmap',
          data: res.data,
          itemStyle: {
            borderColor: '#666',
            borderWidth: 1,
          },
          label: {
            show: false,
          },

          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1,
            },
          },
          progressive: 1000,
          animation: false,
        },
      ],
    }
    loading.value = false
    myCharts.value = echarts.init(myChart.value!)
    myCharts.value.setOption(option)
  })

const blurAgain = (e) => {
  e.target.blur()
}
const doUpdate = () => {
  const label2: string[] = []
  const label12: string[] = []
  for (var i2 = 1; i2 < lengthaa.value + 1; i2++) {
    label2.push('pos' + i2)
    label12.push('pos' + `${lengthaa.value + 1 - i2}`)
  }
  loading.value = true
  axios
    // .get(
    // path
    .post('http://127.0.0.1:5000/getData', {
      identifier: 'hm',
      cate: props.cate,
      species: props.species,
      gene: props.gene,
      cdr_len: lengthaa.value,
    })
    .then((res) => {
      const option = {
        title: {
          // text: 'Normalized Mutual Infomation',
          // left: 'center',
        },
        tooltip: {},
        grid: {
          // height: '50%',
          top: '10%',
          left: '10%',
          right: '10%',
        },
        legend: {
          show: false,
        },
        xAxis: {
          type: 'category',
          data: label2,
          name: 'TCR position',
          nameLocation: 'middle',
          nameTextStyle: {
            // fontStyle: 'italic',
            color: '#000000',
            fontSize: 14,
            padding: 40,
          },
          splitArea: {
            show: true,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            //  alignWithLabel:true,
          },
          axisLabel: {
            color: '#000',
            rotate: -90,
            textStyle: {
              // fontStyle: 'italic',
              fontSize: 10,
            },
          },
        },
        yAxis: {
          type: 'category',
          data: label12,
          splitArea: {
            show: true,
          },
          axisLabel: {
            color: '#000',
            textStyle: {
              fontSize: 10,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 1,
          text: ['NMI:' + 1, 'NMI:' + 0],
          calculable: false,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026',
            ],
          },
          orient: 'vertical',
          left: '90%',
          bottom: '30%',
        },
        series: [
          {
            name: 'NMI',
            type: 'heatmap',
            data: res.data,
            itemStyle: {
              borderColor: '#666',
              borderWidth: 1,
            },
            label: {
              show: false,
            },

            emphasis: {
              itemStyle: {
                borderColor: '#333',
                borderWidth: 1,
              },
            },
            progressive: 1000,
            animation: false,
          },
        ],
      }
      loading.value = false
      myCharts.value.setOption(option)
    })
}
</script>
<style scoped>
.logo-bottom {
  width: 80%;
  margin-left: 10%;
  color: #000;
}
.logo-bottom div {
  /* border-radius: 4px; */
  height: 20px;
  margin-bottom: 1rem;
}
.btn {
  z-index: 99;
}
</style>
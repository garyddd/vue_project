<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label='length'>
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

  </div>
  <div v-loading="loading"
       element-loading-text="Loading...">
    <div class='logo-top'>

      <div :style="{background:'rgb(107,139,91)',width:w0,display:'inline-block'}">{{gene}}V</div>
      <!-- <el-input v-model='count'></el-input> -->
      <div :style="{background:'rgb(218,139,65)',width:w1,display: 'inline-block'}">CDR3</div>

      <div :style="{background:'rgb(191,120,145)',width:w0,display:'inline-block'}">{{gene}}J</div>

    </div>

    <div v-html="myChart1"
         :style="{ width: '100%', height: '100%' }"></div>
    <!-- <div class='logo-bottom'>
    <div style='background:rgb(107,139,91);width:25%;display: inline-block;font-size:.8rem'>V motif</div>

    <div style='background:rgb(218,139,65);width:35%;display: inline-block;font-size:.8rem'>CDR3mr</div>

    <div style='background:rgb(191,120,145);width:40%;display: inline-block;font-size:.8rem'>J motif</div>
  </div> -->
    <div ref="myChart"
         :style="{ width: '100%', height: '20rem' ,fontSize:'25px',margin:'auto'}"></div>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { ref, defineProps, reactive } from 'vue'
const props = defineProps({
  species: String,
  cate: String,
  gene: String,
  count: Number,
})

const options = ref([])

if (props.gene === 'TRA') {
  options.value = [
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
} else {
  options.value = [
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

    {
      value: 16,
      label: 16,
    },
  ]
}
const lengthaa = ref(15)
if (props.cate === 'iNKT') {
  const default_len = {
    TRA: 15,
    TRB: 15,
  }
  lengthaa.value = default_len[props.gene]
} else if (props.cate === 'GEMT' || props.cate === 'GD') {
  const default_len = {
    TRA: 15,
    TRB: 17,
  }
  options.value = [
    {
      value: 14,
      label: 14,
    },
    {
      value: 15,
      label: 15,
    },

    {
      value: 16,
      label: 16,
    },
    {
      value: 17,
      label: 17,
    },
    {
      value: 18,
      label: 18,
    },
  ]
  lengthaa.value = default_len[props.gene]
} else {
  const default_len = {
    TRA: 12,
    TRB: 15,
  }
  lengthaa.value = default_len[props.gene]
}

const w1 = ref(String(((15 * 0.64) / 15) * 100 + '%'))
const w0 = ref(String(((15 * 0.18) / 15) * 100 + '%'))
// const path = './tempData/seqlogo_' + props.species + '_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()

const myChart1 = ref()
axios
  // .get(
  // path
  .post('http://127.0.0.1:5000/getData', {
    identifier: 'logo',
    species: props.species,
    cate: props.cate,
    gene: props.gene,
    cdr_len: lengthaa.value,
  })
  .then((res) => {
    myChart1.value = res.data
  })

// const path = './tempData/aa3_' + props.species + '_' + props.cate + '.json'
const loading = ref(false)
axios
  // .get(
  // path
  .post('http://127.0.0.1:5000/getData', {
    identifier: 'aa3',
    species: props.species,
    cate: props.cate,
    gene: props.gene,
    cdr_len: lengthaa.value,
  })
  .then((res) => {
    const data = res.data
    const option = {
      title: {
        text: 'CDR3 amino acid usage',
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
  })
// 处理没有的长度，logo不变，氨基酸使用无显示

const doUpdate = () => {
  loading.value = true
  axios
    // .get(
    // path
    .post('http://127.0.0.1:5000/getData', {
      identifier: 'logo',
      species: props.species,
      cate: props.cate,
      gene: props.gene,
      cdr_len: lengthaa.value,
    })
    .then((res) => {
      myChart1.value = res.data
    })

  axios
    // .get(
    // path
    .post('http://127.0.0.1:5000/getData', {
      identifier: 'aa3',
      species: props.species,
      cate: props.cate,
      gene: props.gene,
      cdr_len: lengthaa.value,
    })
    .then((res) => {
      const data = res.data
      const option = {
        title: {
          text: 'CDR3 amino acid usage',
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
      loading.value = false

      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption(option)
    })
}

const handleChange = (currentValue) => {
  lengthaa.value = currentValue
}
const blurAgain = (e) => {
  e.target.blur()
}
</script>
<style scoped>
.logo-top div {
  /* border-radius: 4px; */
  height: 20px;
  color: #fff;
  margin-bottom: 0.5rem;
}
.logo-bottom {
  width: 64%;
  margin-left: 18%;
  color: #000;
}
.logo-bottom div {
  /* border-radius: 4px; */
  height: 20px;
}
</style>
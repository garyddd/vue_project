<template>
  <div :style="{ width: '100%',align:'center'}">
    <el-row>
      <el-col :span='4'></el-col>
      <el-col :span="20">
        <el-form label-width="150px">
          <el-form-item label='CDR3β length'>
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

    <!-- <div class='logo-bottom'>
      <div style='background:rgb(107,139,91);width:27%;display: inline-block;'>V motif</div>

      <div style='background:rgb(218,139,65);width:33%;display: inline-block;'>CDR3mr</div>

      <div style='background:rgb(191,120,145);width:40%;display: inline-block;'>J motif</div>

    </div> -->
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
  MAIT: 15,
  iNKT: 15,
  GEMT: 17,
  GD: 17,
}
const lengthaa = ref(default_len[props.cate])
const options = ref([])
if (props.cate === 'GEMT' || props.cate==='GD') {
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

const loading = ref(false)
const label: string[] = []
const label1: string[] = []
for (var i = 1; i < lengthaa.value + 1; i++) {
  label.push('pos' + i)
  label1.push('pos' + `${lengthaa.value + 1 - i}`)
}
const path = './tempData/hm_' + props.species + '_' + props.cate + '.json'
const myChart = ref<HTMLElement>()
const myCharts = ref<any>()
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
            // 'rgb(65, 124, 167)',
            // 'rgb(99, 147, 182)',
            // 'rgb(135, 171, 197)',
            // 'rgb(170, 194, 212)',
            // 'rgb(205, 218, 227)',
            // 'rgb(242, 241, 241)',
            // 'rgb(233, 210, 204)',
            // 'rgb(223, 178, 167)',
            // 'rgb(213, 147, 130)',
            // 'rgb(204, 115, 93)',
            // 'rgb(194, 85, 57)',
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

const handleChange = (currentValue) => {
  lengthaa.value = currentValue
}
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
              // 'rgb(65, 124, 167)',
              // 'rgb(99, 147, 182)',
              // 'rgb(135, 171, 197)',
              // 'rgb(170, 194, 212)',
              // 'rgb(205, 218, 227)',
              // 'rgb(242, 241, 241)',
              // 'rgb(233, 210, 204)',
              // 'rgb(223, 178, 167)',
              // 'rgb(213, 147, 130)',
              // 'rgb(204, 115, 93)',
              // 'rgb(194, 85, 57)',
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
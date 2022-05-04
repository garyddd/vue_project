<template>
  <div>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
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
      </el-col>
    </el-row>

  </div>

  <div ref="myChart"
       v-if='display'
       v-loading='loading'
       element-loading-text="Loading..."
       :style="{ width: '100%', height: '500px' ,fontSize:'25px'}"></div>

</template>
<script lang="ts" setup>
// import store from '@/store/store'
import axios from 'axios'
import * as echarts from 'echarts'
import { ref, defineProps } from 'vue'
// const data = store.state.name4
const props = defineProps({
  species: String,
  cate: String,
  gene: String,
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
const myChart = ref<HTMLElement>()
const loading = ref(false)
const myCharts = ref<any>()
const display = ref(false)
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

const path = './tempData/graph_' + props.species + '_' + props.cate + '.json'
const doUpdate = () => {
  display.value = true
  loading.value = true
  axios
    // .get(
    // path
    .post('http://127.0.0.1:5000/getData', {
      identifier: 'graph',
      cate: props.cate,
      species: props.species,
      gene: props.gene,
      cdr_len: lengthaa.value,
    })
    .then((res) => {
      loading.value = false
      const zoom = ref()
      if (res.data[0].nodes.length > 800) {
        zoom.value = 0.5
      } else if (
        res.data[0].nodes.length > 200 &&
        res.data[0].nodes.length <= 800
      ) {
        zoom.value = 0.7
      } else if (
        res.data[0].nodes.length > 100 &&
        res.data[0].nodes.length <= 200
      ) {
        zoom.value = 0.9
      } else {
        zoom.value = 2
      }
      const option = {
        // animation: false,
        title: {
          // text: 'CDR3 sequences graph View',
          subtext: `${props.species} ${props.cate} ${props.gene} (scroll to zoom)`,
          left: 'center',
          top: '80%',
          textStyle: {
            // fontStyle: 'oblique',
            // color:'#fff' ,
          },
          subtextStyle: {
            // fontStyle: 'italic',
            fontWeight: 'bold',
            // color:'#fff' ,
          },
        },
        tooltip: {},
        series: [
          {
            name: 'CDR3',
            type: 'graph',
            layout: 'force',
            zoom: zoom.value,
            // focusNodeAdjacency: true,
            data: res.data[0].nodes,
            links: res.data[0].links,
            categories: res.data[0].category,
            roam: true,
            label: {
              show: false,
              // position: 'inside',
            },
            force: {
              repulsion: 10,
              // layoutAnimation: false,
            },
            animationDuration: 100,
            emphasis: {
              focus: 'adjacency',
              label: {
                show: false,
              },
              scale: true,
              // lineStyle: {
              //   width: 10,
              // },
            },
            tooltip: {
              formatter: function (params) {
                return params.dataType == 'node' ? params.name : ''
              },
              // formatter:'{c}'
            },
          },
        ],
      }
      // 绘制图表
      // myCharts.value = echarts.init(document.getElementById('test1'))
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
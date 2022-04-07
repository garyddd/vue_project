<template>
  <div style="  fontSize:'5px';background-color:white">

    <h2 id='all'
        style="padding-top:20px">Summary of the Datasets</h2>
    <div class="a_box">
      <a href="#all">
        <el-button 
                   type='primary'
                   style='width:8%'>All</el-button>
      </a><a href="#human">
        <el-button 
                   type='primary'
                   style='width:8%'>Human</el-button>
      </a><a href="#mouse">
        <el-button 
                   type='primary'
                   style='width:8%'>Mouse</el-button>
      </a><a href="#cattle">
        <el-button type='primary'
                   style='width:8%'
                   >Cattle</el-button>
      </a>
    </div>
    <div style='width:30%;margin-left:1%'>
      <el-alert :title="updataD"
                type="success"
                :closable="false"
                show-icon />
    </div>
    <el-divider style="color: #409EFF;font-weight: bold;" />
    <div>

      <countSpecies></countSpecies>
      <el-divider style='margin-top:0px' />

      <lengthalpha></lengthalpha>
      <lengthbeta></lengthbeta>

      <el-divider />
    </div>
    <div id='human'>
      <h2 id='all'
          style="padding-top:20px">Summary of the Human</h2>
      <div class="a_box">
        <a href="#all">
          <el-button type='primary'
                     style='width:8%'>All</el-button>
        </a><a href="#human">
          <el-button type='primary'
                     style='width:8%'>Human</el-button>
        </a><a href="#mouse">
          <el-button type='primary'
                     style='width:8%'>Mouse</el-button>
        </a><a href="#cattle">
          <el-button type='primary'
                     style='width:8%'>Cattle</el-button>
        </a>
      </div>

      <el-divider style="color: #409EFF;font-weight: bold;" />
      <countHuman></countHuman>
      <el-divider style='margin-top:0px' />
      <!-- <el-row :gutter=10>

        <el-col :span=8>

          <sankeyHua></sankeyHua>
          
        </el-col>
        
      <el-divider direction='vertical' style='height:500px'/>
        <el-col :span=8>

          <sankeyHub></sankeyHub>
        </el-col>
        <el-col :span=8></el-col>
      </el-row> -->
  <h2 
          style="padding-top:20px">Human TCR Gene Usage</h2>
      <sankeyHua></sankeyHua>
      <el-divider />
      <sankeyHub></sankeyHub>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import echartsCom from './/summaryCom/lengthCom.vue'
import countSpecies from './summaryCom/countAll.vue'
import lengthalpha from './summaryCom/lengthspecies.vue'
import lengthbeta from './summaryCom/lengthcate.vue'
import countHuman from './humanCom/records.vue'
import sankeyHua from './humanCom/sankeyHua.vue'
import sankeyHub from './humanCom/sankeyHub.vue'
import { getCurrentInstance, ref } from 'vue'

const updataD = ref(
  'Last updated on ' +
    getCurrentInstance()?.appContext.config.globalProperties.$updataTime
)
</script>
<style scoped>
a {
  margin-left: 20px;
  text-decoration: none;
}

.a_box {
  padding: 20px;
}
</style>
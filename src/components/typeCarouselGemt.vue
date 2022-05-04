<template>
  <el-carousel height="600px"
               :autoplay="false">
    <el-carousel-item>

      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Gene usage of TCR chain</p>
          </div>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="2"></el-col>
          <el-col :span="8"
                  style='margin-top:12rem'>
            <graphDescNew :name='"gene"'
                          style='margin-top:5rem'></graphDescNew>
          </el-col>
          <el-col :span="13">
            <div class="carousel-ele gene">
              <sankeyOne :species='species'
                         :cate='cate'>
              </sankeyOne>
            </div>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Length of CDR3 chain</p>
          </div>
        </el-row>
        <el-row :gutter="20"
                style='margin-top:2rem'>
          <el-col :span="2"></el-col>
          <el-col :span="13">
            <lengthGemtNew :cate='cate'
                           :species='species'></lengthGemtNew>
          </el-col>
          <el-col :span="8">
            <graphDescNew :name='"length"'></graphDescNew>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>

      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">NMI Heatmap of CDR3 chain</p>
            <p class='p2'>&nbsp;&nbsp; <b>length</b> α chain : 12&nbsp;&nbsp;β chain : 15</p>
          </div>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="1"></el-col>
          <el-col :span="5">
            <graphDescNew :name='"hm"'></graphDescNew>
          </el-col>

          <el-col :span="8">

          </el-col>
          <el-col :span="8">
            <div style='margin-top:1rem;'>
              <heatmapCom :species='species'
                          :cate='cate'
                          :gene='"TRB"'></heatmapCom>
            </div>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Sequence Logo of CDR3 chain</p>
            <p class='p2'>&nbsp;&nbsp; <b>length</b> α chain : 12&nbsp;&nbsp;β chain : 15</p>
          </div>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="1"></el-col>
          <el-col :span="6"
                  style="margin-top:2rem">
          </el-col>

          <el-col :span="6"
                  style="margin-top:2rem">
            <seqLogo :species='species'
                     :cate='cate'
                     :gene='"TRB"'></seqLogo>
          </el-col>
          <el-col :span="10">
            <graphDescNew :name='"logo"'></graphDescNew>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Network Graph of CDR3 chain</p>
            <p class='p2'>&nbsp;&nbsp; Click to view network graph</p>
          </div>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="2"></el-col>
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <graphCom :species='species'
                      :cate='cate'
                      :gene='"TRB"'></graphCom>
          </el-col>
          <el-col :span="5">
            <graphDescNew :name='"graph"'></graphDescNew>
          </el-col>

          <el-col :span="1"></el-col>
        </el-row>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-ele">
        <el-row>
          <div class='figcaption'
               style='margin-left:0.25rem'>
            <p class="p1">Browser data of {{species}} {{cate}} CDR3</p>
          </div>

        </el-row>

        <dataTable :species='species'
                   :cate='cate'></dataTable>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
import graphCom from './humanCom/graphCom.vue'
import aaUsageNew from './humanCom/aaNew.vue'
import aaUsage3 from './humanCom/aa3.vue'
import seqLogo from './seqLogo.vue'
import heatmapCom from './heatmapCom.vue'
import heatmapCom2 from './heatmap2.vue'
import graphDesc from './chartsCom/graphDesc.vue'
import graphDescNew from './chartsCom/graphDescNew.vue'
import dataTable from './chartsCom/dataTable.vue'
import sankeyOne from './sankeyCom2.vue'
import lengthGemtNew from './humanCom/lengthGemtNew.vue'

import { defineProps } from 'vue'
const props = defineProps({
  cate: String,
  species: String,
})
</script>
<style scoped>
.figure {
  margin-bottom: 1.5rem;
}
.figcaption {
  text-align: left;
}
.species-h1 {
  text-align: left;
}
.p1 {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 1.675rem;
  line-height: 2.25rem;
  font-weight: 300;
  font-family: sans-serif;
}
.p2 {
  opacity: 0.6;
  margin-top: 0.5rem;
  font-size: 0.775rem;
  line-height: 1.25rem;
  font-family: sans-serif;
}
.carousel-ele {
  width: 101%;
  height: 600px;
  background-color: #e7e4da;
}
.gene {
  height: 500px;
  overflow: auto;
  margin-top: -2rem;
}
</style>
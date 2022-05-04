<template>

  <div class='com-1'>
    <div class="browser-one">
      <h1 class='species-h1'
          style="padding-top:20px">{{cate}}</h1>
      <div class='figcaption'>
        <p class='p1'>{{cate}} Datasets Summary </p>
        <p class='p2'>Length of CDR3 | Amino Acid usage | Count </p>
      </div>
      <el-row class='figure'>
        <el-col :span="8">
          <div style="width:100%;background-color:rgb(201,221,232)">
            <el-row>
              <count0 :cate='cate'></count0>
            </el-row>
            <el-row>
              <count1 :cate='cate'></count1>
            </el-row>

          </div>
        </el-col>
        <el-col :span="16">
          <div style="width:100%;background-color:rgb(201,221,232)">
            <el-row>
              <lengthGemt :cate='cate'></lengthGemt>
            </el-row>
            <el-row>
              <aaUsageNew :cate='cate'></aaUsageNew>
            </el-row>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>

</template>

<script lang="ts" setup>
import count0 from './humanCom/records.vue'
import count1 from './humanCom/records1.vue'
import lengthGemt from './humanCom/lengthGemt.vue'
import aaUsageNew from './humanCom/aaNew.vue'

import { getCurrentInstance, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  cate: String,
})

</script>
<style scoped>
.com-1 {
  margin-bottom: 5rem;
}
a {
  margin-left: 20px;
  text-decoration: none;
}
.title-2-box {
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: center;
}
.title-2,
.title-3 {
  font-size: 3.75rem;
  line-height: 1;
  font-family: sans-serif;
  display: inline;
}
.title-3 {
  color: #333;
}
.title-2:hover {
  font-size: 4rem;
  color: rgb(244, 96, 108);
  transition: all 0.25s ease-in-out;
}
h2 {
  font-size: 3.75rem;
  line-height: 1;
  font-family: serif;
  text-align: left;
}
.a_box {
  padding: 20px;
}
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
  width: 100%;
  height: 650px;
  background-color: #e7e4da;
}
.gene {
  overflow: auto;
}
.gene-fig {
  text-align: center;
}
.ps1 {
  font-size: 3.5rem;
  --tw-text-opacity: 1;
  color: rgba(160, 119, 90, var(--tw-text-opacity));
  font-family: serif;
}
.sankey-cap .ps1 {
  margin-top: 4rem;
  line-height: 1.25rem;
}
.sankey-cap .ps2 {
  font-size: 1.875rem;

  /* line-height: 2.25rem; */
  margin-bottom: 0.5rem;
  font-family: sans-serif;
  /* font-weight: 300; */
  /* text-align: center; */
  /* line-height: 0rem; */
}
.sankey-cap .ps_text {
  font-size: 1rem;
  line-height: 2.25rem;
  /* color:#e3525e; */
  color: rgba(0, 0, 0, 0.618);
  font-weight: 500;
  text-align: center;
  /* line-height: 0rem; */
}
.sankey-cap .ps4 {
  font-size: 0.8rem;
}
.sankey-cap .ps5 {
  font-size: 0.6rem;
}
</style>
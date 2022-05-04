<template>
  <div class='des-all'>
    <el-descriptions title="Figure Caption"
                     :column="2"
                     border>

      <el-descriptions-item label='Data'
                            align='center'
                            width="50px">

        {{figcap.data}}
      </el-descriptions-item>
      <el-descriptions-item label='Size'
                            align='center'>

        {{figcap.size}}
      </el-descriptions-item>

      <el-descriptions-item label='Description'
                            align='center'
                            width="150px">

        {{figcap.desc}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  figcap: Object,
})
</script>
<style scoped>
.des-all
  /deep/
  .el-descriptions__label.el-descriptions__cell.is-bordered-label {
  --el-descriptions-table-border: 1px solid #000000 !important;
  background: rgb(231, 228, 218) !important;
}
.des-all
  /deep/
  .el-descriptions__content.el-descriptions__cell.is-bordered-content {
  --el-descriptions-table-border: 1px solid #000000 !important;
  background: rgb(231, 228, 218) !important;
}
</style>
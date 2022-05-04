<template>
  <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="16">
      <aboutCom></aboutCom>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>
<script>
import aboutCom from '../components/aboutCom.vue'

export default {
  name: 'AboutView',
  components: {
    // TestBtn,
    aboutCom,
  },
}
</script>
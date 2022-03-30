<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <TestBtn></TestBtn> -->
    <HelloWorld2></HelloWorld2>
  </div>
</template>
<script>
import HelloWorld2 from '../components/HelloWorld2.vue'
export default {
  name: 'AboutView',
  components: {
    // TestBtn,
    HelloWorld2
  }
}
</script>
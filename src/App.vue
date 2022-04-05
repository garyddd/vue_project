
<template>
  <div class="container">

    <el-menu mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-menu-item ></el-menu-item>
      <el-menu-item ></el-menu-item>
      <el-menu-item ></el-menu-item>
      <el-menu-item ></el-menu-item>
      <!-- <el-menu-item class='logo_text' index='/'
                    style="font-size:50px;color:#D1BA74;font-style:italic">UcTc</el-menu-item> -->
      <el-menu-item class='logo_text' index='/'><img src="./assets/logo.png" alt=""></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/summary">Summary</el-menu-item>
      <el-menu-item index="/browser">Browser</el-menu-item>
      <el-menu-item index="/dataset">Dataset</el-menu-item>
      <el-menu-item index="/analysis">Analysis</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>

  <router-view />
  </div>
</template>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
}

/* .menu_container {
  width:60%;
  float:right;
} */

.container {
  text-align: center;
  /* position: fixed; */
  width: 100%;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 18px;
  font-weight: bold;
}
.logo_text{
  border-color: #545c64 !important;
  background-color:#545c64 !important;
}
</style>

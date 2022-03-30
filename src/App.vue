<template>
  <div class="container">
    <el-menu class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/summary">Summary</el-menu-item>
      <el-menu-item index="/browser">Browser</el-menu-item>
      <el-menu-item index="/dataset">Dataset</el-menu-item>
      <el-menu-item index="/analysis">Analysis</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>
  </div>
  <router-view />
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  text-align: center;
  /* position: fixed; */
  width: 100%;
}
/* .el-menu--horizontal>.el-menu-item {
    font-size: 30px;
} */
</style>

<template>
  <header class='nav'>
    <el-row>
      <el-col :span="8">
        <a href="/"><img src="./assets/logo.png"
               alt=""></a>
      </el-col>
      <el-col :span='4'></el-col>
      <el-col class='nav-item'
              :span="12">
        <el-menu mode="horizontal"
                 text-color="#333"
                 :default-active="$route.path"
                 background-color="#F6F4EE"
                 active-text-color="#333"
                 router>

          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/browser">Browser</el-menu-item>
          <!-- <el-sub-menu index='/'>
            <template #title>
              <p style='font-size: 16px;'>Browser</p>
            </template>
            <el-menu-item index="/browser/mait">MAIT</el-menu-item>
            <el-menu-item index="/browser/inkt">iNKT</el-menu-item>
            <el-menu-item index="/browser/gemt">GEMT</el-menu-item>
            <el-menu-item index="/browser/gammadelta">γδ Tcell</el-menu-item>
          </el-sub-menu> -->
          <el-menu-item index="/search">Search</el-menu-item>
          <el-menu-item index="/download">Download</el-menu-item>
          <!-- <el-menu-item index="/analysis">Analysis</el-menu-item> -->
          <el-menu-item index="/about">About</el-menu-item>
        </el-menu>
      </el-col>

    </el-row>
    <router-view />
  </header>

  <div class="footer">
    <div>
      <p align="center"
         style="margin: 5px">
        <strong>Copyright (c) </strong>
        <a href="http://amt.tju.edu.cn/portal/teachers/getperson/id/121/sId/3/bId/2.html"
           target="_blank">ZJ Lab</a>,
        <a href="http://amt.tju.edu.cn/"
           target="_blank">Institute of medical engineering and translational medicine, Tianjin
          University.</a>, <a href="http://www.tju.edu.cn/"
           target="_blank">TJU</a><span> China</span>
      </p>
      <p align="center">
        Any comments and suggestions, please
        <a href="http://amt.tju.edu.cn/portal/teachers/getperson/id/121/sId/3/bId/2.html"
           target="_blank">contact us.</a>
      </p>
    </div>
  </div>

</template>




<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
  font-family: 'sans-serif';
}
.com-1 {
  margin-top: 1rem;
}
.container {
  text-align: center;
  width: 96%;
  margin-left: 2%;
}
h1 {
  font-size: 7rem;
  line-height: 1;
  text-align: left;
  margin-bottom: 1.5rem;
  font-family: Felix Titling, sans-serif;
}

h2 {
  margin: 10px 0 0;
  color: rgb(8, 8, 60);
  text-align: justify;
}
.nav {
  padding: 2% 1%;
  background-color: #f6f4ee;
  /* width: 100%; */
  margin-top: 0;
  transition: all 0.5s ease 0.2s;
  -webkit-transition: all 0.5s ease 0.2s;
  transform: translateZ(0);
}
.nav-item {
  text-transform: uppercase;
}
.el-menu--horizontal {
  border-bottom: 0px !important;
  margin-left: 2%;
  height: 80px;
  text-align: center;
  justify-content: center;
  line-height: 80px;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  /* display:flex; */
  align-items: center;
}

.el-menu-item:hover {
  background-color: #f6f4ee !important;
  border-color: #f4606c !important;
  color: #f4606c !important;
  transition-duration: 0.5s;
}
.el-menu-item.is-active {
  background-color: #f6f4ee !important;
  color: #f6f4ee;
}
/* .el-menu-item_title:hover {
  background-color: #f6f4ee !important;
  color: #79053f !important;
} */
.logo_text {
  border-color: #f6f4ee !important;
  background-color: #545c64 !important;
}
.footer {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  /* line-height: 2.25rem; */
  font-weight: 300;
  font-family: sans-serif;
}
.footer a {
  color: #000;
  text-decoration: none;
}
.footer a:hover {
  color: #f4606c;
  /* text-decoration: none; */
  transition: all 0.3s ease 0.1s;
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style >
body {
  background-color: #f5f9fa;
  min-height: 100vh;
}
:root {
  user-select: none;
  scroll-behavior: smooth;
}
body,div,ul,li,p,h1,h2,h3,h4,h5,h6 {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #000;
}
ul {
  list-style: none;
}
.my_container {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .05);
  margin-bottom: 20px;
}
.table_top {
  margin-top: 60px;
}
</style>

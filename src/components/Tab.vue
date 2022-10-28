<template>
  <el-row class="my_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/frontUser' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    </el-row>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    title: {
      type: String,
      default: '前台用户管理'
    }
  }
}
</script>

<style scoped lang="stylus">
.my_container
  padding 20px
  .el-breadcrumb
    font-size 16px
</style>

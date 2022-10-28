<template>
  <el-aside
    class="aside"
    width="200px"
  >
    <div class="logo">
      <i>waitfish</i>
    </div>
    <el-row>
      <el-col>
        <el-menu
          :default-active="activeKey"
          :active="activeKey"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="rgba(255,255,255,0.5)"
          active-text-color="#fff"
          @select="handleSelect"
          :router=true
        >
        <el-menu-item index="frontuser">
          <i class="iconfont icon-zhanghaoquanxianguanli"></i>
          <span slot="title">前台用户管理</span>
        </el-menu-item>
        <el-menu-item index="articles">
          <i class="iconfont icon-bianjiwenzhang_huaban"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="reviews">
          <i class="iconfont icon-pinglun"></i>
          <span slot="title">文章评论管理</span>
        </el-menu-item>
        <el-menu-item index="past">
          <i class="iconfont icon-liuyan"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="list">
          <i class="iconfont icon-gongnengquanxian"></i>
          <span slot="title">列表管理</span>
        </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      activeKey: 'frontuser'
    }
  },
  mounted () {
    this.activeKey = this.$router.history.current.name
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeKey = key
    }
  }
}
</script>

<style scoped lang="stylus">
.el-menu-vertical-demo
  border-right none!important
.aside
  box-sizing border-box!important
  background-color #333
  min-height 100vh
  border-right 1px solid #fefefe
  box-shadow 0px 20px 15px rgba(0, 0, 0, 0.1)
  .logo
    color #fff
    opacity 0.9
    box-sizing border-box
    width 100%
    display flex
    justify-content center
    padding 5px 0
    font-size 28px
    font-weight 550
    border-bottom 1px solid #666
  .iconfont
    margin-right 10px
</style>

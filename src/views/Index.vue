<template>
  <div>
    <el-container class="box">
      <Aside />
      <el-container>
        <el-header class="header">
          <div class="box_right">
            <div>
              <img src="../assets/images/fish.png" alt="">
            </div>
            <h3>等鱼</h3>
            <span class="outlogin" @click="outlogin">退出登录</span>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer class="footer">
          <p>© 2021-2099 等鱼的博客后台系统</p>
      </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside.vue'
import { removeToken } from '../util'

export default {
  name: 'Index',
  components: {
    Aside
  },
  methods: {
    outlogin () {
      removeToken()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped lang="stylus">
.box
  border-top 1px solid #eee
  .header
    display flex
    justify-content flex-end
    background-color #fff
    height auto!important
    padding 8px 50px 8px 0
    box-shadow 20px 0px 15px rgba(0, 0, 0, 0.05)
    .box_right
      display flex
      justify-content center
      align-items center
      cursor pointer
      position relative
      div
        width 30px
        height 30px
        border-radius 50%
        margin-right 5px
        img
          width 100%
          height 100%
      &:hover
        .outlogin
          bottom -115%
          opacity 1
.footer
  display flex!important
  justify-content center
  align-items center
  height auto!important
  color #666
  font-size 14px
  padding 20px 0
.outlogin
  position absolute
  bottom 0
  left 2px
  opacity 0
  width 100%
  background-color #fff
  padding 5px 0
  font-size 14px
  text-align center
  border-radius 2px
  transition 0.3s
  z-index 1
  &:hover
    background-color #333
    color #fff
</style>

<template>
  <div class="body">
    <div class="box">
     <div class="box_left">
       <img src="../assets/images/img-01.png" alt="">
     </div>
      <div class="box_right">
        <div class="right_top">
          <h1>登录</h1>
        </div>
        <form class="right_bottom" @submit="submitToLogin">
          <p class="uname">
            <input placeholder="账号" type="text">
            <span class="iconfont icon-zhanghao"></span>
          </p>
          <p class="pwd">
            <input placeholder="密码" type="password">
            <span class="iconfont icon-mima"></span>
          </p>
          <p class="login"><input type="submit" ></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL, setToken } from '../util'

export default {
  name: 'Login',
  data () {
    return {
      BASE_URL
    }
  },
  methods: {
    async submitToLogin (e) {
      e.preventDefault()
      const useraccount = e.target[0].value
      const password = e.target[1].value
      const duration = 2000

      if (useraccount.trim() === '' || password.trim() === '') return this.$message({ message: '不能为空', type: 'warning', duration })

      const { data } = await this.$http.post('/user/backlogin', { useraccount, password })

      const type = data.text === '登录成功' ? 'success' : (data.text === '登录失败' ? 'error' : 'warning')
      this.$message({ message: data.text, type, duration })

      if (data.text !== '登录成功') return
      setToken(data.token)
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style scoped lang="stylus">
.body
    background #efefef
    width 100%
    height 100vh
    display flex
    justify-content center
    align-items center
  .box
    background-color #fff
    border-radius 20px
    padding 70px
    display flex
    align-items center
    min-height 400px
    box-shadow 0px 0px 10px rgba(0, 0, 0, 0.05)
    .box_left
      margin-right 100px
    .box_right
      width 100%
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      .right_top
        margin-bottom 50px
        h1
          letter-spacing 10px
          color #333
      .right_bottom
        p
          position relative
          input
            box-sizing border-box
            font-size 15px
            line-height 1.5
            color #666666
            display block
            width 100%
            background #e6e6e6
            height 50px
            border-radius 25px
            padding 0 30px 0 68px
            outline none
            border none
            margin-bottom 10px
            font-weight 550
          span
            position absolute
            top 50%
            left 35px
            transform translateY(-50%)
            color #888
            transition 0.5s
        .uname:hover
          span
            left 27px
            color #555
        .pwd:hover
          span
            left 27px
            color #555
        .login
          margin-top 30px
          input
            padding 0
            color #fff
            background-color #333
            font-weight 550
            cursor pointer
            transition 0.2s
            font-size 18px
            letter-spacing 5px
            text-align center
            padding-left 5px
            &:hover
              background-color #444
            &:active
              background-color #999
              border 2px solid #ccc
</style>

<template>
  <el-col :span="8">
      <div class="search">
        <el-input
          :placeholder="placeholder"
          v-model="input"
          @input="change"
        >
        </el-input>
        <span @click="search" class="iconfont icon-sousuo"></span>
      </div>
    </el-col>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      input: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    searchTo: {
      type: Function,
      default () {
        console.log('搜索触发了')
      }
    }
  },
  methods: {
    search () {
      this.searchTo(this.input)
    },
    change () {
      if (this.input.trim() === '') this.searchTo(this.input)
    }
  }
}
</script>

<style scoped lang="stylus">
.search
  display flex
  span
    box-sizing border-box
    width 50px
    height 40px
    display flex
    justify-content center
    align-items center
    font-size 25px
    color #999
    cursor pointer
    border 1px solid #ddd
    border-radius 5px
    margin-left 5px
    transition 0.1s
    &:active
      background-color #444
      color #fff
</style>

<template>
  <div>
    <Tab title="留言管理"/>
    <el-row class="my_container">
      <el-col :span="10">
        <el-input
          placeholder="输入年份进行过滤"
          v-model="filterText">
        </el-input>
      </el-col>
      <transition-group v-if="filtersPast.length > 0">
        <el-col
          :span="24"
          class="col_top"
          v-for="item in filtersPast"
          :key="item.year"
          ref="year"
        >
          <h1>{{item.year}}</h1>
          <ul v-for="item2 in item.children" :key="item2.createDate">
            <li>
              <el-tag class="my_tag" type="info" effect="dark">{{item2.time}}</el-tag>
              <el-tag type="info">{{item2.username}}：{{item2.content}}</el-tag>
              <el-button @click="showDelPast(item2)" style="float: right;" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </li>
          </ul>
        </el-col>
      </transition-group>
      <el-col class="no_data"  v-else :span="24">暂无数据~</el-col>
    </el-row>
    <!-- 删除对话框 -->
    <el-dialog
      title="删除留言"
      :visible.sync="delPastDialogVisible"
      width="30%"
      >
      <span>确定要删除该条留言吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delPastDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delPast">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tab from '../Tab.vue'
import { getToken } from '../../util'

export default {
  name: 'Past',
  components: {
    Tab
  },
  data () {
    return {
      pasts: [],
      filterText: '',
      treeProps: {
        label: 'year'
      },
      delPastDialogVisible: false,
      delPastId: -1
    }
  },
  computed: {
    filtersPast () {
      if (this.filterText === '') return this.pasts
      return this.pasts.filter(item => new RegExp(this.filterText + '+').test(item.year))
    }
  },
  mounted () {
    this.getPast()
  },
  methods: {
    async getPast () {
      const { data } = await this.$http.get('/past/list?token=' + getToken())
      this.pasts = data
    },
    // 显示留言
    showDelPast (item) {
      this.delPastDialogVisible = true
      this.delPastId = item.id
    },
    // 删除留言
    async delPast () {
      this.delPastDialogVisible = false
      const { data } = await this.$http.post('/past/delPast', {
        token: getToken(),
        id: this.delPastId
      })
      const type = data.text === '删除留言成功' ? 'success' : 'error'
      this.$message({
        message: data.text,
        type,
        duration: 1500
      })
      this.getPast()
    }
  }
}
</script>

<style scoped lang="stylus">
.col_top
  margin-top 20px
  border-top 1px solid #eee
  padding-top 20px
  li
    box-sizing border-box
    margin-left 40px
    margin-top 10px
    padding 2px 2px 2px 2px
    transition 0.2s
    border-radius 2px
    &:hover
      background-color #eee
      button
        opacity 1
    .my_tag
      margin-right 10px
    button
      margin-top 2px
      opacity 0
      transition 0.2s
.v-leave-active
  position absolute
.v-enter,
.v-leave-to
  opacity 0
  transform translateY(80px)
.v-enter-active,
.v-leave-active
  transition all 0.6s ease
/*两个搭配使用，能够实现后续列表渐渐飘上来的效果*/
.v-move
  transition all 0.6s ease
.v-leave-active
  position absolute
.no_data
  height 150px
  font-size 14px
  color #ddd
  display flex
  justify-content center
  align-items center
</style>

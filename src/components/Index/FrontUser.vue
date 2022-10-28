<template>
  <div>
    <Tab/>
    <el-row class="my_container">
      <!-- 搜索 -->
      <Search :searchTo="searchTo" placeholder="请输入用户名" />
      <!-- 表格 -->
      <el-table
        class="table_top"
        :data="data"
        stripe
        style="width: 100%"
        :border=true
        >
        <el-table-column
          prop="avatar"
          label="头像"
          width="70">
          <template slot-scope="scope">
            <img class="avatar" :src="BASE_URL + scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="useraccount"
          label="账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" v-if="scope.row.useraccount!=='waitfish'" size="mini" type="primary">编辑</el-button>
          <el-button @click="showDelDialog(scope.row)" v-if="scope.row.useraccount!=='waitfish'" size="mini" type="danger">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 修改用户名或者账号 -->
    <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
    <el-form :model="userInfo">
      <el-form-item label="用户名">
        <el-input @input="handleInput('username')" v-model="userInfo.username" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input @input="handleInput('useraccount')" v-model="userInfo.useraccount" autocomplete="on"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :disabled=isOk type="primary" @click="define">确 定</el-button>
    </div>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog
      title="删除用户"
      :visible.sync="delDialogVisible"
      width="30%"
      >
      <span>确定要删除该用户吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getToken, BASE_URL } from '../../util'
import Search from '../Search.vue'
import Tab from '../Tab.vue'

export default {
  name: 'FrontUser',
  data () {
    return {
      data: [],
      BASE_URL,
      dialogFormVisible: false,
      userInfo: {},
      oldUserInfo: {},
      timer: null,
      isOk: true, // 是否可以按确定
      delDialogVisible: false
    }
  },
  components: {
    Search,
    Tab
  },
  beforeMount () {
    this.getInfo()
  },
  methods: {
    async searchTo (val) {
      const { data } = await this.$http.get('/user/searchuser?useraccount=' + val)
      this.data = data
    },
    // 获取用户信息
    async getInfo () {
      const { data } = await this.$http.post('/user/userlist', {
        token: getToken()
      })
      this.data = data
    },
    // 编辑用户信息
    editUser (item) {
      this.userInfo = item
      this.oldUserInfo = {
        username: item.username,
        useraccount: item.useraccount
      }
      this.dialogFormVisible = true
    },
    // 取消
    cancel () {
      this.userInfo.username = this.oldUserInfo.username
      this.userInfo.useraccount = this.oldUserInfo.useraccount
      this.dialogFormVisible = false
    },
    // 确定
    async define () {
      const { data } = await this.$http.post('/user/updateuser', {
        username: this.userInfo.username,
        oldUseraccount: this.oldUserInfo.useraccount,
        useraccount: this.userInfo.useraccount
      })
      let type = 'success'
      // 如果失败
      if (data.text !== '更新用户信息成功') {
        this.userInfo.username = this.oldUserInfo.username
        this.userInfo.useraccount = this.oldUserInfo.useraccount
        type = 'error'
      } else this.dialogFormVisible = false
      this.$message({
        message: data.text,
        type,
        duration: 1500
      })
    },
    // 判断是否存在
    handleInput (key) {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const val = key === 'username' ? this.userInfo.username : this.userInfo.useraccount
        const { data } = await this.$http.get(`/user/frontinfo?${key}=${val}`)
        if (data.length !== 0) {
          this.$message({
            message: '已经被使用',
            type: 'error',
            duration: 1500
          })
          this.isOk = true
        } else {
          this.$message({
            message: '可以使用',
            type: 'success',
            duration: 1500
          })
          this.isOk = false
        }
      }, 2000)
    },
    // 显示删除对话框
    showDelDialog (item) {
      this.delDialogVisible = true
      this.userInfo.useraccount = item.useraccount
    },
    // 删除用户
    async delUser () {
      this.delDialogVisible = false
      const { data } = await this.$http.post('/user/deleteuser', {
        useraccount: this.userInfo.useraccount,
        token: getToken()
      })
      const type = data.text === '删除用户成功' ? 'success' : 'error'
      this.$message({
        message: data.text,
        type,
        duration: 1500
      })
      this.getInfo()
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
.avatar
  width 40px
  height 40px
  border-radius 50%
</style>

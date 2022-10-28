<template>
  <div>
    <Tab title="文章管理" />
    <el-row class="my_container">
      <el-col :span="24" class="flex-box">
        <Search :searchTo="searchTo" placeholder="请输入文章名或类型" />
        <el-button @click="toDetail('add')" type="success">发布文章</el-button>
      </el-col>
      <el-table
        class="table_top"
        :data="articles"
        stripe
        style="width: 100%"
        :border=true
        >
         <el-table-column
          prop="title"
          label="标题"
          width="200">
        </el-table-column>
         <el-table-column
          prop="type"
          label="类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="imgSrc"
          label="封面"
          width="215">
          <template slot-scope="scope">
            <img class="image" :src="BASE_URL + scope.row.imgSrc" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="100">
        </el-table-column>
         <el-table-column
          prop="createDate"
          label="发布时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row.id)" size="mini" type="primary">编辑</el-button>
          <el-button @click="showDelDialog(scope.row)"  size="mini" type="danger">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 删除对话框 -->
    <el-dialog
      title="删除文章"
      :visible.sync="delDialogVisible"
      width="30%"
      >
      <span>确定要删除文章吗？(不可恢复)</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="defineDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tab from '../Tab.vue'
import Search from '../Search.vue'
import { BASE_URL } from '../../util'

export default {
  name: 'Articles',
  components: {
    Tab,
    Search
  },
  data () {
    return {
      articles: [],
      BASE_URL,
      delDialogVisible: false,
      article: {}
    }
  },
  mounted () {
    this.getArticles()
    setTimeout(() => this.getArticles(), 1000)
  },
  methods: {
    async searchTo (val) {
      const { data } = await this.$http.get('/articles/search?keyword=' + val)
      this.articles = data
    },
    async getArticles () {
      const { data } = await this.$http.get('/articles/')
      this.articles = data
    },
    // 显示删除对话框
    showDelDialog (item) {
      this.delDialogVisible = true
      this.article = item
    },
    // 前往详细页面
    toDetail (id) {
      this.$router.push({
        name: 'articleDetail',
        params: { id }
      })
    },
    // 确定删除
    async defineDel () {
      this.delDialogVisible = false
      const { data } = await this.$http.post('/articles/delarticle', { id: this.article.id })
      const type = data.text === '删除文章成功' ? 'success' : 'error'
      this.$message({
        showClose: true,
        message: data.text,
        type
      })
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="stylus">
.flex-box
  display flex
  justify-content space-between
.image
  width 180px
  height auto
.my-col
  max-height 200px
  overflow hidden
  text-overflow ellipsis
</style>

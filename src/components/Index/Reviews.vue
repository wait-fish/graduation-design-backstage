<template>
  <div>
    <Tab title="评论管理页"/>
    <el-row class="my_container">
      <div class="search_box">
        <el-select class="select" style="width: 110px;margin-right: 1px" v-model="key" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <Search :searchTo="searchTo" placeholder="请输入用户名或评论关键字" />
      </div>
       <el-table
        class="table_top"
        :data="reviews"
        stripe
        style="width: 100%"
        :border=true
        >
        <el-table-column
          type="expand" label="评论回复" width="80">
          <template slot-scope="scope">
              <el-table
                :data="scope.row.content.children"
                stripe
                style="width: 80%; margin: 0 auto;"
                >
                  <el-table-column
                    prop="username"
                    label="回复用户"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="replyUsername"
                    label="被回复用户"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="text"
                    label="评论">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="回复时间"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="70">
                    <template slot-scope="scope2">
                      <el-button @click="showDelChildrenDialog(scope2.$index, scope.row)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
          </template>
        </el-table-column>
         <el-table-column
          prop="content"
          label="评论">
        </el-table-column>
        <el-table-column
          prop="username"
          label="评论用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="article_title"
          label="评论文章">
        </el-table-column>
        <el-table-column
          prop="time"
          label="评论时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="80">
        <template slot-scope="scope">
          <el-button @click="showDelContentDialog(scope.row.id, scope.row.article_id)" size="mini" type="danger">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 删除整条评论 -->
     <el-dialog
      title="删除用户"
      :visible.sync="delConentDialogVisible"
      width="30%"
      >
      <span>确定要删除该条评论吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delConentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delContent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除回复 -->
    <el-dialog
      title="删除用户"
      :visible.sync="delChildrenDialogVisible"
      width="30%"
      >
      <span>确定要删除该条回复吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delChildrenDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delChildren">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tab from '../Tab.vue'
import Search from '../Search.vue'
import { getToken } from '../../util'

export default {
  name: 'Reviews',
  components: {
    Tab,
    Search
  },
  data () {
    return {
      options: [
        {
          value: 'username',
          label: '用户名'
        },
        {
          value: 'article_title',
          label: '文章标题'
        },
        {
          value: 'content',
          label: '评论内容'
        }
      ],
      key: 'username',
      reviews: [],
      delConentDialogVisible: false,
      delChildrenDialogVisible: false,
      id: -1, // 文章id
      article_id: -1,
      replyIndex: -1, // 删除子节点的回复索引
      review: {} // 删除文章的评论
    }
  },
  mounted () {
    this.getReviews()
  },
  methods: {
    async searchTo (val) {
      const { data } = await this.$http.get(`/review/searchreview?${this.key}=${val}`)
      this.reviews = data
    },
    async getReviews () {
      const { data } = await this.$http.get('/review/reviewlist')
      this.reviews = data
    },
    // 删除评论窗口
    showDelContentDialog (id, articleId) {
      this.id = id
      this.article_id = articleId
      this.delConentDialogVisible = true
    },
    // 删除评论
    async delContent () {
      const { data } = await this.$http.post('/review/delreview', { token: getToken(), id: this.id, article_id: this.article_id })
      const type = data.text === '删除评论成功' ? 'success' : 'err'
      this.$message({
        message: data.text,
        type,
        duration: 1500
      })
      this.getReviews()
      this.delConentDialogVisible = false
    },
    // 显示删除子评论窗口
    showDelChildrenDialog (index, review) {
      this.replyIndex = index
      this.review = review
      this.delChildrenDialogVisible = true
    },
    async delChildren () {
      const { content, id } = this.review
      content.children.splice(this.replyIndex, 1)
      this.delChildrenDialogVisible = false
      const { data } = await this.$http.post('/review/update', {
        token: getToken(),
        content,
        id
      })
      let type = 'success'
      let message = '删除回复成功'
      if (data !== '回复成功') {
        type = 'error'
        message = '删除回复失败'
        this.getReviews()
      }
      this.$message({
        message,
        type,
        duration: 1500
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.search_box
  display flex
</style>

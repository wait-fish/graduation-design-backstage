<template>
  <div>
    <Tab title="文章管理 / 文章详细" />
    <el-row class="my_container">
      <el-form ref="article" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-col :span="20">
            <el-input v-model="article.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="3">
            <el-input v-model="article.type"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="作者">
          <el-col :span="5">
            <el-input v-model="article.author"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="changeFile"
            :on-change="changeFile"
            :multiple=false
            :limit=1
            :file-list="fileList"
            :auto-upload="false"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="imgDialogVisible">
            <img width="100%" :src="imgDialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
         <el-form-item label="发布时间">
          <el-col :span="5">
            <el-input :disabled=true v-model="article.createDate"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor ref="text"
                        v-model="article.content"
                        class="myQuillEditor"
                        :aria-disabled="false"
          />
        </el-form-item>
        <el-form-item label="其他">
          <el-tag>{{article.goodCount || 0}}个点赞</el-tag>
          <el-tag type="success">{{article.reviewCount || 0}}条评论</el-tag>
          <el-tag type="info">{{article.readCount|| 0}}人阅读</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="$router.replace('/articles')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { BASE_URL } from '../../util'
import Tab from '../Tab.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'ArticleDetail',
  components: {
    Tab,
    quillEditor
  },
  data () {
    return {
      article: {},
      imgDialogImageUrl: '',
      imgDialogVisible: false,
      fileList: [],
      uploadfile: {}
    }
  },
  mounted () {
    const { id } = this.$route.params
    if (id === 'add' || id === '' || id === undefined) this.article = { title: '', type: '*', imgSrc: '', author: '', content: '' }
    else this.getArticle()
  },
  methods: {
    async getArticle () {
      const id = this.$route.params.id || sessionStorage.getItem('article_id')
      sessionStorage.removeItem('article_id')
      sessionStorage.setItem('article_id', id)
      const { data } = await this.$http.get('/articles/?id=' + id)
      this.article = data[0]
      this.imgDialogImageUrl = BASE_URL + data[0].imgSrc
      this.fileList.push({
        name: data[0].imgSrc.replace('/images/', ''),
        url: BASE_URL + data[0].imgSrc
      })
    },
    // 修改
    async onSubmit () {
      await this.upload()
      console.log(this.article.imgSrc)
      const { id } = this.$route.params
      if (id === 'add' || id === '' || id === undefined) this.insertArticle()
      else this.updateArticle()
      this.$router.replace('/articles')
    },
    // 预览图片
    handlePictureCardPreview (file) {
      this.imgDialogImageUrl = file.url
      this.imgDialogVisible = true
    },
    // 更换图片时图片
    changeFile (file) {
      if (file.url !== undefined) {
        this.uploadfile = file.raw
        this.fileList = [{
          name: file.name,
          url: file.url
        }]
      } else {
        this.uploadfile = file[0]
        this.fileList = [{
          name: file[0].name,
          url: window.URL.createObjectURL(file[0])
        }]
      }
    },
    // 更新文章
    async updateArticle () {
      const { title, type, imgSrc, author, content, id } = this.article
      const { data } = await this.$http.post('/articles/updatearticle', { title, type, author, imgSrc, content, id })
      const types = data.text === '更新文章成功' ? 'success' : 'error'
      this.$message({
        message: data.text,
        type: types
      })
    },
    // 发表文章
    async insertArticle () {
      const { title, type, imgSrc, author, content } = this.article
      const { data } = await this.$http.post('/articles/insertarticle', { title, type, imgSrc, author, content })
      const types = data.text === '发布文章成功' ? 'success' : 'error'
      this.$message({
        message: data.text,
        type: types
      })
    },
    // 上传文件
    async upload () {
      var fd = new FormData()
      fd.append('file', this.uploadfile)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data: imgData } = await this.$http.post('/articles/upload', fd, config)
      if (imgData.text === '上传成功') this.article.imgSrc = imgData.url
    }
  }
}
</script>

<style scoped lang="stylus">
.el-tag
  margin-left 10px
</style>

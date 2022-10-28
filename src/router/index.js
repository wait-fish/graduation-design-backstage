import Vue from 'vue'
import VueRouter from 'vue-router'
import { isAuth } from '../util/token'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import FrontUser from '../components/Index/FrontUser.vue'
import Articles from '../components/Index/Articles.vue'
import Reviews from '../components/Index/Reviews.vue'
import Past from '../components/Index/Past.vue'
import List from '../components/Index/List.vue'
import ArticleDetail from '../components/Index/ArticleDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/frontuser',
    children: [
      { path: '/frontuser', name: 'frontuser', component: FrontUser },
      { path: '/articles', name: 'articles', component: Articles },
      { path: '/articledetail', name: 'articleDetail', component: ArticleDetail },
      { path: '/reviews', name: 'reviews', component: Reviews },
      { path: '/past', name: 'past', component: Past },
      { path: '/list', name: 'list', component: List }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 如果没有登录 且 不是去登录页
  if (!isAuth() && to.path !== '/login') return router.push({ name: 'login' })
  next()
})

export default router

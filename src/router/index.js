import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home.vue'
import ArticleComponent from 'components/ArticleComponent.vue'

Vue.use(Router)

var routes = [
  {
    path: '*',
    component: Home
  },
  {
    path: '/article/:hlink',
    name: 'article',
    component: ArticleComponent,
    props: true
  }
]

export default new Router({
  routes
})

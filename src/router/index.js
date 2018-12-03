import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Singer from '@/components/singer'
import Songs from '@/components/songsList'
import SearchBox from '@/components/searchBox'
import ContentBox2 from '@/components/content/searchBoxChild2'
import ContentBox1 from '@/components/content/searchBoxChild1'
import Rank from '@/components/second/rank'
import singerDetail from '@/components/second/singerD'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home',component: Home, meta: {index: 5, showHeader: true}},
    {path: '/singer', component: Singer, meta: {index: 5, showHeader: true}, children: [
      {path: ':id', component:singerDetail}
    ]},
    {path: '/songs', component: Songs, meta: {index: 5, showHeader: true}, children: [
      {path: ':id', component: Rank}
    ]},
    {path: '/searchBox', component: SearchBox, meta: {index: 5, showHeader: true}, children: [
      {path: 'content1', name: 'content1', component: ContentBox1, meta: {index: 5, showHeader: true}},
      {path: 'content2', name: 'content2', component: ContentBox2, meta: {index: 5, showHeader: true}}   
    ]},
  
    // {path: '/rank', component: Rank},
    {path: '/songs/*', component: Home},
  ]
})

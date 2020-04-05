import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Recommend from '../pages/recommend'
// import Singer from '../pages/singer/singer.vue'
// import Rank from '../pages/rank'
// import Search from '../pages/search'
// import Detail from 'pages/detail'
// import Rankdetail from '../pages/rankdetail'
// import Recommenddetail from '../pages/recommenddetail'
const Recommend = ()=>import('../pages/recommend')
const Singer = ()=>import( '../pages/singer/singer.vue')
const Rank  = ()=>import('../pages/rank')
const Search = ()=>import( '../pages/search')
const Detail = ()=>import( 'pages/detail')
const Rankdetail = ()=>import( 'pages/rankdetail')
const Recommenddetail = ()=>import( 'pages/recommenddetail')



let router = new Router({
    mode:'hash',
    routes:[
        {
          path:'/recommend',
          component:Recommend
        },
        {
          path:'/recommenddetail',
          component:Recommenddetail
         },
        {
          path:'/singer',
          component:Singer,
          children:[
            {
              path:':mid',
              component:Detail
            }
          ]
          },
        {
          path:'/rank',
          component:Rank
          },
        {
         path:'/search',
         component:Search
        },
        {
          path:'/rankdetail',
          component:Rankdetail
         },
        {
          path:'/',
          redirect:'recommend'
        }
    ]
})
export default router
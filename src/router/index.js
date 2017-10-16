import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Recommend = () => import('components/recommend/recommend')
// const Singer = () => import('components/singer/singer')
// const Rank = () => import('components/rank/rank')
// const Search = () => import('components/search/search')
// const SingerDetail = () => import('components/singer-detail/singer-detail')
// const Disc = () => import('components/disc/disc')
// const TopList = () => import('components/top-list/top-list')
// const UserCenter = () => import('components/user-center/user-center')
const Login = () => import('components/login/login')
const Home = () => import('components/home/home')
const Welcome = () => import('components/welcome/welcome')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/:app', name: 'header', component: Home},
        {path: '/:app/:fun', name: 'navigater', component: Home}
      ]
    }
  ]
})

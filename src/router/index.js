import Vue from 'vue'
import Router from 'vue-router'
import Cache from 'common/cache'

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
const Navigater = () => import('components/navigater/navigater')

const router = new Router({
  mode: 'history',
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
      path: '/:app',
      name: 'navigater',
      component: Navigater
    },
    {
      path: '/:app/:fun',
      name: 'home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (Cache.get('id') === null && to.name !== 'login') {
    next({path: '/login'})
  }
  next()
})

export default router

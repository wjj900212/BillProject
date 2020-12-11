import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/HomePage'

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let constRouter = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage,
    meta: {
      title: '首页'
    }
  }
]

let router = new Router({
  routes: constRouter
})
export default router

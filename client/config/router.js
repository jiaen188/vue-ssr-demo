import Router from 'vue-router'

import routes from './routes'

// 因为我们是服务端渲染，如果用这个方法，router指向同一个, 每次服务端渲染都会生成一个新的app，router又是只有一个对象，就会缓存每次新建的app，内存不会释放，最终会导致内存溢出的问题
/* const router = new Router({
  routes
}) */

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from , savePosition) { // 保存之前访问的页面滚动位置处理
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true // 有些浏览器不支持history的路由，会采用hash模式
    /* parseQuery (query) { // 路由比如localhost:8000/login?app=23&dg=453，vue会默认转化成对象，如果我们有些自定制的处理，可以加载这里

    },
    stringifyQuery (obj) { // 将路由参数的对象转化成字符串

    } */
  })
}

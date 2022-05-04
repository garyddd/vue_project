import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/browser',
    name: 'browser',
    // redirect:'/browser/mait',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BrowserView.vue'),
    // children: [
    //   {
    //     path: 'mait',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/browser/mait.vue'),
    //   },
    //   {
    //     path: 'inkt',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/browser/inkt.vue'),
    //   },
    //   {
    //     path: 'gemt',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/browser/gemt.vue'),
    //   },
    //   {
    //     path: 'gammadelta',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/browser/gammadelta.vue'),
    //   },
    // ],
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  {
    path: '/download',
    name: 'dataset',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DatasetView.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AnalysisView.vue')
  },
  {
    path: '/sankeyFull',
    name: 'sankeyFull',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/sankeyFull.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

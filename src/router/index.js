import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/userLogin'
  },
  {
    path: '/userLogin',
    component: () => import('../views/system_settings/user_management/UserLogin.vue'),
    meta: {
      title: '用户登录'
    },
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/splList',
        component: () => import('../views/knowledge_base/sports_project_library/SportsprojectLibraryList.vue'),
        meta: {
          title: '运动项目列表'
        },
      },
      {
        path: '/fbList',
        component: () => import('../views/knowledge_base/food_bank/FoodBankList.vue'),
        meta: {
          title: '膳食库列表'
        },
      },
      {
        path: '/dbList',
        component: () => import('../views/knowledge_base/disease_bank/DiseaseBankList.vue'),
        meta: {
          title: '疾病库列表'
        },
      },
      {
        path: '/hpList',
        component: () => import('../views/knowledge_base/health_programme/HealthProgrammeList.vue'),
        meta: {
          title: '健康方案列表'
        },
      },
      {
        path: '/mpList',
        component: () => import('../views/member_management/member_profile/MemberProfileList.vue'),
        meta: {
          title: '会员档案'
        },
      },
      {
        path: '/userList',
        component: () => import('../views/system_settings/user_management/UserManagementList.vue'),
        meta: {
          title: '用户管理'
        },
      },
    ]
  },
  {
    path: '/error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: '错误页面'
    }
  }
]

// const router = new VueRouter({
//   routes
// })
// 对路由默认push方法进行增强--添加catch
// 1 获得原始push （缓存）
const originalPush = VueRouter.prototype.push
// 2 重写vue-router push函数
VueRouter.prototype.push = function push(location) {
  // 3 执行 原始push函数，如果有异常 catch掉
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

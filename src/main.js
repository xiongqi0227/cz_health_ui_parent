import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入样式文件
import './assets/global.css'
//导入element-ui
import './element'


Vue.config.productionTip = false


router.beforeEach((to,from,next) => {
  if(to.meta.title){
    document.title = to.meta.title;
  }else{
    document.title = "默认标题";
  }

  next(); //放行
})

//登录拦截器
router.beforeEach((to,from,next) =>{
  if(to.path==='/userLogin'){
    next();
    return
  }
  let token = sessionStorage.getItem("loginUser")
   if(token){
     next();
   }else{
     next("/userLogin")
   }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

<template>
  <div class="mainNavigation">
    <el-container class="heightAll">
      <el-aside width="200px">
        <el-menu
          default-active="1"
          :default-openeds="openeds"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
         <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="/mpList">会员档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>知识库</span>
            </template>
            <el-menu-item index="/splList">运动项目库</el-menu-item>
            <el-menu-item index="/fbList">膳食库</el-menu-item>
            <el-menu-item index="/dbList">疾病库</el-menu-item>
            <el-menu-item index="/hpList">健康方案</el-menu-item>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/userList">用户管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openeds: ['1','2','3']
    }
  }
};
</script>

<style>
.mainNavigation {
  height: 100%;
  position: fixed;
  width: 100%;
}
.heightAll {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}

</style>
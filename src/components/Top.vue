<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <!-- 面包屑 start -->
        <el-breadcrumb separator="/" style="height:30px">
          <el-breadcrumb-item>一级菜单</el-breadcrumb-item>
          <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
          <el-breadcrumb-item>
            <b>当前页面</b>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 end -->
      </el-form-item>
      <el-form-item style="marginLeft:900px;marginTop:-10px">
        <!-- 用户名称 start -->
        <el-link type="primary" class="el-icon-question" style="marginRight:40px">帮助</el-link>
        <el-avatar :size="40" :src="circleUrl" style="marginBottom:-15px;marginRight:10px"></el-avatar>
        <span @click.prevent="addDialogTableVisible=true">{{user.umName}}</span>
        <!-- 用户名称 end -->
      </el-form-item>
    </el-form>
    <!-- 用户退出 start -->
    <el-dialog :visible.sync="addDialogTableVisible" :append-to-body="true">
      <el-form :model="user" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.umUsername" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.umName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.umEmail" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="logoutFn">退出登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 用户退出 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      circleUrl:
        // "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "/2.jpg",
      addDialogTableVisible: false,
    };
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    this.umId = user.umId;
    this.user = user;
  },
  methods: {
    //用户退出
    logoutFn() {
      sessionStorage.removeItem("loginUser");
      this.$message.success("已退出");
      this.$router.push("/userLogin");
    },
  },
};
</script>

<style>
</style>

<template>
  <div>
    <el-link
      type="primary"
      style="marginLeft:300px"
      @click.prevent="dialogFormVisible = true"
    >还没有账号?立即注册</el-link>
    <!-- 注册表单 start -->
    <el-dialog title="注册用户" :visible.sync="dialogFormVisible">
      <el-form :model="user" :rules="rules" ref="user" style="textAlign:center;margin:auto;">
        <el-form-item label="真实姓名" prop="umName">
          <el-input v-model="user.umName" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="umUsername">
          <el-input v-model="user.umUsername" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="umPassword">
          <el-input v-model="user.umPassword" show-password style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            style="width: 50%;"
            v-model="user.umConfirmPassword"
            show-password
            @blur="checkPasswordFn(user.umPassword,user.umConfirmPassword)"
          ></el-input>
        </el-form-item>
        <span v-show="showPassword">
          <font color="red">密码不一致</font>
        </span>
        <el-form-item label="角色">
          <el-select v-model="user.umRole" placeholder="请选择角色" style="width: 50%;">
            <el-option label="健康管理师" value="健康管理师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="umPhone">
          <el-input v-model="user.umPhone" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.umEmail" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="user.umEnable" placeholder="请选择" style="width: 50%;">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button type="primary" @click.prevent="registerFn">注 册</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 注册表单 end -->
  </div>
</template>

<script>
import { register } from "../api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      user: {},
      showPassword: false,
      rules: {
        umName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        umUsername: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        umPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        umPhone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //校验密码
    checkPasswordFn(p1, p2) {
      if (p1 != p2) {
        this.showPassword = true;
        this.user.umConfirmPassword = "";
      } else {
        this.showPassword = false;
      }
    },
    //用户注册
    registerFn() {
      this.$refs.user.validate(async (valid) => {
        if (valid) {
          let { data: baseResult } = await register(this.user);
          if (baseResult.code == 1) {
            this.dialogFormVisible = false;
            this.$message.success(baseResult.message);
          } else {
            this.user.umUsername = "";
            this.$message.error(baseResult.message);
          }
        }
      });
    },
  },
};
</script>

<style>
/* .el-dialog {
  width: 30%;
} */
</style>
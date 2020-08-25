<template>
  <div class="login">
    <el-card class="login-box-card">
      <div slot="header" class="clearfix">
        <b>
          <i>传智健康后台管理系统</i>
        </b>
        <img src="@/assets/login2.png" style="marginLeft:280px;marginTop:-50px" />
      </div>
      <el-button size="medium" @click.prevent="changeForm1Fn" style="marginLeft:50px;marginBottom:10px">用户名密码登录</el-button>
      <el-button size="medium" @click.prevent="changeForm2Fn" style="marginLeft:50px;marginRight:70px">手机号码登录</el-button>
      <!-- 登录表单 start -->
      <!-- 用户名密码登录 start -->
      <el-form :model="userForm" label-width="80px" v-show="form1">
        <el-form-item style="marginRight:20px">
          <el-input
            v-model="userForm.umUsername"
            size="small"
            @blur="changeVerifyCodeFn"
            style="fontSize:13px;marginLeft:-31px"
            placeholder="用户名"
          >
            <i slot="prefix" class="el-icon-s-custom"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="marginRight:20px">
          <el-input
            v-model="userForm.umPassword"
            size="small"
            show-password
            placeholder="密码"
            style="fontSize:13px;marginLeft:-31px"
          >
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-link
          style="marginLeft:300px;marginBottom:-2px;marginTop:-20px"
          @click.prevent="dialogFormVisible1=true"
        >忘记密码?</el-link>
        <el-form-item style="marginRight:20px">
          <el-input
            v-model="userForm.code"
            size="small"
            placeholder="验证码"
            style="fontSize:13px;marginLeft:-31px"
          >
            <br />
            <i slot="prefix" class="el-icon-time"></i>
          </el-input>
         
          <div style="marginLeft:-30px">
            看不清？
            <a href @click.prevent="changeVerifyCodeFn">换一张</a>
             <img :src="imgSrc" style="marginLeft:20px;marginBottom:-10px"/>
          </div>
          
          <li v-if="errorMsg != ''">
            <label for>&nbsp;</label>
            <span style="color: #ff5b5b;marginRight:50px;marginLeft:-30px;marginTop:30px">{{errorMsg}}</span>
          </li>
        </el-form-item>
        <el-form-item>
          <el-button type="info" style="width:350px;marginLeft:-36px" @click.prevent="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户名密码登录 end -->

      <!-- 手机号码登录 start -->
      <el-form
        :model="phoneForm"
        label-width="80px"
        v-show="form2"
        style="textAlign:center;margin:auto"
      >
        <el-form-item style="marginRight:20px">
          <el-input
            v-model="phoneForm.umPhone"
            style="fontSize:13px;marginLeft:-50px"
            size="small"
            placeholder="电话号码"
          >
            <i slot="prefix" class="el-icon-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="marginRight:20px">
          <el-input
            v-model="phoneForm.umSmsCode"
            style="fontSize:13px;marginLeft:-50px"
            size="small"
            placeholder="短信验证码"
          >
            <i slot="prefix" class="el-icon-s-promotion"></i>
          </el-input>
          <el-button
            size="mini"
            round
            @click.prevent="sendSmsFn"
            style="marginRight:260px;marginLeft:-30px"
          >发送短信验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="info"
            style="width:350px;marginLeft:-70px"
            @click.prevent="phoneLoginFn"
          >登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 手机号码登录 end -->
      <!-- 注册组件 start -->
      <Resgister style="marginLeft:-50px"></Resgister>
      <!-- 注册组件 end -->
      <!-- 登录表单 end -->
    </el-card>

    <!-- 修改密码 start -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible1">
      <el-input v-model="phoneObj" placeholder="请输入电话号码" style="width:200px"></el-input>
      <el-button type="primary" style="marginLeft:20px" @click.prevent="findUserByPhoneFn">确定</el-button>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible2">
      <el-form :model="userObj">
        <el-form-item label="用户名">
          <el-input v-model="userObj.umUsername" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input v-model="userObj.editPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editPasswordFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 end -->
  </div>
</template>

<script>
import Resgister from "../../../components/Register";
import {
  login,
  findUserByPhone,
  editPassword,
  sendSms,
  phoneLogin,
} from "../../../api";
export default {
  components: {
    Resgister,
  },
  data() {
    return {
      userForm: {},
      errorMsg: "",
      imgSrc: "",
      phoneObj: "",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      userObj: {},
      form1: true,
      form2: false,
      phoneForm: {},
    };
  },
  created() {
    this.changeForm1Fn();
  },
  methods: {
    //切换图片验证码
    changeVerifyCodeFn() {
      if (this.userForm.umUsername) {
        this.errorMsg = "";
        this.imgSrc = `http://localhost:10010/api/ssservice/verifycode?t=${new Date()}&username=${
          this.userForm.umUsername
        }`;
      } else {
        this.errorMsg = "用户名不能为空";
      }
    },
    //用户登录
    async loginFn() {
      let { data: baseResult } = await login(this.userForm);
      if (baseResult.code == 1) {
        this.$message.success(baseResult.message);
        sessionStorage.setItem(
          "loginUser",
          JSON.stringify(baseResult.other.loginUser)
        );
        this.$router.push("/home");
      } else {
        this.errorMsg = baseResult.message;
        this.userForm = {};
      }
    },
    //根据电话号码查询用户
    async findUserByPhoneFn() {
      let { data: baseResult } = await findUserByPhone(this.phoneObj);
      if (baseResult.code == 1) {
        this.dialogFormVisible1 = false;
        this.dialogFormVisible2 = true;
        this.userObj = baseResult.data;
      } else {
        this.phoneObj = "";
        this.$message.error(baseResult.message);
      }
    },
    //修改密码
    async editPasswordFn() {
      let { data: baseResult } = await editPassword(this.userObj);
      if (baseResult.code == 1) {
        this.dialogFormVisible2 = false;
        this.$message.success(baseResult.message);
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //切换登录方式（用户名密码登录）
    changeForm1Fn() {
      this.form1 = true;
      this.form2 = false;
    },
    //切换登录方式（电话号码登录）
    changeForm2Fn() {
      this.form1 = false;
      this.form2 = true;
    },
    //发送短信验证码
    async sendSmsFn(umPhone) {
      if (umPhone) {
        let { data: baseResult } = await sendSms(this.phoneForm.umPhone);
        if (baseResult.code == 1) {
          this.$message.success(baseResult.message);
        } else {
          this.$message.error(baseResult.message);
        }
      } else {
        this.$message.error("手机号码不能为空");
      }
    },
    //电话号码登录
    async phoneLoginFn() {
      let { data: baseResult } = await phoneLogin(this.phoneForm);
      if (baseResult.code == 1) {
        this.$message.success(baseResult.message);
        sessionStorage.setItem(
          "loginUser",
          JSON.stringify(baseResult.other.loginUser)
        );
        this.$router.push("/home");
      } else {
        this.$message.error(baseResult.message);
      }
    },
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  display: flex; /* css3 新取值，允许居中 */
  align-items: center; /* 上下居中*/
  justify-content: center; /* 左右居中 */
  background-image: url("../../../assets/login1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.login-box-card {
  width: 480px;
  border-top: 10px solid #e0e0e0; /* 上边框：粗细 样式 颜色 */
  background-color: #f0f0f0;
}
</style>
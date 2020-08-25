<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="档案号">
          <el-input v-model="pageParams.mpFileNumber" placeholder="档案号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findMpListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <el-button type="primary" size="small" @click.prevent="openAddMpFormFn">添加</el-button>
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="mpFileNumber" label="档案号" width="120"></el-table-column>
        <el-table-column prop="mpName" label="姓名" width="120"></el-table-column>
        <el-table-column prop="mpGender" label="性别" width="120"></el-table-column>
        <el-table-column prop="mpAge" label="年龄" width="120"></el-table-column>
        <el-table-column prop="user.umName" label="健康管理师" width="140"></el-table-column>
        <el-table-column prop="mpPhone" label="手机号码" width="140"></el-table-column>
        <el-table-column prop="mpCreateTime" label="注册时间" width="140"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findMpByIdFn(scope.row.mpId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteMpFn(scope.row.mpId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表 end -->
      <!-- 分页 start -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pageNum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      ></el-pagination>
      <!-- 分页 end -->
    </el-card>
    <!-- 添加表单 start -->
    <el-dialog title="新增" :visible.sync="addDialogTableVisible" :append-to-body="true">
      <el-button @click.prevent="changeOne">基本信息</el-button>
      <el-button @click.prevent="changeTwo">动态信息</el-button>
      <el-button @click.prevent="changeThree">病史</el-button>
      <hr />
      <!-- 基本信息 start -->
      <el-form :model="mpeiObj" :rules="rules" ref="mpeiObj" v-show="mpeiObjForm" :inline="true" label-width="80px">
        <el-form-item label="档案号">
          <el-input v-model="mpeiObj.mpFileNumber" :disabled="true" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="mpeiObj.mpIdCard" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="mpPassword">
          <el-input v-model="mpeiObj.mpPassword" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="mpeiObj.mpPhone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="mpName">
          <el-input v-model="mpeiObj.mpName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="mpGender">
          <el-select v-model="mpeiObj.mpGender" size="mini">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="mpeiObj.mpNation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="mpAge">
          <el-input v-model="mpeiObj.mpAge" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="mpeiObj.mpBirthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="mpeiObj.mpEmail" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-select v-model="mpeiObj.mpMarried" size="mini">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="mpeiObj.mpOccupation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-input v-model="mpeiObj.mpDegreeEducation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="mpeiObj.mpNativePlace" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="健康管理师" prop="mpHealthManager">
          <el-select v-model="mpeiObj.mpHealthManager" size="mini">
            <el-option
              v-for="(user,index) in allUser"
              :key="index"
              :label="user.umName"
              :value="user.umId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="档案状态">
          <el-select v-model="mpeiObj.mpFileStatus" size="mini">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <textarea cols="70" rows="5" v-model="mpeiObj.mpRemarks"></textarea>
        </el-form-item>
      </el-form>
      <!-- 基本信息 end -->
      <!-- 动态信息 start -->
      <el-form :model="mpdiObj" v-show="mpdiObjForm" :inline="true" label-width="80px">
        <el-form-item label="身高">
          <el-input v-model="mpdiObj.mpdiHeight" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="mpdiObj.mpdiWeight" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="舒张压">
          <el-input v-model="mpdiObj.mpdiDiastolicPressure" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="收缩压">
          <el-input v-model="mpdiObj.mpdiSystolicPressure" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="呼吸">
          <el-input v-model="mpdiObj.mpdiBreathing" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="体温">
          <el-input v-model="mpdiObj.mpdiTemperature" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="腰围">
          <el-input v-model="mpdiObj.mpdiWaist" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="臀围">
          <el-input v-model="mpdiObj.mpdiHipline" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="BMI">
          <el-input v-model="mpdiObj.mpdiBmi" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="血氧饱和度">
          <el-input v-model="mpdiObj.mpdiBloodOxygenSaturation" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <!-- 动态信息 end -->
      <!-- 病史 start -->
      <el-form :model="mpmhObj" v-show="mpmhObjForm" :inline="true" label-width="80px">
        <el-form-item label="既往史">
          <textarea cols="70" rows="5" v-model="mpmhObj.mpmhPastHistory"></textarea>
        </el-form-item>
        <el-form-item label="家族史">
          <textarea cols="70" rows="5" v-model="mpmhObj.mpmhFamilyHistory"></textarea>
        </el-form-item>
        <el-form-item label="过敏史">
          <textarea cols="70" rows="5" v-model="mpmhObj.mpmhAllergyHistory"></textarea>
        </el-form-item>
        <el-form-item label="病史">
          <textarea cols="70" rows="5" v-model="mpmhObj.mpmhMedicalHistory"></textarea>
        </el-form-item>
        <el-form-item label="慢性病">
          <textarea cols="70" rows="5" v-model="mpmhObj.mpmhChronicDisease"></textarea>
        </el-form-item>
      </el-form>
      <!-- 病史 end -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="addMpFn">保 存</el-button>
        <el-button @click.prevent="addDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 end -->
    <!-- 修改表单 start -->
    <el-dialog title="修改" :visible.sync="editDialogTableVisible" :append-to-body="true">
      <el-button @click.prevent="changeOne">基本信息</el-button>
      <el-button @click.prevent="changeTwo">动态信息</el-button>
      <el-button @click.prevent="changeThree">病史</el-button>
      <hr />
      <!-- 基本信息 start -->
      <el-form :model="mpeiForm" v-show="mpeiObjForm" :inline="true" label-width="80px">
        <el-form-item label="档案号">
          <el-input v-model="mpeiForm.mpFileNumber" :disabled="true" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="mpeiForm.mpIdCard" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="mpPassword">
          <el-input v-model="mpeiForm.mpPassword" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="mpeiForm.mpPhone" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="mpName">
          <el-input v-model="mpeiForm.mpName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="mpGender">
          <el-select v-model="mpeiForm.mpGender" size="mini">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="mpeiForm.mpNation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="mpAge">
          <el-input v-model="mpeiForm.mpAge" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="mpeiForm.mpBirthday"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="mpeiForm.mpEmail" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-select v-model="mpeiForm.mpMarried" size="mini">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="mpeiForm.mpOccupation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-input v-model="mpeiForm.mpDegreeEducation" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="mpeiForm.mpNativePlace" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="健康管理师">
          <el-select v-model="mpeiForm.mpHealthManager" size="mini">
            <el-option
              v-for="(user,index) in allUser"
              :key="index"
              :label="user.umName"
              :value="user.umId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="档案状态">
          <el-select v-model="mpeiForm.mpFileStatus" size="mini">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <textarea cols="70" rows="5" v-model="mpeiForm.mpRemarks"></textarea>
        </el-form-item>
      </el-form>
      <!-- 基本信息 end -->
      <!-- 动态信息 start -->
      <el-form :model="mpdiForm" v-show="mpdiObjForm" :inline="true" label-width="80px">
        <el-form-item label="身高">
          <el-input v-model="mpdiForm.mpdiHeight" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="mpdiForm.mpdiWeight" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="舒张压">
          <el-input v-model="mpdiForm.mpdiDiastolicPressure" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="收缩压">
          <el-input v-model="mpdiForm.mpdiSystolicPressure" size="mini" style="width:70px"></el-input>
        </el-form-item>
        <el-form-item label="呼吸">
          <el-input v-model="mpdiForm.mpdiBreathing" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="体温">
          <el-input v-model="mpdiForm.mpdiTemperature" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="腰围">
          <el-input v-model="mpdiForm.mpdiWaist" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="臀围">
          <el-input v-model="mpdiForm.mpdiHipline" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="BMI">
          <el-input v-model="mpdiForm.mpdiBmi" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="血氧饱和度">
          <el-input v-model="mpdiForm.mpdiBloodOxygenSaturation" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <!-- 动态信息 end -->
      <!-- 病史 start -->
      <el-form :model="mpmhForm" v-show="mpmhObjForm" :inline="true" label-width="80px">
        <el-form-item label="既往史">
          <textarea cols="70" rows="5" v-model="mpmhForm.mpmhPastHistory"></textarea>
        </el-form-item>
        <el-form-item label="家族史">
          <textarea cols="70" rows="5" v-model="mpmhForm.mpmhFamilyHistory"></textarea>
        </el-form-item>
        <el-form-item label="过敏史">
          <textarea cols="70" rows="5" v-model="mpmhForm.mpmhAllergyHistory"></textarea>
        </el-form-item>
        <el-form-item label="病史">
          <textarea cols="70" rows="5" v-model="mpmhForm.mpmhMedicalHistory"></textarea>
        </el-form-item>
        <el-form-item label="慢性病">
          <textarea cols="70" rows="5" v-model="mpmhForm.mpmhChronicDisease"></textarea>
        </el-form-item>
      </el-form>
      <!-- 病史 end -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="editMpFn">保 存</el-button>
        <el-button @click.prevent="editDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import {
  findMpList,
  addMpei,
  addMpDi,
  addMpMh,
  getMPNumber,
  deleteMp,
  findMpEiById,
  findMpDiById,
  findMpMhById,
  editMpei,
  editMpdi,
  editMpmh,
  findAllUser,
} from "../../../api";
export default {
  components: {
    Top,
  },
  data() {
    return {
      pageInfo: {},
      multipleSelection: [],
      pageParams: {
        pageNum: 1,
        pageSize: 4,
        mpFileNumber: "",
      },
      addDialogTableVisible: false,
      mpeiObj: {
        mpFileNumber: "",
      }, // 会员档案（基本信息）
      mpeiObjForm: true,
      mpdiObj: {}, //会员档案（动态信息）
      mpdiObjForm: false,
      mpmhObj: {}, //会员档案（病史）
      mpmhObjForm: false,
      rules: {
        mpPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        mpName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mpGender: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        mpAge: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        mpHealthManager: [
          { required: true, message: "请选择健康管理师", trigger: "change" },
        ],
      },
      editDialogTableVisible: false,
      mpeiForm: {},
      mpdiForm: {},
      mpmhForm: {},
      allUser: [],
    };
  },
  async created() {
    this.findMpListFn();
    //查询所有健康管理师
    let { data: baseResult } = await findAllUser();
    if (baseResult.code == 1) {
      this.allUser = baseResult.data;
    } else {
      this.$message.error("查询失败");
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findMpListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findMpListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页条件查询会员档案列表
    async findMpListFn() {
      let { data: baseResult } = await findMpList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$message.error(baseResult.message);
        this.$router.push("/error");
      }
    },
    //获取档案号
    async openAddMpFormFn() {
      this.addDialogTableVisible = true;
      this.mpeiObjForm = true;
      let { data: baseResult } = await getMPNumber();
      if (baseResult.code == 1) {
        this.mpeiObj.mpFileNumber = baseResult.data;
      }
    },
    //切换到基本信息
    changeOne() {
      this.mpeiObjForm = true;
      this.mpdiObjForm = false;
      this.mpmhObjForm = false;
    },
    //切换到动态信息
    changeTwo() {
      this.mpeiObjForm = false;
      this.mpdiObjForm = true;
      this.mpmhObjForm = false;
    },
    //切换到病史
    changeThree() {
      this.mpeiObjForm = false;
      this.mpdiObjForm = false;
      this.mpmhObjForm = true;
    },
    //添加会员档案
    addMpFn() {
      this.$refs.mpeiObj.validate(async (valid) => {
        if (valid) {
          //添加会员（基本信息）
          let { data: baseResult1 } = await addMpei(this.mpeiObj);
          //添加会员（动态信息）
          let { data: baseResult2 } = await addMpDi(this.mpdiObj);
          //添加会员（病史）
          let { data: baseResult3 } = await addMpMh(this.mpmhObj);
          if (
            baseResult1.code == 1 &&
            baseResult2.code == 1 &&
            baseResult3.code == 1
          ) {
            this.addDialogTableVisible = false;
            this.$message.success("添加成功");
            this.mpeiObj = {};
            this.mpdiObj = {};
            this.mpmhObj = {};
            this.findMpListFn();
          } else {
            this.$message.error("添加失败");
          }
          this.mpeiObj = {};
          this.mpdiObj = {};
          this.mpmhObj = {};
        } else {
          return false;
        }
      });
    },
    //删除会员档案
    deleteMpFn(mpId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteMp(mpId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findMpListFn();
          } else {
            this.$message.error(baseResult.message);
          }
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    //根据id查询会员档案
    async findMpByIdFn(mpId) {
      this.editDialogTableVisible = true;
      this.changeOne();
      //根据id查询会员档案（基本信息）
      let { data: baseResult1 } = await findMpEiById(mpId);
      if (baseResult1.code == 1) {
        this.mpeiForm = baseResult1.data;
      } else {
        this.$message.error(baseResult1.message);
      }
      //根据id查询会员档案（动态信息）
      let { data: baseResult2 } = await findMpDiById(mpId);
      if (baseResult2.code == 1) {
        this.mpdiForm = baseResult2.data;
      } else {
        this.$message.error(baseResult2.message);
      }
      //根据id查询会员档案（病史）
      let { data: baseResult3 } = await findMpMhById(mpId);
      if (baseResult3.code == 1) {
        this.mpmhForm = baseResult3.data;
      } else {
        this.$message.error(baseResult3.message);
      }
    },
    //修改会员档案
    async editMpFn() {
      //修改会员档案（基本信息）
      let { data: baseResult1 } = await editMpei(this.mpeiForm);
      //修改会员档案（动态信息）
      let { data: baseResult2 } = await editMpdi(this.mpdiForm);
      //修改会员档案（病史）
      let { data: baseResult3 } = await editMpmh(this.mpmhForm);
      if (
        baseResult1.code == 1 &&
        baseResult2.code == 1 &&
        baseResult3.code == 1
      ) {
        this.$message.success("修改成功");
        this.editDialogTableVisible = false;
        this.findMpListFn();
      } else {
        this.$message.error("/修改失败");
      }
    },
  },
};
</script>

<style>
</style>
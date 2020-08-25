<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="编码">
          <el-input v-model="pageParams.dbNumber" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item label="疾病名称">
          <el-input v-model="pageParams.dbName" placeholder="疾病名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findDbListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <el-button type="primary" size="small" @click.prevent="addDialogTableVisible=true">添加</el-button>
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="dbNumber" label="编码" width="100"></el-table-column>
        <el-table-column prop="dbName" label="疾病名称" width="260"></el-table-column>
        <el-table-column prop="dbDepartment" label="就诊科室" width="180"></el-table-column>
        <el-table-column prop="dbWarningLevel" label="预警等级" width="180"></el-table-column>
        <el-table-column prop="dbTerm" label="就医期限" width="220"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findDbByIdFn(scope.row.dbId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteDbFn(scope.row.dbId)">删除</el-button>
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
      <el-button>基本信息</el-button>
      <hr />
      <el-form :model="dbObj" :inline="true" label-width="80px">
        <el-form-item label="疾病名称">
          <el-input v-model="dbObj.dbName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="异常类型">
          <el-select v-model="dbObj.dbExceptionType" placeholder="请选择异常类型" size="mini">
            <el-option label="系统自带" value="系统自带"></el-option>
            <el-option label="自定义" value="自定义"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否职业病">
          <el-select v-model="dbObj.dbOccupationalDiseases" placeholder="请选择" size="mini">
            <el-option label="否" value="否"></el-option>
            <el-option label="是" value="是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用性别">
          <el-select v-model="dbObj.dbGender" placeholder="请选择" size="mini">
            <el-option label="不限" value="否"></el-option>
            <el-option label="男" value="是"></el-option>
            <el-option label="女" value="是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就医期限">
          <el-select v-model="dbObj.dbTerm" placeholder="请选择" size="mini">
            <el-option label="立即" value="立即"></el-option>
            <el-option label="一年内" value="一年内"></el-option>
            <el-option label="半年内" value="半年内"></el-option>
            <el-option label="三个月内" value="三个月内"></el-option>
            <el-option label="一个月内" value="一个月内"></el-option>
            <el-option label="一周内" value="一周内"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊科室">
          <el-select v-model="dbObj.dbDepartment" placeholder="请选择" size="mini">
            <el-option label="内科" value="内科"></el-option>
            <el-option label="外科" value="外科"></el-option>
            <el-option label="妇产科" value="妇产科"></el-option>
            <el-option label="儿科" value="儿科"></el-option>
            <el-option label="心血管内科" value="心血管内科"></el-option>
            <el-option label="消化科" value="消化科"></el-option>
            <el-option label="肾内科" value="肾内科"></el-option>
            <el-option label="血液内科" value="血液内科"></el-option>
            <el-option label="呼吸内科" value="呼吸内科"></el-option>
            <el-option label="风湿免疫科" value="风湿免疫科"></el-option>
            <el-option label="感染科" value="感染科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="肿瘤内科" value="肿瘤内科"></el-option>
            <el-option label="普外科" value="普外科"></el-option>
            <el-option label="泌尿外科" value="泌尿外科"></el-option>
            <el-option label="甲乳外科" value="甲乳外科"></el-option>
            <el-option label="肛肠外科" value="肛肠外科"></el-option>
            <el-option label="神经外科" value="神经外科"></el-option>
            <el-option label="心胸外科" value="心胸外科"></el-option>
            <el-option label="血管外科" value="血管外科"></el-option>
            <el-option label="肝胆外科" value="肝胆外科"></el-option>
            <el-option label="理疗科" value="理疗科"></el-option>
            <el-option label="骨科" value="骨科"></el-option>
            <el-option label="烧伤整形科" value="烧伤整形科"></el-option>
            <el-option label="耳鼻喉科" value="耳鼻喉科"></el-option>
            <el-option label="眼科" value="眼科"></el-option>
            <el-option label="口腔科" value="口腔科"></el-option>
            <el-option label="精神科" value="精神科"></el-option>
            <el-option label="皮肤科" value="皮肤科"></el-option>
            <el-option label="中医科" value="中医科"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="dbObj.dbWarningLevel" placeholder="请选择" size="mini">
            <el-option label="零级预警" value="零级预警"></el-option>
            <el-option label="一级预警" value="一级预警"></el-option>
            <el-option label="二级预警" value="二级预警"></el-option>
            <el-option label="三级预警" value="三级预警"></el-option>
            <el-option label="四级预警" value="四级预警"></el-option>
            <el-option label="五级预警" value="五级预警"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="其他名称">
          <textarea cols="70" rows="5" v-model="dbObj.dbOtherNames"></textarea>
        </el-form-item>
        <el-form-item label="医学解释">
          <textarea cols="70" rows="5" v-model="dbObj.dbMedicalExplanation"></textarea>
        </el-form-item>
        <el-form-item label="常见原因">
          <textarea cols="70" rows="5" v-model="dbObj.dbCommonCauses"></textarea>
        </el-form-item>
        <el-form-item label="建议">
          <textarea cols="70" rows="5" v-model="dbObj.dbProposal"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="addDbFn">保 存</el-button>
        <el-button @click.prevent="addDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 end -->

    <!-- 修改表单 start -->
    <el-dialog title="修改" :visible.sync="editDialogTableVisible" :append-to-body="true">
      <el-button>基本信息</el-button>
      <hr />
      <el-form :model="dbForm" :inline="true" label-width="80px">
        <el-form-item label="疾病名称">
          <el-input v-model="dbForm.dbName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="异常类型">
          <el-select v-model="dbForm.dbExceptionType" placeholder="请选择异常类型" size="mini">
            <el-option label="系统自带" value="系统自带"></el-option>
            <el-option label="自定义" value="自定义"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否职业病">
          <el-select v-model="dbForm.dbOccupationalDiseases" placeholder="请选择" size="mini">
            <el-option label="否" value="否"></el-option>
            <el-option label="是" value="是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用性别">
          <el-select v-model="dbForm.dbGender" placeholder="请选择" size="mini">
            <el-option label="不限" value="否"></el-option>
            <el-option label="男" value="是"></el-option>
            <el-option label="女" value="是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就医期限">
          <el-select v-model="dbForm.dbTerm" placeholder="请选择" size="mini">
            <el-option label="立即" value="立即"></el-option>
            <el-option label="一年内" value="一年内"></el-option>
            <el-option label="半年内" value="半年内"></el-option>
            <el-option label="三个月内" value="三个月内"></el-option>
            <el-option label="一个月内" value="一个月内"></el-option>
            <el-option label="一周内" value="一周内"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊科室">
          <el-select v-model="dbForm.dbDepartment" placeholder="请选择" size="mini">
            <el-option label="内科" value="内科"></el-option>
            <el-option label="外科" value="外科"></el-option>
            <el-option label="妇产科" value="妇产科"></el-option>
            <el-option label="儿科" value="儿科"></el-option>
            <el-option label="心血管内科" value="心血管内科"></el-option>
            <el-option label="消化科" value="消化科"></el-option>
            <el-option label="肾内科" value="肾内科"></el-option>
            <el-option label="血液内科" value="血液内科"></el-option>
            <el-option label="呼吸内科" value="呼吸内科"></el-option>
            <el-option label="风湿免疫科" value="风湿免疫科"></el-option>
            <el-option label="感染科" value="感染科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="肿瘤内科" value="肿瘤内科"></el-option>
            <el-option label="普外科" value="普外科"></el-option>
            <el-option label="泌尿外科" value="泌尿外科"></el-option>
            <el-option label="甲乳外科" value="甲乳外科"></el-option>
            <el-option label="肛肠外科" value="肛肠外科"></el-option>
            <el-option label="神经外科" value="神经外科"></el-option>
            <el-option label="心胸外科" value="心胸外科"></el-option>
            <el-option label="血管外科" value="血管外科"></el-option>
            <el-option label="肝胆外科" value="肝胆外科"></el-option>
            <el-option label="理疗科" value="理疗科"></el-option>
            <el-option label="骨科" value="骨科"></el-option>
            <el-option label="烧伤整形科" value="烧伤整形科"></el-option>
            <el-option label="耳鼻喉科" value="耳鼻喉科"></el-option>
            <el-option label="眼科" value="眼科"></el-option>
            <el-option label="口腔科" value="口腔科"></el-option>
            <el-option label="精神科" value="精神科"></el-option>
            <el-option label="皮肤科" value="皮肤科"></el-option>
            <el-option label="中医科" value="中医科"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="dbForm.dbWarningLevel" placeholder="请选择" size="mini">
            <el-option label="零级预警" value="零级预警"></el-option>
            <el-option label="一级预警" value="一级预警"></el-option>
            <el-option label="二级预警" value="二级预警"></el-option>
            <el-option label="三级预警" value="三级预警"></el-option>
            <el-option label="四级预警" value="四级预警"></el-option>
            <el-option label="五级预警" value="五级预警"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="其他名称">
          <textarea cols="70" rows="5" v-model="dbForm.dbOtherNames"></textarea>
        </el-form-item>
        <el-form-item label="医学解释">
          <textarea cols="70" rows="5" v-model="dbForm.dbMedicalExplanation"></textarea>
        </el-form-item>
        <el-form-item label="常见原因">
          <textarea cols="70" rows="5" v-model="dbForm.dbCommonCauses"></textarea>
        </el-form-item>
        <el-form-item label="建议">
          <textarea cols="70" rows="5" v-model="dbForm.dbProposal"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="editDbFn">保 存</el-button>
        <el-button @click.prevent="editDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import { findDbList, addDb, findDbById, editDb, deleteDb } from "../../../api";
export default {
  components: {
    Top,
  },
  data() {
    return {
      multipleSelection: [],
      pageInfo: {},
      pageParams: {
        pageNum: 1,
        pageSize: 4,
        dbNumber: "",
        dbName: "",
      },
      addDialogTableVisible: false,
      dbObj: {
        dbExceptionType: "系统自带",
        dbOccupationalDiseases: "否",
        dbGender: "不限",
        dbTerm: "立即",
        dbDepartment: "内科",
      },
      editDialogTableVisible: false,
      dbForm: {},
    };
  },
  created() {
    this.findDbListFn();
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findDbListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findDbListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页条件查询疾病列表
    async findDbListFn() {
      let { data: baseResult } = await findDbList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$message.error(baseResult.message);
        this.$router.push("/error");
      }
    },
    //添加疾病
    async addDbFn() {
      let { data: baseResult } = await addDb(this.dbObj);
      if (baseResult.code == 1) {
        this.addDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findDbListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //根据id查询疾病
    async findDbByIdFn(dbId) {
      this.editDialogTableVisible = true;
      let { data: baseResult } = await findDbById(dbId);
      if (baseResult.code == 1) {
        this.dbForm = baseResult.data;
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //修改疾病
    async editDbFn() {
      let { data: baseResult } = await editDb(this.dbForm);
      if (baseResult.code == 1) {
        this.editDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findDbListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //删除疾病
    deleteDbFn(dbId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteDb(dbId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findDbListFn();
          } else {
            this.$message.error(baseResult.message);
          }
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
  },
};
</script>

<style>
</style>
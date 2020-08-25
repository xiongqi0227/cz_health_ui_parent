<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="编码">
          <el-input v-model="pageParams.splNumber" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="pageParams.splName" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findSplListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <el-button type="primary" size="small" @click.prevent="addDialogTableVisible=true">添加</el-button>
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="splNumber" label="编码" width="120"></el-table-column>
        <el-table-column prop="splName" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="splExerciseIntensity" label="运动强度"></el-table-column>
        <el-table-column prop="splExerciseIntensity" label="运动强度"></el-table-column>
        <el-table-column prop="splKiloStepEquivalent" label="千步当量"></el-table-column>
        <el-table-column prop="splExerciseTime" label="运动时间"></el-table-column>
        <el-table-column prop="splAgeRange" label="年龄区间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findSplByIdFn(scope.row.splId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteSplFn(scope.row.splId)">删除</el-button>
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
      <el-form :model="splObj" :inline="true" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="splObj.splName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运动强度">
          <el-input v-model="splObj.splExerciseIntensity" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运动时间">
          <el-input v-model="splObj.splExerciseTime" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="适用性别">
          <el-select v-model="splObj.splApplicableGender" placeholder="请选择性别" size="mini">
            <el-option label="不限" value="不限"></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄下限">
          <el-input v-model="splObj.minAge" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="年龄上限">
          <el-input v-model="splObj.maxAge" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="千步当量">
          <el-input v-model="splObj.splKiloStepEquivalent" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="拉伸部位">
          <el-select v-model="splObj.splStretchingPart" placeholder="请选择拉伸部位" size="mini">
            <el-option label="上肢" value="上肢"></el-option>
            <el-option label="下肢" value="下肢"></el-option>
            <el-option label="腰背" value="腰背"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作方法">
          <textarea cols="70" rows="5" v-model="splObj.splActionMethod"></textarea>
        </el-form-item>
        <el-form-item label="注意事项">
          <textarea cols="70" rows="5" v-model="splObj.splMattersNeedingAttention"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="addSplFn">保 存</el-button>
        <el-button @click.prevent="addDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 end -->

    <!-- 修改表单 start -->
    <el-dialog title="修改" :visible.sync="editDialogTableVisible" :append-to-body="true">
      <el-button>基本信息</el-button>
      <hr />
      <el-form :model="splForm" :inline="true" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="splForm.splName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运动强度">
          <el-input v-model="splForm.splExerciseIntensity" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="运动时间">
          <el-input v-model="splForm.splExerciseTime" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="适用性别">
          <el-select v-model="splForm.splApplicableGender" placeholder="请选择性别" size="mini">
            <el-option label="不限" value="不限"></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄下限">
          <el-input v-model="splForm.minAge" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="年龄上限">
          <el-input v-model="splForm.maxAge" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="千步当量">
          <el-input v-model="splForm.splKiloStepEquivalent" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="拉伸部位">
          <el-select v-model="splForm.splStretchingPart" placeholder="请选择拉伸部位" size="mini">
            <el-option label="上肢" value="上肢"></el-option>
            <el-option label="下肢" value="下肢"></el-option>
            <el-option label="腰背" value="腰背"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作方法">
          <textarea cols="70" rows="5" v-model="splForm.splActionMethod"></textarea>
        </el-form-item>
        <el-form-item label="注意事项">
          <textarea cols="70" rows="5" v-model="splForm.splMattersNeedingAttention"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="editSplFn">保 存</el-button>
        <el-button @click.prevent="editDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import {
  findSplList,
  addSpl,
  findSplById,
  editSpl,
  deleteSpl,
} from "../../../api";
export default {
  components: {
    Top,
  },
  data() {
    return {
      multipleSelection: [],
      pageInfo: {}, // 分页对象
      pageParams: {
        pageNum: 1,
        pageSize: 4,
        splNumber: "",
        splName: "",
      },
      addDialogTableVisible: false,
      splObj: {
        splApplicableGender: "不限",
        splStretchingPart: "上肢",
      },
      editDialogTableVisible: false,
      splObj: {},
      splForm: {},
    };
  },
  created() {
    this.findSplListFn();
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findSplListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findSplListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页条件查询运动项目列表
    async findSplListFn() {
      let { data: baseResult } = await findSplList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$message.error("/error");
      }
    },
    //添加运动项目
    async addSplFn() {
      let { data: baseResult } = await addSpl(this.splObj);
      if (baseResult.code == 1) {
        this.addDialogTableVisible = false;
        this.splObj = {};
        this.$message.success(baseResult.message);
        this.findSplListFn();
      } else {
        this.splObj = {};
        this.$message.error(baseResult.message);
      }
    },
    //根据id查询运动项目
    async findSplByIdFn(splId) {
      this.editDialogTableVisible = true;
      let { data: baseResult } = await findSplById(splId);
      if (baseResult.code == 1) {
        this.splForm = baseResult.data;
      } else {
        this.$router.push("/error");
      }
    },
    //修改运动项目
    async editSplFn() {
      let { data: baseResult } = await editSpl(this.splForm);
      if (baseResult.code == 1) {
        this.editDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findSplListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //删除运动项目
    deleteSplFn(splId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteSpl(splId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findSplListFn();
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
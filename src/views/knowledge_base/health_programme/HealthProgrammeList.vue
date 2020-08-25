<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="编码">
          <el-input v-model="pageParams.hpNumber" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item label="方案类别">
          <el-select v-model="pageParams.hpSchemeCategory" placeholder="请选择方案类别">
            <el-option label="心理干预" value="心理干预"></el-option>
            <el-option label="戒烟限酒" value="戒烟限酒"></el-option>
            <el-option label="饮食干预" value="饮食干预"></el-option>
            <el-option label="注意事项" value="注意事项"></el-option>
            <el-option label="运动干预" value="运动干预"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findHpListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <el-button type="primary" size="small" @click.prevent="addDialogTableVisible=true">添加</el-button>
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="hpNumber" label="编码" width="120"></el-table-column>
        <el-table-column prop="hpTitle" label="标题" width="120"></el-table-column>
        <el-table-column prop="hpKeyWord" label="关键词" width="150"></el-table-column>
        <el-table-column prop="hpSchemeCategory" label="方案类别" width="120"></el-table-column>
        <el-table-column prop="hpContent" label="内容" width="300"></el-table-column>
        <el-table-column label="状态" width="200">
          <template slot-scope="scope">{{scope.row.hpStatus==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findHpByIdFn(scope.row.hpId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteHpFn(scope.row.hpId)">删除</el-button>
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
      <el-form :model="hpObj" label-width="80px">
        <el-form-item label="方案标题">
          <el-input v-model="hpObj.hpTitle" size="mini" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="hpObj.hpKeyWord" size="mini" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="方案类别">
          <el-select v-model="hpObj.hpSchemeCategory" size="mini">
            <el-option label="心理干预" value="心理干预"></el-option>
            <el-option label="戒烟限酒" value="戒烟限酒"></el-option>
            <el-option label="饮食干预" value="饮食干预"></el-option>
            <el-option label="注意事项" value="注意事项"></el-option>
            <el-option label="运动干预" value="运动干预"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <textarea cols="70" rows="5" v-model="hpObj.hpContent"></textarea>
        </el-form-item>
        <el-form-item label="备注">
          <textarea cols="70" rows="5" v-model="hpObj.hpRemarks"></textarea>
        </el-form-item>
        <el-form-item label="禁用方案">
          <el-radio-group v-model="hpObj.hpStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="addHpFn">保 存</el-button>
        <el-button @click.prevent="addDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 end -->

    <!-- 修改表单 start -->
    <el-dialog title="修改" :visible.sync="editDialogTableVisible" :append-to-body="true">
      <el-button>基本信息</el-button>
      <hr />
      <el-form :model="hpForm" label-width="80px">
        <el-form-item label="方案标题">
          <el-input v-model="hpForm.hpTitle" size="mini" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="hpForm.hpKeyWord" size="mini" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="方案类别">
          <el-select v-model="hpForm.hpSchemeCategory" size="mini">
            <el-option label="心理干预" value="心理干预"></el-option>
            <el-option label="戒烟限酒" value="戒烟限酒"></el-option>
            <el-option label="饮食干预" value="饮食干预"></el-option>
            <el-option label="注意事项" value="注意事项"></el-option>
            <el-option label="运动干预" value="运动干预"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <textarea cols="70" rows="5" v-model="hpForm.hpContent"></textarea>
        </el-form-item>
        <el-form-item label="备注">
          <textarea cols="70" rows="5" v-model="hpForm.hpRemarks"></textarea>
        </el-form-item>
        <el-form-item label="禁用方案">
          <el-radio-group v-model="hpForm.hpStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="editHpFn">修 改</el-button>
        <el-button @click.prevent="editDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import { findHpList, addHp, findHpById, editHp, deleteHp } from "../../../api";
export default {
  components: {
    Top,
  },
  data() {
    return {
      pageInfo: {},
      pageParams: {
        pageNum: 1,
        pageSize: 4,
        mpNumber: "",
        hpSchemeCategory: "心理干预",
      },
      addDialogTableVisible: false,
      hpObj: {},
      editDialogTableVisible: false,
      hpForm: {},
    };
  },
  created() {
    this.findHpListFn();
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findHpListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findHpListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页条件查询健康方案列表
    async findHpListFn() {
      let { data: baseResult } = await findHpList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$router.push("/error");
      }
    },
    //添加健康方案
    async addHpFn() {
      let { data: baseResult } = await addHp(this.hpObj);
      if (baseResult.code == 1) {
        this.addDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findHpListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //根据id查询健康方案
    async findHpByIdFn(hpId) {
      let { data: baseResult } = await findHpById(hpId);
      if (baseResult.code == 1) {
        this.editDialogTableVisible = true;
        this.hpForm = baseResult.data;
      } else {
        this.$router.push("/error");
      }
    },
    //修改健康方案
    async editHpFn() {
      let { data: baseResult } = await editHp(this.hpForm);
      if (baseResult.code == 1) {
        this.editDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findHpListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //删除健康方案
    deleteHpFn(hpId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteHp(hpId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findHpListFn();
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
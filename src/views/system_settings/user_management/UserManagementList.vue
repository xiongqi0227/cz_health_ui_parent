<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="pageParams.umName" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="pageParams.umUsername" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findUmListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="umUsername" label="用户名" width="120"></el-table-column>
        <el-table-column prop="umName" label="真实姓名" width="120"></el-table-column>
        <el-table-column prop="umRole" label="角色" width="120"></el-table-column>
        <el-table-column prop="umLoginTimes" label="登录次数" width="120"></el-table-column>
        <el-table-column prop="umEnable" label="是否启用" width="120"></el-table-column>
        <el-table-column prop="umPhone" label="电话" width="120"></el-table-column>
        <el-table-column prop="umEmail" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="umCreateTime" label="添加日期" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findUmByIdFn(scope.row.umId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteUmFn(scope.row.umId)">删除</el-button>
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
    <!-- 修改表单 start -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="user" style="textAlign:center;margin:auto;">
        <el-form-item label="真实姓名" prop="umName">
          <el-input v-model="user.umName" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="umUsername">
          <el-input v-model="user.umUsername" style="width: 50%;"></el-input>
        </el-form-item>
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
        <el-button type="primary" @click.prevent="editUmFn">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import { findUmList, findUmById, editUm, deleteUm } from "../../../api";
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
        umUsername: "",
        umName: "",
      },
      umForm: {},
      dialogFormVisible: false,
      user: {},
    };
  },
  created() {
    this.findUmListFn();
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findUmListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findUmListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页条件查询用户列表
    async findUmListFn() {
      let { data: baseResult } = await findUmList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$router.push("/error");
      }
    },
    //根据id查询用户
    async findUmByIdFn(umId) {
      this.dialogFormVisible = true;
      let { data: baseResult } = await findUmById(umId);
      if ((baseResult.code = 1)) {
        this.user = baseResult.data;
      } else {
        this.$router.push("/error");
      }
    },
    //修改用户
    async editUmFn() {
      let { data: baseResult } = await editUm(this.user);
      if (baseResult.code == 1) {
        this.dialogFormVisible = false;
        this.$message.success(baseResult.message);
        this.findUmListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //删除用户
    deleteUmFn(umId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteUm(umId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findUmListFn();
          } else {
            this.$message.error(baseResult.message);
          }
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    }
  },
};
</script>

<style>
.el-dialog {
  width: 30%;
}
</style>
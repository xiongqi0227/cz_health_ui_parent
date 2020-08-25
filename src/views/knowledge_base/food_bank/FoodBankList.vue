<template>
  <div>
    <!-- Top组件 start -->
    <Top></Top>
    <!-- Top组件 end -->
    <el-card class="box-card">
      <!-- 查询条件 start -->
      <el-form :inline="true" :model="pageParams" class="demo-form-inline">
        <el-form-item label="编码">
          <el-input v-model="pageParams.fbNumber" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item label="食物名称">
          <el-input v-model="pageParams.fbName" placeholder="食物名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="findFbListFn" style="width:150px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 查询条件 end -->
      <el-button type="primary" size="small" @click.prevent="addDialogTableVisible=true">添加</el-button>
      <!-- 列表 start -->
      <el-table :data="pageInfo.list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="fbNumber" label="编码" width="160"></el-table-column>
        <el-table-column prop="fbName" label="食品名称" width="160"></el-table-column>
        <el-table-column prop="fbCategory" label="所属类型" width="160"></el-table-column>
        <el-table-column prop="fbKjEnergy" label="100g含能量" width="160"></el-table-column>
        <el-table-column prop="fbProteinContent" label="蛋白质含量" width="160"></el-table-column>
        <el-table-column prop="fbFatContent" label="脂肪含量" width="160"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.prevent="findFbByIdFn(scope.row.fbId)">编辑</el-button>
            <el-button type="text" size="small" @click.prevent="deleteFbFn(scope.row.fbId)">删除</el-button>
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
      <el-form :model="fbObj" :inline="true" label-width="80px">
        <el-form-item label="食品名称">
          <el-input v-model="fbObj.fbName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="所属类别">
          <el-select v-model="fbObj.fbCategory" placeholder="请选择类别" size="mini">
            <el-option label="谷薯类及杂豆" value="谷薯类及杂豆"></el-option>
            <el-option label="大豆类" value="大豆类"></el-option>
            <el-option label="蔬菜类" value="蔬菜类"></el-option>
            <el-option label="水果类" value="水果类"></el-option>
            <el-option label="坚果、种子类" value="坚果、种子类"></el-option>
            <el-option label="畜肉禽肉鱼虾蟹贝类" value="畜肉禽肉鱼虾蟹贝类"></el-option>
            <el-option label="奶类" value="奶类"></el-option>
            <el-option label="蛋类" value="蛋类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每Kcal能量">
          <el-input v-model="fbObj.fbKCalEnergy" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="每KJ能量">
          <el-input v-model="fbObj.fbKjEnergy" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="碳水化合物含量">
          <el-input v-model="fbObj.fbCarbohydrateContent" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="脂肪含量">
          <el-input v-model="fbObj.fbFatContent" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="蛋白质含量">
          <el-input v-model="fbObj.fbProteinContent" size="mini"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="高血压">
          <el-select v-model="fbObj.fbHypertension" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病">
          <el-select v-model="fbObj.fbDiabetes" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="冠心病">
          <el-select v-model="fbObj.fbCoronaryHeartDisease" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="脑卒中">
          <el-select v-model="fbObj.fbCerebralApoplexy" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心脑血管疾病">
          <el-select v-model="fbObj.fbCardiovascularAndCerebrovascularDiseases" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="高血脂">
          <el-select v-model="fbObj.fbHyperlipidemia" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="肥胖">
          <el-select v-model="fbObj.fbObesity" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="痛风">
          <el-select v-model="fbObj.fbGout" size="mini">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <textarea cols="70" rows="5" v-model="fbObj.fbExplain"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="addFbFn">保 存</el-button>
        <el-button @click.prevent="addDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 end -->

    <!-- 修改表单 start -->
    <el-dialog title="修改" :visible.sync="editDialogTableVisible" :append-to-body="true">
      <el-button>基本信息</el-button>
      <hr />
      <el-form :model="fbForm" :inline="true" label-width="80px">
        <el-form-item label="食品名称">
          <el-input v-model="fbForm.fbName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="所属类别">
          <el-select v-model="fbForm.fbCategory" placeholder="请选择类别" size="mini">
            <el-option label="谷薯类及杂豆" value="谷薯类及杂豆"></el-option>
            <el-option label="大豆类" value="大豆类"></el-option>
            <el-option label="蔬菜类" value="蔬菜类"></el-option>
            <el-option label="水果类" value="水果类"></el-option>
            <el-option label="坚果、种子类" value="坚果、种子类"></el-option>
            <el-option label="畜肉禽肉鱼虾蟹贝类" value="畜肉禽肉鱼虾蟹贝类"></el-option>
            <el-option label="奶类" value="奶类"></el-option>
            <el-option label="蛋类" value="蛋类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每Kcal能量">
          <el-input v-model="fbForm.fbKCalEnergy" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="每KJ能量">
          <el-input v-model="fbForm.fbKjEnergy" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="碳水化合物含量">
          <el-input v-model="fbForm.fbCarbohydrateContent" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="脂肪含量">
          <el-input v-model="fbForm.fbFatContent" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="蛋白质含量">
          <el-input v-model="fbForm.fbProteinContent" size="mini"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="高血压">
          <el-select v-model="fbForm.fbHypertension" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="糖尿病">
          <el-select v-model="fbForm.fbDiabetes" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="冠心病">
          <el-select v-model="fbForm.fbCoronaryHeartDisease" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="脑卒中">
          <el-select v-model="fbForm.fbCerebralApoplexy" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="心脑血管疾病">
          <el-select v-model="fbForm.fbCardiovascularAndCerebrovascularDiseases" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="高血脂">
          <el-select v-model="fbForm.fbHyperlipidemia" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="肥胖">
          <el-select v-model="fbForm.fbObesity" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="痛风">
          <el-select v-model="fbForm.fbGout" size="mini">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <textarea cols="70" rows="5" v-model="fbForm.fbExplain"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="editFbFn">保 存</el-button>
        <el-button @click.prevent="editDialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单 end -->
  </div>
</template>

<script>
import Top from "../../../components/Top";
import { findFbList, addFb, findFbById, editFb, deleteFb } from "../../../api";
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
        fbNumber: "",
        fbName: "",
      },
      addDialogTableVisible: false,
      yc: false,
      fbObj: {},
      editDialogTableVisible: false,
      fbForm: {},
    };
  },
  created() {
    this.findFbListFn();
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.findFbListFn();
    },
    handleCurrentChange(val) {
      this.pageParams.pageNum = val;
      this.findFbListFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页查询膳食库列表
    async findFbListFn() {
      let { data: baseResult } = await findFbList(this.pageParams);
      if (baseResult.code == 1) {
        this.pageInfo = baseResult.data;
      } else {
        this.$message.error(baseResult.message);
        this.$router.push("/error");
      }
    },
    //添加食品
    async addFbFn() {
      let { data: baseResult } = await addFb(this.fbObj);
      if (baseResult.code == 1) {
        this.addDialogTableVisible = false;
        this.fbObj = {};
        this.$message.success(baseResult.message);
        this.findFbListFn();
      } else {
        this.fbObj = {};
        this.$message.error(baseResult.message);
      }
    },
    //根据id查询食品
    async findFbByIdFn(fbId) {
      this.editDialogTableVisible = true;
      let { data: baseResult } = await findFbById(fbId);
      if (baseResult.code == 1) {
        this.fbForm = baseResult.data;
      } else {
        this.$message.error(baseResult.message);
        this.$router.push("/error");
      }
    },
    //修改食品
    async editFbFn() {
      let { data: baseResult } = await editFb(this.fbForm);
      if (baseResult.code == 1) {
        this.editDialogTableVisible = false;
        this.$message.success(baseResult.message);
        this.findFbListFn();
      } else {
        this.$message.error(baseResult.message);
      }
    },
    //删除食品
    deleteFbFn(fbId) {
      this.$confirm("确定要删除这条信息吗？", "提示", { type: "warning" })
        .then(async () => {
          let { data: baseResult } = await deleteFb(fbId);
          if (baseResult.code == 1) {
            this.$message.success(baseResult.message);
            this.pageParams.pageNum = 1;
            this.findFbListFn();
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
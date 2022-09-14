<template>
  <div class="mod-config">
        <el-menu>
            <el-menu-item>
                <el-button type="primary" @click="add()">新增</el-button>
            </el-menu-item>
        </el-menu>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="jobno"
          header-align="center"
          align="center"
          label="工号">
        </el-table-column>
        <el-table-column
        label="姓名："
        prop="name"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="密码："
        prop="pwd"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="用户类型："
        prop="teatype"
        header-align="center"
        align="center">
        <template slot-scope="scope">
            <span v-if="scope.row.teatype==0">教师用户</span>
            <span v-else-if="scope.row.teatype==1">学院管理员</span>
            <span v-else-if="scope.row.teatype==2">学校管理员</span>
          </template>
        </el-table-column>
        <el-table-column
        label="学院："
        prop="unit"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="Update(scope.row.jobno)">修改账号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗, 新增 / 修改 -->
      <updatepassword v-if="visable" ref="UpdatePassword"></updatepassword>

      <!-- 弹窗, 新增 / 修改 -->
      

  </div>
</template>

<script>
import {getUsers,getUser} from '@/api/customer/user'
import cookie from 'js-cookie'
import UpdatePassword from '../dialog/PasswordDialog';
export default {
  data() {
    return {
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      visable: false,
      teatype:null
    };
  },

  created() {
    this.teatype = Number(cookie.get("teatype"))
    this.getDataList();
  },
  components: {
    "updatepassword":UpdatePassword
  },
  methods: {
    // 获取数据列表
    getDataList(){
        if(this.teatype==1){
            let req={
                unit:cookie.get("unit")
            }
            getUser(req).then(resp=>{
            if(resp.length!=0){
                this.dataList = resp
            }
            });
        }else{
            getUsers().then(resp=>{
            if(resp.length!=0){
                this.dataList = resp
            }
            });
        }
        
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    Update(id){
        this.visable = true;
        this.$nextTick(() => {
        this.$refs.UpdatePassword.init(id,false);
      });
    },
    add(){
        this.visable = true;
        this.$nextTick(() => {
        this.$refs.UpdatePassword.init(0,true);
        });
    }
  },
};
</script>


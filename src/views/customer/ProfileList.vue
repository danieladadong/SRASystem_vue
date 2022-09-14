<template>
  <div class="mod-config">
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="id"
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
        label="性别："
        prop="sex"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="出生日期："
        prop="brith"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="邮箱："
        prop="mail"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="联系方式："
        prop="phone"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="地址："
        prop="access"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="职位："
        prop="position"
        header-align="center"
        align="center">
        </el-table-column>
        <el-table-column
        label="学历："
        prop="education"
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
              @click="Update(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗, 新增 / 修改 -->
      <updateprofile v-if="visable" ref="Updateprofile"></updateprofile>

      <!-- 弹窗, 新增 / 修改 -->
      

  </div>
</template>

<script>
import {getProfiles,getProfile} from '@/api/customer/profile'
import cookie from 'js-cookie'
import Updateprofile from '../dialog/ProfileDialog';
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
    this.teatype=Number(cookie.get("teatype"))
    this.getDataList();
  },
  components: {
    "updateprofile":Updateprofile
  },
  methods: {
    // 获取数据列表
    getDataList(){
      if(this.teatype==1){
        let req={
          unit:cookie.get("unit")
        }
        getProfile(req).then(resp=>{
            if(resp.length!=0){
                this.dataList = resp
            }
        });
      }else{
        getProfiles().then(resp=>{
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
        this.$refs.Updateprofile.init(id);
      });
    },
  },
};
</script>

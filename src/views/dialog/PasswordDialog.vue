<template>
        <el-dialog
        v-if="visable"
        :title="'修改账号信息'"
        :close-on-click-modal="true"
        :visible.sync="visable">
            <el-form :model="infoForm" ref="infoForm" label-width="100px">
            <el-form-item v-if="add" class="info-item" label="工号:">
                <el-input type="text" v-model="infoForm.jobno"></el-input>
            </el-form-item>
            <el-form-item class="info-item" label="姓名:">
                <el-input :disabled="!add" type="text" v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item class="info-item" label="密码:">
                <el-input v-model="infoForm.pwd"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="用户类型：">
                <el-select v-if="admin" v-model="infoForm.teatype" style="width:100%">
                    <el-option
                        v-for="item in ateatypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-select v-else v-model="infoForm.teatype" style="width:100%">
                    <el-option
                        v-for="item in teatypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item class="info-item" label="学院：">
                <el-input v-model="infoForm.unit"></el-input>
            </el-form-item>
            </el-form>
            <div style="padding-left:15%;">
                <el-button v-if="!add" type="primary" @click="submit">修改账号</el-button>
                <el-button v-else type="primary" @click="submit">添加账号</el-button>
            </div>
        </el-dialog>
</template>
<script>
import {getUserDetail,updateUser} from '@/api/customer/user'
import {Regist} from '@/api/common/login'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      visable: false,
      infoForm: {
          jobno:null,
          name:"",
          pwd:"",
          teatype:null,
          unit:""
      },
      jobno:null,
      ateatypes:[
        {label:"教师",value:0},
        {label:"学院管理员",value:1},
        {label:"学校管理员",value:2},
      ],
      teatypes:[
        {label:"教师",value:0},
        {label:"学院管理员",value:1},
      ],
      admin:false,
      add:false
    }
  },
  methods: {
    init(id,add){
        this.add = add
        this.visable=true;
        if(!add){
            if(Number(cookie.get("teatype"))==2){
                this.admin=true
            }
            this.jobno = id;
            getUserDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.infoForm = resp;
                }
            });
        }
    },
    submit(){
        if(!this.add){
            let id =this.jobno
            updateUser(id,this.infoForm).then(resp=>{
                if(resp.length!=0){
                    this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                    this.visable = false;
                    }
                    });
                    
                    this.$parent.getDataList();
                }
            })
        }else{
            Regist(this.infoForm).then(resp=>{
                if(resp.status==200){
                    this.$message({
                    message: "添加成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                    this.visable = false;
                    }
                    });
                    this.$parent.getDataList();
                }else{
                    this.$message({
                    message: "添加失败",
                    type: "failed",
                    duration: 1500,
                    onClose: () => {
                    this.visable = false;
                    }
                    });
                    this.$parent.getDataList();
                }
            })
        }
    },

  },
}
</script>
<style scoped>
.el-button{
    margin-left: 30%;
}
</style>

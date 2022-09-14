<template>
        <el-dialog
        v-if="visable"
        :title="'修改信息'"
        :close-on-click-modal="true"
        :visible.sync="visable">
            <el-form :model="infoForm" ref="infoForm" label-width="100px">
            <el-form-item class="info-item" label="姓名:">
                <el-input disabled type="text" v-model="infoForm.name"></el-input>
            </el-form-item>
            <el-form-item class="info-item" label="性别:">
                <el-input type="text" v-model="infoForm.sex"></el-input>
            </el-form-item>
            <el-form-item class="info-item" label="出生日期:">
                <el-input v-model="infoForm.brith"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="邮箱:">
                <el-input v-model="infoForm.mail"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="联系方式:">
                <el-input v-model="infoForm.phone"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="地址:">
                <el-input v-model="infoForm.access"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="职位:">
                <el-input v-model="infoForm.position"></el-input>
            </el-form-item>
                <el-form-item class="info-item" label="学历:">
                <el-input v-model="infoForm.education"></el-input>
            </el-form-item>
            <el-form-item class="info-item" label="毕业院校:">
                <el-input v-model="infoForm.graduate"></el-input>
            </el-form-item>
            </el-form>
            <div style="padding-left:15%;">
                <el-button type="primary" @click="submit">修改个人信息</el-button>
            </div>
        </el-dialog>
</template>
<script>
import {getProfileDetail,updateProfile} from '@/api/customer/profile'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      visable: false,
      infoForm: [],
      jobno:null
    }
  },
  methods: {
    init(id){
        this.visable=true;
        this.jobno = id;
        getProfileDetail(id).then(resp=>{
            if(resp.length!=0){
                this.infoForm = resp;
            }
        });
    },
    submit(){
        let id =this.jobno
        updateProfile(id,this.infoForm).then(resp=>{
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
    },

  },
}
</script>
<style scoped>
.el-button{
    margin-left: 30%;
}
</style>

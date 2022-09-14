<template>
  <el-dialog
    v-if="visible"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-input
        v-model="dataForm.id"
        style="display: none"></el-input>
      <el-form-item label="奖项名称" prop="title">
        <el-input
            v-model="dataForm.title"
            placeholder="请输入奖项名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="奖项类型" prop="awardType">
        <el-input v-model="dataForm.awardType" placeholder="请输入奖项类型"></el-input>
      </el-form-item>
      <el-form-item label="得奖人" prop="winner">
        <el-input
            v-model="dataForm.winner"
            placeholder="请输入得奖人"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="颁奖机构" prop="awarding">
        <el-input
            v-model="dataForm.awarding"
            placeholder="请输入颁奖机构"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="证书" prop="certificate">
        <el-input
            v-model="dataForm.certificate"
            placeholder="请输入证书"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-if="isadd" label="审核状态" prop="verify">
        <el-input
            :disabled="isadd"
            v-model="dataForm.verify"
            placeholder="请输入审核状态"
            style="width: 100%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getEntryWardDetail,addEntryWard,updateEntryWard} from '@/api/entryaward/entryaward.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            title: "",
            awardType: "",
            winner: "",
            awarding: "",
            certificate: "",
            upuser:cookie.get("jobno"),
            verify: 0,
            unit:cookie.get("unit")
        },
        dataRule: {
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            awardType: [{ required: true, message: "不能为空", trigger: "blur" }],
            winner: [{ required: true, message: "不能为空", trigger: "blur" }],
            awarding: [{ required: true, message: "不能为空", trigger: "blur" }],
            certificate: [{ required: true, message: "不能为空", trigger: "blur" }],
            verify: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        visible: false,
    };
  },
  created(){
        
  },
  methods: {
    init(id) {
        this.visible = true;
        if(typeof(id)!="undefined"&&id!=0){
            this.isadd = false;
            getEntryWardDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.dataForm = resp
                }
            })
        }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.isadd==false){
                updateEntryWard(this.dataForm.id,this.dataForm).then(resp=>{
                    this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                        this.visible = false;
                    }
                    });
                    this.$parent.getDataList();
                });
            }else{
                addEntryWard(this.dataForm).then(resp=>{
                    this.$message({
                    message: "添加成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                        this.visible = false;
                    }
                    });
                    this.$parent.getDataList();
                })
            }
        }
      });
    },
  },
};
</script>
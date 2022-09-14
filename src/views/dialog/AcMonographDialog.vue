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
      <el-form-item label="著作名称" prop="Monographname">
        <el-input
            v-model="dataForm.Monographname"
            placeholder="请输入著作名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="dataForm.author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="著作类型" prop="MonographType">
        <el-input
            v-model="dataForm.MonographType"
            placeholder="请输入著作类型"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="press">
        <el-input
            v-model="dataForm.press"
            placeholder="请输入出版社"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="unit">
        <el-input
            v-model="dataForm.unit"
            placeholder="请输入所属学院"
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
import {getAcMonographDetail,addAcMonograph,updateAcMonograph} from '@/api/achievement/acmonograph.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            Monographname: "",
            author: "",
            MonographType: "",
            press: "",
            upuser:cookie.get("jobno"),
            isadd:1,
            unit:""
        },
        dataRule: {
            Monographname: [{ required: true, message: "不能为空", trigger: "blur" }],
            author: [{ required: true, message: "不能为空", trigger: "blur" }],
            MonographType: [{ required: true, message: "不能为空", trigger: "blur" }],
            press: [{ required: true, message: "不能为空", trigger: "blur" }],
            unit: [{ required: true, message: "不能为空", trigger: "blur" }]
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
            getAcMonographDetail(id).then(resp=>{
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
                updateAcMonograph(this.dataForm.id,this.dataForm).then(resp=>{
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
                addAcMonograph(this.dataForm).then(resp=>{
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
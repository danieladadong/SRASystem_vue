<template>
  <el-dialog
    v-if="visible"
    :title="新增"
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
      <el-form-item label="项目名称" prop="projectname">
        <el-input
            v-model="dataForm.projectname"
            placeholder="请输入项目名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="项目分类" prop="projecttype">
        <el-input v-model="dataForm.projecttype" placeholder="请输入项目分类"></el-input>
      </el-form-item>
      <el-form-item label="项目成员" prop="projectmember">
        <el-input
            v-model="dataForm.projectmember"
            placeholder="请输入项目成员"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-if="isadd" label="项目状态" prop="pverify">
        <el-input
            :disabled="isadd"
            v-model="dataForm.pverify"
            placeholder="请输入项目状态"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="起止时间" prop="ydate">
        <el-input
            v-model="dataForm.ydate"
            placeholder="请输入起止时间"
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
import {getProjectDetail,addProject,updateProject} from '@/api/research/projects.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        unit:"",
        dataForm: {
            id: 0,
            projectname: "",
            projecttype: "",
            projectmember: "",
            pverify: 1,
            ydate: "",
            verify: 0,
            unit:cookie.get('unit'),
            funds:[
                {
                    contractamount:0,
                    arrivalamount:0,
                    outamount:0,
                    outsideamount:0,
                    amount:0,
                    comount:0,
                    project:1,
                    unit:cookie.get('unit')
                }
            ]
        },
        dataRule: {
            projectname: [{ required: true, message: "不能为空", trigger: "blur" }],
            projecttype: [{ required: true, message: "不能为空", trigger: "blur" }],
            projectmember: [{ required: true, message: "不能为空", trigger: "blur" }],
            pverify: [{ required: true, message: "不能为空", trigger: "blur" }],
            ydate: [{ required: true, message: "不能为空", trigger: "blur" }],
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
            getProjectDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.dataForm = resp
                }
            })
        }
    },
    // 表单提交
    dataFormSubmit() {
      this.unit = cookie.get("unit")
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.isadd==false){
                updateProject(this.dataForm.id,this.dataForm).then(resp=>{
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
                // this.dataForm.unit=this.unit;
                // this.dataForm.funds[0].unit = this.unit
                addProject(this.dataForm).then(resp=>{
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
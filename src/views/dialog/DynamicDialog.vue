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
      <el-form-item v-if="!isadd" label="项目名称" prop="projectname">
        <el-input
            :disabled="true"
            v-model="dataForm.projects[0].projectname"
            placeholder="请输入项目名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item v-else label="项目名称">
        <el-select
            v-model="dataForm.project"
            style="width:100%">
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.projectname"
                :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目进度" prop="progress">
        <el-input v-model="dataForm.progress" placeholder="请输入项目进度"></el-input>
      </el-form-item>
      <el-form-item label="完成进度" prop="performance">
        <el-input
            v-model="dataForm.performance"
            placeholder="请输入完成进度"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="当前时间" prop="ddate">
        <el-input
            v-model="dataForm.ddate"
            placeholder="请输入当前时间"
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
import {getDynamicDetail,addDynamic,updateDynamic,getDynamic} from '@/api/research/dynamic.js'
import {getProject} from '@/api/research/projects.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            progress: "",
            performance: 0,
            ddate: "",
            project: "",
            unit:cookie.get("unit")
        },
        projectList:[],
        dataRule: {
            progress: [{ required: true, message: "不能为空", trigger: "blur" }],
            performance: [{ required: true, message: "不能为空", trigger: "blur" }],
            ddate: [{ required: true, message: "不能为空", trigger: "blur" }],
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
            getDynamicDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.dataForm = resp
                }
            })
        }else{
            let req = {
                projectmember:cookie.get("name")
            }
            getProject(req).then(resp=>{
                if(resp.length!=0){
                    for(var i=0;i<resp.length;i++){
                        this.projectList.push(resp[i])
                    }
                    console.log(this.projectList)
                }
            });
        }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.isadd==false){
                updateDynamic(this.dataForm.id,this.dataForm).then(resp=>{
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
                addDynamic(this.dataForm).then(resp=>{
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
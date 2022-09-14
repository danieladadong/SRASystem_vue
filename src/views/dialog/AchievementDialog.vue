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
      <el-form-item label="标题" prop="title">
        <el-input
            v-model="dataForm.title"
            placeholder="请输入标题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="成果完成人" prop="completed">
        <el-input v-model="dataForm.completed" placeholder="请输入成果完成人"></el-input>
      </el-form-item>
      <el-form-item label="第一完成单位" prop="first">
        <el-input
            v-model="dataForm.first"
            placeholder="请输入第一完成单位"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input
            v-model="dataForm.keyword"
            placeholder="请输入关键词"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="成果简介" prop="introduction">
        <el-input
            v-model="dataForm.introduction"
            placeholder="请输入成果简介"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="成果类别" prop="achievementype">
        <el-input
            v-model="dataForm.achievementype"
            placeholder="请输入成果类别"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="研究起止时间" prop="ydate">
        <el-input
            v-model="dataForm.ydate"
            placeholder="请输入研究起止时间"
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
import {getAchievementDetail,addAchievement,updateAchievement} from '@/api/achievement/achievement.js'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            title: "",
            completed: "",
            first: "",
            keyword: "",
            introduction: "",
            achievementype: "",
            ydate: "",
            isadd:1,
            unit:""
        },
        dataRule: {
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            completed: [{ required: true, message: "不能为空", trigger: "blur" }],
            first: [{ required: true, message: "不能为空", trigger: "blur" }],
            keyword: [{ required: true, message: "不能为空", trigger: "blur" }],
            introduction: [{ required: true, message: "不能为空", trigger: "blur" }],
            achievementype: [{ required: true, message: "不能为空", trigger: "blur" }],
            ydate: [{ required: true, message: "不能为空", trigger: "blur" }],
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
            getAchievementDetail(id).then(resp=>{
                if(resp.length!=0){
                    this.dataForm = resp
                    console.log(this.dataForm)
                }
            })
        }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.isadd==false){
                updateAchievement(this.dataForm.id,this.dataForm).then(resp=>{
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
                addAchievement(this.dataForm).then(resp=>{
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
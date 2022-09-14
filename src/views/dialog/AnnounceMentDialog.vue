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
      <el-form-item label="公告标题" prop="title">
        <el-input
            v-model="dataForm.title"
            placeholder="请输入公告标题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="发布日期" prop="releasedate">
        <el-input v-model="dataForm.releasedate" placeholder="请输入发布日期"></el-input>
      </el-form-item>
      <el-form-item v-if="false" label="发布人" prop="releaser">
        <el-input
            v-model="dataForm.releaser"
            placeholder="请选择发布人"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input
            v-model="dataForm.content"
            placeholder="请输入公告内容"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="公告类型" prop="type">
        <el-input
            v-model="dataForm.type"
            placeholder="请输入公告类型"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="unit">
        <el-input
            v-model="dataForm.unit"
            placeholder="请输入学院全称"
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
import {getAnnouncementDetail,addAnnouncement,updateAnnouncement} from '@/api/bulletin/announcement.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            title: "",
            releasedate: "",
            releaser: cookie.get("jobno"),
            content: "",
            type:"",
            unit:cookie.get("unit")
        },
        dataRule: {
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            releasedate: [{ required: true, message: "不能为空", trigger: "blur" }],
            releaser: [{ required: true, message: "不能为空", trigger: "blur" }],
            content: [{ required: true, message: "不能为空", trigger: "blur" }],
            type: [{ required: true, message: "不能为空", trigger: "blur" }],
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
            getAnnouncementDetail(id).then(resp=>{
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
                updateAnnouncement(this.dataForm.id,this.dataForm).then(resp=>{
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
                addAnnouncement(this.dataForm).then(resp=>{
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
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
      <el-form-item label="论文标题" prop="papername">
        <el-input
            v-model="dataForm.papername"
            placeholder="请输入标题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="dataForm.author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input
            v-model="dataForm.school"
            placeholder="请输入学校"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input
            v-model="dataForm.abstract"
            placeholder="请输入摘要"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-input
            v-model="dataForm.keyword"
            placeholder="请输入关键词"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="导师" prop="tteacher">
        <el-input
            v-model="dataForm.tteacher"
            placeholder="请输入导师"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input
            v-model="dataForm.major"
            placeholder="请输入专业"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="unit">
        <el-input
            v-model="dataForm.unit"
            placeholder="请输入所属学院"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="年份" prop="fdate">
        <el-input
            v-model="dataForm.fdate"
            placeholder="请输入年份（以年结尾）"
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
import {getMyPaperDetail,addMyPapers,updateMyPapers} from '@/api/achievement/mypapers.js'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            papername: "",
            author: "",
            school: "",
            abstract: "",
            keyword: "",
            tteacher: "",
            major: "",
            content:"#",
            unit:"",
            isadd:1,
            fdate:""
        },
        dataRule: {
            papername: [{ required: true, message: "不能为空", trigger: "blur" }],
            author: [{ required: true, message: "不能为空", trigger: "blur" }],
            school: [{ required: true, message: "不能为空", trigger: "blur" }],
            abstract: [{ required: true, message: "不能为空", trigger: "blur" }],
            keyword: [{ required: true, message: "不能为空", trigger: "blur" }],
            tteacher: [{ required: true, message: "不能为空", trigger: "blur" }],
            major: [{ required: true, message: "不能为空", trigger: "blur" }],
            unit: [{ required: true, message: "不能为空", trigger: "blur" }],
            fdate: [{ required: true, message: "不能为空", trigger: "blur" }]
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
            getMyPaperDetail(id).then(resp=>{
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
                updateMyPapers(this.dataForm.id,this.dataForm).then(resp=>{
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
                addMyPapers(this.dataForm).then(resp=>{
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
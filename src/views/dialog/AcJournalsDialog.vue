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
      <el-form-item label="标题" prop="journalsname">
        <el-input
            v-model="dataForm.journalsname"
            placeholder="请输入标题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="dataForm.author" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="机构" prop="mechanism">
        <el-input
            v-model="dataForm.mechanism"
            placeholder="请输入机构"
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
import {getAcJournalDetail,addAcJournals,updateAcJournals} from '@/api/achievement/acjournals.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            journalsname: "",
            author: "",
            mechanism: "",
            abstract: "",
            keyword:"",
            content:"#",
            isadd:1,
            unit:""
        },
        dataRule: {
            journalsname: [{ required: true, message: "不能为空", trigger: "blur" }],
            author: [{ required: true, message: "不能为空", trigger: "blur" }],
            mechanism: [{ required: true, message: "不能为空", trigger: "blur" }],
            abstract: [{ required: true, message: "不能为空", trigger: "blur" }],
            keyword: [{ required: true, message: "不能为空", trigger: "blur" }],
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
            getAcJournalDetail(id).then(resp=>{
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
                updateAcJournals(this.dataForm.id,this.dataForm).then(resp=>{
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
                addAcJournals(this.dataForm).then(resp=>{
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
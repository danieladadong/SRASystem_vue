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
      <el-form-item label="专利名" prop="patentname">
        <el-input
            v-model="dataForm.patentname"
            placeholder="请输入专利名"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="patenttype">
        <el-input v-model="dataForm.patenttype" placeholder="请输入专利类型"></el-input>
      </el-form-item>
      <el-form-item label="申请人" prop="applicant">
        <el-input
            v-model="dataForm.applicant"
            placeholder="请输入申请人"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input
            v-model="dataForm.address"
            placeholder="请输入地址"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="发明人" prop="inventor">
        <el-input
            v-model="dataForm.inventor"
            placeholder="请输入发明人"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="专题" prop="special">
        <el-input
            v-model="dataForm.special"
            placeholder="请输入专题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="专辑" prop="album">
        <el-input
            v-model="dataForm.album"
            placeholder="请输入专辑"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="页数" prop="pages">
        <el-input
            v-model="dataForm.pages"
            placeholder="请输入页数"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="代理机构" prop="agency">
        <el-input
            v-model="dataForm.agency"
            placeholder="请输入代理机构"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="申请日" prop="fdate">
        <el-input
            v-model="dataForm.fdate"
            placeholder="请输入申请日"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input
            v-model="dataForm.abstract"
            placeholder="请输入摘要"
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
import {getPatentDetail,addPatent,updatePatent} from '@/api/achievement/patent.js'
export default {
  data() {
    return {
        isadd:true,
        dataForm: {
            id: 0,
            patentname: "",
            patenttype: "",
            applicant: "",
            address: "",
            inventor: "",
            special: "",
            album: "",
            pages:"",
            agency:"",
            fdate:"",
            isadd:1,
            abstract:""
        },
        dataRule: {
            patentname: [{ required: true, message: "不能为空", trigger: "blur" }],
            patenttype: [{ required: true, message: "不能为空", trigger: "blur" }],
            applicant: [{ required: true, message: "不能为空", trigger: "blur" }],
            address: [{ required: true, message: "不能为空", trigger: "blur" }],
            inventor: [{ required: true, message: "不能为空", trigger: "blur" }],
            special: [{ required: true, message: "不能为空", trigger: "blur" }],
            album: [{ required: true, message: "不能为空", trigger: "blur" }],
            pages: [{ required: true, message: "不能为空", trigger: "blur" }],
            agency: [{ required: true, message: "不能为空", trigger: "blur" }],
            fdate: [{ required: true, message: "不能为空", trigger: "blur" }],
            abstract: [{ required: true, message: "不能为空", trigger: "blur" }]
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
            getPatentDetail(id).then(resp=>{
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
                updatePatent(this.dataForm.id,this.dataForm).then(resp=>{
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
                addPatent(this.dataForm).then(resp=>{
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
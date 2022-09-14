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
      <el-form-item label="会议名称" prop="exname">
        <el-input
            v-model="dataForm.exname"
            placeholder="请输入会议名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="主办单位" prop="organizer">
        <el-input v-model="dataForm.organizer" placeholder="请输入主办单位"></el-input>
      </el-form-item>
      <el-form-item label="会议类型" prop="type">
        <el-input
            v-model="dataForm.type"
            placeholder="请输入会议类型"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="参会日期" prop="cdate">
        <el-input
            v-model="dataForm.cdate"
            placeholder="请输入参会日期"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="与会人员">
        <el-select v-model="dataForm.attendee" multiple placeholder="请选择与会人员">
            <el-option
            v-for="item in attendees"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
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
import {getAcexchangeDetail,addAcexchange,updateAcexchange} from '@/api/bulletin/academicexchange.js'
import {getProfiles} from '@/api/customer/profile'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        attendees:[],
        dataForm: {
            id: 0,
            exname: "",
            organizer: "",
            type: "",
            cdate: "",
            unit: cookie.get("unit"),
            verify: 0,
            attendee:{}
        },
        dataRule: {
            exname: [{ required: true, message: "不能为空", trigger: "blur" }],
            organizer: [{ required: true, message: "不能为空", trigger: "blur" }],
            type: [{ required: true, message: "不能为空", trigger: "blur" }],
            cdate: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        visible: false,
    };
  },
  created(){
        getProfiles().then(resp=>{
            if(resp.length!=0){
                this.attendees=resp
            }
        })
  },
  methods: {
    init(id) {
        this.visible = true;
        if(typeof(id)!="undefined"&&id!=0){
            this.isadd = false;
            getAcexchangeDetail(id).then(resp=>{
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
                updateAcexchange(this.dataForm.id,this.dataForm).then(resp=>{
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
                addAcexchange(this.dataForm).then(resp=>{
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
<template>
  <el-dialog
    v-if="visible"
    :title="'修改'"
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
      <el-form-item label="合同金额" prop="contractamount">
        <el-input v-model="dataForm.contractamount" placeholder="请输入合同金额"></el-input>
      </el-form-item>
      <el-form-item label="到账金额" prop="arrivalamount">
        <el-input
            v-model="dataForm.arrivalamount"
            placeholder="请输入到账金额"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="支出金额" prop="outamount">
        <el-input
            v-model="dataForm.outamount"
            placeholder="请输入支出金额"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="外拨金额" prop="outsideamount">
        <el-input
            v-model="dataForm.outsideamount"
            placeholder="请输入起止时间"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="经费详情" prop="amount">
        <el-input
            type="textarea"
            v-model="dataForm.amount"
            placeholder="请输入经费详情"
            style="width: 100%"></el-input>
      </el-form-item>
            <el-form-item>
        <el-input
            v-model="dataForm.project"
            style="display: none"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getFund,updateFund} from '@/api/research/funds.js'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        isadd:true,
        dataForm: [],
        dataRule: {
            contractamount: [{ required: true, message: "不能为空", trigger: "blur" }],
            arrivalamount: [{ required: true, message: "不能为空", trigger: "blur" }],
            outamount: [{ required: true, message: "不能为空", trigger: "blur" }],
            outsideamount: [{ required: true, message: "不能为空", trigger: "blur" }],
            amount: [{ required: true, message: "不能为空", trigger: "blur" }]
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
            let req={
                project:id
            }
            getFund(req).then(resp=>{
                if(resp.length!=0){
                    this.dataForm = resp[0]
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
              console.log(this.dataForm.id)
                updateFund(this.dataForm.id,this.dataForm).then(resp=>{
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
            }
        }
      });
    },
  },
};
</script>
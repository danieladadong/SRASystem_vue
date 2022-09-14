<template>
  <el-dialog
    :title="注册"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="100px">
      <el-form-item label="工号" prop="jobno">
        <el-input
          v-model="dataForm.jobno"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="dataForm.pwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="dataForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="unit">
        <el-input type="text" v-model="dataForm.unit" placeholder="请输入学院"></el-input>
      </el-form-item>
      <el-form-item label="毕业学院" prop="graduate">
        <el-input type="text" v-model="dataForm.graduate" placeholder="请输入毕业学院"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cookie from "js-cookie";
import {Regist} from '@/api/common/login.js'
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      dataForm: {
        name: "",
        pwd: "",
        jobno:"",
        teatype:0,
        unit:"",
        graduate:""
      },
      dataRule: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        jobno: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        unit: [{ required: true, message: "学院不能为空", trigger: "blur" }],
        graduate: [{ required: true, message: "毕业学院不能为空", trigger: "blur" }]
      },
    };
  },
  methods: {
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          Regist(this.dataForm).then(resp => {
            if (resp.status == 200) {
              this.$message({
                message: resp.message,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshData");
                },
              });
            } else {
              this.$message.error(resp.message);
            }
          });
        }
      });
    },
  },
};
</script>

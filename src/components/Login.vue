<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="../assets/2.jpg" alt="" />
      </div>
      <!--      表单提交区域-->
      <el-form :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm">
        <!--        用户名-->
        <el-form-item prop="jobno">
          <el-input style="width:100%" v-model="loginForm.jobno" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="pwd">
          <el-input  style="width:100%" type="password" v-model="loginForm.pwd" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!--        按钮区-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <el-button type="primary" @click="regist">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <regist v-if="rigistVisable" ref="Regist"></regist>
  </div>
</template>

<script>
import {Login} from '@/api/common/login.js';
import {getProfileDetail} from '@/api/customer/profile.js';
import Regist from './Regist.vue';
import cookie from 'js-cookie';
export default {
  components: {"regist":Regist},
  name: 'Login',
  data() {
    return {
      loginLoading: false, // 登录限制
      loginForm: {
        // 登录的表单数据的绑定对象
        jobno: '370181',
        pwd: '123456'
      },
      loginFormRules: {
        // 验证用户名是否合法
        jobno: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
        ],
        // 验证密码是否合法
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      rigistVisable:false
    }
  },
  methods: {
    resetLoginForm() {
      // 点击重置按钮,重置登录表单
      // this.$refs[loginFormRef].resetFields()
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.loginLoading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return (this.loginLoading = false)
        }
        // const { data: res } = await this.$http.post('login', this.loginForm)
        Login(this.loginForm).then(resp=>{
            if (resp.status != 200) {
                this.loginLoading = false
                return this.$message.error('登录失败 帐号或密码错误!')
            }
            cookie.set("teatype",resp.teatype);
            cookie.set("unit",resp.unit);
            if(resp.teatype==1||resp.teatype==2){
              this.$router.push('/school')
              this.loginLoading = false
            }
            
        })
        this.$message.success('登录成功!')
        // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
        //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
        //window.sessionStorage.setItem('token', res.data.token)
        cookie.set("isLogin",true)
        cookie.set("jobno",this.loginForm.jobno)
        let id = this.loginForm.jobno
        getProfileDetail(id).then(resp=>{
          if(resp.length!=0){
            cookie.set("name",resp.name)
            cookie.set("graduate",resp.graduate)
          }
        })
        // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
        this.$router.push('/index')
        this.loginLoading = false
      })
    },
    regist(){
      this.rigistVisable = true
      this.$nextTick(() => {
        this.$refs.Regist.init();
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #eaebea;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
  .login_form {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
  }
  .btns {
    margin-left: 90px;
    justify-content: flex-end;
  }
}
</style>

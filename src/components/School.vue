<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/2.jpg" alt="" />
        <span>科研成果管理系统</span>
        <span style="font-size:14px">欢迎{{name}}老师</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '61px' : '200px'">
        <div class="toggle-button" @click="toggleCollpase">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-scrollbar>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath">

          <el-submenu
            index="1">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">成果管理</span>
            </template>
            <el-menu-item-group>
                  <el-menu-item index="1-1" @click.native="papers()">论文列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                  <el-menu-item index="1-2" @click.native="achievement()">成果列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                  <el-menu-item index="1-3" @click.native="acmonograph()">专著列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                  <el-menu-item index="1-4" @click.native="acjournals()">期刊列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                  <el-menu-item index="1-5" @click.native="patent()">专利列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
         <el-submenu
            index="2">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">项目管理</span>
            </template>
          <el-menu-item-group>
              <el-menu-item v-if="this.teatype==1" index="2-1" @click.native="projects()">学院审核</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
              <el-menu-item v-if="this.teatype==2" index="2-2" @click.native="projects()">学校审核</el-menu-item>
          </el-menu-item-group>
         </el-submenu>
        <el-submenu
            index="3">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">经费审批</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==1" index="3-1" @click.native="funds()">项目经费审批</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==2" index="3-1" @click.native="funds()">项目经费审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu> 
          <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span slot="title">奖项审批</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==1" index="4-1" @click.native="acaward()">成果奖项审批</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==2" index="4-1" @click.native="acaward()">成果奖项审批</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==1" index="5-1" @click.native="entryaward()">参赛奖项审批</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item v-if="this.teatype==2" index="5-1" @click.native="entryaward()">参赛奖项审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="5">
            <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span slot="title">个人信息</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1" @click.native="myinfo()">我的信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="6">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">科研动态</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="6-1" @click.native="announcement()">公告信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="6-1" @click.native="acexchange()">学术交流</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="7">
            <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="7-1" @click.native="acmentecharts()">成果</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="7-2" @click.native="patentecharts()">专利</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="7-3" @click.native="paperecharts()">科技论文</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="7-4" @click.native="acjournalsecharts()">学术期刊</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="8">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="8-1" @click.native="profile()">用户信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="8-2" @click.native="password()">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <el-scrollbar>
        <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: 'Home',
  data() {
    return {
        teatype:0,
        name:""
    }
  },
  created() {
    this.teatype = cookie.get("teatype")
    this.name = cookie.get("name")
  },
  methods: {
    logout() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      this.$router.push('/login')
    },
    projects(){
      this.$router.push({name:'verifyproject'});
    },
    funds(){
      this.$router.push({name:'verifyfund'});
    },
    acaward(){
      this.$router.push({name:'verifyacaward'});
    },
    entryaward(){
      this.$router.push({name:'verifyentryaward'});
    },
    announcement(){
      this.$router.push({name:'verifyannouncement'});
    },
    acexchange(){
      this.$router.push({name:'verifyacexchange'});
    },
    dynamics(){
      this.$router.push({name:'verifydynamic'});
    },
    achievement(){
      this.$router.push({name:'verifyachievement'})
    },
    myinfo(){
      this.$router.push({name:'verifyprofile'})
    },
    papers(){
      this.$router.push({name:'verifypaper'})
    },
    acmonograph(){
      this.$router.push({name:'verifyacmonograph'})
    },
    acjournals(){
      this.$router.push({name:'verifyacjournals'})
    },
    patent(){
      this.$router.push({name:'verifypatent'})
    },
    acmentecharts(){
      this.$router.push({name:'sacmentecharts'});
    },
    patentecharts(){
      this.$router.push({name:'spatentecharts'});
    },
    paperecharts(){
      this.$router.push({name:'spapercharts'});
    },
    acjournalsecharts(){
      this.$router.push({name:'sacjournalsecharts'});
    },
    profile(){
      this.$router.push({name:'userprofile'})
    },
    password(){
      this.$router.push({name:'password'})
    }
  }
}
</script>

<style lang="less" scoped>
.hwelcome {
  color: #fff;
  font-size: 15px;
  height: 25px;
  text-align: center;
  background: green;
  span {
    margin-left: 10px;
  }
}
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  background-color: #373d3f;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  padding-right: 10px;
}
.toggle-button {
  background: #4a5064;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

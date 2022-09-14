<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/2.jpg" alt="" />
        <span>科研成果管理系统</span>
        <span style="font-size:14px">欢迎{{name}}老师</span>
      </div>
      <el-button v-if="teatype==0" style="margin-right:-800px" type="primary" @click="onepunch">一键同步</el-button>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '61px' : '200px'" style="height:100%">
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
            index="1"           >
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">成果管理</span>
            </template>
          <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="myPapers()">我的论文</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="acMonograph()">学术专著</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="acJournals()">学术期刊</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="achievement()">我的成果</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="patent()">专利</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
          <el-submenu
            index="2"            
            @click="Schedule()">

            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">科研项目</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1" @click.native="projects()">我的项目</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="2-1" @click.native="funds()">项目经费</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="2-1" @click.native="dynamics()">当前进度</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" >
            <template slot="title">
                <i class="el-icon-message-solid"></i>
                <span slot="title">参赛获奖</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="3-1" @click.native="acaward()">成果奖项</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="3-1" @click.native="entryaward()">专业参赛奖项</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu
            index="4"            
            @click="pointList()">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">科研动态</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1" @click.native="announcement()">公告信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="4-1" @click.native="acexchange()">学术交流</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu
            index="5"            
            @click="pointList()">
            <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span slot="title">个人信息</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1" @click.native="myinfo()">我的信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu
            index="6"            
            @click="pointList()">
            <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="6-1" @click.native="acmentecharts()">成果</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="6-2" @click.native="patentecharts()">专利</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="6-3" @click.native="paperecharts()">科技论文</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="6-4" @click.native="acjournalsecharts()">学术期刊</el-menu-item>
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

<!--获取路由 -->
<script>
import cookie from 'js-cookie'
import {onepunchman} from '@/api/achievement/achievement'
export default {
  name: 'Home',
  data() {
    return {
      name:"",
      teatype:null
    }
  },
  created() {
    this.name = cookie.get("name")
    this.teatype = Number(cookie.get("teatype"))
  },
  //找后端路由
  methods: {
    onepunch(){
      let req = {
        tag:"onepunch",
        author:cookie.get("name"),
        school:"山东女子学院",
        unit:cookie.get("unit"),
        graduate:cookie.get("graduate")
      }
      onepunchman(req).then(resp=>{
        if(resp.status==200){
          this.$message({
              message: resp.message,
              type: "success",
              duration: 1500,
              onClose: () => {
              }
              });
        }
      })
    },
    logout() {
      //cookie.clear()
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      this.$router.push('/login')
    },
    myPapers(){
        this.$router.push({name:'mypapers'});
    },
    acMonograph(){
        this.$router.push({name:'academicmonograph'});
    },
    acJournals(){
        this.$router.push({name:'academicjournals'});
    },
    achievement(){
        this.$router.push({name:'achievement'});
    },
    patent(){
        this.$router.push({name:'patent'});
    },
    projects(){
      this.$router.push({name:'projects'});
    },
    funds(){
      this.$router.push({name:'funds'});
    },
    dynamics(){
      this.$router.push({name:'dynamics'});
    },
    acaward(){
      this.$router.push({name:'acaward'});
    },
    entryaward(){
      this.$router.push({name:'entryawards'});
    },
    announcement(){
      this.$router.push({name:'announcement'});
    },
    acexchange(){
      this.$router.push({name:'acexchange'});
    },
    myinfo(){
      this.$router.push({name:'info'});
    },
    acmentecharts(){
      this.$router.push({name:'acmentecharts'});
    },
    patentecharts(){
      this.$router.push({name:'patentecharts'});
    },
    paperecharts(){
      this.$router.push({name:'papercharts'});
    },
    acjournalsecharts(){
      this.$router.push({name:'acjournalsecharts'});
    }
  }
}
</script>

<style lang="less" scoped>
.el-scrollbar__wrap {
    overflow-x: hidden;
  }
.el-cascader-menu__wrap, .el-scrollbar__wrap {
    height: 600px;
    overflow-x: hidden;
}
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

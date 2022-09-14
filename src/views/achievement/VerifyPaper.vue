<template>
    <div>
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="search()"
      style="text-align: left">
      <el-form-item>
        <el-input
          v-model="dataForm.author"
          placeholder="请输入姓名"
          clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="search()">查询</el-button>
        </el-form-item>
    </el-form>
        <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%">
            <el-table-column
                :show-overflow-tooltip="true"
                prop="papername"
                header-align="center"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="author"
                header-align="center"
                align="center"
                label="作者">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="school"
                header-align="center"
                align="center"
                label="学校">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="abstract"
                header-align="center"
                align="center"
                label="摘要">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="keyword"
                header-align="center"
                align="center"
                label="关键词">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="tteacher"
                header-align="center"
                align="center"
                label="导师">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="major"
                header-align="center"
                align="center"
                label="学科专业">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="content"
                header-align="center"
                align="center"
                label="详情">
                <template slot-scope="scope">
                <a :href="scope.row.content"
                    target="_blank"
                    class="buttonText">{{scope.row.content}}</a>
                </template>

            </el-table-column>
            <el-table-column
                fixed="right"
                header-align="center"
                align="center"
                width="150"
                label="操作">
                <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="addOrUpdateData(scope.row.id)">修改</el-button>
                <el-button
                    type="text"
                    size="small"
                    @click="deleteData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-left:30%;"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <paperdialog v-if="dialogvisable" ref="PaperDialog"></paperdialog>
    </div>
</template>
<script>
import {getMyPaper,getMyPapers,deleteMyPapers} from '@/api/achievement/mypapers.js'
import cookie from 'js-cookie'
import PaperDialog from '@/views/dialog/PaperDialog'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            pageIndex:0,
            dataListLoading:false,
            dialogvisable:false,
            dataForm: {
                author: "",
            },
        }
    },
    created(){
        this.getDataList()
    },
    components:{"paperdialog":PaperDialog},
    methods:{
        search(){
            getMyPapers(this.dataForm).then(resp=>{
                if(resp.length!=0){
                    this.dataList = resp
                    this.totalPage = resp.length
                }else{
                    this.dataList=[]
                }
            })
        },
        getDataList(){
            if(Number(cookie.get("teatype"))==1){
                getMyPapers().then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.length
                    this.dataList = resp
                }
            });
            }else{
                getMyPapers().then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }
                });
            }  
        },
        addOrUpdateData(id){
            if(typeof(id)!="undefined"&&id!=0){
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.PaperDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.PaperDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteMyPapers(id).then(resp=>{
                this.$message({
                    message: "删除成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                        this.visible = false;
                    }
                    });
                this.getDataList();
            })
        }
        
    }
}
</script>
<style scoped>

</style>
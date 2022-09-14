<template>
    <div>
        <el-menu>
            <el-menu-item>
                <el-button type="primary" @click="addOrUpdateData()">新增</el-button>
            </el-menu-item>
        </el-menu>   
        <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%">
            <el-table-column
                :show-overflow-tooltip="true"
                prop="projectname"
                header-align="center"
                align="center"
                label="项目名称">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="projecttype"
                header-align="center"
                align="center"
                label="项目分类">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="projectmember"
                header-align="center"
                align="center"
                label="项目成员">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="pverify"
                header-align="center"
                align="center"
                label="项目状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.pverify == 0">暂停</span>
                    <span v-else-if="scope.row.pverify==1">进行</span>
                    <span v-else-if="scope.row.pverify==-1">停止</span>
                    <span v-else-if="scope.row.pverify==2">完成</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="ydate"
                header-align="center"
                align="center"
                label="起止时间">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="verify"
                header-align="center"
                align="center"
                label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.verify == 0">正在审核</span>
                    <span v-else-if="scope.row.verify==1">院级通过</span>
                    <span v-else-if="scope.row.verify==2">校级通过</span>
                    <span v-else-if="scope.row.verify==-2">审核未通过</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
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

            </el-table-column> -->
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
        <projectdialog v-if="dialogvisable" ref="ProjectDialog"></projectdialog>
    </div>
</template>
<script>
import {getProject,deleteProject} from '@/api/research/projects.js'
import cookie from 'js-cookie'
import ProjectDialog from '@/views/dialog/ProjectDialog'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            pageIndex:0,
            dataListLoading:false,
            dialogvisable:false,
        }
    },
    created(){
        this.teatype=cookie.get("teatype");
        this.getDataList();
    },
    components:{"projectdialog":ProjectDialog},
    methods:{
        getDataList(){
            let req = {
                projectmember:cookie.get("name")
            }
            getProject(req).then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.length
                    this.dataList = resp
                }
            });
        },
        addOrUpdateData(id){
            if(typeof(id)!="undefined"&&id!=0){
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.ProjectDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.ProjectDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteProject(id).then(resp=>{
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
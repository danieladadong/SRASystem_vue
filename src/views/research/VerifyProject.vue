<template>
    <div>
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
                prop="funds[0].contractamount"
                header-align="center"
                align="center"
                label="合同金额">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="verify"
                header-align="center"
                align="center"
                label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.verify == 0">正在审核</span>
                    <span v-else-if="scope.row.verify==1">学院通过</span>
                    <span v-else-if="scope.row.verify==2">校级通过</span>
                    <span v-else-if="scope.row.verify==-2">未通过</span>
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
                    @click="Pass(scope.row.id)">通过</el-button>
                <el-button
                    type="text"
                    size="small"
                    @click="NoPass(scope.row.id)">不通过</el-button>
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
    </div>
</template>
<script>
import {getProjects,getProject,updateProject,getProjectDetail} from '@/api/research/projects.js'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            pageIndex:0,
            dataListLoading:false,
            dialogvisable:false,
            unit:"",
            teatype:0,
            dataForm:{}
        }
    },
    created(){
        this.teatype=Number(cookie.get("teatype"));
        this.unit = cookie.get("unit")
        this.getDataList(); 
    },
    methods:{
        getDataList(){
            if(this.teatype===1){
                if(typeof(this.unit)=="undefined"){
                    alert("登录信息有问题请重新登录");
                }
                let req = {
                    unit:this.unit
                }
                getProject(req).then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }else{
                        this.dataList=[]
                    }
                });
            }else if(this.teatype===2){
                let req = {
                    verify:1
                }
                getProject(req).then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }else{
                        this.dataList=[]
                    }
                });
            }else{
                alert("请求体错误")
            }
            
        },
        Pass(id){
            if(this.teatype==1){
                getProjectDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=1
                    updateProject(id,this.dataForm).then(resp=>{
                        this.$message({
                        message: "已通过",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        }
                        });
                        this.getDataList();
                    });
                });
            }else{
                getProjectDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=2
                    updateProject(id,this.dataForm).then(resp=>{
                        this.$message({
                        message: "已通过",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        }
                        });
                        this.getDataList();
                    });
                });
            }
        },
        NoPass(id){
            if(this.teatype==1){
                getProjectDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=-2
                    updateProject(id,this.dataForm).then(resp=>{
                        this.$message({
                        message: "未通过",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        }
                        });
                        this.getDataList();
                    });
                });
            }else{
                getProjectDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=-2
                    updateProject(id,this.dataForm).then(resp=>{
                        this.$message({
                        message: "未通过",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        }
                        });
                        this.getDataList();
                    });
                });
            }
        }
    }
}
</script>
<style scoped>

</style>
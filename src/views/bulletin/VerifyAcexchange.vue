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
                prop="exname"
                header-align="center"
                align="center"
                label="会议名称">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="organizer"
                header-align="center"
                align="center"
                label="主办单位">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="type"
                header-align="center"
                align="center"
                label="会议类型">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="cdate"
                header-align="center"
                align="center"
                label="参会日期">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="unit"
                header-align="center"
                align="center"
                label="单位">
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
                    v-if="teatype==2"
                    :disabled="scope.row.verify==1||scope.row.verify==2"
                    type="text"
                    size="small"
                    @click="Pass(scope.row.id)">通过</el-button>
                <el-button
                    v-if="teatype==2"
                    type="text"
                    size="small"
                    @click="NoPass(scope.row.id)">未通过</el-button>
                    <el-button
                    v-if="teatype==1"
                    :disabled="scope.row.verify==1||scope.row.verify==2"
                    type="text"
                    size="small"
                    @click="addOrUpdateData(scope.row.id)">修改</el-button>
                <el-button
                    v-if="teatype==1"
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
        <acexchangedialog v-if="dialogvisable" ref="AcexchangeDialog"></acexchangedialog>
    </div>
</template>
<script>
import {getAcexchange,getAcexchangeDetail,updateAcexchange,deleteAcexchange} from '@/api/bulletin/academicexchange.js'
import AcexchangeDialog from '@/views/dialog/AcexchangeDialog'
//,getAcexchanges,getAcexchangeDetail,addAcexchange
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
            teatype:0
        }
    },
    components:{"acexchangedialog":AcexchangeDialog},
    created(){
        this.getDataList()
        this.unit = cookie.get("unit")
        this.teatype = Number(cookie.get("teatype"))
    },
    // components:{"dynamicdialog":DynamicDialog},
    methods:{
        getDataList(){
            let req = {
                unit:this.unit
            }
            getAcexchange(req).then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.length
                    this.dataList = resp
                }else{
                    this.dataList = []
                }
            });
        },
        Pass(id){
            if(this.teatype==1){
                getAcexchangeDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=1
                    updateAcexchange(id,this.dataForm).then(resp=>{
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
                getAcexchangeDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=2
                    updateAcexchange(id,this.dataForm).then(resp=>{
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
        },
        addOrUpdateData(id){
            if(typeof(id)!="undefined"&&id!=0){
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AcexchangeDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AcexchangeDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteAcexchange(id).then(resp=>{
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
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
                prop="title"
                header-align="center"
                align="center"
                label="奖项名称">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="awardType"
                header-align="center"
                align="center"
                label="奖项类型">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="winner"
                header-align="center"
                align="center"
                label="得奖人">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="awarding"
                header-align="center"
                align="center"
                label="颁奖机构">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="certificate"
                header-align="center"
                align="center"
                label="证书">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="verify"
                header-align="center"
                align="center"
                label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.verify == 0">审核进行</span>
                    <span v-else-if="scope.row.verify==1">院级审核通过</span>
                    <span v-else-if="scope.row.verify==-2">审核不通过</span>
                    <span v-else-if="scope.row.verify==2">校级审核通过</span>
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
                    :disabled="scope.row.verify==1||scope.row.verify==2"
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
import {getAcward,getAcwardDetail,getAcwards,updateAcward} from '@/api/entryaward/acaward.js'
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
                console.log(req)
                getAcward(req).then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }
                });
            }else if(this.teatype===2){
                console.log("False")
                getAcwards().then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }
                });
            }else{
                alert("请求体错误")
            }
            
        },
        Pass(id){
            if(this.teatype==1){
                getAcwardDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=1
                    updateAcward(id,this.dataForm).then(resp=>{
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
                getAcwardDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=2
                    updateAcward(id,this.dataForm).then(resp=>{
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
                getAcwardDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=-2
                    updateAcward(id,this.dataForm).then(resp=>{
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
                getAcwardDetail(id).then(resp=>{
                    if(resp.length!=0){
                        this.dataForm = resp
                    }
                    this.dataForm.verify=-2
                    updateAcward(id,this.dataForm).then(resp=>{
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
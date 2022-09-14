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
        <acawarddialog v-if="dialogvisable" ref="AcAwardDialog"></acawarddialog>
    </div>
</template>
<script>
import {getAcward,deleteAcward} from '@/api/entryaward/acaward.js'
import cookie from 'js-cookie'
import AcAwardDialog from '@/views/dialog/AcAwardDialog'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            pageIndex:0,
            dataListLoading:false,
            dialogvisable:false
        }
    },
    created(){
        this.getDataList()
    },
    components:{"acawarddialog":AcAwardDialog},
    methods:{
        getDataList(){
            let req = {
                upuser:cookie.get("jobno")
            }
            getAcward(req).then(resp=>{
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
                    this.$refs.AcAwardDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AcAwardDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteAcward(id).then(resp=>{
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
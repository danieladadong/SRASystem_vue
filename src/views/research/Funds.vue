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
                prop="funds[0].contractamount"
                header-align="center"
                align="center"
                label="合同金额">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="funds[0].arrivalamount"
                header-align="center"
                align="center"
                label="到账金额">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="funds[0].outamount"
                header-align="center"
                align="center"
                label="支出金额">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="funds[0].outsideamount"
                header-align="center"
                align="center"
                label="外拨金额">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="funds[0].amount"
                header-align="center"
                align="center"
                label="经费明细">
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
        <fundsdialog v-if="dialogvisable" ref="FundsDialog"></fundsdialog>
    </div>
</template>
<script>
import {getProject,deleteProject} from '@/api/research/projects.js'
import cookie from 'js-cookie'
import FundsDialog from '../dialog/FundsDialog.vue'
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
    components:{"fundsdialog":FundsDialog},
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
                    this.$refs.FundsDialog.init(id);
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
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
                prop="projects[0].projectname"
                header-align="center"
                align="center"
                label="项目名称">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="progress"
                header-align="center"
                align="center"
                label="项目进度">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="performance"
                header-align="center"
                align="center"
                label="完成进度">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="ddate"
                header-align="center"
                align="center"
                label="当前时间">
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
        <dynamicdialog v-if="dialogvisable" ref="DynamicDialog"></dynamicdialog>
    </div>
</template>
<script>
import {getDynamic,deleteDynamic} from '@/api/research/dynamic.js'
import cookie from 'js-cookie'
import DynamicDialog from '@/views/dialog/DynamicDialog'
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
    components:{"dynamicdialog":DynamicDialog},
    methods:{
        getDataList(){
            let req = {
                projectmember:cookie.get("name")
            }
            getDynamic(req).then(resp=>{
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
                    this.$refs.DynamicDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.DynamicDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteDynamic(id).then(resp=>{
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
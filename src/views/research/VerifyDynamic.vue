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
                unit:cookie.get("unit")
            }
            getDynamic(req).then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.length
                    this.dataList = resp
                }
            });
        },
    }
}
</script>
<style scoped>

</style>
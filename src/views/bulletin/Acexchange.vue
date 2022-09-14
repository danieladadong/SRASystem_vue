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
                prop="exname"
                header-align="center"
                align="center"
                label="学术主题">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="organizer"
                header-align="center"
                align="center"
                label="举办机构">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="type"
                header-align="center"
                align="center"
                label="学术类型">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="cdate"
                header-align="center"
                align="center"
                label="日期">
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
import {getAcexchange} from '@/api/bulletin/academicexchange.js'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            dataList:[],
            totalPage:0,
            pageSize:0,
            pageIndex:0,
            dataListLoading:false,
        }
    },
    created(){
        this.getDataList()
    },
    methods:{
        getDataList(){
            let req = {
                attendee:cookie.get("jobno")
            }
            getAcexchange(req).then(resp=>{
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
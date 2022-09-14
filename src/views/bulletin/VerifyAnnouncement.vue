<template>
    <div>
        <el-menu>
            <el-menu-item>
                <el-button type="primary" @click="addOrUpdateData()">新增公告</el-button>
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
                label="公告标题">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="releasedate"
                header-align="center"
                align="center"
                label="发布时间">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="releaser"
                header-align="center"
                align="center"
                label="发布人">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="content"
                header-align="center"
                align="center"
                label="内容">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="type"
                header-align="center"
                align="center"
                label="类型">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="unit"
                header-align="center"
                align="center"
                label="单位">
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
        <announcementdialog v-if="dialogvisable" ref="AnnounceMentDialog"></announcementdialog>
    </div>
</template>
<script>
import {getAnnouncement,deleteAnnouncement} from '@/api/bulletin/announcement.js'
import AnnounceMentDialog from '@/views/dialog/AnnounceMentDialog'
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
            unit:""
        }
    },
    components:{"announcementdialog":AnnounceMentDialog},
    created(){
        this.getDataList()
        this.unit = cookie.get("unit")
    },
    // components:{"dynamicdialog":DynamicDialog},
    methods:{
        getDataList(){
            let req = {
                unit:this.unit
            }
            getAnnouncement(req).then(resp=>{
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
                    this.$refs.AnnounceMentDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AnnounceMentDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteAnnouncement(id).then(resp=>{
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
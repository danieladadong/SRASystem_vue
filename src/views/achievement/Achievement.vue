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
                label="标题">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="completed"
                header-align="center"
                align="center"
                label="成果完成人">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="first"
                header-align="center"
                align="center"
                label="第一完成单位">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="keyword"
                header-align="center"
                align="center"
                label="关键词">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="introduction"
                header-align="center"
                align="center"
                label="成果简介">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="achievementype"
                header-align="center"
                align="center"
                label="成果类别">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="ydate"
                header-align="center"
                align="center"
                label="研究起止时间">
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
        <achievementdialog v-if="dialogvisable" ref="AchievementDialog"></achievementdialog>
    </div>
</template>
<script>
import {getAchievement,deleteAchievement} from '@/api/achievement/achievement.js'
import AchievementDialog from '@/views/dialog/AchievementDialog'
import cookie from 'js-cookie'
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
    components:{"achievementdialog":AchievementDialog},
    created(){
        this.getDataList()
    },
    methods:{
        
        getDataList(){
            let req = {
                completed:cookie.get("name")
            }
            getAchievement(req).then(resp=>{
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
                    this.$refs.AchievementDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AchievementDialog.init();
                });
            }
            
        },
        deleteData(id){
            deleteAchievement(id).then(resp=>{
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
<template>
    <div>
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="search()"
      style="text-align: left">
      <el-form-item>
        <el-input
          v-model="dataForm.inventor"
          placeholder="请输入姓名"
          clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="search()">查询</el-button>
        </el-form-item>
    </el-form>
        <el-table
            :data="dataList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :current-page.sync="currentPage"
            :stripe="stripe"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
            style="width: 100%">
            <el-table-column
                :show-overflow-tooltip="true"
                prop="patentname"
                header-align="center"
                align="center"
                label="专利名">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="patenttype"
                header-align="center"
                align="center"
                label="专利类型">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="applicant"
                header-align="center"
                align="center"
                label="申请人">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="address"
                header-align="center"
                align="center"
                label="地址">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="inventor"
                header-align="center"
                align="center"
                label="发明人">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="special"
                header-align="center"
                align="center"
                label="专题">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="album"
                header-align="center"
                align="center"
                label="专辑">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="pages"
                header-align="center"
                align="center"
                label="页数">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="agency"
                header-align="center"
                align="center"
                label="代理机构">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="fdate"
                header-align="center"
                align="center"
                label="申请日">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="abstract"
                header-align="center"
                align="center"
                label="摘要">
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
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <patentdialog v-if="dialogvisable" ref="PatentDialog"></patentdialog>
    </div>
</template>
<script>
import {getPatent,getPatents,deletePatent} from '@/api/achievement/patent.js'
import PatentDialog from '@/views/dialog/PatentDialog'
import cookie from 'js-cookie'
export default {
    data(){
        return{
            stripe:true,
            dataList:[],
            totalPage:0,
            pageSize:10,
            currentPage:1,
            dataListLoading:false,
            dialogvisable:false,
            dataForm: {
                inventor: "",
            },
        }
    },
    components:{"patentdialog":PatentDialog},
    created(){
        this.getDataList()
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize=val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        search(){
            getPatent(this.dataForm).then(resp=>{
                if(resp.length!=0){
                    this.dataList = resp
                    this.totalPage = resp.length
                }else{
                    this.dataList=[]
                }
            })
        },
        getDataList(){
            if(Number(cookie.get("teatype"))==1){
                let req={
                    applicant:cookie.get("unit")
                }
                getPatent(req).then(resp=>{
                if(resp.length!=0){
                    this.totalPage = resp.length
                    this.dataList = resp
                }
            });
            }else{
                getPatents().then(resp=>{
                    if(resp.length!=0){
                        this.totalPage = resp.length
                        this.dataList = resp
                    }
                });
            }  
        },
        addOrUpdateData(id){
            if(typeof(id)!="undefined"&&id!=0){
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.PatentDialog.init(id);
                });
            }else{
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.PatentDialog.init();
                });
            }
            
        },
        deleteData(id){
            deletePatent(id).then(resp=>{
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
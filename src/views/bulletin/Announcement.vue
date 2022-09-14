<template>
    <div>
        <ul class="newList">
            <li
                v-for="item in annDataList"
                :key="item">
                <a @click="goAnn(item.id)">{{item.title}}</a>
                <span>{{item.releasedate}}</span>
                </li>
        </ul>
        <anndialog v-if="dialogvisable" ref="AnnDialog"></anndialog>
    </div>
</template>
<script>
import {getAnnouncements} from '@/api/bulletin/announcement'
import AnnDialog from '../dialog/AnnDialog.vue'
export default {
  components: { "anndialog":AnnDialog },
    data(){
        return{
            annDataList:[],
            dialogvisable:false
        }
    },
    created(){
        this.getDataList()
    },
    methods:{
        getDataList(){
            getAnnouncements().then(resp=>{
                if(resp.length!=0){
                    this.annDataList = resp;
                }
            })
        },
        goAnn(id){
            if(typeof(id)!="undefined"&&id!=0){
                this.dialogvisable = true
                this.$nextTick(() => {
                    this.$refs.AnnDialog.init(id);
                });
            }
        }
    }
}
</script>
<style scoped>
.newList{
    font-size: 16px;
    padding-top: 15px;
    width: 90%;
}
.newList li{
    width: 100%;
    line-height: 34px;
    *line-height: 30px;
    overflow: hidden;
    border-bottom: 1px solid
}
.newList li a{
    display: block;
    height: 42px;
    line-height: 42px;
    *line-height: 38px;
    margin-left: 12px;
    color: #2a2a2a;
    float: left;
}
.newList li a:hover{
    color: brown;
    cursor: pointer;
}
.newList li span{
    float: right;
    margin-right: 10px;
    float: right;
    font-size: 12px;
    color: #797979;
}
</style>
<template>
    <div>
        <div v-if="teatype==2" style="width: 50%; height: 480px;float:left;" ref="unit"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="category"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="category_date"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="ydate"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import {getAchievementCategory} from '@/api/achievement/achievement'
import cookie from 'js-cookie'
export default {
    data() { 
        return {
            unit:null,
            category: null,
            ydate: null,
            category_date:null,
            datas:null,
            position:0
        }
    },
    created(){
        this.teatype=Number(cookie.get("teatype"))
    },
    mounted() {
        this.init();
        this.getAcmentCategory();
    },
     methods: {
        init() {
            //2.初始化
            this.category = echarts.init(this.$refs.category);
            //3.配置数据
            let coption = {
                title:{text:'科研成果完成年份-数量'},
                xAxis: {data: [] }, //X轴
                yAxis: {}, //Y轴
                series: [{ data: [], type: 'bar' }],
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 16
                    }
                }
                };
            // 4.传入数据
            this.category.setOption(coption);

            this.ydate = echarts.init(this.$refs.ydate);
            //3.配置数据
            let yoption = {
            title:{
                text:'各类科研成果数量'
            },
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [{ data: [], type: 'bar' }],
            label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 16
                    }
                }
            };
            // 4.传入数据
            this.ydate.setOption(yoption);

            this.category_date = echarts.init(this.$refs.category_date);
            //3.配置数据
            let cdoption = {
            title:{
                text:'同年各类科研成果数量'
            },
            orient: 'horizontal',
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [],
            label:{
                    show: true,
                    formatter: '{b} : {c}'
                  },
            labelLine :{show:true}
            };
            // 4.传入数据
            this.category_date.setOption(cdoption);
            if(this.teatype==2){
                this.unit = echarts.init(this.$refs.unit);
            //3.配置数据
            let udoption = {
            title:{
                text:'各学院科研成果数量'
            },
            orient: 'horizontal',
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [],
            label:{
                    show: true,
                    formatter: '{b} : {c}'
                  },
            labelLine :{show:true}
            };
            // 4.传入数据
            this.unit.setOption(udoption);
            }
            
        },
        getAcmentCategory(){
            if(Number(cookie.get("teatype"))==0){
                var req={
                params:"category",
                unit:cookie.get("unit"),
                author:cookie.get("name")
                }
                var reqs={
                params:"ydate",
                author:cookie.get("name"),
                unit:cookie.get("unit")
            }
            }else if(Number(cookie.get("teatype"))==1){
                var req={
                params:"category",
                unit:cookie.get("unit"),
                author:""
                }
                var reqs={
                params:"ydate",
                author:"",
                unit:cookie.get("unit")
                }
            }else{
                var req={
                params:"category",
                unit:"",
                author:""
                }
                var reqs={
                params:"ydate",
                author:"",
                unit:""
                }
                var reqt={
                    params:'unit',
                }
                getAchievementCategory(reqt).then(resp=>{
                let datas = new Array()
                for(var i=0;i<resp.length;i++){
                    let data = {'value':resp[i].total,'name':resp[i].unit}
                    datas.push(data)
                }
                let dt={
                    type:'pie',
                    radius:'55%',
                    center:['50%','50%'],
                    data:datas,
                }
                this.unit.setOption({
                    series:dt,
                })
            });
            }
            
            getAchievementCategory(req).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                var that = this
                let datemap = new Map()
                for(var i=0;i<resp.length;i++){
                    let incdate=resp[i].ydate
                    if(typeof(datemap.get(incdate))!='undefined'){
                        let tmp = new Array()
                        tmp.push(datemap.get(incdate)[0])
                        tmp.push({'value':resp[i].total,'name':resp[i].achievementype})
                        datemap.set(incdate,tmp)
                    }else{
                        datemap.set(incdate,[{'value':resp[i].total,'name':resp[i].achievementype}])
                    }
                    xaxis.push(resp[i].achievementype)
                    yaxis.push(resp[i].total)
                }
                this.ydate.setOption({
                     xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
                let datas = new Array()
                var num = 20
                let times = new Array()
                datemap.forEach(function(value,key,map){
                    
                    let data={
                        type:'pie',
                        radius:'35%',
                        center:[String(num)+'%','50%'],
                        data:value,
                    }
                    num=num+20
                    times.push(key)
                    datas.push(data)
                })
                that.category_date.setOption({
                    xAxis:{data:times},
                    series:datas
                })
            });
            
            getAchievementCategory(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].ydate)
                    yaxis.push(resp[i].total)
                }
                this.category.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
            
        }
    }
}
</script>
<template>
    <div>
        <div style="width: 50%; height: 480px;float:left;" ref="school"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="major"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="fdate"></div>
        <div v-if="teatype==2" style="width: 50%; height: 480px;float:left;" ref="unit"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import {getPaperEcharts} from '@/api/achievement/mypapers'
import cookie from 'js-cookie'
export default {
    data() { 
        return { 
            school: null,
            major: null,
            unit:null,
            teatype:null,
            fdate:null
        }
    },
    created(){
        this.teatype=Number(cookie.get("teatype"))
    },
    mounted() {
        this.init();
        this.getPaperCategory();
    },
     methods: {
        init() {
            //2.初始化
            this.school = echarts.init(this.$refs.school);
            //3.配置数据
            let soption = {
                title:{text:'论文毕业院校-数量'},
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
            this.school.setOption(soption);

            this.major = echarts.init(this.$refs.major);
            //3.配置数据
            let moption = {
            title:{
                text:'所学学科专业-数量'
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
            this.major.setOption(moption);
            this.fdate = echarts.init(this.$refs.fdate);
            //3.配置数据
            let foption = {
            title:{
                text:'各年份论文-数量'
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
            this.fdate.setOption(foption);
            if(this.teatype==2){
                this.unit = echarts.init(this.$refs.unit);
                //3.配置数据
                let udoption = {
                title:{
                    text:'各学院论文数量'
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
        getPaperCategory(){
            if(Number(cookie.get("teatype"))==0){
                var req={
                params:"school",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
                var reqs={
                params:"major",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
                var reqf={
                    params:"fdate",
                    author:cookie.get("name"),
                    unit:cookie.get("unit")
                }
            }else if(Number(cookie.get("teatype"))==1){
                var req={
                params:"school",
                author:"",
                unit:cookie.get("unit")
                }
                var reqs={
                params:"major",
                author:"",
                unit:cookie.get("unit")
                }
                var reqf={
                    params:"fdate",
                    author:"",
                    unit:cookie.get("unit")
                }
            }else{
                var req={
                params:"school",
                author:"",
                unit:""
                }
                var reqs={
                params:"major",
                author:"",
                unit:""
                }
                var reqt={
                    params:"unit"
                }
                var reqf={
                    params:"fdate",
                    author:"",
                    unit:""
                }
                getPaperEcharts(reqt).then(resp=>{
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
            getPaperEcharts(req).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].school)
                    yaxis.push(resp[i].total)
                }
                this.school.setOption({
                     xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
            
            getPaperEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].major)
                    yaxis.push(resp[i].total)
                }
                this.major.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
            getPaperEcharts(reqf).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].fdate)
                    yaxis.push(resp[i].total)
                }
                this.fdate.setOption({
                     xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
        }
    }
}
</script>
<template>
    <div>
        <div style="width: 50%; height: 480px;float:left;" ref="mechanism"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="fdate"></div>
        <div v-if="teatype==2" style="width: 50%; height: 480px;float:left;" ref="unit"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import {getAcJournalsEcharts} from '@/api/achievement/acjournals'
import cookie from 'js-cookie'
export default {
    data() { 
        return { 
            mechanism: null,
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
        this.getAcjournalsCategory();
    },
     methods: {
        init() {
            //2.初始化
            this.mechanism = echarts.init(this.$refs.mechanism);
            //3.配置数据
            let moption = {
                title:{text:'学术期刊所属机构-数量'},
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
            this.mechanism.setOption(moption);
            this.fdate = echarts.init(this.$refs.fdate);
            //3.配置数据
            let foption = {
                title:{text:'各年份学术期刊-数量'},
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
                let uoption = {
                title:{
                    text:'各学院学术期刊数量'
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
                this.unit.setOption(uoption);
            }
        },
        getAcjournalsCategory(){
            if(Number(cookie.get("teatype"))==0){
                var req={
                params:"mechanism",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
                var reqf = {
                    params: "fdate",
                    author:cookie.get("name"),
                    unit:cookie.get("unit")
                }
            }else if(Number(cookie.get("teatype"))==1){
                var req={
                params:"mechanism",
                author:"",
                unit:cookie.get("unit")
                }
                var reqf = {
                    params: "fdate",
                    author:"",
                    unit:cookie.get("unit")
                }
            }else{
                var req={
                params:"mechanism",
                author:"",
                unit:""
                }
                var reqs={
                    params:"unit"
                }
                var reqf = {
                    params: "fdate",
                    author:"",
                    unit:""
                }
                getAcJournalsEcharts(reqs).then(resp=>{
                let data = new Array()
                for(var i=0;i<resp.length;i++){
                    let indata = {'value':resp[i].total,'name':resp[i].unit}
                    data.push(indata)
                }
                let dt={
                    type:'pie',
                    radius:'55%',
                    center:['50%','50%'],
                    data:data,
                }
                this.unit.setOption({
                    series:dt,
                })
            });
            }
            getAcJournalsEcharts(req).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].mechanism)
                    yaxis.push(resp[i].total)
                }
                this.mechanism.setOption({
                     xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
            getAcJournalsEcharts(reqf).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].year)
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
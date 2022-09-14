<template>
    <div>
        <div style="width: 50%; height: 480px;float:left;" ref="special"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="fdate"></div>
        <div style="width: 50%; height: 480px;float:left;" ref="patenttype"></div>
        <div v-if="teatype==2" style="width: 50%; height: 480px;float:left;" ref="unit"></div>
    </div>
</template>
<script>
import * as echarts from "echarts";
import {getPatentEcharts} from '@/api/achievement/patent'
import cookie from 'js-cookie'
export default {
    data() { 
        return { 
            special: null,
            fdate: null,
            patenttype: null,
            unit:null,
            teatype:null
        }
    },
    created(){
        this.teatype=Number(cookie.get("teatype"))
    },
    mounted() {
        this.init();
        this.getPatentCategory();
    },
     methods: {
        init() {
            //2.初始化
            this.special = echarts.init(this.$refs.special);
            //3.配置数据
            let soption = {
                title:{text:'专利专题-数量'},
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
            this.special.setOption(soption);

            this.fdate = echarts.init(this.$refs.fdate);
            //3.配置数据
            let foption = {
            title:{
                text:'专利发布年份-数量'
            },
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [{ data: [], type: 'bar' }], //配置项
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

            this.patenttype = echarts.init(this.$refs.patenttype);
            //3.配置数据
            let poption = {
            title:{
                text:'专利类型-数量'
            },
            xAxis: {data: [] }, //X轴
            yAxis: {}, //Y轴
            series: [{ data: [], type: 'bar' }], //配置项
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
            this.patenttype.setOption(poption);
            if(this.teatype==2){
                this.unit = echarts.init(this.$refs.unit);
                //3.配置数据
                let udoption = {
                title:{
                    text:'各学院专利数量'
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
        getPatentCategory(){
            if(Number(cookie.get("teatype"))==0){
                var req={
                params:"fdate",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
                var reqs={
                params:"special",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
                var reqp={
                params:"patenttype",
                author:cookie.get("name"),
                unit:cookie.get("unit")
                }
            }else if(Number(cookie.get("teatype"))==1){
                var req={
                params:"fdate",
                author:"",
                unit:cookie.get("unit")
                }
                var reqs={
                params:"special",
                author:"",
                unit:cookie.get("unit")
                }
                var reqp={
                params:"patenttype",
                author:"",
                unit:cookie.get("unit")
                }
            }else{
                var req={
                params:"fdate",
                author:"",
                unit:""
                }
                var reqs={
                params:"special",
                author:"",
                unit:""
                }
                var reqp={
                params:"patenttype",
                author:"",
                unit:""
                }
                var reqt={
                    params:'unit',
                }
                getPatentEcharts(reqt).then(resp=>{
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
            getPatentEcharts(req).then(resp=>{
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
            
            getPatentEcharts(reqs).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].special)
                    yaxis.push(resp[i].total)
                }
                this.special.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
            
            getPatentEcharts(reqp).then(resp=>{
                let xaxis=new Array()
                let yaxis = new Array()
                for(var i=0;i<resp.length;i++){
                    xaxis.push(resp[i].patenttype)
                    yaxis.push(resp[i].total)
                }
                this.patenttype.setOption({
                    xAxis: {data:xaxis},
                    series:[{data:yaxis}]
                })
            });
        }
    }
}
</script>
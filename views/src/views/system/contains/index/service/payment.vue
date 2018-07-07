<style>
    /*水平方向左右分布*/
.flex-lr{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items:center;
  flex-direction: row;
  -webkit-flex-direction: row;
}
.flex-ll{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
}
.flex-rr{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
}
/*垂直方向居中分布*/
.flex-vc{
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -webkit-flex-direction: column;
}
/*垂直方向居左分布*/
.flex-vl{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  -webkit-flex-direction: column;
}
/*水平方向居中分布*/
.flex-cc{
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  -webkit-flex-direction: row;
}
/*基准线对齐*/
.flex-bc{
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: row;
  -webkit-flex-direction: row;
}
/*流式布局*/
.flex-auto{
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-flow:wrap;
}
.black{
    color:#333;
}
.gray{
    color:#666;
}
.white{
    color:#fff;
}
.red{
    color:#ff4c4c;
}
.green{
    color:#00cb65;
}
.fsize15{
    font-size:15px;
}
.fsize18{
    font-size:18px;
}
/*.section{width:92%;padding-left:4%;padding-right:4%;}*/
.t-align-c{
    text-align:center;
}
.tab div{width:50%;text-align:center;opacity:1}
.tab div span{color:#333;border-bottom:1px solid #fff;height:50px;line-height:50px;display:inline-block;opacity:0.5;}
.tab div .activity_show{
    opacity:1;border-color: #333;}
.money{
    height:36px;
    background-color:#FFAC33;
}
.hr{
    height:10px;
    background-color:#f0f0f0;
    width:100%;
    border-top:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
}
.hr-one{
    height:1px;
    background-color:#e0e0e0;
    width:100%;
}
.circle{
    width:15px;
    height:15px;
}
.mleft{
    margin-left:4%;
}
.mleft5{
    margin-left:5px;
}
.mleft10{
    margin-left:10px;
}
.mleft20{
    margin-left:20px;
}
.mtop10{
    margin-top:10px;
}
.mtop14{
    margin-top:14.5px;
}
.mtop15{
    margin-top:15px;
}
.mbottom10{
    margin-bottom:10px;
}
.mbottom15{
    margin-bottom:15px;
}
.mbottom70{
    margin-bottom:70px;
}
.mleft25{
    margin-left:25px;
}
.bottom{
    position:fixed;
    z-index:100;
    bottom:0px;
    height:58px;
    width:100%;
    line-height:60px;
    border-top:1px solid #ccc;
    background:#fff;
}
.btnred{
    height:36px;
    background-color:#ff4c4c;
    width:96px;
    text-align:center;
    border-radius:10px;
}
.el-collapse-item__header{margin-left:-15px;background: none !important;font-size:18px !important;color:#333 !important;height:44px !important;line-height:44px !important;}
.el-collapse-item{width:100%;}
.el-collapse-item__arrow{line-height:44px !important;}
.el-collapse-item__header__arrow{float:right;line-height:44px;margin-right:10px;}
.el-collapse-item__content{padding:0;color:#333;}
.el-collapse{border:none !important;}
.el-collapse-item__wrap{background-color:#fff;/*border-bottom:none*/;}
.icon-checked{
  background: url('../img/checked.png');
  background-size: 100%;
  background-repeat: no-repeat;width:15px;height:15px;
}
.icon-unchecked{
  background: url('../img/unchecked.png');
  background-size: 100%;
  background-repeat: no-repeat;width:15px;height:15px;
}
</style>
<template>
    <div v-title="'生活缴费'">
        <div :class="changeShowType =='property'?'mbottom70':''">
        <div class="flex-ll black fsize15 tab">
            <div><span :class='{activity_show: changeShowType =="property"}'  @click="bindChange('property')">物业费</span></div>
            <div><span :class='{activity_show: changeShowType =="water"}'  @click="bindChange('water')">水电费</span></div>
        </div>
        <div v-if="changeShowType =='property'" class="hr"></div>
        <transition name="fade-choose">
            <section v-show="changeShowType =='water'" class="">
                <div class="money fsize15 t-align-c white">预存金额：{{preStorage}}元</div>
            </section>
        </transition>
        <el-collapse style="font-size:15px;">
            <div v-for="(item , index) in newList">
                <!--<div v-if="item.type==2||item.type==3">
                    <el-collapse-item class="" :name="index">
                        <template slot="title">
                            <img class="circle mleft mtop14" :src="item.src" @click.stop="bindChecked('all',item.type,item.year,item.status)"/>
                            <span>{{item.year}}</span>
                        </template>
                        <el-collapse>
                            <div v-for="(item1 , index1) in item.content.part">
                                <el-collapse-item class="" :name="index1">
                                    <template slot="title">
                                        <img v-if="item1.costType==1" class="circle mleft mtop14" :src="item1.src" @click.stop="bindChecked('part',item.type,item.year,item.status,index1,item1.cost)"/>
                                        <span v-if="item.type==2">{{item.year}}{{index1==0?'下半年':'上半年'}}</span>
                                        <span v-if="item.type==3">{{item.year}}{{ index1 === 0 ? '冬季' : index1 === 1 ? '秋季' : index1===2 ? '夏季' : '春季' }}</span>
                                    </template>
                                    <div v-for="(item2,index2) in item1.part">
                                        <div class="part-content">
                                            <div class="flex-ll mtop15 section" style="margin-left:15px;">
                                                <div v-if="index1==0">
                                                    <div class="mleft10 fsize15">{{12-index2}}月份</div>
                                                </div>
                                                <div v-else>
                                                    <div class="mleft10 fsize15">{{6-index2}}月份</div>
                                                </div>
                                                <div class="mleft10 red">（未缴纳）</div>
                                            </div>
                                            <div class="mleft18">
                                                <div class="mtop10"><span>{{changeShowType=='property'?'物业管理费':'水费'}}：</span>{{item2.wuye}}元</div>
                                                <div class="mtop10"><span>{{changeShowType=='property'?'车位管理费':'水费'}}：</span>{{item2.car}}元</div>
                                                <div class="mtop10"><span>{{changeShowType=='property'?'公共能耗费':'空调费'}}：</span>{{item2.public}}元</div>
                                                <div class="mtop15" :class="index2==2?'':'hr-one'"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hr" style="border:none;"></div>
                                </el-collapse-item>
                            </div>
                        </el-collapse>
                    </el-collapse-item>
                </div>
                <div v-else>-->
                    <el-collapse-item class="" :name="index">
                    <template slot="title">
                        <div v-if="item.status!=2&&changeShowType =='property'" style="display:inline;" class="mleft">
                            <img class="circle mtop14" :src="item.src" @click.stop="bindChecked('all',item.type,item.year,item.status)"/>
                        </div>
                        <div v-else-if="item.status==2&&changeShowType =='property'" class="circle mleft" style="display:inline-block;"></div>
                        <span v-if="changeShowType =='property'" class="mleft5">{{item.year}}</span>
                        <span v-else class="mleft">{{item.year}}</span>
                    </template>
                    <div class="hr-one"></div>
                    <div v-for="(val ,valindex ) in item.content">
                        <div class="part-content">
                            <div class="flex-ll mtop15">
                                <img v-if="item.type==1&&val.costType==1&&changeShowType =='property'" class="circle mleft" :src='val.src' @click.stop="bindChecked('part',item.type,item.year,val.status,val.id,val.cost)" />
                                <i v-else-if="changeShowType =='property'" class="circle mleft"></i>
                                
                                <div class="fsize15" :class="changeShowType =='property'?'mleft10':'mleft'">{{12-valindex}}月份</div>
                                <div v-if="changeShowType =='property'" class="mleft10" :class="val.costType==1?'red':'green'">（{{val.costType==1?'未缴纳':'已缴纳'}}）</div>
                            </div>
                            <div class="mleft" v-if="changeShowType=='property'">
                                <div class="mtop10 mleft25"><span>物业管理费：</span>{{val.cost}}元</div>
                                <div class="hr-one mtop15"></div>
                            </div>
                            <div class="mleft" v-else>
                                <div class="mtop10"><span>水费：</span>{{val.waterCost}}元</div>
                                <div class="mtop10"><span>电费：</span>{{val.electricityCost}}元</div>
                                <div class="mtop10"><span>空调费：</span>{{val.airCost}}元</div>
                                <div class="hr-one mtop15"></div>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <!--</div>-->
            </div>
        </el-collapse>
        </div>
        <div v-if="changeShowType =='property'" class="bottom flex-rr section fsize15">
            <!--<div class="flex-ll">
                <div class="circle" src=""></div>
                <div class="mleft10">全选</div>
            </div>-->
            <!--<div class="flex-rr">-->
                <div style="margin-right:20px">合计：<span class="mleft20">{{totalMoney}}元</span></div>
                <button class="btnred white" @click='confirmPay'>确认支付</button>
            <!--</div>-->
        </div>
    </div>
</template>
<script lang="babel">
    function partTwo(arr,type,limit){
        let brr = []
        let arrLen = arr.length
        let num = 0
        let num_max = 0
        for(var i=0;i<type;i++){
            num_max+=limit
            brr[i] = arr.slice(num,num_max)
            num+=limit
        }
        console.log('brr:',brr)
        return brr
    }
    export default {
        
        data() {
            return {
                changeShowType:'property',
                activeNames: [''],
                /*
                yearList:[
                    {
                        type:'3' ,   //1年缴   2半年缴  3季度缴   4月份缴
                        year:'2018',
                        content:[
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1   //1未缴   2已缴
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ]
                    },
                    {
                        type:'2' ,   //1年缴   2半缴  3季度缴   4月份缴
                        year:'2017',
                        content:[
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ]
                    },
                    {
                        type:'1' ,   //1年缴   2半缴  3季度缴   4月份缴
                        year:'2016',
                        content:[
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ]
                    },
                ],*/
                newList:[],
                /*zdlist:{
                    "payType": 2,
                    "bills": {
                        '2015':[
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",   //房屋名称
                                "roomProperty": "公寓",    //房屋性质
                                "houseHolder": "李路安",   //户主
                                "mobile": "12345678900",   //电话
                                "billYear": "2018",     //账单年份
                                "billMonth": "2",       //账单月份
                                "billDate": 1517414400000, //账单日期
                                "cost": 200,     //费用
                                "costType": 2     //1  未缴  2已缴
                            },{
                                "id": 2,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1   
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 5,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 6,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 7,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 8,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 9,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 10,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 11,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 12,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ],
                        '2016':[
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",   //房屋名称
                                "roomProperty": "公寓",    //房屋性质
                                "houseHolder": "李路安",   //户主
                                "mobile": "12345678900",   //电话
                                "billYear": "2018",     //账单年份
                                "billMonth": "2",       //账单月份
                                "billDate": 1517414400000, //账单日期
                                "cost": 200,     //费用
                                "costType": 2     //1  未缴  2已缴
                            },{
                                "id": 2,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1   
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 5,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 6,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 7,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 8,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 9,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 10,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 11,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 12,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ],
                        "2017": [
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            },
                            {
                                "id": 4,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "2412423432",
                                "billYear": "2017",
                                "billMonth": "1",
                                "billDate": 1483200000000,
                                "cost": 200,
                                "costType": 1
                            }
                        ],
                        '2018':[
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1   //1未缴   2已缴
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 3,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "2",
                                "billDate": 1517414400000,
                                "cost": 200,
                                "costType": 2
                            },{
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            },
                            {
                                "id": 1,
                                "parkId": 1,
                                "roomId": 1,
                                "roomSimpleName": "新东方国际1101",
                                "roomProperty": "公寓",
                                "houseHolder": "李路安",
                                "mobile": "12345678900",
                                "billYear": "2018",
                                "billMonth": "1",
                                "billDate": 1514736000000,
                                "cost": 500.25,
                                "costType": 1
                            }
                        ]
                    }
                },*/
                zdlist:{},
                totalMoney:0,
                preStorage:0
            }
        },
        methods: {
            bindChange: function (value){
                console.log(value)
                this.changeShowType = value
                if(value=='property'){
                    console.log(1)
                    this.getList('userPropertyListGet')
                }else{
                   this.getList('userWaterListGet')
                   console.log(2)
                }
            },
            bindChoose:function(){
                
            },
            arrDeal:function(){
                let zdlist = this.zdlist
                console.log('zdlist:',zdlist)
                let yearList = []
                for(var i in zdlist.bills){
                    console.log("属性:" + i + "  属性值:" + zdlist.bills[i]);
                    yearList.push({
                        type:zdlist.payType ,   //1年缴   2半年缴  3季度缴   4月份缴   1:月付2：季度付3：半年付4：年付
                        //type:i=='2018'?'2':i=='2017'?'3':i=='2016'?'4':'1',
                        year:i+'年',
                        content:zdlist.bills[i],
                    })
                }
                console.log('yearList:',yearList)
                let newList = []
                let that = this
                yearList.map(function(r,n){
                    let returnList = [] ;
                    if(r.type==3){  //半年
                        returnList = partTwo(r.content,2,6)
                    }else if(r.type==2){  //季度
                        returnList = partTwo(r.content,4,3)
                    } 
                    if(r.type==2||r.type==3){  //半年  季度
                        newList.push({
                            type:r.type,
                            year:r.year,
                            yearMoney:0,
                            status:0,
                            src:require('../img/unchecked.png'),
                            content:{
                                part:[]
                            }
                        })
                        console.log('newList1:',newList)
                        console.log('returnList:',returnList)
                        let seasonMoney = 0
                        let costType = 2;
                        returnList.map(function(x,y){
                            console.log('x:',y,x)
                            x.map(function(a,b){
                                console.log('a:',a)
                                if(a.costType==1){
                                    seasonMoney+=a.cost
                                    costType = 1
                                }
                            })
                            newList[n].content.part.push({
                                part:x,
                                status:0,
                                src:require('../img/unchecked.png'),
                                seasonMoney:seasonMoney,
                                costType:costType
                            })


                        })
                    }else{   //整年  月份
                        let yearMoney = 0
                        let notpaynum = 0
                        let paynum = 0
                        r.content.map(function(v,t){
                           if(v.costType==1){
                               v.status=0
                               v.src=require('../img/unchecked.png')
                               yearMoney+=v.cost
                               notpaynum++
                           }else{
                               paynum++
                           }
                        })
                        let allstatus ;
                        if(paynum==r.content.length){
                            allstatus = 2
                        }else{
                            allstatus = 0
                        }
                        newList.push({
                            type:r.type,
                            year:r.year,
                            yearMoney:yearMoney,
                            content:r.content,
                            src:require('../img/unchecked.png'),
                            status:allstatus,
                            notpaynum:notpaynum
                        })
                        
                    }
                    console.log('newList2:',newList)
                    
                })
                this.newList = newList
                console.log('newList3',this.newList)
            },
            getList:function(Interface){
                this.$http({
                    method: 'get',//this.roomId
                    //url: '/api/system/life/coupon/'+ Interface + '?parkId='+ 1 +'&roomId=' + 1448,
                    url: '/api/system/life/coupon/'+ Interface + '?parkId='+ this.parkId +'&roomId=' + this.roomId,
                    data: {
                        //parkId:1,
                        //roomId:1401
                    }
                }).then((res) => {
                    console.log(res);
                    this.zdlist = res.data.data
                    if(Interface=='userWaterListGet'){
                        this.preStorage = res.data.data.preStorage
                    }else{
                        //this.zdlist = res.data.data
                    }
                    console.log('zdlist:',this.zdlist)
                    this.arrDeal()
                }).catch((res) => {
                    console.log(res);
                });
            },
            bindChecked:function(allchecked,type,year,status,id,cost){
                //let newList = this.newList
                let that = this
                let totalMoney = this.totalMoney
                let changeMoney = 0
                console.log('allchecked+type+status+id+cost:',allchecked,type,status,id,cost)
                this.newList.map(function(r,n){
                    if(r.year==year){
                        console.log(2)
                        if(allchecked=='all'){  //年份全选
                            if(type==1||type==4){
                                r.content.map(function(v,t){
                                    if(v.costType==1){
                                        if(status==0){
                                            console.log(r.status)
                                            if(v.status==0){
                                                changeMoney+=v.cost   //考虑到全选时，已经有选中的要排除
                                            }
                                            v.status = 1
                                            v.src=require('../img/checked.png')
                                            r.status=1
                                            r.src=require('../img/checked.png')
                                            console.log('cost:',v.cost)
                                        }else{
                                            if(v.status==1){
                                                changeMoney-=v.cost
                                            }
                                            v.status = 0
                                            v.src=require('../img/unchecked.png')
                                            r.status=0
                                            r.src=require('../img/unchecked.png')
                                        }
                                    }
                                })
                            }else{
                                console.log(r.content.part)
                                r.content.part.map(function(v,t){
                                    if(status==0){
                                        if(v.status==0){
                                            changeMoney+=v.seasonMoney
                                        }
                                        r.status=1
                                        r.src=require('../img/checked.png')
                                        v.status=1
                                        v.src=require('../img/checked.png')
                                    }else{
                                        changeMoney-=v.seasonMoney
                                        r.status=0
                                        r.src=require('../img/unchecked.png')
                                        v.status=0
                                        v.src=require('../img/unchecked.png')
                                    }
                                })
                            }
                           //that.$set(that.newList,n,r)
                        }else{    //部分全选
                            if(type==1||type==4){
                                let chooseNum = 0
                                r.content.map(function(v,t){
                                    if(type==1){  //按月计算
                                        if(v.id==id){
                                            console.log(4)
                                            if(status==0){
                                                console.log('11')
                                                v.status = 1
                                                v.src=require('../img/checked.png')
                                                changeMoney+=v.cost
                                            }else{
                                                console.log('22')
                                                v.status = 0
                                                v.src=require('../img/unchecked.png')
                                                r.src=require('../img/unchecked.png')
                                                r.status=0
                                                changeMoney-=v.cost
                                            }
                                            console.log('status:',v.status)
                                            //that.$set(that.newList[n].content,t,v)
                                        }
                                        if(v.status==1){
                                            chooseNum++
                                            console.log('chooseNum:',chooseNum)
                                            if(chooseNum==r.notpaynum){
                                                r.status=1
                                                r.src=require('../img/checked.png')
                                            }
                                        }
                                    }
                                })
                            }else{
                                console.log('r:',r)
                                let notpaynum = 0
                                let chooseNum = 0
                                r.content.part.map(function(v,t){
                                    if(v.costType==1){
                                        notpaynum++
                                    }
                                })
                                
                                console.log('notpaynum666:',notpaynum)
                                r.content.part.map(function(v,t){
                                    console.log('id',id)
                                    if(t==id){
                                        console.log('status1:',v.status)
                                        if(v.status==0){
                                            console.log('11')
                                            v.status = 1
                                            v.src=require('../img/checked.png')
                                            changeMoney+=v.cost
                                        }else{
                                            console.log('22')
                                            v.status = 0
                                            v.src=require('../img/unchecked.png')
                                            
                                            r.src=require('../img/unchecked.png')
                                            r.status=0
                                            changeMoney-=v.cost
                                        }
                                        console.log('status2:',v.status)
                                    }
                                    if(v.status==1){
                                        chooseNum++
                                        console.log('chooseNum123:',chooseNum)
                                        if(chooseNum==notpaynum){
                                            console.log(666)
                                            r.status=1
                                            r.src=require('../img/checked.png')
                                        }
                                    }
                                })
                                
                            }
                            //that.$set(that.newList,n,r)
                        }
                    }
                    that.$set(that.newList,n,r)
                })
                let money = 0
                money = Number(totalMoney)+Number(changeMoney)
                console.log(typeof(money))
                if(money==parseInt(money)){
                    this.totalMoney = money
                }else{
                    this.totalMoney = money.toFixed(2)
                }
            },
            confirmPay:function(){
                console.log('newList:',this.newList)
                
                let ids='';
                this.newList.map(function(r,n){
                    if(r.type==4||r.type==1){
                        r.content.map(function(v,t){
                            console.log('v:',v)
                            if(v.costType==1){
                                if(v.status==1){
                                    ids = ids + v.id+','
                                }
                            }
                        })
                    }
                })
                this.$http({
                    method: 'post',
                    url: '/api/mall/mall/createBillOrder',
                    data: {
                        id:this.roomId,   //roomid
                        ids:ids
                    }
                }).then((res) => {
                    console.log('res:',res.data)
                    if(res.data.code=='00000'){
                        this.$router.push({
                            path: 'payment/pay',
                            query: {
                                id:res.data.data.id,
                                amount:res.data.data.amount,
                            }
                        })
                    }
                }).catch((res) => {
                    console.log(res);
                });
            }
        },
        mounted(){
            this.roomId = this.$store.state.info.defaultAddressId
            this.parkId = this.$store.state.info.defaultParkId
            this.getList('userPropertyListGet')
            console.log('store:',this.$store.state.info.defaultAddressId)
            
            /*let zdlist = this.zdlist
            console.log('zdlist:',zdlist)
            let yearList = []
            for(var i in zdlist.bills){
                console.log("属性:" + i + "  属性值:" + zdlist.bills[i]);
                yearList.push({
                    //type:zdlist.payType ,   //1年缴   2半年缴  3季度缴   4月份缴
                    type:i=='2018'?'2':i=='2017'?'3':i=='2016'?'4':'1',
                    year:i+'年',
                    content:zdlist.bills[i]
                })
            }
            console.log('yearList:',yearList)

            let newList = []
            let that = this
            yearList.map(function(r,n){
                let returnList = [] ;
                if(r.type==2){  //半年
                    returnList = partTwo(r.content,2,6)
                }else if(r.type==3){  //季度
                    returnList = partTwo(r.content,4,3)
                } 
                if(r.type==2||r.type==3){
                    newList.push({
                        type:r.type,
                        year:r.year,
                        content:{
                            part:[]
                        }
                    })
                    console.log('newList1:',newList)
                    console.log('returnList:',returnList)
                    returnList.map(function(x,y){
                        console.log('x:',x)
                        newList[n].content.part.push({
                            part:x
                        })
                    })
                }else{
                    r.content.map(function(v,t){
                        v.checkstatus=0
                    })
                    newList.push({
                        type:r.type,
                        year:r.year,
                        content:r.content
                    })
                }
                console.log('newList2:',newList)
                
            })
            this.newList = newList
            console.log('newList3',this.newList)*/
        }
    }
</script>

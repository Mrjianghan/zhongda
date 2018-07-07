<style lang="less" scoped>
    .pay{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-info{ background-color: #fff; padding: 0 .3rem;
            &-price{ padding-top: .4rem; border-bottom: 1px solid #dcdcdc;
                p{ font-size: .3rem; color: #999; text-align: center}
                p&-number{ font-size: .6rem; color: #333; line-height: 1.4rem;}
            }
            &-merchandise{ font-size: .3rem; line-height: .82rem; color: #333;}
        }
        &-choose{ background-color: #fff;
            &-title{ padding: .3rem; font-size: .26rem; color: #999;}
            &-item{ display: flex; justify-content: space-between;
                img{ flex-shrink: 0; width: 1.24rem; height: 1.1rem;}
                &-content{ display: flex; justify-content: space-between; align-items: center; flex-grow: 1; height: 1.1rem; padding: .3rem .3rem .3rem 0; font-size: .3rem; color: #333;
                    &-i{ width: .56rem; height: .56rem; background-image: url(../../../img/choose_false.png); background-size: 100% 100%;
                        &-active{ background-image: url(../../../img/choose_true.png);}
                    }
                }
            }
        }
        &-button{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
    }        
</style>
<template>
    <div class="pay">
        <div class="pay-info">
            <div class="pay-info-price">
                <p>在线支付</p>
                <p class="pay-info-price-number">¥{{ orderInfo.price }}</p>
            </div>
            <p class="pay-info-merchandise">{{ orderInfo.merchandiseName }}</p>
        </div>
        <p class="pay-choose-title">选择支付方式</p>
        <ul class="pay-choose">
            <li class="pay-choose-item">
                <img src="../../../img/pay_icon.png" />
                <div class="pay-choose-item-content">
                    <span>微信支付</span>
                    <i class="pay-choose-item-content-i pay-choose-item-content-i-active"></i>
                </div>
            </li> 
            <li class="pay-choose-item">
                <img src="../../../img/cmb_pay_icon.png" />
                <div class="pay-choose-item-content">
                    <span>招行一网通支付</span>
                    <i class="pay-choose-item-content-i pay-choose-item-content-i-active"></i>
                </div>
            </li>
        </ul>
        <!--<zdButton size="large" type="danger" class="pay-button" @click="handlePayOrder" v-if="orderInfo.status === 1">确认支付 ¥{{ orderInfo.price }}</zdButton>-->
        <zdButton size="large" type="danger" class="pay-button" @click="handlePayOrder">确认支付 ¥{{ orderInfo.price }}</zdButton>
        <form :action="'https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay'" method="post" id="form">
            <input type="text" id="formData" name="jsonRequestData" style="display: none" />
        </form>
    </div>
</template>
<script>
    import zdButton from 'publicComponents/button/button';
    import wx from 'weixin-js-sdk';

    export default {
        components: {
            zdButton
        },
        data() {
            return {
                env: process.env.NODE_ENV,
                orderInfo: {
                    price: 0,
                    merchandiseName: '',
                    status: 1,
                }
            }
        },
        methods: {
            //handlePayOrder() {
                /*this.$http({
                    url: '/api/mall/mall/payOrderByCmb',
                    data: {
                        id: this.$route.query.id,
                    },
                    method: 'post'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        const orderStr = response.data.orderStr;
                        document.getElementById('formData').value = orderStr;
                        document.getElementById('form').submit();
                    }
                }).catch((response) => {
                    console.log(response);
                });*/   //zy禁掉的
                // const _this = this;
                // _this.$http({
                //     url: '/api/mall/mall/payOrder',
                //     data: {
                //         id: _this.$route.query.id,
                //         type: 2
                //     },
                //     method: 'post'
                // }).then(function(response) {
                //     if (response.data.code === '00000') {
                //         wx.chooseWXPay({
                //             appId: response.data.appId,
                //             timestamp: Math.floor(response.data.timestamp / 1000),
                //             nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                //             package: 'prepay_id=' + response.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                //             signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //             paySign: response.data.paySign, // 支付签名
                //             success: function (res) {
                //                 // 支付成功后的回调函数
                //                 _this.$message('支付成功');
                //                 _this.$router.replace('/index/person/myOrder');
                //             }
                //         });
                //     }
                // });
            //}
            /*handlePayOrder:function() {
                this.$http({
                    url: '/api/wechat/getJsConfigOptions'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        console.log('response:',response)
                        alert('appId:'+response.data.appid)
                        alert('noncestr:'+response.data.noncestr)
                        alert('signature:'+response.data.signature)
                        alert('timestamp:'+response.data.timestamp)
                        
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: response.data.appid, // 必填，公众号的唯一标识
                            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: response.data.noncestr, // 必填，生成签名的随机串
                            signature: response.data.signature,// 必填，签名
                            jsApiList: [
                                'chooseWXPay'
                            ] // 必填，需要使用的JS接口列表
                        });
                        console.log('this:',this)
                        let transData = {
                            appid: response.data.appid, 
                            timestamp: response.data.timestamp, 
                            noncestr: response.data.noncestr, 
                            signature: response.data.signature,
                        }
                        this.pay(transData)
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            pay:function(transData){
                console.log('transData:',transData)
                let _this = this
                this.$http({
                     url: '/api/mall/mall/payOrder',
                     data: {
                        id: this.$route.query.id,
                        type: 2
                    },
                     method: 'post'
                }).then(function(res) {
                        alert('payorder:'+res.data)
                        
                        alert('appId:'+transData.appid)
                        alert('noncestr:'+transData.noncestr)
                        alert('signature:'+transData.signature)
                        alert('timestamp:'+transData.timestamp)

                    if (res.data.code === '00000') {
                        alert('code R:'+res.data.code)
                        alert('package R:'+res.data.package)
                        alert('paySign R:'+res.data.paySign)
                        alert('appid R:'+res.data.appId)
                        alert('nonceStr R:'+res.data.nonceStr)
                        alert('timestamp R:'+res.data.timestamp)

                        let _this = this
                        wx.chooseWXPay({
                            appId:res.data.appId,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                            package: 'prepay_id=' + res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: res.data.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                if(res.errMsg == "chooseWXPay:ok"){
                                    alert('支付成功')
                                }else{
                                    alert('支付失败：'+JSON.stringify(res))
                                    alert('支付失败：'+res.errMsg)
                                }
                                _this.$router.replace('/payment');
                            },
                            cancel:function(res){
                                alert('支付取消')
                                alert('errMsg' + res.errMsg)
                            },
                            fail:function(res){
                                alert('res-fail' + res.errMsg)
                                alert('res-fail:'+JSON.stringify(res));
                            }
                        });
                    }
                });
            },*/
            //微信支付
            handlePayOrder(){
                let that = this
                var paytimer = window.setTimeout(function(){
                    that.$http({
                        url: '/api/mall/mall/payOrder',
                        data: {
                            id: that.$route.query.id,
                            type: 2
                        },
                        method: 'post'
                    }).then(function(response) {
                        if (response.data.code === '00000') {
                            alert('开始支付')
                            that.onBridgeReady(response.data)
                            alert('appId:'+response.data.appId)
                        }
                        window.clearTimeout(paytimer);
                    }).catch((err)=>{
                        window.clearTimeout(paytimer);
                    })
                },2000);
            },
            //唤起微信支付
            /*beginPay(configdata){
                if (typeof WeixinJSBridge == "undefined"){    
                    if( document.addEventListener ){    
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);    
                    }else if (document.attachEvent){    
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);     
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);    
                    }    
                    }else{    
                    onBridgeReady(configdata);    
                }   
            },*/
            //开始支付
            onBridgeReady(jsdd){ 
                let that = this
                alert('appId:'+jsdd.appId)
                alert('timestamp:'+jsdd.timestamp)
                alert('nonceStr:'+jsdd.nonceStr)
                alert('package:'+jsdd.package)
                alert('paySign:'+jsdd.paySign)

			    WeixinJSBridge.invoke(    
			        'getBrandWCPayRequest', {    
			            "appId" : jsdd.appId,     //公众号名称，由商户传入         
			            "timeStamp":jsdd.timestamp,         //时间戳，自1970年以来的秒数         
			            "nonceStr" : jsdd.nonceStr, //随机串         
			            "package" : 'prepay_id=' + jsdd.package,         
			            "signType" : 'MD5',         //微信签名方式:         
			            "paySign" : jsdd.paySign  //微信签名     
			        }, 
			        function(res){    
                        alert('res1:'+JSON.stringify(res));     
			            if(res.err_msg == "get_brand_wcpay_request:ok" ) {    
			                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。     
			                that.$router.replace('/payment');
			            }else if (res.err_msg == "get_brand_wcpay_request:cancel")  {  
			                alert("支付取消");  
			            }else{  
			               //支付失败  
			               alert(res.err_msg);
			            }       
			        }    
			    );     
            },
        },
        mounted() {
            this.$http({
                url: '/api/mall/mall/getOrderInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                this.orderInfo = response.data.orderInfo;
                if (this.orderInfo.status !== 1) {
                    this.$router.replace({
                        path: '/index/person/myOrder/orderInfo',
                        query: {
                            id: this.$route.query.id
                        }
                    });
                }
            }).catch((response) => {
                console.log(response);
            });  

            /*this.$http({
                url: '/api/wechat/getJsConfigOptions'
            }).then((response) => {
                if (response.data.code === '00000') {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.data.appid, // 必填，公众号的唯一标识
                        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: response.data.noncestr, // 必填，生成签名的随机串
                        signature: response.data.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'chooseWXPay'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                }
            }).catch((response) => {
                console.log(response);
            });*/
        }
    }
</script>

<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .container{ display: flex; flex-direction: column; padding-top: .3rem; background-color: #f5f5f5; overflow: scroll;}
    .info{ flex-shrink: 0; display: flex; align-items: center; height: 1.5rem; margin-bottom: .3rem; padding: 0 .3rem; border-top: @border; border-bottom: @border; background-color: #fff;
        &-headimg{ flex-shrink: 0; width: .9rem; height: .9rem; border-radius: 50%; background-color: #dcdcdc; overflow: hidden;
            img{ width: 100%; height: 100%;}
        }
        &-name{ flex-grow: 1; padding-left: .3rem; font-size: .3rem; color: #333;
            span{float: right; font-size:.24rem;}
        }
    }
    .icon{ flex-shrink: 0; display: inline-block; width: .13rem; height: .24rem; background-image: url(../../../../publicSource/img/push_icon.png); background-size: 100% 100%; background-repeat: no-repeat;}
    .function{ flex-grow: 1; padding-left: .3rem; border-top: @border; background-color: #fff;
        &-item{ display: flex; height: .96rem;
            &-img{ flex-shrink: 0; display: inline-block; width: .6rem; height: .95rem; background-size: 100% 100%; background-repeat: no-repeat;
                &-01{ background-image: url(../../img/index_person_function_01.png);}
                &-02{ background-image: url(../../img/index_person_function_02.png);}
                &-03{ background-image: url(../../img/index_person_function_03.png);}
                &-04{ background-image: url(../../img/index_person_function_04.png);}
                &-05{ background-image: url(../../img/index_person_function_05.png);}
                &-06{ background-image: url(../../img/index_person_function_06.png);}
                &-07{ background-image: url(../../img/index_person_function_07.png);}
                &-08{ background-image: url(../../img/index_person_function_08.png);}
            }
            &-wrapper{ display: flex; align-items: center; flex-grow: 1; height: 100%; padding-right: .3rem; border-bottom: @border;}
            &-word{ flex-grow: 1; font-size: .28rem; color: #333;}
        }
    }    
</style>
<template>
    <div class="container" v-title="'个人中心'">
        <div class="info">
            <div class="info-headimg">
                <img :src="headImgUrl" />
            </div>
            <p class="info-name">{{ userName }}<span @click='showMyMessage'>编辑个人信息</span></p>
            <!-- <i class="icon"></i> -->
        </div>
        <div class="function">
            <div class="function-item" v-for="n in 8" :key="n">
                <i class="function-item-img" :class="'function-item-img-0' + n"></i>
                <div class="function-item-wrapper" @click="handleClick(n)">
                    <p class="function-item-word">{{ 
                        n === 1 
                            ? '我的家庭'
                            : 
                        (n === 2
                            ? '查看我的报修'
                            :
                        (n === 3
                            ? '我的收货地址'
                            : 
                        (n === 4 
                            ? '我的优惠券'
                            : 
                        (n === 5 
                            ? '查看我的报事'
                            : 
                        (n === 6 
                            ? '我的咨询建议'
                            : 
                        (n === 7 
                            ? '我的投诉表扬'
                            : '我的活动'
                        )))))) }}</p>
                    <i class="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            headImgUrl() {
                return this.$store.state.info.avatar;
            },
            userName() {
                return this.$store.state.info.userName;
            }
        },
        methods: {
            handleClick(n) {
                switch(n) {
                    case 1:
                        this.$router.push('/person/myFamily');
                        break;
                    case 2:
                        this.$router.push('/person/myRepairment');
                        break;
                    case 3:
                        this.$router.push('/person/myDeliveryAddress');
                        break;
                    case 4:
                        this.$router.push('/person/myCoupon');
                        // alert('敬请期待');
                        break;
                    case 5:
                        this.$router.push('/person/myReport');
                        // alert('敬请期待');
                        break;
                    case 6:
                        this.$router.push('/service/suggestion');
                        break;
                    case 7:
                        this.$router.push('/service/myComplaint');
                        break;
                    case 8:
                        this.$router.push('/service/activity/activityEnrolled');
                        break;    
                }
            },
            showMyMessage(){
                this.$router.push('/person/editMyMessage')
            }
        },
        created() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else if (this.isVisitor !== false) {
                // 刷新页面，重新发送请求获取用户信息
            }
        }
    }
</script>
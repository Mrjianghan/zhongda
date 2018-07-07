<style>
    .swiper-pagination-bullet-active{ background-color: #e9be6d !important;}
</style>
<style lang="less" scoped>
    .merchandise{ padding-bottom: .97rem;
        &-img{ width: 100%; height: 6.5rem;
            img{ width: 100%; height: 100%;}
        }
        &-price{ position: relative; display: flex; justify-content: space-between; align-items: center; width: 100%; height: .84rem; padding: 0 .3rem; background-color: #e9be6d; color: #fff;
            &-title{ position: absolute; left: 0; top: -.35rem; z-index: 1; display: flex; justify-content: center; align-items: center; width: 1.34rem; height: .35rem; border-radius: 0 .08rem 0 0; background-color: #e9be6d; font-size: .26rem;}
            &-left{ font-size: .24rem;
                &-group{ font-size: 0;
                     > span{ font-size: .4rem;}
                    & > &-s{ font-size: .3rem;}
                }
                &-origin{ font-size: .22rem; text-decoration: line-through;}
            }
            &-right{ font-size: .22rem;
                &-number{ display: inline-block; width: .28rem; height: .28rem; border-radius: .03rem; background-color: #fff; color: #e9be6d; text-align: center; line-height: .28rem;}
            }
        }
        &-title{ padding: 0 .3rem; line-height: .6rem; font-size: .26rem; color: #333;}
        &-description, &-content{ padding: 0 .3rem; line-height: 1.5; font-size: .22rem; color: #999;}
        &-percent{ height: 1.9rem;
            &-title{ padding: .3rem; font-size: .26rem; color: #333;}
            &-wrapper{ position: relative; height: .16rem; width: 6.6rem; margin: .3rem auto 0; border-radius: .08rem; background-color: #e6e6e6;}
            &-minCount, &-maxCount{ position: absolute; bottom: -.35rem; font-size: .18rem;}
            &-minCount{ left: 0;}
            &-maxCount{ right: 0;}
            &-already{ position: absolute; top: 0; left: 0; height: .16rem; border-radius: .08rem 0 0 .08rem; background-color: #2ee820;}
            &-triangle{ position: absolute; top: 0; right: -.06rem; border-width: .06rem; border-style: solid; border-color: #fff transparent transparent transparent; font-size: 0;}
            &-saleCount{ position: absolute; top: -.35rem; right: -.5rem; width: 1rem; height: 1rem; font-size: .26rem; color: #333; text-align: center;}
        }
        &-detail{ width: 100%;}
        &-button{ position: fixed; bottom: 0; left: 0; width: 100%; height: .97rem; background-color: #ff4c4c; font-size: .3rem; line-height: .97rem; text-align: center; color: #fff;}
    }
</style>
<template>
    <div class="merchandise" v-title="'特惠商城'">
        <swiper
            ref="mySwiper"
            :options="swiperOptions"
            class="merchandise-img"
        >
            <swiper-slide v-for="img in info.imgList" :key="img">
                <img :src="img" />
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <div class="merchandise-price">
            <div class="merchandise-price-title">拼团价</div>
            <div class="merchandise-price-left">
                <span>¥</span>
                <span class="merchandise-price-left-group">
                    <span class="merchandise-price-left-group-l">{{ info.groupPrice.integer }}</span>
                    <span class="merchandise-price-left-group-s">{{ '.' + info.groupPrice.decimal }}</span>
                </span>
                <span class="merchandise-price-left-origin">¥{{ info.originPrice.integer + '.' + info.originPrice.decimal }}</span>
            </div>
            <div class="merchandise-price-right" v-if="info.status === 2">
                <p>距结束仅剩</p>
                <p>
                    <span class="merchandise-price-right-number">{{ info.countDown.day < 10 ? '0' + info.countDown.day : info.countDown.day }}</span>
                    <span>天</span>
                    <span class="merchandise-price-right-number">{{ info.countDown.hour < 10 ? '0' + info.countDown.hour : info.countDown.hour }}</span>
                    <span>时</span>
                    <span class="merchandise-price-right-number">{{ info.countDown.minute < 10 ? '0' + info.countDown.minute : info.countDown.minute }}</span>
                    <span>分</span>
                    <span class="merchandise-price-right-number">{{ info.countDown.second < 10 ? '0' + info.countDown.second : info.countDown.second }}</span>
                    <span>秒</span>
                </p>
            </div>
        </div>
        <div class="merchandise-title">{{ info.name }}</div>
        <pre class="merchandise-description">{{ info.description }}</pre>
        <div class="merchandise-content">净含量: {{ info.content }}</div>
        <div class="merchandise-percent" v-if="info.status === 2">
            <p class="merchandise-percent-title">参团数量</p>
            <div class="merchandise-percent-wrapper">
                <span class="merchandise-percent-minCount">0</span>
                <span class="merchandise-percent-maxCount">{{ info.maxCount }}</span>
                <div class="merchandise-percent-already" :style="{'width': (info.saleCount / info.maxCount * 100) + '%'}">
                    <i class="merchandise-percent-triangle"></i>
                    <span class="merchandise-percent-saleCount">{{ info.saleCount }}</span>
                </div>
            </div>
        </div>
        <img :src="info.detail" class="merchandise-detail" />
        <div class="merchandise-button" @click="handleCreateOrder" v-if="info.status === 2">立即参团!</div>
    </div>
</template>
<script lang="babel">
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOptions: {
                    pagination : '.swiper-pagination'
                },
                info: {
                    name: '',
                    description: '',
                    content: '',
                    originPrice: {
                        integer: 0,
                        decimal: 0
                    },
                    groupPrice: {
                        integer: 0,
                        decimal: 0
                    },
                    countDown: {
                        day: 0,
                        hour: 0,
                        minute: 0,
                        second: 0
                    },
                    maxCount: 999,
                    saleCount: 0,
                    imgList: [],
                    detail: ''
                },
                interval: ''
            }
        },
        methods: {
            countDownStart() {
                this.interval = setInterval(() => {
                    this.info.countDown.second --;
                }, 1000);
            },
            handleCreateOrder() {
                this.$router.push({
                    path: '/mall/createOrder',
                    query: {
                        id: this.$route.query.id,
                        groupId: this.$route.query.groupId
                    }
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/mall/mall/getMerchandiseInfo',
                params: {
                    id: this.$route.query.id,
                    groupId: this.$route.query.groupId
                }
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.info = response.data.info;
                    this.countDownStart();
                } else {
                    alert(response.data.message);
                }
            }).catch((response) => {
                console.log(response)
            });
        },
        watch: {
            'info.countDown.second': function() {
                if (this.info.countDown.second < 0) {
                    if (this.info.countDown.minute > 0 || this.info.countDown.hour > 0 || this.info.countDown.day > 0) {
                        this.info.countDown.minute --
                        this.info.countDown.second = 59;
                    } else {
                        clearInterval(this.interval);
                        this.info.countDown.second = 0;
                    }
                }
            },
            'info.countDown.minute': function() {
                if (this.info.countDown.minute < 0) {
                    this.info.countDown.hour --
                    this.info.countDown.minute = 59;
                }
            },
            'info.countDown.hour': function() {
                if (this.info.countDown.hour < 0) {
                    this.info.countDown.day --
                    this.info.countDown.hour = 23;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .order{ width: 100%; height: 100%; font-size: 0; background-color: #f5f5f5;
        &-address{ display: flex; justify-content: space-between; align-items: center; padding: .3rem; background-color: #fff;
            &-info{ display: flex; flex-direction: column; flex-grow: 1; font-size: .3rem; color: #333;
                &-top{ display: flex; justify-content: space-between; margin-bottom: .1rem;}
            }
            &-icon{ flex-shrink: 0; display: inline-block; width: .13rem; height: .24rem; background-image: url(../../../../../publicSource/img/push_icon.png); background-size: 100% 100%; background-repeat: no-repeat;}
            &-line{ width: 100%; margin-bottom: .3rem;}
        }
        &-info{ padding-left: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
            &-item{ display: flex; padding: .3rem .3rem .3rem 0; border-bottom: 1px solid #dcdcdc;
                &:last-child{ justify-content: flex-end; border-bottom: 0 none;}
                &-title{ font-size: .26rem; color: #333;}
            }
            &-merchandise{
                &-img{ width: 1.4rem; height: 1.4rem; margin-right: .3rem; border: 1px solid #dcdcdc;}
                &-info{ display: flex; flex-direction: column; justify-content: space-between;
                    &-name{ height: .36rem; font-size: .3rem; color: #333;}
                    &-content{ flex-grow: 1; font-size: .22rem; color: #999;}
                }
            }
            &-count{ justify-content: space-between;
                button, input{ width: .62rem; height: .48rem; margin: 0 1px; border: 0 none; border-radius: 0; outline: 0 none; background-color: #efefef; color: #333; font-weight: 800; text-align: center;
                    // &:last-child{ border-right: 1px solid #666;}
                }
            }
            &-coupon{ justify-content: space-between;
                .order-info-item-content{ color: #ff4c4c;}
                span{ font-size: .26rem;}
            }
            &-delivery{ justify-content: space-between;
                .order-info-item-content{ color: #999;}
                span{ font-size: .26rem;}
            }
        }
        &-price{ font-size: 0; color: #ff4c4c;
             > span{ font-size: .36rem;}
            & > &-s{ font-size: .26rem;}
        }
        &-bottom{ position: fixed; bottom: 0; left: 0; display: flex; justify-content: flex-end; width: 100%; height: .96rem; border-top: 1px solid #dcdcdc; background-color: #fff; line-height: .96rem;
            button{ width: 1.9rem; height: 100%; border: 0 none; background-color: #ff4c4c; color: #fff; font-size: .3rem;}
        }

        &-coupon{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #f5f5f5; overflow: hidden;
            &-title{ padding-top: .3rem; color: #999; font-size: .26rem; text-align: center;}
            &-list{ padding: .3rem;
                &-item{ position: relative; width: 6.6rem; height: 3.3rem; margin-bottom: .3rem; border-radius: .08rem; background-color: #fff; overflow: hidden;
                    &-top{ position: relative; height: 1.73rem; padding: .3rem;
                        &-merchant{ float: left; font-size: .36rem; color: #fff;}
                        &-right{ color: #fff; text-align: right;
                            &-price{ font-size: .6rem;}
                            &-description{ font-size: .24rem;}
                        }
                        &-wave{ float: left; width: .32rem; height: .32rem; margin-left: -.04rem; border-radius: 50%; background-color: #fff;
                            &-wrapper{ position: absolute; bottom: -.08rem; left: 0; width: 110%; height: .15rem;}
                        }
                    }
                    &-expire{ margin-top: .7rem; margin-left: .3rem; font-size: .22rem;}
                    &-button{ position: absolute; bottom: .2rem; right: .8rem; width: 1.14rem; height: 1.14rem; border: .02rem solid #fff; border-radius: 50%; font-size: .24rem; line-height: 1.14rem; text-align: center; transform: rotate(-15deg);}
                }
                &-mall &-item-top, &-mall &-item-rest, &-mall &-item-top-wave:nth-child(odd){ background-color: #f7c463;}
                &-mall, &-mall &-item-button{ color: #f7c463;}
                &-mall &-item-button{ border-color: #f7c463;}
                &-merchant &-item-top, &-merchant &-item-rest, &-merchant &-item-top-wave:nth-child(odd){ background-color: #00a762;}
                &-merchant, &-merchant &-item-button{ color: #00a762;}
                &-merchant &-item-button{ border-color: #00a762;}
                &-pay &-item-top, &-pay &-item-rest, &-pay &-item-top-wave:nth-child(odd){ background-color: #f17b77;}
                &-pay, &-pay &-item-button{ color: #f17b77;}
                &-pay &-item-button{ border-color: #f17b77;}

                &-item-disabled &-item-top, &-item-disabled &-item-rest, &-item-disabled &-item-top-wave:nth-child(odd){ background-color: #aaa;}
                &-item-disabled, &-item-disabled &-item-button{ color: #aaa;}
                &-item-disabled &-item-button{ border-color: #aaa;}

                & &-item-top-wave:nth-child(odd){ margin-top: -.15rem;}
            }
            &-bottom{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
        }
    }
</style>
<template>
    <div class="order">
        <div class="order-address" @click="deliveryAddressList.length > 0 ? handleChooseAddress() : handleAddAddress()">
            <div class="order-address-info" v-if="deliveryAddressList.length > 0">
                <div class="order-address-info-top">
                    <p class="order-address-info-top-name">
                        <span>收件人：{{ orderData.deliveryAddress.name }}</span>
                    </p>
                    <p class="order-address-info-top-cellphone">
                        <span>{{ orderData.deliveryAddress.cellphone }}</span>
                    </p>
                </div>
                <p class="order-address-info-bottom">
                    <span>收货地址：{{ orderData.deliveryAddress.provinceName + orderData.deliveryAddress.cityName + orderData.deliveryAddress.districtName + orderData.deliveryAddress.address }}</span>
                </p>
            </div>
            <div class="order-address-info" v-else>
                <div class="order-address-info-top">
                    <p class="order-address-info-top-name">
                        <span>点击添加收货地址</span>
                    </p>
                </div>
            </div>
            <i class="order-address-icon"></i>
        </div>
        <img class="order-address-line" src="../../../img/create_order.png" />
        <div class="order-info">
            <div class="order-info-merchandise order-info-item">
                <img class="order-info-merchandise-img" :src="orderData.merchandise.img" />
                <div class="order-info-merchandise-info">
                    <p class="order-info-merchandise-info-name">
                        <span>{{ orderData.merchandise.name }}</span>
                    </p>
                    <p class="order-info-merchandise-info-content">
                        <span>净含量：{{ orderData.merchandise.content }}</span>
                    </p>
                    <p class="order-price">
                        <span class="order-price-s">¥</span>
                        <span>{{ orderData.merchandise.price.integer }}</span>
                        <span class="order-price-s">{{ '.' + orderData.merchandise.price.decimal }}</span>
                    </p>
                </div>
            </div>
            <div class="order-info-item order-info-count">
                <p class="order-info-item-title">
                    <span>购买数量：</span>
                </p>
                <div class="order-info-item-content">
                    <button @click="orderData.merchandise.count > 1
                        ? orderData.merchandise.count -- 
                        : ''">-</button>
                    <input type="number" v-model="orderData.merchandise.count" 
                        @blur="orderData.merchandise.count < 1
                            ? orderData.merchandise.count = 1 
                            : (orderData.merchandise.count > orderData.merchandise.maxCount 
                                ? orderData.merchandise.count = orderData.merchandise.maxCount 
                                : orderData.merchandise.count = 1)">
                    <button @click="orderData.merchandise.count < orderData.merchandise.maxCount 
                        ? orderData.merchandise.count ++ 
                        : ''">+</button>
                </div>
            </div>
            <div class="order-info-item order-info-coupon">
                <p class="order-info-item-title">
                    <span>优惠券：</span>
                </p>
                <p class="order-info-item-content" @click="handleCouponShow">
                    <span v-if="couponPrice === false">{{ couponList.availableList.length }}张可用</span>
                    <span v-else>已减{{ couponPrice }}元</span>
                    <i class="order-address-icon"></i>
                </p>
            </div>
            <div class="order-info-item order-info-delivery">
                <p class="order-info-item-title">
                    <span>运费：</span>
                </p>
                <p class="order-info-item-content">
                    <span>¥0.00</span>
                </p>
            </div>
            <div class="order-info-item">
                <p class="order-info-item-title">
                    <span>共{{ orderData.merchandise.count }}件商品 小计：</span>
                    <em class="order-price">
                        <span class="order-price-s">¥</span>
                        <span>{{ allPrice.integer }}</span>
                        <span class="order-price-s">{{ '.' + allPrice.decimal }}</span>
                    </em>
                </p>
            </div>
        </div>
        <div class="order-bottom">
            <p class="order-info-item-title">
                <span>合计：</span>
                <em class="order-price">
                    <span class="order-price-s">¥</span>
                    <span>{{ allPrice.integer }}</span>
                    <span class="order-price-s">.{{ allPrice.decimal }}</span>
                </em>
            </p>
            <button @click="handleCreateOrder">提交订单</button>
        </div>

        <div class="order-coupon" v-show="couponShow">
            <p class="order-coupon-title">
                <span>——可使用优惠券（{{ couponList.availableList.length }}张）——</span>
            </p>
            <ul class="order-coupon-list order-coupon-list-mall">
                <li class="order-coupon-list-item" :class="{
                    'order-coupon-list-mall': coupon.type === 1,
                    'order-coupon-list-merchant': coupon.type === 2,
                    'order-coupon-list-pay': coupon.type === 3
                }" v-for="coupon in couponList.availableList" :key="coupon.id" @click="handleChooseCoupon(coupon.id)">
                    <div class="order-coupon-list-item-top">
                        <p class="order-coupon-list-item-top-merchant">{{ coupon.merchantName }}</p>
                        <div class="order-coupon-list-item-top-right fr">
                            <p class="order-coupon-list-item-top-right-price">{{ coupon.preferentialType === 1 ? '¥' + coupon.face : coupon.face * 10 + '折' }}</p>
                            <p class="order-coupon-list-item-top-right-description">{{ coupon.couponDescription }}</p>
                        </div>
                        <div class="order-coupon-list-item-top-wave-wrapper">
                            <div class="order-coupon-list-item-top-wave" v-for="n in 24" :key="n"></div>
                        </div>
                    </div>
                    <p class="order-coupon-list-item-expire">有效期至：{{ coupon.expireDatetime }}</p>
                </li>
            </ul>
            <p class="order-coupon-title">
                <span>——不可用优惠券（{{ couponList.unavailableList.length }}张）——</span>
            </p>
            <ul class="order-coupon-list order-coupon-list-mall">
                <li class="order-coupon-list-item order-coupon-list-item-disabled" :class="{
                    'order-coupon-list-mall': coupon.type === 1,
                    'order-coupon-list-merchant': coupon.type === 2,
                    'order-coupon-list-pay': coupon.type === 3
                }" v-for="coupon in couponList.unavailableList" :key="coupon.id">
                    <div class="order-coupon-list-item-top">
                        <p class="order-coupon-list-item-top-merchant">{{ coupon.merchantName }}</p>
                        <div class="order-coupon-list-item-top-right fr">
                            <p class="order-coupon-list-item-top-right-price">{{ coupon.preferentialType === 1 ? '¥' + coupon.face : coupon.face * 10 + '折' }}</p>
                            <p class="order-coupon-list-item-top-right-description">{{ coupon.couponDescription }}</p>
                        </div>
                        <div class="order-coupon-list-item-top-wave-wrapper">
                            <div class="order-coupon-list-item-top-wave" v-for="n in 24" :key="n"></div>
                        </div>
                    </div>
                    <p class="order-coupon-list-item-expire">有效期至：{{ coupon.expireDatetime }}</p>
                </li>
            </ul>
            <zdButton size="large" class="order-coupon-bottom" @click="handleChooseCoupon('')">不使用优惠券</zdButton>
        </div>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import priceTransform from 'publicSource/money';

    export default {
        components: {
            zdButton
        },
        data() {
            return {
                deliveryAddressList: [],
                couponList: {
                    availableList: [],
                    unavailableList: []
                },
                couponShow: false,
                orderData: {
                    deliveryAddress: {
                        id: '',
                        name: '',
                        cellphone: '',
                        provinceName: '',
                        cityName: '',
                        districtName: '',
                        address: ''
                    },
                    merchandise: {
                        name: '',
                        content: '',
                        price: {
                            integer: 0,
                            decimal: 0,
                            price: 0
                        },
                        img: '',
                        count: 1,
                        maxCount: 999,
                        coupon: ''
                    }
                }
            }
        },
        computed: {
            defaultAddressId() {
                return this.$store.state.defaultAddressId;
            },
            noCouponPrice() {
                return (this.orderData.merchandise.price.price * 100) * this.orderData.merchandise.count / 100;
            },
            couponPrice() {
                if (typeof this.orderData.merchandise.coupon === 'number') {
                    for (let i = 0; i < this.couponList.availableList.length; i ++) {
                        if (this.orderData.merchandise.coupon === this.couponList.availableList[i].id) {
                            if (this.couponList.availableList[i].preferentialType === 1) {
                                // 满减
                                return this.couponList.availableList[i].face;
                            } else {
                                // 打折
                                let v = (this.noCouponPrice * 10000 - (this.noCouponPrice * 100) * (this.couponList.availableList[i].face * 100)) / 10000;
                                if (this.couponList.availableList[i].maxValue !== 0 && v > this.couponList.availableList[i].maxValue) {
                                    return maxValue;
                                } else {
                                    return v;
                                }
                            }
                        }
                    }
                }
                return false;
            },
            allPrice() {
                const price = (typeof this.couponPrice === 'number' 
                    ? (this.noCouponPrice * 100 - this.couponPrice * 100) / 100
                    : this.noCouponPrice);
                return priceTransform(price);
            }
        },
        methods: {
            handleChooseAddress() {
                this.$router.push({
                    path: '/deliveryAddress/deliveryAddressList',
                    query: {
                        merchandiseId: this.$route.query.id,
                        groupId: this.$route.query.groupId
                    }
                });
            },
            handleAddAddress() {
                this.$router.push({
                    path: '/deliveryAddress/addDeliveryAddress',
                    query: {
                        merchandiseId: this.$route.query.id,
                        groupId: this.$route.query.groupId
                    }
                });
            },
            handleCouponShow() {
                this.couponShow = true;
            },
            getCouponList() {
                this.$http({
                    url: '/api/mall/mall/getCouponList',
                    params: {
                        price: this.noCouponPrice
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.couponList.availableList = response.data.availableList;
                        this.couponList.unavailableList = response.data.unavailableList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleChooseCoupon(id) {
                this.orderData.merchandise.coupon = id;
                this.couponShow = false;
            },
            handleCreateOrder() {
                if (this.orderData.deliveryAddress.id) {
                    this.$http({
                        url: '/api/mall/mall/createOrder',
                        method: 'post',
                        data: {
                            addressId: this.orderData.deliveryAddress.id,
                            merchandiseId: this.$route.query.id,
                            quantity: this.orderData.merchandise.count,
                            couponId: this.couponPrice === false 
                                ? ''
                                : this.orderData.merchandise.coupon
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            // 将返回的订单编号添加进参数
                            this.$message('订单创建成功，请稍后...');
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/mall/payOrder',
                                    query: {
                                        id: response.data.id
                                    }
                                });
                            }, 1000);
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    alert('请选择一个收货地址');
                }
            }
        },
        mounted() {
            this.$http.all([this.$http({
                url: '/api/common/getMyDeliveryAddress'
            }), this.$http({
                url: '/api/mall/mall/getMerchandiseInfo',
                params: {
                    id: this.$route.query.id,
                    groupId: this.$route.query.groupId
                }
            })]).then(this.$http.spread((response_01, response_02) => {
                if (response_01.data.code === '00000') {
                    this.deliveryAddressList = response_01.data.addressList;
                    if (this.deliveryAddressList.length > 0) {
                        if (Object.prototype.hasOwnProperty.call(this.$route.query, 'addressId')) {
                            for (let i = 0; i < this.deliveryAddressList.length; i ++) {
                                if (this.deliveryAddressList[i].id == this.$route.query.addressId) {
                                    this.orderData.deliveryAddress = this.deliveryAddressList[i];
                                    break;
                                }
                            }
                        } else {
                            for (let j = 0; j < this.deliveryAddressList.length; j ++) {
                                if (Object.prototype.hasOwnProperty.call(this.deliveryAddressList[j], 'roomId' && this.defaultAddressId === this.deliveryAddressList[j].roomId)) {
                                    this.orderData.deliveryAddress = this.deliveryAddressList[j];
                                    break;
                                }
                                if (j === this.deliveryAddressList.length - 1) {
                                    for (let i = 0; i < this.deliveryAddressList.length; i ++) {
                                        if (this.deliveryAddressList[i].theDefault === true) {
                                            this.orderData.deliveryAddress = this.deliveryAddressList[i];
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (response_02.data.code === '00000') {
                    this.orderData.merchandise.name = response_02.data.info.name;
                    this.orderData.merchandise.content = response_02.data.info.content;
                    this.orderData.merchandise.price = response_02.data.info.groupPrice;
                    this.orderData.merchandise.maxCount = response_02.data.info.maxCount;
                    this.orderData.merchandise.img = response_02.data.info.imgList[0];
                }
            })).catch((response) => {
                console.log(response);
            });
            this.getCouponList();
        },
        watch: {
            'noCouponPrice': function() {
                this.getCouponList();
            }
        }
    }
</script>

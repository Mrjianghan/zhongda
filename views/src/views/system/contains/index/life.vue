<style lang="less" scoped>
    @import './common.less';
</style>
<template>
    <div v-title="'中大普惠物业'">
        <div class="address" v-if="!isVisitor">
            <span>{{ userInfo.defaultAddressName }}</span>
            <i @click="handleChangePark">切换</i>
        </div>
        <img src="../../img/index_banner_02.jpg" class="banner" />
        <div class="nav-list">
            <div class="nav-item" v-for="n in 2" :key="n" @click="handleClick(n)">
                <img :src="imgArr[n - 1]" />
                <p>
                    <span>{{ 
                        n === 1 ? '领券中心' : '特惠商城'
                    }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        data() {
            const imgArr = [];
            for (let i = 1; i <= 2; i ++) {
                const imgItem = require('../../img/index_life_item_' + ((i < 10) ? ('0' + i) : i) + '.png');
                imgArr.push(imgItem);
            }
            return {
                imgArr
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            userInfo() {
                return this.$store.state.info;
            }
        },
        methods: {
            handleClick(n) {
                switch(n) {
                    case 1: 
                        this.$router.push('/life/coupon');
                        // alert('敬请期待');
                        break;
                    case 2:
                        // 关闭商城入口
                        // 2018.01.29  又开启了商城入口
                        // alert('请从APP端进入');
                        // window.location.href = hostname + '/appDownload/user/app.html';
                        window.location.href = hostname + '/mall/?';
                        // alert('敬请期待');
                        break;
                }
            },
            handleChangePark() {
                this.$router.push('/person/myFamily/changeDefaultHouse/index');
            }
        }
    }
</script>
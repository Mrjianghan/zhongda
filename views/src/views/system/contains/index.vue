<style lang="less" scoped>
    .wrapper{ display: flex; flex-direction: column; width: 100%; height: 100%;}
    .router{ flex-grow: 1;}
    .navigation{ flex-shrink: 0; display: flex; height: 1.2rem; border-top: 1px solid #dcdcdc;
        &-item{
            &-wrapper{ display: flex; flex-direction: column; align-items: center; flex-basis: 0; flex-grow: 1; height: 100%; padding-top: .12rem;}
            &-img{ display: block; height: .66rem; width: .66rem; background-size: 100% 100%; background-repeat: no-repeat;
                .navigation-loop(@n, @i: 1) when (@i <= @n) {
                    &-0@{i} { background-image: url('../img/index_navigation_0@{i}.png');
                        &-active{ background-image: url('../img/index_navigation_0@{i}_active.png');}
                    }
                    .navigation-loop(@n, (@i + 1));
                }
                .navigation-loop(3, 1);
            }
            &-word{ font-size: .2rem; color: #808080;
                &-active{ color: #e9be6d;}
            }
        }
    }
</style>
<template>
    <div class="wrapper">
        <router-view class="router"></router-view>
        <div class="navigation">
            <div class="navigation-item-wrapper" v-for="index in 3" :key="index" @click="handleRouterPush(index)">
                <i class="navigation-item-img" 
                    :class="[
                        'navigation-item-img-0' + index, 
                        index === navigationActiveIndex 
                            ? 'navigation-item-img-0' + index + '-active'
                            : ''
                    ]"></i>
                <p class="navigation-item-word"
                    :class="index === navigationActiveIndex 
                        ? 'navigation-item-word-active'
                        : ''">
                    <span>
                        {{ index === 1 ? '惠服务' : (index === 2 ? '惠生活' : '个人中心') }}
                    </span>
                </p>
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
            navigationActiveIndex() {
                return this.$route.path === '/index/service' ?
                    1 : 
                    (this.$route.path === '/index/life' ?
                        2 :
                        ((this.$route.path === '/index/person' || this.$route.path === '/index/visitorPerson') ?
                            3 : '')
                    );
            }
        },
        methods: {
            handleRouterPush(index) {
                this.$router.replace(index === 1 
                    ? '/index/service' 
                    : (index === 2 
                        ? '/index/life' 
                        : (this.isVisitor === true 
                            ? '/index/visitorPerson'
                            : '/index/person')
                        )
                    );
            }
        }
    }
</script>
<style lang="less" scoped>
    .announcement{ display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; background-color: #f5f5f5;
        &-list{ flex-grow: 1; overflow-y: scroll;
            &-item{ display: flex; padding: .3rem; margin-bottom: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                img{ flex-shrink: 0; width: 1.28rem; height: 1.28rem; margin-right: .3rem;}
                &-words{ display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;
                    &-top{ display: flex; justify-content: space-between; align-items: center;
                        &-title{ flex-grow: 1; font-size: .28rem; color: #333; word-break: break-all; overflow: hidden;}
                        &-date{ flex-shrink: 0; font-size: .22rem; color: #999;}
                    }
                    &-content{ height: .7rem; font-size: .24rem; color: #666;}
                }
            }
        }
        &-button{ width: 100%; border-radius: 0; flex-shrink: 0;}
    }
</style>
<template>
    <div class="announcement" v-title="'社区公告'">
        <ul class="announcement-list">
            <li class="announcement-list-item" v-for="announcement in announcementList" :key="announcement.id" @click="handleAnnouncementInfo(announcement.id)">
                <img :src="announcement.img" v-if="announcement.img !== ''" />
                <div class="announcement-list-item-words">
                    <div class="announcement-list-item-words-top">
                        <p class="announcement-list-item-words-top-title">{{ announcement.title }}</p>
                        <p class="announcement-list-item-words-top-date">{{ announcement.date }}</p>
                    </div>
                    <pre class="announcement-list-item-words-content">{{ announcement.content }}</pre>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {   
            zdButton
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            }
        },
        data() {
            return {
                announcementList: [{
                    id: 1,
                    img: '',
                    title: '踏青',
                    date: '2017-02-20',
                    content: '踏青为春日郊游，也称“踏春”，一般指初春时到郊外散步游玩。旧时曾以清明节为踏青节...'
                }]
            }
        },
        methods: {
            handleAnnouncementInfo(id) {
                this.$router.push({
                    path: '/service/announcement/announcementInfo',
                    query: {
                        id
                    }
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$http({
                    url: '/api/system/service/announcement/getAnnouncementList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    this.announcementList = response.data.announcementList;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>


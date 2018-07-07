<style lang="less" scoped>
    .index{
        &-wrapper{ padding: .4rem .3rem 0;}
        &-logo{ padding-bottom: .63rem; text-align: center;
            img{ width: 2rem; height: 2.5rem;}
        }
        &-input{ margin-bottom: .4rem;}
        &-error{ padding: .2rem 0; font-size: .2rem; color: red; text-align: center;}
    }
</style>
<template>
    <div class="index-wrapper" v-title="'登录'">
        <div class="index-logo">
            <img src="../img/index_logo.png" />
        </div>
        <div class="index-form">
            <zdInput
                icon="cellphone"
                label="手机号"
                placeholder="请输入手机号"
                v-model.trim="cellphone"
                class="index-input"
            ></zdInput>
            <zdInput
                icon="lock"
                label="验证码"
                placeholder="请输入验证码"
                v-model.trim="smscode"
                class="index-input"
            >
                <zdButton
                    size="normal"
                    :disabled="getSmscodeDisabled"
                    @click="handleGetSmscode"
                >{{ getSmscodeButtonWord }}</zdButton>
            </zdInput>
            <zdButton 
                :disabled="loginDisabled"
                @click="handleLogin"
            >登录</zdButton>
            <p class="index-error">{{ error }}</p>
        </div>
    </div>
</template>
<script lang="babel">
    import zdInput from 'publicComponents/input/input';
    import zdButton from 'publicComponents/button/button';
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        components: {
            zdInput,
            zdButton
        },
        data() {
            return {
                cellphone: '',
                smscode: '',
                getSmscodeDisabled: false,
                loginDisabled: false,
                countDown: 0,
                cellphoneReg: /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/,
                error: ''
            }
        },
        computed: {
            getSmscodeButtonWord() {
                if (this.getSmscodeDisabled === false) {
                    return '获取验证码';
                } else {
                    return '已发送(' + this.countDown + ')';
                }
            },
            loginButtonWord() {
                if (this.loginDisabled === false) {
                    return '登录';
                } else {
                    return '正在登录...';
                }
            },
            cellphoneValidate() {
                if (this.cellphoneReg.test(this.cellphone) === true) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            async handleGetSmscode() {
                if (this.cellphoneValidate === true) {
                    this.error = '';
                    // 发送请求获取验证码

                    // ....
                    // ..此处发送请求
                    this.$http({
                        method: 'post',
                        url: '/api/login/getSmscode',
                        data: {
                            cellphone: this.cellphone
                        }
                    }).then((response) => {
                        // ..
                    }).catch((response) => {
                        console.log(response);
                    });
                    // ....

                    // 期间按钮无法点击
                    this.getSmscodeDisabled = true;

                    // 60s后恢复可点击
                    setTimeout(() => {
                        this.getSmscodeDisabled = false;
                    }, 60000);
                    
                    // 倒计时
                    this.countDown = 60;
                    while (this.countDown > 0) {
                        await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                this.countDown -- ;
                                resolve(this.countDown);
                            }, 1000);
                        });
                    }
                } else {
                    this.error = '您的手机号格式有误，请重新输入';
                }
            },
            handleLogin() {
                if (this.cellphoneValidate === true) {
                    this.error = '';
                    // 发送绑定手机号请求

                    // ....
                    // ..此处发送请求
                    this.$http({
                        method: 'post',
                        url: '/api/login/bindCellphone',
                        //url: '/api/login/appBindCellphone',
                        data: {
                            cellphone: this.cellphone,
                            smscode: this.smscode
                        }
                    }).then((response) => {
                        // 在请求返回之后按钮恢复点击
                        this.loginDisabled = false;
                        if (response.data.code === '00000') {
                            this.$emit('beingUser');
                            if (response.data.type === 1) {
                                this.$router.push('/choosePark');
                            } else {
                                window.location.href = hostname + '/system/';
                            }
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                    // ....

                    // 期间按钮无法点击
                    this.loginDisabled = true;
                } else {
                    this.error = '您的手机号格式有误，请重新输入';
                }
            }
        }
    }
</script>
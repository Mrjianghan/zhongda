<style lang="less" scoped>
    .deliveryAddress{
        &-form{ width: 100%; height: 100%; background-color: #f5f5f5;
            &-item{ position: relative; display: flex; justify-content: space-between; width: 100%; padding: .3rem; border-bottom: 1px solid #dcdcdc; background-color: #fff; font-size: .3rem; color: #666;
                span{ flex-shrink: 0;}
                input{ flex-grow: 1; border: 0 none; outline: 0 none; font-size: .28rem; text-align: right;}
                select{ position: absolute; top: .3rem; right: .3rem; width: 50%; text-align: right; opacity: 0;}
                textarea{ flex-grow: 1; height: 1.4rem; border: 0 none; outline: 0 none; font-size: .28rem;}
            }
            &-button{ display: block; margin: .3rem auto 0;}
        }
    }
</style>
<template>
    <form class="deliveryAddress-form" v-title="'添加收货地址'">
        <div class="deliveryAddress-form-item">
            <span>收货人</span>
            <input type="text" placeholder="请输入收货人" v-model.trim="formData.name" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>联系电话</span>
            <input type="text" placeholder="请输入联系电话" v-model.trim="formData.cellphone" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>省</span>
            <select v-model="formData.provinceId">
                <option value="">请选择</option>
                <option v-for="province in provinceList" :key="province.provinceId" :value="province.provinceId">{{ province.provinceName }}</option>
            </select>
            <input type="text" placeholder="请选择省" readonly="readonly" v-model="chooseProvince" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>市</span>
            <select v-model="formData.cityId">
                <option value="">请选择</option>
                <option v-for="city in cityList" :key="city.cityId" :value="city.cityId">{{ city.cityName }}</option>
            </select>
            <input type="text" placeholder="请选择市" readonly="readonly" v-model="chooseCity" />
        </div>
        <div class="deliveryAddress-form-item">
            <span>区</span>
            <select v-model="formData.districtId">
                <option value="">请选择</option>
                <option v-for="district in districtList" :key="district.districtId" :value="district.districtId">{{ district.districtName }}</option>
            </select>
            <input type="text" placeholder="请选择区" readonly="readonly" v-model="chooseDistrict" />
        </div>
        <div class="deliveryAddress-form-item">
            <textarea placeholder="请输入详细地址" v-model.trim="formData.address"></textarea>
        </div>
        <div class="deliveryAddress-form-item">
            <span>设为常用</span>
            <zdCheckbox
                :active="formData.isFrequent"
                @click="handleClickFrequent"></zdCheckbox>
        </div>
        <zdButton
            class="deliveryAddress-form-button"
            @click="handleAddAddress">保存</zdButton>
    </form>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import zdCheckbox from 'publicComponents/checkbox/checkbox';

    export default {
        components: {
            zdButton,
            zdCheckbox
        },
        data() {
            return {
                provinceList: [],
                cityList: [],
                districtList: [],
                formData: {
                    name: '',
                    cellphone: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    address: '',
                    isFrequent: false
                }
            }
        },
        computed: {
            chooseProvince() {
                for (let i = 0; i < this.provinceList.length; i ++) {
                    if (this.provinceList[i].provinceId === this.formData.provinceId) {
                        return this.provinceList[i].provinceName;
                    }
                }
                return '';
            },
            chooseCity() {
                for (let i = 0; i < this.cityList.length; i ++) {
                    if (this.cityList[i].cityId === this.formData.cityId) {
                        return this.cityList[i].cityName;
                    }
                }
                return '';
            },
            chooseDistrict() {
                for (let i = 0; i < this.districtList.length; i ++) {
                    if (this.districtList[i].districtId === this.formData.districtId) {
                        return this.districtList[i].districtName;
                    }
                }
                return '';
            },
            formValidate() {
                if (this.formData.name === '' || this.formData.cellphone === '' || this.formData.provinceId === '' || this.formData.cityId === '' || this.formData.districtId === '' || this.formData.address === '') {
                    console.log(this.formData);
                    return '请将表单填写完整';
                } else {
                    const cellphoneReg = /^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/;
                    if (cellphoneReg.test(this.formData.cellphone) === false) {
                        return '请填写正确的手机号'
                    }
                }
                return true;
            }
        },
        methods: {
            getProvinceList() {
                this.$http({
                    url: '/api/common/getProvinceList'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.provinceList = response.data.provinceList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            getCityList(provinceId) {
                this.$http({
                    url: '/api/common/getCityList',
                    params: {
                        provinceId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.cityList = response.data.cityList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            getDistrictList(cityId) {
                this.$http({
                    url: '/api/common/getDistrictList',
                    params: {
                        cityId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.districtList = response.data.districtList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleClickFrequent() {
                this.formData.isFrequent = !this.formData.isFrequent;
            },
            handleAddAddress(e) {
                // 在computed中做表单校验
                e.preventDefault();
                if (this.formValidate !== true) {
                    alert(this.formValidate);
                } else {
                    // 发送请求
                    this.$http({
                        url: '/api/common/addDeliveryAddress',
                        method: 'post',
                        data: {
                            name: this.formData.name,
                            cellphone: this.formData.cellphone,
                            districtId: this.formData.districtId,
                            address: this.formData.address,
                            isFrequent: this.formData.isFrequent ? 1 : 0
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('添加成功');
                            this.$router.replace({
                                path: '/deliveryAddress/deliveryAddressList',
                                query: {
                                    merchandiseId: this.$route.query.merchandiseId,
                                    groupId: this.$route.query.groupId,
                                }
                            });
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            }
        },
        mounted() {
            // 获取省
            this.getProvinceList();
        },
        watch: {
            'formData.provinceId': function() {
                this.formData.cityId = '';
                this.formData.districtId = '';
                this.cityList = [];
                this.districtList = [];
                if (this.formData.provinceId !== '') {
                    // 请求市
                    this.getCityList(this.formData.provinceId);
                }
            },
            'formData.cityId': function() {
                this.formData.districtId = '';
                this.districtList = [];
                if (this.formData.cityId !== '') {
                    // 请求区
                    this.getDistrictList(this.formData.cityId);
                }
            }
        }
    }
</script>
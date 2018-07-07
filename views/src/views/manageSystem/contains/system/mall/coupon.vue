<template>
    <div class="contain-main">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
                <el-input v-model="formData.keywords" size="small"></el-input>
            </el-form-item>
            <el-form-item label="优惠种类">
                <el-select v-model="formData.preferentialType" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="满减券" :value="1"></el-option>
                    <el-option label="打折券" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="券种类">
                <el-select v-model="formData.type" size="small">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="商城券" :value="1"></el-option>
                    <el-option label="商户券" :value="2"></el-option>
                    <el-option label="支付券" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" size="small" @click="searchFun">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="createCouponRouter" v-permit="3301">添加优惠券</el-button>
            </el-form-item>
        </el-form>
        <el-table stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="描述：">
                            <pre>
                                <span>{{ props.row.description }}</span>
                            </pre>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <p>
                                <span>{{ props.row.createDatetime }}</span>
                            </p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="number" label="编号" min-width="150"></el-table-column>
            <el-table-column prop="merchantName" label="发放商户" min-width="150"></el-table-column>
            <el-table-column prop="couponDescription" label="面值" min-width="180"></el-table-column>
            <el-table-column prop="deliveryDatetime" label="发放时间" min-width="180"></el-table-column>
            <el-table-column prop="expireDatetime" label="过期时间" min-width="180"></el-table-column>
            <el-table-column prop="quantity" label="总量" min-width="80"></el-table-column>
            <el-table-column prop="deliveryQuantity" label="已领" min-width="80"></el-table-column>
            <el-table-column label="操作" width="130">
                <template scope="scope">
                    <el-button type="danger" size="small" icon="delete" @click="deleteCoupon(scope.row.id)" :disabled="scope.row.timeout === 0" v-permit="3303">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <div class="contain-bottom-pagination">
                <el-pagination 
                    class="fr"
                    layout="sizes, total, prev, pager, next, jumper" 
                    :current-page="pageData.currentPage"
                    :total="pageData.totalSize" 
                    :page-sizes="[10, 20, 50, 100]" 
                    :page-size="pageData.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const currentPage = (this.$route.query.currentPage!==undefined)?(parseInt(this.$route.query.currentPage)):1;
            return {
                formData: {
                    keywords: '',
                    preferentialType: '',
                    type: ''
                },
                sendData: {
                    keywords: '',
                    preferentialType: '',
                    type: ''
                },
                tableData: [],
                pageData: {
                    currentPage,
                    totalSize: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            watchQueryFun(){
                // 监测路由中的query数据变化
                if(this.$route.query.currentPage) {
                    this.pageData.currentPage = parseInt(this.$route.query.currentPage);
                } else {
                    this.pageData.currentPage = 1;
                }
                this.ajaxFun();
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/mall/coupon/getCouponList',
                    params: {
                        keywords: this.sendData.keywords,
                        preferentialType: this.sendData.preferentialType,
                        type: this.sendData.type,
                        pageNo: this.pageData.currentPage,
                        pageSize: this.pageData.pageSize
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.pageData.totalSize = response.data.count;
                        this.tableData = response.data.couponList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleSizeChange(val) {
                this.pageData.pageSize = val;
                if (this.$route.query.currentPage) {
                    this.$router.push({
                        path: '/manageSystem/mall/coupon'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/coupon',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            handleCurrentChange(currentPage) {
                this.$router.push({
                    path: '/manageSystem/mall/coupon',
                    query: {
                        currentPage: currentPage
                    }
                });
            },
            searchFun() {
                this.sendData.keywords = this.formData.keywords;
                this.sendData.preferentialType = this.formData.preferentialType;
                this.sendData.type = this.formData.type;
                if(this.$route.query.currentPage){
                    this.$router.push({
                        path: '/manageSystem/mall/coupon'
                    });
                } else {
                    this.$router.push({
                        path: '/manageSystem/mall/coupon',
                        query: {
                            currentPage: 1
                        }
                    });
                }
            },
            createCouponRouter() {
                this.$router.push('/manageSystem/mall/coupon/createCoupon');
            },
            deleteCoupon(id) {
                this.$confirm('此操作将永久删除该优惠券, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: '/api/manageSystem/system/mall/coupon/deleteCoupon',
                        params: {
                            id
                        },
                        method: 'delete'
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.searchFun();
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                });
            }
        },
        mounted() {
            this.watchQueryFun();
        },
        watch: {
            '$route.query.currentPage': function() {
                this.watchQueryFun();
            }
        }
    }
</script>
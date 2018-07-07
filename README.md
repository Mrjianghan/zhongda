# 中大惠生活文档

前端技术栈: Vue + Vue-router + Vuex + Element-ui + Echarts + Axios
中间层技术栈: Koa + Koa-router + Koa-session2 + request-promise

中间层生产环境启动: npm run server  
中间层测试环境启动: npm run test  
中间层开发环境启动: npm run dev  

前端打包共用dll文件: npm run dll  
前端dev模式: npm run dev  
前端生产环境打包: npm run build  
前端测试环境打包: npm run test-build  
前端开发环境打包: npm run dev-build  

项目架构如以下所示: 

 - app.js
 - config.js
 - router.js
 - Store.js
 - controllers
	 - common
	 - ...(other controllers)
 - models
	 - common
	 - ...(other models)
 - views
	 - src
		 - publicSource
		 - views
			 - login
				 - contains
				 - img
				 - App.vue
				 - main.js
				 - routers.js
			 - mall
			 - system
			 - manageSystem
	 - index.ejs
	 - webpack.config.js
	 - webpack.build.config.js
	 - webpack.dev.config.js
	 - webpack.dll.config.js


## config.js

其中包含了appid, appsecret, redirectUrl(未登录时重定向路径), redirect(微信重定向地址获取code), hostname(域名，各个环境下有所不同), manageSystemHostname(与hostname相同, 代码中参与引用可改用hostname, 如代码中无残余引用则可删去)  
NODE_ENV改变, 则其中变量也会发生改变

## Store.js

SESSION存储控制。该项目中SESSION储存与Redis之中，key形式如下
>SESSION-(userid | accountid)-(type[APP, WECHAT] | [APP-M, WEB])  

1. 用户端中, 通过clear属性来清除所有该用户的SESSION, 此功能在用户修改手机号时会使用到. 
2. APP（用户端与管理端）不支持同账号同时登录在不同设备上. 当APP登录后, 会通过key检测SESSION中是否有该ID在不同设备登录, 如果有则将另一设备上的SESSION清除, 既另一设备上的用户需要重新登录. 

## router.js

该文件为接口路由配置文件, 其中post, put, patch请求需要引入中间件koa-body. 

## app.js

该文件为服务入口文件。其中通过koa-static配置了静态文件目录, 通过koa-session2完成了对SESSION的存储与控制, 通过koa-router来对接口路由进行控制, 并在全局的String的原型上添加了format方法。  
该文件代码逻辑如下.  

1. 判断是否微信端链接  
	1. 是, 判断SESSION是否存在
		1. 是, 直接通过SESSION中的openid请求userid
		2. 否, 通过重定向获取code后使用code去向微信请求openid, 再用openid请求userid
	2. 否, 进入下一步判断
2. 对api请求进行拦截, 当SESSION过期或不存在时返回SESSION过期的response
3. 对文件请求中404的请求进行拦截, 返回文件夹下的index.html
	1. 其中对manageSystem中进行特殊处理, 检测是否登录以及选择园区, 如果未登录则跳转登录路由, 如果未选园区则跳转选择园区路由

## controller

存放各种controller, 各类接口路由的入口. 

返回参数: 
0. '00000': 成功
1. 'E0001': 中间层参数错误
2. 'E0002': 中间层出错
3. 'E0003': 后端服务出错
4. 'E0004': SESSION过期

### common - dateTransition.js

接收两个参数(timestamp, type), 第一个参数可以为任何能被new Date()转化为Date对象的值, 第二个参数可选, 默认返回yyyy-mm-dd, 当type = 'datetime'时, 返回yyyy-MM-dd hh:mm:ss, 当type = 'minute'时, 返回yyyy-MM-dd hh:mm. 

### common - money.js

接收一个参数(price), 返回为以下形式
```
{
    price: 9.888',
    integer: '9',
    decimal: '888'
}
```

### common - requestModule.js

该方法为controllers的通用请求方法, 接收一个参数(object),参数传递的属性如下

 - returnData(最终返回给前端的body)
 - validate(可选, 如不传为默认)
 - method(调用的model方法)
 - params(传递的参数)
 - success(返回成功后的回调)

1. returnData为最终返回给前端的body, 必传. 当请求返回有错误时在这里改变其中的code与message. 
2. validate为参数校验, 其有两个属性, params与properties。params为前端传来的参数, 为一个对象. properties为需校验的参数, 可为字符串或数组, 分别为校验一个或多个参数.
3. method为调用的model方法, 必传.
4. params为传递的参数, 是一个对象. 
5. success为请求返回成功后的回调, 接收一个参数response, 即后端返回的response. 

该方法最终返回一个Promise对象. 

### common - ResDataFormat.js

一个构造函数, 实例为返回给前端的body. 

## models

存放各种model, 其中为向后端发送请求的方法. 使用request, request-promise请求库, 最终返回一个Promise对象. 

### common - NewRequestParams.js

一个构造函数, 实例为request所需的参数对象. 其中为配合后端参数接收, 使用Objecy.defineProperty封装了一个自定义的参数属性myParams. 该属性根据method的不同给qs与body不同的处理方法. 

### common - requestAPIList.js

此为后端请求接口列表.

## views

views是中间层的静态目录, 并且存放了前端的源代码. 

### webpack.config.js

webpack的公共配置, 开发环境与生产环境共用. 该配置为多页面配置. 

### webpack.dev.config.js

开发config添加webpack-dev-server. 

### webpack.build.config.js

添加代码压缩

### webpack.dll.config.js

将vue, vue-router, vuex, axios这一些共用代码打包.

### publicSource

该文件夹包含共用资源文件. components中包含移动端的各类封装好的组件, contains中包含移动端的部分共用页面. 

 - button

| params |  |
|:----|:----|
|disabled(bool)|传入true/false, 当disabled为true时, 按钮置灰不可用|
|type(string)|可选'danger'或'primary', 也可不传, 按钮样式改变|
|size(string)|可选'large', 'normal'与'small', 按钮大小改变|

 - checkbox

|params||
|:----|:----|
|active(bool)|传入true/false, true时为选中|

 - input

|params||
|:----|:----|
|icon(string)|icon图标, 可选'cellphone', 'lock', 'person', 'identity'四种|
|type(string)|可传入'select', 将input变为select|
|label(string)|label|
|labelSize(string)|可选'small', 'large'|
|placeholder(string)|placeholder|
|value(any)|组件v-model绑定的属性|
|selectOption(array)|当type为'select'时传入, 其中的元素有value与label两种属性|

 - message(在main.js中引入, 绑定在Vue原型上, 可传入字符串或{ message: 'xxx'}型的对象)
 - tabs(在路由的path中, params.tabName即为active的tab的name)
 - tabsView(为tabs中的slot)
 - upload

|params||
|:----|:----|
|value(array)|为v-model绑定的属性|
|uploadType(any)|传给后端的uploadType属性|
|uploadFileType(any)|传给后端的fileSuffixType属性|
|uploadId(string)|form的唯一标示(在一个页面使用多个该组件时使用, 传入不同值)|
|maxLength(number)|图片最大数量|
|annotation(string)|注释|
|multiple(bool)|是否支持多选图片|

### views

前端页面部分, 其中目录根据页面来划分. login, mall, system为用户端页面, manageSystem为管理端页面.

#### manageSystem - main.js

在该main.js中, 为请求添加了拦截器, 以一个变量loading作计数器, 请求开始时+1, 请求结束时-1, 当没有请求后全局loading消失. 对请求返回的response进行全局拦截, 返回错误码有误时弹框提示. 获取用户信息后根据返回的权限与路由meta进行匹配, 无权限泽跳转回首页. 自定义指令permit, 传入一个权限码number, 如用户无此权限则移除此dom.

#### manageSystem - routers.js

系统的路由配置. 其中的meta存放的是该页面所需的权限码. 0为所有人都可查看, -1为超级管理员专用, -9为不开放, 其余对应各个权限码.

在routers.js中修改了权限之后, 如有需要则要在contains - system.vue中修改侧边栏菜单的权限, 以免出现路由可用可是侧边栏菜单不可见的情况. 同样如有需要, 需将相关路由组件中相关权限元素进行v-permit的重新配置.
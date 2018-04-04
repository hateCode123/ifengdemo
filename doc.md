# test_content 脚手架后端说明文档
    旨在优化脚手架项目结构，提高开发效率，如果您发现项目中有错误或者不合理的地方，请及时提出！确保脚手架项目越来越稳定！

## 目录结构

/bin 存放开发环境启动脚本
/biz 后端接口主目录
/biz/common 后端公共文件，例如：redis，logger，http，validate 等公共模块
/biz/configs 后端配置文件
/biz/controllers 后端路由模块，所有的路由都在controller中，业务开发人员主要在该目录实现功能，获取数据，加工数据，响应数据
/biz/services 数据服务，所有的数据库操作，rpc调用，http请求发送，等等功能，原则上都必须services中
/biz/providers 包含rpc调用类，以后如果有新的rpc类，或者sql类也放到该文件中
/biz/app.js 后端项目入口文件
/biz/router.js 后端路由模块

## 常用命令
本地开发：`npm run dev`
本地预览：`npm run pre`
预发布环境：`node ./biz/app.js`
生产环境：`node ./biz/app.js`
注意预发布和生产环境，如果采用pm2或者其他守护进程启动项目需要设置相关环境的环境变量
单元测试：`npm run test`
上传cdn：`npm run uploadcdn key1 key2`

## controllers使用说明

####Usage

	const Joi = require('joi');
	const {validate} = require('../../common/validate');
	const redis = require('../../common/redis');   //导入reids
	const logger = require('../../common/logger'); //导入日志模块

	const schema = Joi.object().keys({
	    username: Joi.string().alphanum().min(3).max(30).required(),
	});

	// joi 中间件使用demo1
	exports.joi = {
	    path: '/joi',
	    method: 'get|post', //大小写都支持
	    type:'html',
	    schema:schema,
	    cache:10,
	    handler: async (ctx) => {
		    logger.debug(ctx.query);
	        ctx.json({name: 'ifeng', desc: '666'});
	    }
	};
####Options
| 参数      |    类型| 说明 |是否必传|
| :-------- | --------:| :--: |
| path	| String| http请求路径   | 是|
| method| String| http请求方法，不区分大小写，default:"get\|post",同时支持get和post方法；get请求设置get，post请求设置为post|否|
| type	| String| 请求类型，目前支持html，json两种|否|
| schema| Object| joi对象，接口需要对参数验证时使用|否|
| edit| Boolean| 页面是否可编辑，当原路由为 /demo/:id 时，并且 edit参数为true时，会自动添加/demo/:id/edit路由,模板文件名称后面会自动添加 '_edit'|否|
| cache| Number| 接口缓存时间，单位s；如果该值大于0，下次请求进入后会首先检查redis缓存，如果有直接返回，如果没有则调用handler来生产数据并返回|否|
| handler| Function|async 函数，业务开发人员在handler方法中处理业务并返回，目前支持ctx.html('模板名称'，json数据)，ctx.json(),ctx.body()|是|

####handler返回说明
#####ctx.html(tplName，data)：
tplName：模板名称
data：模板数据，数据类型：json
使用实例

		await ctx.html('index', {name:'zhangsan',age:25})

#####ctx.json(status，message，data)：
status：default 0 表示响应成功，如果status>0,表示服务器响应异常，响应码前后端共同来约定
message：default '成功'，响应描述
data：任意数据，表示服务器响应数据
使用实例

		ctx.json(0,'success')
		//结果：{"status": 0,"message": "success"}

		ctx.json(1,'something wroung')
		//结果：{"status":1,"message":"something wroung"}

		ctx.json(0,'success',{name:"zhangshan",age:25})
		//结果：{"status":0,"message":"success","data":{"name":"zhangshan","age":25}}

		//省略前两个参数，只传一个参数，status:默认值为0，message：默认值为 '成功'
		ctx.json({name:"zhangshan",age:25})
		//结果：{"status":0,"message":"成功","data":{"name":"zhangshan","age":26}}


#####ctx.body 该方法为koa原始响应方法，当有ctx.html 和 ctx.json无法满足需求时，可以使用该方法，例如响应一段自定义的文本，json，或者响应一个文件流，该方法只能调用一次，调用第二次会报错：
使用实例

		 // 响应一段文本
		 ctx.body = "today is a goood day";

		 // 响应一个json数据
		 ctx.body = {name:"zhangsan",age:25};

		 // 响应一个流文件
		 ctx.body = fs.createReadStream('input.txt');
		 ctx.body = request("https://www.ifeng.com");

		 //响应一个html
		 ctx.type = "text/html";
		 ctx.body = `
		 <html>
		 <head></head>
		 <body>
			<h1>today is a goood day</1>
		 </body>
		 </html>
		 `;



## services使用说明
	services 目录存放数据获取方法，例如，rpc调用，数据库查询，http请求数据等等，
	当controllers中需要获取数据时，最好调用services中的方法，
	services中的方法封装尽可能小，方便重用，数据处理逻辑最好放在controllers中来实现。
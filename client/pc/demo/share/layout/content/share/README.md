# 转发组件

```jsx
// 使用方法

import Share from '[your components dir]/share';

...

render() {
	const shareInfo = {
		url: 'https://feng.ifeng.com/c/7j0IEJyUsOM',
		picUrl:
			'https://d.ifengimg.com/w145_h80_q70/e0.ifengimg.com/11/2018/1228/41334D757F5A783FA8994DB818C5A9526915B376_size132_w1080_h662.jpeg',
		title: '无核化还没谈好，朝韩迫不及待联通半岛铁路线',
		summery: '',
	};

	return (
		...
		<Share shareInfo={shareInfo} />
		...
	);
    }
```

### API:

-   `shareInfo` ------------------ `[object]` 分享的内容，如下 - `url` ------------------ `string` 文章地址 - `picUrl` ------------------ `string` 缩略图地址 - `title` ------------------ `string` 转发内容标题 - `summery` ------------------ `string` 转发内容标题简介

# 表格组件

### API:

-   columns ---------------- `[array]` `[isRequired]` 表格列配置
    -   column : `[object]` columns 的每一项，有以下参数
        -   title ---------------- `[string]` `[isRequired]` 列标题
        -   dataIndex ---------------- `[string]` `[isRequired]` 列数据在数据项中对应的 key
        -   width ---------------- `[number]` 当列的宽度
        -   render ---------------- `[function]` 生成复杂数据的渲染函数，参数分别为当前列目标单元格的值，当前行所有数据，当前行索引 `Function(text, record, index) {}`
-   dataSource ---------------- `[array]` `[isRequired]` 表格数据数组
-   emptyText ---------------- `[string]` 当 dataSource 为空时，显示的文本内容

### 使用

```jsx
import Table from './table';

...

const list = [{ NO1: 1, NO2: 2, NO3: 3 }, { NO1: 4, NO2: 5, NO3: 6 }];

const column = [
	{
		title: 'No.1',
		width: 100,
		dataIndex: 'NO1', // 列数据在数据项中对应的 key
	},
	{
		title: 'No.2',
		dataIndex: 'NO2',
		render: (text, record, index) => {
			return <div style={{ color: 'red' }}>{record.NO2}</div>;
	},
	},
	{
		title: 'No.3',
		dataIndex: 'NO3',
		render: (text, record) => {
			return (
			<button
				onClick={() => {
				console.log(text);
				console.log(record);
				}}>
				按钮
			</button>
			);
		},
	},
	{ // 可以加入自定义的列，不依赖dataSource渲染，不与dataSource中的值对应
		title: 'No.4',
		dataIndex: 'NO4',
		render: (text, record) => {
			return (
			<button
				onClick={() => {
				console.log(text);
				console.log(record);
				}}>
				按钮
			</button>
			);
		},
	},
];

...

 <Table dataSource={list} columns={column} emptyText={'暂无数据哦'} />
```

# 翻页组件

### 使用

```jsx
import Pagination from '[your components dir]/pagination';

...

handleChangePage(obj) {
    console.log(obj);
}

...

// 基础用法
<Pagination total={150} pageSize={20} onChange={this.handleChangePage} />

// 指定当前页、跳页功能
<Pagination showQuickJumper current={6} total={150} pageSize={10} onChange={this.handleChangePage} />

// 简洁模式
<Pagination
    current={10}
    total={150}
    type={'simple'}
    pageSize={10}
    onChange={this.handleChangePage}
    showQuickJumper
/>
```

### API：

-   total ------------ `[number]` `[isRequired]`,总条数
-   pageSize ------------ `[number]`,每页条数,默认 20
-   onChange ------------ `[function]` `[isRequired]`,点击跳页的回调，接受一个默认参数对象（分页数据）:
    -   pageSize ------------ `[number]` 每页条数
    -   pageNumber ------------ `[number]` 当前页码
-   type ------------ `[string]` 翻页组件的样式 `normal || simple`，默认`normal`
-   showQuickJumper ------------ `[bool]` 是否显示跳页，默认`false`
-   current ------------ `[number]` 指定当前页

2018/12/28 caoyuan1

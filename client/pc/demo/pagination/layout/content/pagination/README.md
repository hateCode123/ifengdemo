翻页组件

API：

-   total ------------ `[number]` `[isRequired]`,总条数
-   pageSize ------------ `[number]`,每页条数,默认 20
-   onChange ------------ `[function]` `[isRequired]`,点击跳页的回调，接受一个默认参数对象（分页数据）:
    -   pageSize ------------ `[number]` 每页条数
    -   pageNumber ------------ `[number]` 当前页码
-   type ------------ `[string]` 翻页组件的样式 `normal || simple`，默认`normal`

2018/12/25 caoyuan1

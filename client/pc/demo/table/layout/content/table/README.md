# 表格组件

### API:

-   columns ---------------- `[array]` `[isRequired]` 表格列配置
    -   column : `[object]` columns 的每一项，有以下参数
        -   title ---------------- `[string]` `[isRequired]` 列标题
        -   dataIndex ---------------- `[string]` `[isRequired]` 列数据在数据项中对应的 key
        -   width ---------------- `[number]` 当列的宽度
        -   render ---------------- `[function]` 生成复杂数据的渲染函数，参数分别为当前列目标单元格的值，当前行所有数据，当前行索引 `Function(text, record, index) {}`
-   dataSource ---------------- `[array]` `[isRequired]` 表格数据数组

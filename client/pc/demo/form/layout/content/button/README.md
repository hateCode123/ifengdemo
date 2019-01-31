# button 按钮

## 使用

```jsx
<Button
    type={'confirm'}
    onClick={() => {
        console.log('kkk');
    }}
    disabled
    innerText={'修改信息'}
/>
```

## API

-   `innerText` ----------- 按钮文本
-   `type` ----------- 按钮类型 `normal` || `confirm`, 默认 normal 可不写
-   `configClass` ----------- 自定义类名
-   `onClick` ----------- 点击事件
-   `disabled` ----------- 是否禁用，`true`禁用 || `false`

# 输入框组件

## 使用

```jsx
<TextArea
    placeholder={'1-12 个汉字，请勿使用包含特殊符号或含有明显营销推广意图的媒体名'}
    style={{ width: '478px' }}
    onChange={val => {
        console.log(val);
    }}
    configClass={styles.input}
/>
```

## API

-   `placeholder` ----------- 占位文本
-   `onChange` ----------- 内容变化的回调
-   `value` ----------- 设置输入框的内容
-   `style` ----------- 样式对象
-   `configClass` ----------- 传入类名，自定义样式

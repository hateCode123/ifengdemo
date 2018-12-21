弹窗组件

```
使用
import Modal from '[your components' dir]/modal/index';
```

API:

-   isOpen ---------------- `[bool]` `[isRequired]` : 弹窗是否可见
-   title ---------------- `[string]` `[isRequired]` : 弹窗标题
-   children ---------------- `[string]/[element]` `[isRequired]` : 自定义弹窗内容
-   className ---------------- `[string]` : 给最外层容器添加类名 (万一有用呢)
-   okText ---------------- `[string]` : 确定按钮文本内容
-   cancelText ---------------- `[string]` : 取消按钮文本内容
-   onOk ---------------- `[function]` : 确定按钮回调
-   onCancel ---------------- `[function]` :  取消按钮回调
-   maskClosable ---------------- `[bool]` : 允许点击遮罩层关闭弹窗，默认为 true
-   modalWith ---------------- `[number]` : 弹窗宽度，默认 400px
-   footer ---------------- `[bool]` : 是否显示弹窗底部按钮组，默认显示

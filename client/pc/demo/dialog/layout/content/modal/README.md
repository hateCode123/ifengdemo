# 弹窗组件

### 一、基本使用 

```
import Modal from '[your components' dir]/modal/index';

...

<Modal
    isOpen={this.state.modal}
    title={'错误提示'}
    onOk={this.handleOk.bind(this)}
    onCancel={this.handleCancel.bind(this)}
    onClose={() => {
        this.handleClose();
    }}
    footer={true}
>
    {children}
</Modal>
```

API:

-   isOpen ---------------- `[bool]` `[isRequired]` : 弹窗是否可见
-   title ---------------- `[string]` `[isRequired]` : 弹窗标题
-   children ---------------- `[string]/[element]` : 自定义弹窗内容
-   className ---------------- `[string]` : 给最外层容器添加类名 (万一有用呢)
-   okText ---------------- `[string]` : 确定按钮文本内容
-   cancelText ---------------- `[string]` : 取消按钮文本内容
-   onOk ---------------- `[function]` : 确定按钮回调
-   onCancel ---------------- `[function]` :  取消按钮回调
-   onClose ---------------- `[function]` : 弹窗关闭的回调，使用`onClose={() => {this.handleClose();}}`的方式
-   maskClosable ---------------- `[bool]` : 允许点击遮罩层关闭弹窗，默认为 true
-   modalWith ---------------- `[number]` : 弹窗宽度，默认 400px
-   footer ---------------- `[bool]` : 是否显示弹窗底部按钮组，默认显示

### 二、特殊用法

```
import Modal from '[your components' dir]/modal/dialog';

...

// 可以在方法中调用
<button
    onClick={() =>
        Modal.dailog({
            title: 'Demo',
            content: 'Hello world!',
            okText: '确认',
            cancelText: '取消',
            onOk: () => console.log('ok'),
            onCancel: () => console.log('cancel'),
            onClose: () => console.log('closed'),
        })
    }>
    click me!
</button>
```

params: object 类型

-   isOpen ---------------- `[bool]` `[isRequired]` : 弹窗是否可见
-   title ---------------- `[string]` `[isRequired]` : 弹窗标题
-   content ---------------- `[string]/[element]` : 自定义弹窗内容
-   className ---------------- `[string]` : 给最外层容器添加类名 (万一有用呢)
-   okText ---------------- `[string]` : 确定按钮文本内容
-   cancelText ---------------- `[string]` : 取消按钮文本内容
-   onOk ---------------- `[function]` : 确定按钮回调
-   onCancel ---------------- `[function]` :  取消按钮回调
-   onClose ---------------- `[function]` : 弹窗关闭的回调
-   maskClosable ---------------- `[bool]` : 允许点击遮罩层关闭弹窗，默认为 true
-   dialogModalWith ---------------- `[number]` : 弹窗宽度，默认 300px
-   footer ---------------- `[bool]` : 是否显示弹窗底部按钮组，默认显示

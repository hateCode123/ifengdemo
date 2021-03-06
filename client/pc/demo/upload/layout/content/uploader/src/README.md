# 上传文件

## 使用

```jsx
import uploader from './src/index';

...

handleFileChange = e => {
    const files = e.target.files;

    if (files) {
        const options = {
            type: 0, // 0 视频 1 图片 2 普通文件
            appid: 'wemedia',
            onBeforeUpload: file => {
                console.log('上传之前');
            },
            progressCallback: (percentage, file) => {
                console.log(percentage);
            },
            successCallback: (url, file) => {
                console.log('上传完成');
                console.log(url);
            },
            errorCallback: (errors) => {
                console.log(errors);
            },
            abortUpload: () => {
                console.log('停止');
            }
        };
        uploader(files, options);
    } else {
        return;
    }

};
handleAbort () {
    if(window.ResumeUpload) window.ResumeUpload.abortUpload();
}
...

<input
    type="file"
    ref="upload"
    onChange={this.handleFileChange.bind(this)}
    title="选择文件"
/>
<button onClick={this.handleAbort.bind(this)}></button>
```

## API

-   `files`:
    -   HTML5 的文件对象: `<input type="file">`的文件对象。参考`https://blog.csdn.net/lianzhang861/article/details/80283120`。可以在 onChange 事件中获取，如上例所示
-   `options`: `Object`
    -   `type`: `Number` 上传文件的业务类型: 0 视频 1 图片 2 普通文件。
    -   `appid`: `String` 上传服务为了区分上传请求的来源，会为每一个使用上传服务的业务系统分配一个标识 appId。业务系统在进行上传操作时，需要将`appId`一并传给上传服务。
    -   `onBeforeUpload`: `Function` 上传之前的操作回调。返回一个参数，当前文件对象
    -   `progressCallback`: `Function` 上传进度的回调。返回参数: (`percentage`: 上传进度, `file`: 当前文件对象, `index`: 当前文件的索引 )
    -   `successCallback`: `Function` 上传成功的回调。返回参数: (`url`: 上传完成后文件可访问路径。当文件尚未上传完或者未合并完，该项为 null, `file`: 当前文件对象， `index`: 当前文件的索引)
    -   `errorCallback`: `Function` 上传出错的回调。返回参数: (`errors`: 上传过程中出错调用, `file`: 当前文件对象, `index`: 当前文件的索引)，返回错误状态如下
    -   `abortUpload`: `Function` 上传终止的回调

## 终止上传

触发上传后有一个全局的 ResumeUpload

```jsx
if (window.ResumeUpload) window.ResumeUpload.abortUpload();
```

## 错误提示

```js
{
    status: 40001,
    msg: '请选择正确的格式'
}
{
    status: 40002,
    msg: '上传文件请小于1000M，超出请下载客户端'
}
{
    status: 40003,
    msg: '图片不能大于5M,请重新选择'
}

{
    status: 50001,
    msg: '校验文件失败'
}
{
    status: 50002,
    msg: '文件上传失败'
}
{
    status: 50003,
    msg: '文件信息查询失败'
}
```

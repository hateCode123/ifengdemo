# 上传文件

## 使用

## 一、常规使用

```jsx
import Uploader from '[your components dir]/uploader';

...

render() {
    const config = {
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
        errorCallback: errors => {
            console.log(errors);
        },
    };

    return (
        <React.Fragment>
            <Uploader config={config} style={{ width: '100px' }}>
                <div className={styles.children} style={{ width: '100px', height: '100px', background: '#ccc' }}>点击上传</div>
            </Uploader>
        </React.Fragment>
    );
}
```

### 二、动态调用(推荐)

```jsx
import Upload from '[your components dir]/uploader/upload';

<button
    onClick={() =>
        Upload.start({
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
            errorCallback: errors => {
                console.log(errors);
            },
            abortUpload: () => {
                console.log('停止了');
            }
        })
    }>
    上传
</button>
<button
    onClick={() => {
        Upload.stop();
    }}>
    停止
</button>
```

## API

### Upload.start(opitons）: 开始上传

-   ### `options` : `Object`

    | 参数名           | 类型     | 描述                                                                                                                                                                         |
    | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | type             | Numbber  | 上传文件的业务类型: 0 视频 1 图片 2 普通文件，默认 0。                                                                                                                       |
    | appid            | String   | 上传服务为了区分上传请求的来源，会为每一个使用上传服务的业务系统分配一个标识 appId。业务系统在进行上传操作时，需要将`appId`一并传给上传服务。大风号 pc 端项目默认为`wemedia` |
    | onBeforeUpload   | Function | 上传之前的操作回调。返回一个参数，当前文件对象                                                                                                                               |
    | progressCallback | Function | 上传进度的回调。返回参数: (`percentage`: 上传进度, `file`: 当前文件对象)                                                                                                     |
    | successCallback  | Function | 上传成功的回调。返回参数: (`url`: 上传完成后文件可访问路径。当文件尚未上传完或者未合并完，该项为 null, `file`: 当前文件对象)                                                 |
    | errorCallback    | Function | 上传出错的回调。返回参数: (`errors`: 上传过程中出错调用)，返回错误状态如下<a href="#errorTips">错误提示</a>                                                                  |
    | abortUpload      | Function | 上传终止的回调。                                                                                                                                                             |

### Upload.stop() : 终止上传

## 多文件上传

-   `options`: `Object`

    | 参数名           | 类型     | 描述                                                                                                                                                                         |
    | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | type             | Number   | 上传文件的业务类型: 0 视频 1 图片 2 普通文件，默认 0。                                                                                                                       |
    | multiple         | Bool     | 默认 false，true 开启多文件上传模式                                                                                                                                          |
    | appid            | String   | 上传服务为了区分上传请求的来源，会为每一个使用上传服务的业务系统分配一个标识 appId。业务系统在进行上传操作时，需要将`appId`一并传给上传服务。大风号 pc 端项目默认为`wemedia` |
    | getFileList      | Function | 在上传之前获取文件列表，返回文件信息数组，在上传实例创建之前                                                                                                                 |
    | onBeforeUpload   | Function | 上传之前的操作回调。返回参数: (`file`: 当前文件对象, `index`: 当前文件的索引)                                                                                                |
    | progressCallback | Function | 上传进度的回调。返回参数: (`percentage`: 上传进度, `file`: 当前文件对象, `index`: 当前文件的索引)                                                                            |
    | successCallback  | Function | 上传成功的回调。返回参数: (`url`: 上传完成后文件可访问路径。当文件尚未上传完或者未合并完，该项为 null， `file`: 当前文件对象, `index`: 当前文件的索引)                       |
    | errorCallback    | Function | 上传出错的回调。返回参数: (`errors`: 上传过程中出错调用, `file`: 当前文件对象, `index`: 当前文件的索引)，返回错误状态如下<a href="#errorTips">错误提示</a>                   |

## <a name="errorTips">错误提示</a>

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

对已上传完毕的图片重新裁剪并上传的对策

项目中有需求对已经上传 cdn 的图片进行裁剪并重新上传。我们当前可以拿到的只有一个上传完的图片的 cdn 地址，如何将它转化为可以直接走已有上传流程的 file 对象

裁图组件：使用的是 react-cropper，它可以直接接收 url 格式的图片，进行裁剪并返回 dataURL 格式的字符串

转化 dataURL 为 file 对象：要上传文件我们需要拿到文件的 file 对象

```jsx
// 转化dataURL为file对象
dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','); // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了

    let mime = arr[0].match(/:(.*?);/)[1]; // 截取image/png，即文件格式
    let bstr = atob(arr[1]); // 对用base-64编码过的字符串进行解码
    let n = bstr.length;
     // 转化Uint8Array
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
```

通过以上方法可以将 dataURL 转化为 file 对象

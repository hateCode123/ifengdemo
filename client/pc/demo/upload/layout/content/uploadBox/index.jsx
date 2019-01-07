import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import epimg from './tx_ys.png';
import SparkMD5 from 'spark-md5';
import { request } from 'https';
// import { request } from '../../../utils/request';
import hex_sha1 from './sha';
/**
 * for this page
 */

class UplodBox extends React.PureComponent {
    state = {
        selectedImageFile: '',
        src: '',
        errorTipShow: false,
        errorMsg: '',
        uploaded: false,
        uploading: false,
        uploadPercent: 0,
    };

    static propTypes = {
        type: PropTypes.number,
        onChange: PropTypes.func,
    };

    handleFileChange = e => {
        const file = e.target.files[0];

        console.log(file);

        if (file) {
            const MAX_FILE_SIZE = 52428800;
            // const MAX_FILE_SIZE = 20000

            if (file.size <= MAX_FILE_SIZE) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);

                let img = '';

                fileReader.onload = e => {
                    img = e.target.result;
                    this.setState(
                        {
                            selectedImageFile: file,
                            src: img,
                        },
                        () => {
                            this.preview(this.state.src);
                            this.onChangeHandle();
                            // this.errorTip('上传失败');
                        },
                    );
                };
            } else {
                console.error('文件过大');
                this.errorTip('文件过大');
            }
        }

        e.target.value = '';
    };

    _handleFileChange = e => {
        const file = e.target.files[0];

        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        // 切片每次1m
        let chunkSize = 1024 * 1024 * 1;
        let chunks = Math.ceil(file.size / chunkSize);
        // 当前上传的chunk
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        // 对arrayBuffer数据进行md5加密，产生一个md5字符串
        let totalFileReader = new FileReader(); // 用于计算出总文件的fileMd5
        let chunkFileReader = new FileReader(); // 用于计算出每个chunkMd5
        let fileReader = new FileReader();

        if (!fileReader.readAsBinaryString) {
            alert('上传失败，浏览器版本过低，请更换浏览器再试');
            console.log('the browser is too old!');

            return;
        }
        let params = { chunks: [], file: {} }; // 用于上传所有分片的md5信息
        let binaryStringData = []; // 用于存储每个chunk的分片信息对象,用于分片上传使用
        const loadNext = () => {
            let start = currentChunk * chunkSize;
            let end = start + chunkSize >= file.size ? file.size : start + chunkSize;

            chunkFileReader.readAsBinaryString(blobSlice.call(file, start, end));
        };

        params.file.fileName = file.name;
        params.file.fileSize = file.size;

        totalFileReader.readAsBinaryString(file); // 计算总文件的MD5
        totalFileReader.onload = e => {
            // 对整个totalFile生成md5
            // console.log('1111');
            spark.append(e.target.result);
            params.file.fileMd5 = spark.end(); // 计算整个文件的fileMd5
            // 原来的项目里面用的是sha1校验，这个要跟后台协调
            // this.fileId = hex_sha1(this.sid+this.appid+this.checksum)+'_'+this.blockCount; 原站的fileId
            const fileId = hex_sha1(e.target.result);

            console.log(fileId);
            params.file.fileId = fileId;
        };

        chunkFileReader.onload = e => {
            // console.log('2222');
            spark.append(e.target.result);
            const blockId = hex_sha1(e.target.result + this.toByte(chunkSize));
            const obj = {
                chunk: currentChunk + 1,
                start: currentChunk * chunkSize, // 计算分片的起始位置
                end:
                    currentChunk * chunkSize + chunkSize >= file.size
                        ? file.size
                        : currentChunk * chunkSize + chunkSize, // 计算分片的结束位置
                chunkMd5: spark.end(),
                blockId,
                chunks,
            };

            // console.log(obj);

            // 每一次分片onload,currentChunk都需要增加，以便来计算分片的次数
            currentChunk++;
            params.chunks.push(obj);
            // 将每一块分片的arrayBuffer存储起来，用来partUpload
            let tmp = {
                chunk: obj.chunk,
                curBinaryString: e.target.result,
            };

            binaryStringData.push(tmp);

            if (currentChunk < chunks) {
                // 当前切片总数没有达到总数时
                loadNext();

                // 计算预处理进度
                this.setState({
                    preUploading: true,
                    preUploadPercent: Number(((currentChunk / chunks) * 100).toFixed(2)),
                });
            } else {
                // 记录所有chunks的长度
                params.file.fileChunks = params.chunks.length;
                // 表示预处理结束，将上传的参数，arrayBuffer的数据存储起来
                this.setState(
                    {
                        preUploading: false,
                        uploadParams: params,
                        binaryStringData,
                        chunksSize: chunks,
                        preUploadPercent: 100,
                    },
                    () => {
                        this.checkChunks(params);
                    },
                );
            }
        };

        fileReader.onerror = () => {
            console.warn('oops, something went wrong.');
        };

        loadNext();

        // 只允许一份文件上传
        this.setState({
            fileList: [file],
            file,
        });
        // console.log(params);

        return false;
    };

    checkChunks = async params => {
        // const res = await request();
        const res = await {};

        console.log(params);

        // 实现断点续传，将未上传的部分过滤出来
        // let uploadList = res.body.Chunks.filter(value => {
        //     return value.status === 'Pending';
        // });

        // 下面都还是模拟的数据

        let uploadList = params.chunks;
        let fileInfo = params.file;

        let currentChunks = uploadList.length; // 这里应该是从接口获取，已上传成功的碎片数

        let uploadPercent = Number(
            (((this.state.chunksSize - currentChunks) / this.state.chunksSize) * 100).toFixed(2),
        );

        this.setState({
            currentChunks,
            uploadPercent,
        });

        this.handlePartUpload(uploadList, fileInfo);
    };

    toByte(origin) {
        let n = Number(origin);
        let n0 = 0;
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = (n >> 24) & 0xff;
        let n5 = (n >> 16) & 0xff;
        let n6 = (n >> 8) & 0xff;
        let n7 = (n >> 0) & 0xff;

        n4 = this.toSignInt(n4);
        n5 = this.toSignInt(n5);
        n6 = this.toSignInt(n6);
        n7 = this.toSignInt(n7);
        let ascString =
            String.fromCharCode(n0) +
            String.fromCharCode(n1) +
            String.fromCharCode(n2) +
            String.fromCharCode(n3) +
            String.fromCharCode(n4) +
            String.fromCharCode(n5) +
            String.fromCharCode(n6) +
            String.fromCharCode(n7);

        return ascString;
    }
    toSignInt(num) {
        let newnum = '';

        if (num > 127) {
            newnum = num - 128 * 2;
        }

        return newnum;
    }

    handlePartUpload = (uploadList, fileInfo) => {
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const batchSize = 4; // 采用分治思想，每批上传的片数，越大越卡
        const total = uploadList.length; // 获得分片的总数
        const batchCount = total / batchSize; // 需要批量处理多少次
        let batchDone = 0; // 已经完成的批处理个数
        let { fileChunks, fileMd5, fileName, fileSize, fileId } = fileInfo;

        /* eslint-disable */
        // 剪切chunks，每次分批上传
        const doBatchAppend = () => {
            if (batchDone < batchCount) {
                // console.log(batchSize * batchDone, batchSize * (batchDone + 1));
                // 每次剪切两个上传
                let list = uploadList.slice(batchSize * batchDone, batchSize * (batchDone + 1));

                setTimeout(() => silcePart(list), 1000);
            }
        };
        /* eslint-enable */

        doBatchAppend();
        const silcePart = list => {
            batchDone += 1;
            doBatchAppend();
            list.forEach(value => {
                let { fileMd5, chunkMd5, chunk, start, end, blockId } = value;
                let formData = new FormData();
                let blob = new Blob([this.state.binaryStringData[chunk - 1].curBinaryString], {
                    type: 'application/octet-stream',
                });

                // console.log(blob);

                /** 原站接口传了这些参数
                 * currentBlockId = hex_sha1(e.target.result + _this.toByte(blockSize));
                 * fd.append('fileId', oParam.fileId);
                 * fd.append('appId', oParam.appId);
                 * fd.append('blockIndex', index);
                 * fd.append('bizId', oParam.bizId || new Date().getTime());
                 * if (oParam.successCb) fd.append('successCb', oParam.successCb);
                 * fd.append('blockId', currentBlockId);
                 * fd.append('blockCount', oParam.blockCount);
                 * fd.append('blockContent', _this.getBlob(begin, end), oParam.fileName);
                 */

                formData.append('fileId', fileMd5); // 这个文件的加密id，原站用的sha1
                formData.append('appId', 'wemedia'); // appId不知道干吗用的
                formData.append('blockIndex', chunk); // 当前分片的索引
                // bizId,原站是从'http://ugc.ifeng.com/index.php/user/getid'获取的
                formData.append('bizId', new Date().getTime());
                // successCb,原站是从'http://ugc.ifeng.com/index.php/user/getid'获取的
                // if (successCb) formData.append('successCb', successCb);
                formData.append('blockId', chunkMd5); // 分片文件的MD5,原站用的sha1
                formData.append('blockCount', fileChunks); // 总的分片数
                formData.append('blockContent', this.state.binaryStringData[chunk - 1].curBinaryString, fileName); // 分片的内容

                console.log(formData);

                // 这里应该post上传

                // 模拟上传进度
                // const res = '200';

                const res = {
                    status: '200',
                };

                if (res.status === '200') {
                    let currentChunks = this.state.currentChunks;

                    --currentChunks;
                    // 计算上传进度
                    let uploadPercent = Number(
                        (((this.state.chunksSize - currentChunks) / this.state.chunksSize) * 100).toFixed(2),
                    );

                    console.log(uploadPercent);

                    if (uploadPercent === 100) {
                        console.log(this.state);
                    }

                    this.setState({
                        currentChunks, // 同步当前所需上传的chunks
                        uploadPercent,
                        uploading: true,
                    });
                }
            });
        };
    };

    preview = src => {
        // console.log(src);
        this.refs.uploader.style.background = `url(${src}) no-repeat center center`;
        this.refs.uploader.style.backgroundSize = '120px 120px';
    };

    errorTip = error => {
        if (error) {
            this.setState({
                errorTipShow: true,
                errorMsg: error,
            });
        }
    };

    onChangeHandle = src => {
        const { onChange } = this.props;

        if (onChange) {
            const formValue = epimg;

            onChange(formValue);
        }
    };

    stopDefault = e => {
        if (e & e.preventDefault) {
            e.preventDefault();
        }
    };

    render() {
        // console.log(this.props);
        const { type } = this.props;

        /**
         * 组件分发数据
         */

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.uploadWrap}>
                        <div ref="uploader" className={style.uploadContainer}>
                            <input
                                type="file"
                                // accept="image/jpeg,image/jpg,image/png"
                                onChange={this._handleFileChange.bind(this)}
                                title="选择文件"
                            />
                        </div>
                    </div>
                    {/* {tip(type)} */}
                    {/* {document.write(this.state.uploadParams)} */}
                    <div className="clearfix">
                        <div className={style.uploadPercentWrap}>
                            <div
                                className={style.uploadPercentInner}
                                style={{ width: `${this.state.uploadPercent}%` }}
                            />
                        </div>
                        {`${this.state.uploadPercent}%`}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UplodBox);

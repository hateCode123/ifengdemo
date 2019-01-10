import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import uploader from './src/index';
/**
 * for this page
 */

class Upload extends React.PureComponent {
    state = {};

    static propTypes = {
        config: PropTypes.object,
        className: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        style: PropTypes.object,
        title: PropTypes.string,
    };

    static defaultProps = {
        title: '请选择文件',
    };

    _handleFileChange = e => {
        const files = e.target.files;
        const { config } = this.props;

        console.log(files);

        if (files) {
            const options = {
                type: config.type,
                appid: config.appid,
                onBeforeUpload: config.onBeforeUpload,
                progressCallback: config.progressCallback,
                successCallback: config.successCallback,
                errorCallback: config.errorCallback,
            };

            uploader(files, options);
        } else {
            return;
        }
    };

    stopDefault = e => {
        if (e & e.preventDefault) {
            e.preventDefault();
        }
    };

    handleClick() {
        document.getElementById('uploader').click();
    }

    render() {
        /**
         * 组件分发数据
         */
        const { className, children, style, title } = this.props;

        return (
            <Fragment>
                <div
                    className={styles.uploadContainer}
                    style={style}
                    onClick={this.handleClick.bind(this)}
                    title={title}>
                    <div>
                        <input
                            id={'uploader'}
                            type="file"
                            ref="upload"
                            // accept="image/jpeg,image/jpg,image/png"
                            onChange={this._handleFileChange.bind(this)}
                            title="选择文件"
                        />
                        {children}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(Upload);

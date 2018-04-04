import React from 'react';
import styles from './index.css';
import {loadScript} from '@ifeng/ui_base';

class Wexin extends React.Component {
    createMarkup = () => {
        return {
            __html: `<wb:follow-button
        uid="1988800805"
        style="margin-top: 30px; display: block;"
        type="red_2"
        width="130"
        height="24"
    />`,
        };
    };
    componentDidMount() {
        loadScript('http://tjs.sjs.sinajs.cn/open/api/js/wb.js')
    }
    render() {
        const { content } = this.props;
        return (
            <div className={styles.box}>
                <div className={styles.pic}>
                    <p>
                        <img src="http://y0.ifengimg.com/e01ed39fc2da5d4a/2013/1107/5a6db6a815d9f2c6243994a96e881605.jpg" />
                    </p>
                    <p className={styles.text}>凤凰财经官方微信</p>
                </div>
                <div className={styles.detail}>
                    <p>
                        <a href="http://weibo.com/financeifeng" target="_blank" title="凤凰财经">
                            凤凰财经
                        </a>
                    </p>
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </div>
        );
    }
}

export default Wexin;

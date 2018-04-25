import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Ad from '../../../../../components/ad/';
import LeftContent from './leftContent/';
import MiddleContent from './middleContent/';
import RightContent from './rightContent/';
import Info from './info/';

class Content extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.col}>
                <div className={styles.col_L}>
                    <LeftContent content={content.leftContent} />
                    <MiddleContent content={content.middleContent} />
                    <div className="clear" />
                    <div className={styles.ad}>
                        <Ad content={content.middleAd} styleName={styles.box} />
                    </div>
                    <Info content={content.info} />
                </div>
                <RightContent content={content.rightContent} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Content.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Content.defaultProps = {};

export { Content };
export default Content;

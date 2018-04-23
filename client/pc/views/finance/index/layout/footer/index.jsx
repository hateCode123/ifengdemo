import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import { Ad } from '../../components/ad/';

/**
 * 定义 Footer 组件
 */
class Footer extends React.PureComponent {
    /**
     * 插入 Cooperation html
     */
    createCooperation = () => {
        return { __html: this.props.content.cooperation };
    };

    /**
     * 插入 Footer html
     */
    createFooter = () => {
        return { __html: this.props.content.footer };
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const { cooperation, bottomAd } = content;

        const Cooperation = (
            <Chip
                key="cooperation"
                id="10015"
                type="static"
                title="底部合作链接"
                groupName="底部"
                content={cooperation}>
                <div dangerouslySetInnerHTML={this.createCooperation()} />
            </Chip>
        );

        const BottomAd = (
            <div key="bottomAd" className={styles.ad}>
                <Ad content={bottomAd} styleName={styles.box} />
            </div>
        );
        const Footer = (
            <div key="footer" className={styles.footer}>
                <div dangerouslySetInnerHTML={this.createFooter()} />
            </div>
        );

        return [Cooperation, BottomAd, Footer];
    }
}

/**
 * 定义组件属性类型
 * */
Footer.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Footer.defaultProps = {};

export { Footer };
export default Footer;

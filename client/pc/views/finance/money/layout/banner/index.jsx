import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import Chip from 'Chip';

class Logo extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    /**
     * 渲染组件
     */
    render() {
        return <div className={style.h_theLogo} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

Logo.propTypes = { content: PropTypes.string };

Logo.defaultProps = {};

class Banner extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className={style.h_searchDiv}>
                <Chip id="10128" type="static" title="logo" groupName="导航" content={content.banner}>
                    <Logo />
                </Chip>
                {/* todo 引入公用组件-搜索组件 */}
            </div>
        );
    }
}
/**
 * 定义组件属性类型
 * */
Banner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Banner.defaultProps = {};

export { Banner };
export default Banner;

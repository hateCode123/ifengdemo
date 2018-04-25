import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';

class CommonTitleMInner extends React.PureComponent {
    render() {
        const { content } = this.props;
        // {"title":"理财超市","url":"", "newOpen":true}

        return content.newOpen ? (
            <div className={style.title_02}>
                {content.url ? (
                    <a href={content.url} rel={rel} target="_blank">
                        {content.title}
                    </a>
                ) : (
                    <span>{content.title} </span>
                )}
            </div>
        ) : (
            <div className={style.title_02}>
                {content.url ? <a href={content.url}>{content.title}</a> : <span>{content.title} </span>}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CommonTitleMInner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
CommonTitleMInner.defaultProps = {};

class CommonTitleM extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <Chip id="10039" type="static" title="理财产品" groupName="首屏" content={content}>
                <CommonTitleMInner />
            </Chip>
        );
    }
}

/**
 * 定义组件属性类型
 * */
CommonTitleM.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
CommonTitleM.defaultProps = {};
export { CommonTitleM };
export default CommonTitleM;

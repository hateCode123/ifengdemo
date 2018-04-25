import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';

import CommonTitleM from './../commonTitleM/';
class MarketInner extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
MarketInner.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
MarketInner.defaultProps = {};

class Market extends React.PureComponent {
    render() {
        const { content, title } = this.props;

        return (
            <div className="bor w300 fl">
                <Chip id="10042" type="static" title="理财超市" groupName="首屏" content={title}>
                    <CommonTitleM />
                </Chip>
               
                <Chip id="10035" type="static" title="理财超市" groupName="首屏" content={content.content}>
                    <MarketInner />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Market.propTypes = { content: PropTypes.object, title: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Market.defaultProps = {};
export { Market };
export default Market;

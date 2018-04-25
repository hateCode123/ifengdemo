import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';

class TopLinkTableInner extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.caption01} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
TopLinkTableInner.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
TopLinkTableInner.defaultProps = {};

class TopLinkTable extends React.PureComponent {
    render() {
        
        const { content } = this.props;

        return (
            <Chip id="10029" type="static" title="理财产品" groupName="首屏" content={content.content}>
                <TopLinkTableInner />
            </Chip>
        );
    }
}

/**
 * 定义组件属性类型
 * */
TopLinkTable.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
TopLinkTable.defaultProps = {};
export { TopLinkTable };
export default TopLinkTable;

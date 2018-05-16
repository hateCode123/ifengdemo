import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

class PartnerList extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {

        return <ul className={style.list} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

/**
 * 定义组件属性类型
 * */
PartnerList.propTypes = { content: PropTypes.string };

/**
 * 定义组件默认属性
 * */
PartnerList.defaultProps = {};
export { PartnerList };
export default PartnerList;

import React from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import '../../reset.css';
import CommonTitleXL from './../commonTitleXL/';
import PartnerList from './../partnerList/';

class Partner extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className="w1000">
                <div className={style.hzhb}>
                    <CommonTitleXL config={{ img: 'bg03' }} content={content.partnerTitle} />

                    <PartnerList />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Partner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Partner.defaultProps = {};
export { Partner };
export default Partner;

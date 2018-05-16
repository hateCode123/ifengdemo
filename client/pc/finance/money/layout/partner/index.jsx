import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
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
                    <Chip
                        id="10046"
                        type="static"
                        title="合作伙伴title"
                        groupName="合作伙伴"
                        content={content.partnerTitle}>
                        <CommonTitleXL config={{ img: 'bg03' }} />
                    </Chip>
                    <Chip id="10123" type="static" title="合作伙伴" groupName="合作伙伴" content={content.partnerList}>
                        <PartnerList />
                    </Chip>
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

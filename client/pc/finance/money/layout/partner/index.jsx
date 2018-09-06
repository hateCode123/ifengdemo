import React from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';

import style from './style.css';
import '../../reset.css';
import CommonTitleXL from './../commonTitleXL/';
import PartnerList from './../partnerList/';

class Partner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };
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

export default errorBoundary(Partner);

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Slider from './slider';

class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };

    render() {
        const data = [
            {
                imgUrl:
                    'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20171024/16/wemedia/d08fc7c30a94344ed73d4b0812b37108f44d2717_size67_w750_h90.jpg',
                linkUrl: 'http://wemedia.ifeng.com/28835880/wemedia.shtml',
                position: 1,
            },
            {
                imgUrl:
                    'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20171024/16/wemedia/17da65eee6157ff9561d57c44dea15f2cb19d8bc_size57_w759_h90.jpg',
                linkUrl: 'http://wemedia.ifeng.com/28364778/wemedia.shtml',
                position: 2,
            },
        ];
        const config = {
            arrow: false,
            interval: 2000,
            direction: 'right',
            number: 2,
            imgWidth: 920,
            imgHeight: 100,
            dotsAction: 'click',
        };

        return (
            <React.Fragment>
                <div className={styles.slider}>
                    <Slider data={data} config={config} />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);

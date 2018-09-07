import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleL from './../commonTitleL/';
import Licaisudi from './../licaisudi/';
import HotFunds from '../hotfunds/';
import errorBoundary from '@ifeng/errorBoundary';

class Juejin extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div className={style.juej}>
                <CommonTitleL content={content.jingneijuejinTitle} />
                <div className="clearfix  pt20">
                    <HotFunds content={content} />
                    <Licaisudi
                        content={{
                            title: content.sudiTitle01,
                            content: content.sudiContent01,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default errorBoundary(Juejin);

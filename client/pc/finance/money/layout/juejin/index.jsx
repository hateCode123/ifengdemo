import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleL from './../commonTitleL/';
import Licaisudi from './../licaisudi/';
import HotFunds from '../hotfunds/';

class Juejin extends React.PureComponent {
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

/**
 * 定义组件属性类型
 * */
Juejin.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Juejin.defaultProps = {};

export { Juejin };
export default Juejin;

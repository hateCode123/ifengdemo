import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import Chip from 'Chip';
import Search from '../../../../components/search/';
import { rel } from '../../../../utils/rel';

class Banner extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className={style.h_searchDiv}>
                <div className={style.h_theLogo}>
                    <a href="http://finance.ifeng.com/stock/" target="_blank" rel={rel} title="理财首页">
                        <img
                            src="http://p3.ifengimg.com/37780e23b9ea2d8b/2017/38/logoMoney.png"
                            width="161"
                            height="27"
                            alt="凤凰网理财"
                        />
                    </a>
                    <img
                        src="http://y1.ifengimg.com/a/2014/0922/lc/images/l_18.png"
                        width="178"
                        height="30"
                        style={{ 'marginLeft': '15px' }}
                    />
                </div>
                <Search content={content.search} />
            </div>
        );
    }
}
/**
 * 定义组件属性类型
 * */
Banner.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Banner.defaultProps = {};

export { Banner };
export default Banner;

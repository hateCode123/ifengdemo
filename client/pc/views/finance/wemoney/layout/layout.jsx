import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import '../reset.css';
import styles from './layout.css';

import WemoneyNav from './wemoneyNav/';
import SimpleSlider from './slider/';
import HotNews from './hotNews/';
import AdAside  from './adAside/';
import NewsList from './newslist/';
import GoTop  from './goTop/';

/*
import Header from './components/header/';
import Footer from './components/footer/';
*/

class Layout extends React.PureComponent{
    /**
     * 渲染网页布局
     */

     render(){
        const { content } = this.props;
        console.log(content)

        return (
            <div>
                <div>公用头部导航</div>
                <WemoneyNav content={content.wemoneyNav} />
                
                <div className={styles.bodyCon +" "+ styles.clearfix}>
                    <div className={styles.bodyMes}>

                        <div className={styles.bodyLeftCon}>
                            <SimpleSlider content={content.wemoneyLunbo}/>
                            <NewsList content={content.wemoneyNewsFlow}/>
                        </div>


                        <div className={styles.bodyRightCon}>  
                            <HotNews content={content.wemoneyNewsRanking}/>
                            <AdAside content={content.wemoneyAdAside}/>
                        </div>

                    </div>
                </div>
                <div>底部版权</div>
                <GoTop />
                <ChipEdit />
            </div>
        )
     }
}

/**
 * 定义组件属性类型
 * */
Layout.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Layout.defaultProps = {};

export default Layout;
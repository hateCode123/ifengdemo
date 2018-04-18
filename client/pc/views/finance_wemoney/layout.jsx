import React from 'react';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import PropTypes from 'prop-types';
import './reset.css';
import styles from './layout.css';
/*
import Header from './components/header/';
*/
import WemoneyNav from './components/wemoneyNav/';
import Lunbo from './components/lunbo/';
import HotNews from './components/hotNews/';
/*
import News from './components/newslist/';
import AdAside  from './components/adAside/';
import TopButton  from './components/topButton/';
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
                <div className={styles.navCon} >
                    <WemoneyNav content={content.wemoneyNav} />
                </div>

                <div className={styles.bodyCon}>
                    <div className={styles.bodyMes}>
                        <div className={styles.bodyLeftCon}>
                            
                        </div>
                        <div className={styles.bodyRightCon}>
                            <div className={styles.onlineResolve}>
                                <HotNews content={content.wemoneyNewsRanking}/>
                            </div>
                        </div>
                    </div>
                </div>

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
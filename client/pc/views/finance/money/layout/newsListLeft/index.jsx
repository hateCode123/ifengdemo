import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../../utils/rel';

class NewsListLeft extends React.PureComponent {
    /**
     * 渲染组件
     */
    state = {
        showData: [],
    };
    componentDidMount() {
        this.randomShowData();
    }
    changeHandler = () => {
        this.randomShowData();
    };
    generateNewRandomNum = (length, RandomNumArr) => {
        let m = Math.floor(Math.random() * length);

        if (
            RandomNumArr.some(element => {
                return m === element;
            })
        ) {
            m = Math.floor(Math.random() * length);
            this.generateNewRandomNum(length, RandomNumArr);
        } else {
            RandomNumArr.push(m);
        }
    };
    randomShowData = () => {
        const { content } = this.props;
        const dataM = [];
        for (let i = 0; i < 14; i++) {
            this.generateNewRandomNum(content.length, dataM);
        }
        this.setState({
            showData: dataM.map(item => {
                return content[item];
            }),
        });
    };
    render() {
        const { showData } = this.state;
        const { content } = this.props;
        const list = showData =>
            showData.map((item, index) => {
                return (
                    <li key={index}>
                        <h3>
                            <a href={item.url} rel={rel}>
                                {item.title}
                            </a>
                        </h3>
                    </li>
                );
            });

        const topList = [...showData].filter((item, i) => i < 7);
        const bottomList = [...showData].filter((item, i) => i >= 7);

        const Arr = [topList, bottomList];

        const contentDom = Arr.map((item, i) => {
            return <ul key={i} className={style.box_02}>{list(item)}</ul>;
        });

        const changeBtn = () => {
            return content.length > 6 ? <div className={style.hyh} onClick={this.changeHandler} /> : '';
        };

        return (
            <div className={`${style.b_box} ${style.huh_box}`}>
                <div className={style.title}>
                    <a rel={rel} title="要闻">
                        要闻
                    </a>
                </div>
                {contentDom}
                {changeBtn()}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
NewsListLeft.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
NewsListLeft.defaultProps = {};

export { NewsListLeft };
export default NewsListLeft;

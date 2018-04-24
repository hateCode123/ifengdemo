import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../../utils/rel';

class newsListDownSlider extends React.PureComponent {
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
        for (let i = 0; i < 6; i++) {
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
        const list = showData.map((item, index) => {
            if (index % 3 === 0) {
                return (
                    <h2 key={index}>
                        <a href={item.url} rel={rel}>
                            {item.title}
                        </a>
                    </h2>
                );
            } else if (index % 3 === 1) {
                return (
                    <h3 key={index} className={style.box_01_1}>
                        <a href={item.url} rel={rel}>
                            {item.title}
                        </a>
                    </h3>
                );
            } else if (index % 3 === 2) {
                return (
                    <h3 key={index} className={style.box_01}>
                        <a href={item.url} rel={rel}>
                            {item.title}
                        </a>
                    </h3>
                );
            }
        });

        const changeBtn = () => {
            return content.length > 6 ? <div className={style.hyh} onClick={this.changeHandler} /> : '';
        };

        return (
            <div className={`${style.box_txt01} ${style.huh_box}`}>
                {list}
                {changeBtn()}
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
newsListDownSlider.propTypes = { content: PropTypes.array };

/**
 * 定义组件默认属性
 * */
newsListDownSlider.defaultProps = {};

export { newsListDownSlider };
export default newsListDownSlider;

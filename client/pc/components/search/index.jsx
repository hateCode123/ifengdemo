import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

class Search extends React.PureComponent {
    state = {
        data: this.props.content,
        searchTxt: this.props.content[0].keyword,
        current: 0,
    };

    componentDidMount() {}

    handleSelect = e => {
        const { data } = this.state;
        const selectVal = e.target.value;

        this.setState({
            current: selectVal,
            searchTxt: data[selectVal].keyword,
        });
    };

    handleChange = e => {
        const val = e.target.value;

        this.setState({ searchTxt: val });
    };

    handleKeydown = e => {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    };

    handleClick = async () => {
        const { data, current, searchTxt } = this.state;
        const type = data[current].type;

        if (type === 'sofeng') {
            window.open(`//search.ifeng.com/sofeng/search.action?q=${searchTxt}&c=1`);
        } else if (type === 'hq') {
            const stock = await this.getList(searchTxt);

            window.open(`//finance.ifeng.com/app/hq/${stock.t}/${stock.c}/index.shtml`);
        } else if (type === 'car') {
            window.open(`//data.auto.ifeng.com/search/search.do?keywords=${searchTxt}`);
        } else if (type === 'video') {
            window.open(`//so.v.ifeng.com/video?q=${searchTxt}&c=5`);
        }
    };

    getList = async str => {
        const data = await jsonp('http://app.finance.ifeng.com/hq/suggest_v2.php', {
            data: {
                t: 'all',
                q: str,
                cb: 'suggestCallback(suggest_json)',
            },
            jsonpCallback: 'suggestCallback',
        });

        return data[0];
    };

    handleFocus = e => {
        const { data, current } = this.state;
        const val = e.target.value;

        if (data[current].keyword === val) {
            this.setState({ searchTxt: '' });
        }
    };

    handleBlur = e => {
        const { data, current } = this.state;
        const val = e.target.value;

        if (val === '') {
            this.setState({ searchTxt: data[current].keyword });
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, searchTxt } = this.state;

        return (
            <div className={styles.search}>
                <select name="type" className={styles.select} onChange={this.handleSelect}>
                    {data.map((item, index) => (
                        <option key={index} value={index}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div className={styles.btn}>
                    <div className={styles.text}>
                        <input
                            type="text"
                            value={searchTxt}
                            className={styles.text}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeydown}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div className={styles.search_btn}>
                        <button className={styles.btn} onClick={this.handleClick} />
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Search.propTypes = {
    content: PropTypes.array,
};

/**
 * 定义组件默认属性
 * */
Search.defaultProps = {};

export { Search };
export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class Search extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
    };

    state = {
        data: this.props.content,
        searchTxt: this.props.content[0].keyword,
        current: 0,
        isShow: false,
    };

    handMouseLeave = () => {
        this.setState({
            isShow: false,
        });
    };

    handleOptionShow = () => {
        const { isShow } = this.state;

        this.setState({
            isShow: !isShow,
        });
    };

    handleSelect = e => {
        const { data, isShow } = this.state;
        const selectVal = Number(e.currentTarget.attributes['value'].value);

        this.setState({
            current: selectVal,
            searchTxt: data[selectVal].keyword,
            isShow: !isShow,
        });
    };

    handleChange = e => {
        const val = e.currentTarget.value;

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
            window.open(`//app.finance.ifeng.com/hq/search.php?keyword=${searchTxt}`);
        } else if (type === 'car') {
            window.open(`//data.auto.ifeng.com/search/search.do?keywords=${searchTxt}`);
        } else if (type === 'video') {
            window.open(`//so.v.ifeng.com/video?q=${searchTxt}&c=5`);
        }
    };

    handleFocus = e => {
        const { data, current } = this.state;
        const val = e.currentTarget.value;

        if (data[current].keyword === val) {
            this.setState({ searchTxt: '' });
        }
    };

    handleBlur = e => {
        const { data, current } = this.state;
        const val = e.currentTarget.value;

        if (val === '') {
            this.setState({ searchTxt: data[current].keyword });
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { data, current, searchTxt, isShow } = this.state;

        return (
            <div className={styles.search}>
                <div className={styles.select}>
                    <div className={styles.checked} onClick={this.handleOptionShow}>
                        {data[current].name}
                    </div>
                    {isShow ? (
                        <ul onMouseLeave={this.handMouseLeave}>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <a href="javascript:void(0);" value={index} onClick={this.handleSelect}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        ''
                    )}
                </div>
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
        );
    }
}

export { Search };
export default Search;

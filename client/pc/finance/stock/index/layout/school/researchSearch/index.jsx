import React from 'react';
import styles from './index.css';
import { getFinanceData } from '../../../../../../services/api';

class ResearchSearch extends React.PureComponent {
    state = {
        searchTxt: '',
        option: '',
        type: '',
        checked: 'org',
    };

    handleSelect = e => {
        const val = e.currentTarget.value;

        this.setState({ option: val });
    };

    handleChange = async e => {
        const { checked } = this.state;
        const val = e.currentTarget.value;

        this.setState({ searchTxt: val });

        if (checked === 'title') {
            this.setState({ option: val });
        } else if (checked === 'report') {
            try {
                const data = await getFinanceData('report', val);

                this.setState({
                    option: data[0].c,
                    type: data[0].t,
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

    handleFocus = e => {
        const { checked } = this.state;
        const val = e.currentTarget.value;

        if (val === (checked === 'title' ? '请输入标题关键字' : '代码/拼音/名称')) {
            this.setState({ searchTxt: '' });
        }
    };

    handleBlur = e => {
        const { checked } = this.state;
        const val = e.currentTarget.value;

        if (val === '') {
            this.setState({ searchTxt: checked === 'title' ? '请输入标题关键字' : '代码/拼音/名称' });
        }
    };

    handleCheck = e => {
        const val = e.currentTarget.value;

        this.setState({
            checked: val,
            searchTxt: val === 'title' ? '请输入标题关键字' : '代码/拼音/名称',
        });
    };

    handleSearch = () => {
        const { option, type, checked } = this.state;

        if (checked === 'title') {
            window.open(`//app.finance.ifeng.com/report/search.php?titletxt=${option}&yb_search_type=title`);
        } else if (checked === 'org') {
            window.open(`//app.finance.ifeng.com/report/search.php?ind_code=${option}&yb_search_type=org`);
        } else if (checked === 'report') {
            window.open(`//finance.ifeng.com/app/hq/${type}/${option}/index.shtml`);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { searchTxt, checked } = this.state;

        return (
            <div className={styles.researchSearch}>
                <div className={`${styles.box} clearfix`}>
                    <a className={styles.title}>研报搜索</a>
                    <div className={styles.option}>
                        {checked === 'org' ? (
                            <select name="org_code" onChange={this.handleSelect}>
                                <option value="">请选择行业</option>
                                <option value="CF01">传播与文化</option>
                                <option value="CF02">电力、煤气及水等公用事业</option>
                                <option value="CF03">电力设备行业</option>
                                <option value="CF04">电子元器件行业</option>
                                <option value="CF05">房地产业</option>
                                <option value="CF06">纺织和服饰行业</option>
                                <option value="CF07">非金属类建材业</option>
                                <option value="CF08">钢铁行业</option>
                                <option value="CF09">公路港口航运行业</option>
                                <option value="CF10">航空运输行业</option>
                                <option value="CF11">机械行业</option>
                                <option value="CF12">基础化工业</option>
                                <option value="CF13">计算机行业</option>
                                <option value="CF14">休闲品和奢侈品</option>
                                <option value="CF15">建筑和工程</option>
                                <option value="CF16">能源行业</option>
                                <option value="CF17">农林牧渔类行业</option>
                                <option value="CF18">批发和零售贸易</option>
                                <option value="CF19">交运设备行业</option>
                                <option value="CF20">社会服务业（旅游饭店和休闲）</option>
                                <option value="CF21">石油化工业</option>
                                <option value="CF22">食品饮料行业</option>
                                <option value="CF23">通信及通信设备</option>
                                <option value="CF24">医药生物</option>
                                <option value="CF25">银行和金融服务</option>
                                <option value="CF26">有色金属行业</option>
                                <option value="CF27">造纸印刷行业</option>
                                <option value="CF28">综合类</option>
                                <option value="CF29">家用电器行业</option>
                            </select>
                        ) : (
                            <input
                                value={searchTxt}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                            />
                        )}
                    </div>
                    <div className={`${styles.radio} clearfix`}>
                        <input
                            type="radio"
                            value="title"
                            checked={checked === 'title'}
                            name="yb_search_type"
                            onChange={this.handleCheck}
                        />
                        {'标题 '}
                        <input
                            type="radio"
                            value="org"
                            checked={checked === 'org'}
                            name="yb_search_type"
                            onChange={this.handleCheck}
                        />
                        {'机构 '}
                        <input
                            type="radio"
                            value="report"
                            checked={checked === 'report'}
                            name="yb_search_type"
                            onChange={this.handleCheck}
                        />
                        {'公司 '}
                    </div>
                    <div className={styles.search_btn}>
                        <button type="button" onClick={this.handleSearch}>
                            查询
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResearchSearch;

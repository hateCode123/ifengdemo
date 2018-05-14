import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { jsonp } from '@ifeng/ui_base';

class ResearchSearch extends React.PureComponent {
    state = {
        option: '',
        type: '',
        checked: 'org',
    };

    handleSelect = e => {
        const val = e.target.value;

        this.setState({ option: val });
    };

    handleKeyup = async e => {
        const { checked } = this.state;
        const val = e.target.value;

        if (checked === 'title') {
            this.setState({ option: val });
        } else if (checked === 'report') {
            try {
                const data = await jsonp('//app.finance.ifeng.com/hq/suggest_v2.php', {
                    data: {
                        t: 'report',
                        q: val,
                        cb: 'suggestCallback(suggest_json)',
                    },
                    jsonpCallback: 'suggestCallback',
                });

                this.setState({
                    option: data[0].c,
                    type: data[0].t,
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    handleChange = e => {
        const val = e.target.value;

        this.setState({ checked: val });
    };

    handleSearch = () => {
        const { option, type, checked } = this.state;

        if (checked === 'title') {
            window.open(`//app.finance.ifeng.com/report/search.php?titletxt=${option}&yb_search_type=title`);
        } else if (checked === 'org') {
            window.open(`//app.finance.ifeng.com/report/search.php?org_code=${option}&yb_search_type=org`);
        } else if (checked === 'report') {
            window.open(`//finance.ifeng.com/app/hq/${type}/${option}/index.shtml`);
        }
    };

    /**
     * 渲染组件
     */
    render() {
        const { checked } = this.state;

        return (
            <div className={styles.researchSearch}>
                <div className={`${styles.box} clearfix`}>
                    <a className={styles.title}>研报搜索</a>
                    <div className={styles.option}>
                        {checked === 'org' ? (
                            <select name="org_code" onChange={this.handleSelect}>
                                <option value="">请选择研究机构</option>
                                <option value="200000039">东海证券</option>
                                <option value="200000869">长江证券</option>
                                <option value="200000918">宏源证券</option>
                                <option value="200000483">国元证券</option>
                                <option value="200000637">国泰君安证券</option>
                                <option value="200000738">东北证券</option>
                                <option value="200001068">海通证券</option>
                                <option value="200001194">广发证券</option>
                                <option value="200001217">中金公司</option>
                                <option value="200001244">中信证券</option>
                                <option value="200001700">招商证券</option>
                                <option value="200001736">西南证券</option>
                                <option value="200001931">湘财证券</option>
                                <option value="200000332">国金证券</option>
                                <option value="200002265">广发华福</option>
                                <option value="200002281">华泰联合证券</option>
                                <option value="200002196">华夏证券</option>
                                <option value="200002193">方正证券</option>
                                <option value="200002136">申银万国证券</option>
                                <option value="200002182">光大证券</option>
                                <option value="200002198">中投证券</option>
                                <option value="200005067">财政证券</option>
                                <option value="200005762">广州证券</option>
                                <option value="200005766">平安证券</option>
                                <option value="200006404">长城证券</option>
                                <option value="200006482">宏源证券部</option>
                                <option value="200006688">兴业证券</option>
                                <option value="200006697">野村国际(香港)</option>
                                <option value="200006947">华西证券</option>
                                <option value="200007039">高诚证券</option>
                                <option value="200007258">山西证券</option>
                                <option value="200007409">大和证券(香港)</option>
                                <option value="200007451">红塔证券</option>
                                <option value="200007635">怡富证券</option>
                                <option value="200011051">丰敏证券</option>
                                <option value="200011181">银河证券</option>
                                <option value="200011734">申万研究</option>
                                <option value="200011745">华安证券</option>
                                <option value="200014312">南京证券</option>
                                <option value="200014321">上海证券</option>
                                <option value="200014338">J.P摩根(亚洲)</option>
                                <option value="200014341">东盛证券</option>
                                <option value="200014410">里昂证券</option>
                                <option value="200014412">富国证券</option>
                                <option value="200014413">京华证券</option>
                                <option value="200014415">内藤证券</option>
                                <option value="200014416">海袷证券</option>
                                <option value="200014417">东洋证券</option>
                                <option value="200014426">日兴证券(亚洲)</option>
                                <option value="200014427">傅荫权证券</option>
                                <option value="200014463">浩威证券(亚洲)</option>
                                <option value="200014474">华宝证券亚洲</option>
                                <option value="200014475">柏毅证券亚洲</option>
                                <option value="200014478">野村证券</option>
                                <option value="200014479">大宇证券</option>
                                <option value="200014505">西部证券</option>
                                <option value="200016712">华鑫证券</option>
                                <option value="200017563">大通证券</option>
                                <option value="200019979">华龙证券</option>
                                <option value="200020153">渤海证券</option>
                                <option value="200020187">国联证券</option>
                                <option value="200020202">中信万通</option>
                                <option value="200021118">民族证券</option>
                                <option value="200021119">国都证券</option>
                                <option value="200021121">浙商证券</option>
                                <option value="200021168">东吴证券</option>
                                <option value="200021432">华君证券</option>
                                <option value="200021583">嘉诚证券</option>
                                <option value="200022060">第一创业证券</option>
                                <option value="200023022">中银国际证券</option>
                                <option value="200023717">世纪证券</option>
                                <option value="200025026">民生证券</option>
                                <option value="200025887">中航证券</option>
                                <option value="200025969">华创证券</option>
                                <option value="200027733">金星证券</option>
                                <option value="200028372">财富证券</option>
                                <option value="200028482">国盛证券</option>
                                <option value="200028484">信瀚证券</option>
                                <option value="200028574">华侨证券私人</option>
                                <option value="200028582">新发银证</option>
                                <option value="200028586">兆富证券</option>
                                <option value="200028969">金元证券</option>
                                <option value="200029132">万联证券</option>
                                <option value="200029763">中信金通证券</option>
                                <option value="200030844">东莞证券</option>
                                <option value="200030850">天风证券</option>
                                <option value="200031474">德邦证券</option>
                                <option value="200033880">中山证券</option>
                                <option value="200035787">新时代证券</option>
                                <option value="200035827">国开证券</option>
                                <option value="200036123">财富里昂证券</option>
                                <option value="200036127">东方证券</option>
                                <option value="200036139">中原证券</option>
                                <option value="200036212">长江承销</option>
                                <option value="200038219">财达证券</option>
                                <option value="200038305">联讯证券</option>
                                <option value="200038310">首创证券</option>
                                <option value="200039128">恒泰证券</option>
                                <option value="200039208">大同证券</option>
                                <option value="200039211">财通证券</option>
                                <option value="200040041">爱建证券</option>
                                <option value="200040315">大和证券</option>
                                <option value="200041185">第一上海证券</option>
                                <option value="200041217">海际大和证券</option>
                                <option value="200041396">江海证券</option>
                                <option value="200041476">齐鲁证券</option>
                                <option value="200041720">五矿证券</option>
                                <option value="200041732">华宝证券</option>
                                <option value="200041927">国泰君安(香港)</option>
                                <option value="200041928">恒生证券</option>
                                <option value="200041929">申万证券(香港)</option>
                                <option value="200041930">中天证券</option>
                                <option value="200042499">金榜证券</option>
                                <option value="200042606">高盛高华证券</option>
                                <option value="200042607">中信建投证券</option>
                                <option value="200043156">东洋证券亚洲</option>
                            </select>
                        ) : (
                            <input
                                placeholder={checked === 'title' ? '请输入标题关键字' : '代码/拼音/名称'}
                                onKeyUp={this.handleKeyup}
                            />
                        )}
                    </div>
                    <div className={`${styles.radio} clearfix`}>
                        <input
                            type="radio"
                            value="title"
                            checked={checked === 'title'}
                            name="yb_search_type"
                            onChange={this.handleChange}
                        />
                        {'标题 '}
                        <input
                            type="radio"
                            value="org"
                            checked={checked === 'org'}
                            name="yb_search_type"
                            onChange={this.handleChange}
                        />
                        {'机构 '}
                        <input
                            type="radio"
                            value="report"
                            checked={checked === 'report'}
                            name="yb_search_type"
                            onChange={this.handleChange}
                        />
                        {'公司 '}
                    </div>
                    <div className={styles.search_btn}>
                        <button onClick={this.handleSearch}>查询</button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ResearchSearch.propTypes = {};

/**
 * 定义组件默认属性
 * */
ResearchSearch.defaultProps = {};

export { ResearchSearch };
export default ResearchSearch;

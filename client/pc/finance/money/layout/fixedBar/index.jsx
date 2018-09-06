import React from 'react';
import style from './style.css';
import '../../reset.css';
import { addEventListener } from '@ifeng/ui_base';

class FixedBar extends React.PureComponent {
    state = {
        showForm: false,
        showGotoTop: true,
    };
    componentDidMount() {
        this.unHandleScroll = addEventListener(window, 'scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.unHandleScroll();
    }

    handleScroll = event => {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let tag = true;

        if (scrollTop < 100) {
            tag = false;
        }
        this.setState({
            showGotoTop: tag,
        });
    };
    toggleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm,
        });
    };
    render() {
        const { showForm, showGotoTop } = this.state;

        const form = (
            <div className={style.sut}>
                <form
                    id="finance_search_2"
                    name="finance_search_2"
                    method="get"
                    target="_blank"
                    action="http://app.finance.ifeng.com/hq/search.php?type=stock">
                    <input className={style.input_02a} name="q" type="text" id="q1" placeholder="代码/拼音/名称" />
                    <input
                        className={style.submit}
                        type="submit"
                        value=" 搜索"
                        // onClick="search_sz('q1','finance_search_2')"
                    />
                </form>
            </div>
        );

        return (
            <div id="addweixin1" className={style.xpic}>
                <table width="50" border="0" className={style.rta_01}>
                    <tbody>
                        <tr>
                            <td className={style.Focus}>
                                <a id={style.sea_01} onClick={this.toggleShowForm}>
                                    <b />
                                    <p>查行情</p>
                                </a>

                                <div
                                    onMouseLeave={this.toggleShowForm}
                                    className={`${showForm ? style.showForm : style.hideForm} ${style.caption}`}>
                                    {form}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={style.Focus}>
                                <a href="#fxs" id={style.sea_02}>
                                    <b />
                                    <p>
                                        理财师<br />答疑
                                    </p>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a
                                    href="#"
                                    id={style.sea_04}
                                    style={showGotoTop ? { display: 'block' } : { display: 'none' }}>
                                    <b>&nbsp;</b>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FixedBar;

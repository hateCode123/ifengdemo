import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';

class Left extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.box_10z} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

Left.propTypes = { content: PropTypes.string };

Left.defaultProps = {};

class Middle extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.box_10z01} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

Middle.propTypes = { content: PropTypes.string };

Middle.defaultProps = {};

class Right extends React.PureComponent {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.box_10z02} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

Right.propTypes = { content: PropTypes.string };

Right.defaultProps = {};

class Bottom extends React.PureComponent {
    render() {
        const { content } = this.props;

        return (
            <div className={style.box_10}>
                <Chip id="10124" type="static" title="底部左侧" groupName="底部" content={content.bottomWeiXin}>
                    <Left />
                </Chip>
                <Chip id="10125" type="static" title="底部中间" groupName="底部" content={content.bottomProc}>
                    <Middle />
                </Chip>
                <Chip id="10126" type="static" title="底部右侧" groupName="底部" content={content.bottomLink}>
                    <Right />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Bottom.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Bottom.defaultProps = {};
export { Bottom };
export default Bottom;

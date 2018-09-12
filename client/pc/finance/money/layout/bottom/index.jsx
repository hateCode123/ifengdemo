import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';

class Inner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div dangerouslySetInnerHTML={this.createHtml()} className={style.box_10} />;
    }
}

class Bottom extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    render() {
        const { content } = this.props;

        return (
            <Chip id="15028" type="static" title="底部" groupName="底部" content={content}>
                <Inner />
            </Chip>
        );
    }
}

export default Bottom;

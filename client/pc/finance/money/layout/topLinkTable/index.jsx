import React from 'react';
import PropTypes from 'prop-types';
import '../../reset.css';
import style from './style.css';
import Chip from 'Chip';

class Inner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.caption01} dangerouslySetInnerHTML={this.createHtml()} />;
    }
}
class TopLinkTable extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    render() {
        const { content } = this.props;

        return (
            <Chip id="15027" type="static" title="财急送" groupName="财急送" content={content}>
                <Inner />
            </Chip>
        );
    }
}

export default TopLinkTable;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '../../../../../../../../components/errorBoundary';
import { rel } from '../../../../../../../../utils/rel';

class Title extends React.PureComponent {
    static propTypes = {
        title: PropTypes.object,
        text: PropTypes.object,
        extra: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { title, text, extra } = this.props;

        return (
            <div className={styles.box}>
                <h2 className={styles.title}>
                    <a href={title.url} target="_blank" rel={rel} title={title.title}>
                        {title.title}
                    </a>
                </h2>
                <div className={styles.text}>
                    <h3>
                        <a href={text.url} target="_blank" rel={rel} title={text.title}>
                            {text.title}
                        </a>
                    </h3>
                    {extra ? (
                        <h3>
                            <a href={extra.url} target="_blank" rel={rel} title={extra.title}>
                                {extra.title}
                            </a>
                        </h3>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

export default errorBoundary(Title);

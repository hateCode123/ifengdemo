import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '../../../../../utils/rel';

/**
 * 定义 Logo 组件
 */
class Logo extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const {
            content: { logo },
        } = this.props;

        return (
            <React.Fragment>
                <a href={logo.url} target="_blank" rel={rel}>
                    <Chip id="30005" type="struct" title="Logo" groupName="头部" content={logo}>
                        <img src={logo.src} alt={logo.title} width={logo.width} height={logo.height} />
                    </Chip>
                </a>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Logo);

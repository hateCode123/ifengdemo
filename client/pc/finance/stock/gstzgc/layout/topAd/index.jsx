import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import { Recommend } from '../../components/recommend';

class AdAside extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div>
                <Chip
                    id={content.id}
                    type="static"
                    title={content.name}
                    groupName="文章"
                    translate="jsonParse"
                    content={content.content}>
                    <Recommend />
                </Chip>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
AdAside.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
AdAside.defaultProps = {};

export { AdAside };
export default AdAside;

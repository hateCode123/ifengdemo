import React from 'react';
import PropTypes from 'prop-types';
import dataProcessing from '../../../../../../../components/dataProcessing';
import { handleAd } from '../../../../../../../utils/infoAd';

class ExtraNews extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
        extraNewsAd: PropTypes.object,
    };

    ref = React.createRef();

    async componentDidMount() {
        const { extraNewsAd } = this.props;

        const callbackFn = await handleAd(extraNewsAd);

        callbackFn(this.ref.current, extraNewsAd.data);
    }

    /**
     * 插入 html
     */
    createMarkup = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <div ref={this.ref} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

export default dataProcessing(ExtraNews);

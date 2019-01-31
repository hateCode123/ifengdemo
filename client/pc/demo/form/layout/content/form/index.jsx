import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import { createForm, formShape } from 'rc-form';
import FormItem from '../formItem';
import Input from '../input';
import TextArea from '../textArea';
import CheckBox from '../checkBox';
class Form extends React.PureComponent {
    static propTypes = {
        form: formShape,
    };

    state = {};

    componentDidMount() {}

    submit() {
        const { validateFields } = this.props.form;

        validateFields((err, value) => {
            console.log(err, value);
        });
    }

    render() {
        let errors = null;
        const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                <form>
                    <FormItem
                        isRequired
                        getFieldError={getFieldError}
                        label={<span className={styles.label}>大风号名称</span>}>
                        {getFieldDecorator('weMediaName', { rules: [{ required: true, message: '必填项' }] })(
                            <Input style={{ width: '588px' }} />,
                        )}
                    </FormItem>
                    <FormItem
                        isRequired
                        getFieldError={getFieldError}
                        label={<span className={styles.label}>大风号简洁</span>}>
                        {getFieldDecorator('weMediaDesc', { rules: [{ required: true, message: '必填项' }] })(
                            <TextArea style={{ width: '588px', height: '60px' }} />,
                        )}
                    </FormItem>
                    <FormItem
                        isRequired
                        getFieldError={getFieldError}
                        label={<span className={styles.label}>大风号简洁</span>}>
                        {getFieldDecorator('agree', {
                            rules: [{ required: true, message: '必填项' }],
                            initialValue: true,
                        })(<CheckBox />)}
                    </FormItem>
                </form>
                <button onClick={this.submit.bind(this)}>提交</button>
            </React.Fragment>
        );
    }
}

export default errorBoundary(createForm()(Form));

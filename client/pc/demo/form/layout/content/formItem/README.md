# FormItem 组件 配合 rc-form 使用

## rc-form

参考文档[re-form](https://github.com/react-component/form)

## 使用

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import { createForm, formShape } from 'rc-form';
import FormItem from '../formItem';
import Input from '../input';
import TextArea from '../textArea';
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
                        getFieldError={getFieldError} // 这个必须传入，用于formitem组件收集检验错误提示
                        tip={
                            <div className={styles.tips}>
                                1-12 个汉字，请勿使用包含特殊符号或含有明显营销推广意图的媒体名
                            </div>
                        }
                        style={{ marginBottom: '7px' }}>
                        label={<span className={styles.label}>大风号名称</span>}>
                        {getFieldDecorator('weMediaName', { rules: [{ required: true, message: '必填项' }] })(
                            <Input style={{ width: '588px' }} />,
                        )}
                    </FormItem>
                    <FormItem
                        isRequired
                        getFieldError={getFieldError}
                        label={<span className={styles.label}>大风号简简洁</span>}>
                        {getFieldDecorator('weMediaDesc', { rules: [{ required: true, message: '必填项' }] })(
                            <TextArea style={{ width: '588px', height: '60px' }} />,
                        )}
                    </FormItem>
                </form>
                <button onClick={this.submit.bind(this)}>提交</button>
            </React.Fragment>
        );
    }
}

export default errorBoundary(createForm()(Form));
```

## API

-   `isRequired` ----------- 必填项的样式，label 前面加一个红色的`*`
-   `label` ----------- label。。。
-   `getFieldError` ----------- rc-form API 中获取输入的验证错误的函数。照上面使用方法传入就行了
-   `tip` ----------- 表单下面的提示文字，效果可以查看`/account/userInfo`
-   `style` ----------- 自定义的样式

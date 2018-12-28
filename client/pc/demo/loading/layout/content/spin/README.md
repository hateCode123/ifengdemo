# 加载动画

```jsx
// 使用方法

import Spin from '[your components dir]/spin';

...

// 基础用法
<Spin spinning={this.state.isLoading} />

// 作为容器
<Spin spinning={this.state.isLoading} tip={'加载中...'}>
        <div>Content</div>
</Spin>
```

### API:

-   spinning -------------- `[bool]` 是否显示加载动画
-   tip -------------- `[string]` 加载动画的描述文字(只有 spin 作为容器时可用)
-   size -------------- `[string]` `['default' || 'small']` 动画的尺寸，默认`default`

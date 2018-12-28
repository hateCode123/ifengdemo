# 轮播组件：

```jsx
import Slider from '[your components dir]/slider';

...

const data = [
    {
        imgUrl:
            'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20171024/16/wemedia/d08fc7c30a94344ed73d4b0812b37108f44d2717_size67_w750_h90.jpg',
        linkUrl: 'http://wemedia.ifeng.com/28835880/wemedia.shtml',
        position: 1,
    },
    {
        imgUrl:
            'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20171024/16/wemedia/17da65eee6157ff9561d57c44dea15f2cb19d8bc_size57_w759_h90.jpg',
        linkUrl: 'http://wemedia.ifeng.com/28364778/wemedia.shtml',
        position: 2,
    },
];
const config = {
    arrow: false,
    interval: 2000,
    direction: 'right',
    number: 2,
    unitWidth: 920,
    unitHeight: 100,
    dotsAction: 'click',
};

<Slider data={data} config={config} />
```

### API:

-   `data` ---------------------------- `[array]` `[isRequired]` 类型，放置轮播图片等信息（必填）
-   `config` ------------------------ `[object]` `[isRequired]` 类型，放置一些轮播图的基本设置（必填）

    -   `number` --------------------------- `[number]` `[isRequired]` 类型，设置轮播数量（必填）
    -   `unitWidth` ------------------------- `[number]` `[isRequired]` 类型，设置单元宽度（必填）
    -   `unitHeight` ------------------------ `[number]` `[isRequired]` 类型，设置单元高度（必填）
    -   `arrow` ---------------------------- `[bool]` 类型，轮播图的箭头控制器的显隐， 默认显示
    -   `interval` ---------------------------- `[number]` 类型，设置图片停留时间， 默认 1s
    -   `direction` -------------------------- `[string]` 类型，设置运动的方向
    -   `dotsAction` -------------------------- `[string]` 类型，设置圆点触发事件
    -   `sliderTmpl` -------------------------- `[function]` 类型，自定义轮播单元模板内容，`Function(item, index) {}`，使用方法如下:

    ```jsx
    const sliderTmpl = (item, index) => {
        // 有两个默认参数，分别返回data的每一项和单元索引
        console.log(item, index);

        return (
            <div>
                <img src={item.imgUrl} width={1000} />
            </div>
        );
    };

    const config = {
        ...sliderTmpl,
    };
    ```

样式可自定义的部分：使用属性选择器覆盖样式

-   `[data-dots-wrap="true"]`: 分页指示器的容器
-   `[data-dots-active="true"]`: 当前处于触发状态的指示器
-   `[data-dots-active="false"]`: 当前处于非触发状态的指示器
-   `[data-arrow-left="true"]`: 左侧箭头控制器
-   `[data-arrow-right="true"]`: 右侧箭头控制器

2018/12/28 caoyuan1

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.CollapsePanel = undefined;

const _extends2 = require('babel-runtime/helpers/extends');

const _extends3 = _interopRequireDefault(_extends2);

const _defineProperty2 = require('babel-runtime/helpers/defineProperty');

const _defineProperty3 = _interopRequireDefault(_defineProperty2);

const _createClass2 = require('babel-runtime/helpers/createClass');

const _createClass3 = _interopRequireDefault(_createClass2);

const _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

const _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

const _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

const _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

const _inherits2 = require('babel-runtime/helpers/inherits');

const _inherits3 = _interopRequireDefault(_inherits2);

const _react = require('react');

const React = _interopRequireWildcard(_react);

const _rcCollapse = require('rc-collapse');

const _rcCollapse2 = _interopRequireDefault(_rcCollapse);

const _classnames = require('classnames');

const _classnames2 = _interopRequireDefault(_classnames);

const _openAnimation = require('../_util/openAnimation');

const _openAnimation2 = _interopRequireDefault(_openAnimation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { const newObj = {}; if (obj != null) { for (const key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; 

return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

const CollapsePanel = exports.CollapsePanel = function (_React$Component) {
    (0, _inherits3['default'])(CollapsePanel, _React$Component);

    function CollapsePanel() {
        (0, _classCallCheck3['default'])(this, CollapsePanel);
        
return (0, _possibleConstructorReturn3['default'])(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
    }

    return CollapsePanel;
}(React.Component);

const Collapse = function (_React$Component2) {
    (0, _inherits3['default'])(Collapse, _React$Component2);

    function Collapse() {
        (0, _classCallCheck3['default'])(this, Collapse);
        
return (0, _possibleConstructorReturn3['default'])(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Collapse, [{
        key: 'render',
        value: function render() {
            let _props = this.props,
                prefixCls = _props.prefixCls,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                bordered = _props.bordered;

            const collapseClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, `${prefixCls }-borderless`, !bordered), className);
            
return React.createElement(_rcCollapse2['default'], (0, _extends3['default'])({}, this.props, { className: collapseClassName }));
        }
    }]);
    
return Collapse;
}(React.Component);

exports['default'] = Collapse;

Collapse.Panel = _rcCollapse2['default'].Panel;
Collapse.defaultProps = {
    prefixCls: 'ant-collapse',
    bordered: true,
    openAnimation: (0, _extends3['default'])({}, _openAnimation2['default'], {
        appear: function appear() {}
    })
};

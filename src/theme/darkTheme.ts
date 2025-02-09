import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const darkTheme: ThemeConfig = {
  token: {
    colorBgBase: '#141414', // 更深的背景色
    colorTextBase: '#ffffff', // 主文本颜色
    colorPrimary: '#177ddc', // 主题色
    colorBgContainer: '#1f1f1f', // 容器背景色
    colorBgElevated: '#2d2d2d', // 弹出层背景色
    colorBorder: '#434343', // 边框颜色
    colorSplit: '#303030', // 分割线颜色
    colorTextSecondary:
      '#rgba(255, 255, 255, 0.65)', // 次要文本颜色
    colorTextDisabled:
      '#rgba(255, 255, 255, 0.25)', // 禁用文本颜色
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)', // 阴影效果
  },
  algorithm: theme.darkAlgorithm, // 使用暗色算法
};

export default darkTheme;

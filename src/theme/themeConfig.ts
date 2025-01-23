import type { ThemeConfig } from 'antd';

const defaultTheme: ThemeConfig = {
  token: {
    // 颜色
    colorPrimary: '#00b96b', // 主色
    colorSuccess: '#52c41a', // 成功色
    colorWarning: '#faad14', // 警告色
    colorError: '#ff4d4f', // 错误色
    colorInfo: '#1677ff', // 信息色

    // 字体
    fontSize: 14, // 主字号
    fontFamily: 'Arial', // 字体家族

    // 圆角
    borderRadius: 6, // 统一圆角

    // 间距
    marginXS: 8, // 迷你间距
    marginSM: 12, // 小间距
    margin: 16, // 标准间距
    marginMD: 20, // 中等间距
    marginLG: 24, // 大间距
    marginXL: 32, // 超大间距
  },

  // 组件级别的定制
  components: {
    Button: {
      primaryColor: '#00b96b',
      borderRadius: 4,
    },
    Card: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 4,
    },
  },
};

export default defaultTheme;

//这是antd的主题配置文件，用于配置antd的样式

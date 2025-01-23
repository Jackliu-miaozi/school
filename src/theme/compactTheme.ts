import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const compactTheme: ThemeConfig = {
  token: {
    sizeStep: 4,
    controlHeight: 32,
  },
  algorithm: theme.compactAlgorithm, // 使用紧凑算法
};

export default compactTheme;

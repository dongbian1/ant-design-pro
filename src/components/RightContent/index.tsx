import {
  BookOutlined,
  ForkOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';

const useStyles = createStyles(({ token, css }) => ({
  action: css`
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 36px !important;
    min-width: 36px;
    padding-inline: 8px !important;
    padding-block: 0 !important;
    border-radius: ${token.borderRadius}px !important;
  `,
}));

export const DocLink: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Tooltip title="使用文档">
      <Button
        type="text"
        className={styles.action}
        icon={<BookOutlined />}
        aria-label="使用文档"
        onClick={() => {
          history.push('/home');
        }}
      />
    </Tooltip>
  );
};

const versionItems: MenuProps['items'] = [
  { key: 'https://v5.pro.ant.design', label: 'v5' },
  { key: 'https://v4.pro.ant.design', label: 'v4' },
  { key: 'https://v2.pro.ant.design', label: 'v2' },
  { key: 'https://v1.pro.ant.design', label: 'v1' },
];

const onVersionClick: MenuProps['onClick'] = ({ key }) => {
  window.open(key, '_blank', 'noopener,noreferrer');
};

export const VersionDropdown: React.FC = () => {
  const { styles } = useStyles();
  return (
    <HeaderDropdown
      placement="bottomRight"
      arrow
      menu={{
        selectedKeys: [],
        onClick: onVersionClick,
        items: versionItems,
        style: { minWidth: 100 },
      }}
    >
      <Button type="text" className={styles.action} aria-label="历史版本">
        <ForkOutlined />
      </Button>
    </HeaderDropdown>
  );
};

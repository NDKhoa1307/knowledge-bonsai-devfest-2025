import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Divider, Tooltip } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/chat',
      icon: <MessageOutlined />,
      label: 'AI Chat',
    },
    {
      key: '/trees',
      icon: <ApartmentOutlined />,
      label: 'Tree',
    },
    {
      key: '/nodes',
      icon: <AppstoreOutlined />,
      label: 'Nodes',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Users',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={280}
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
        borderRight: '1px solid #e2e8f0',
      }}
      trigger={null}
    >
      {/* Header with Logo */}
      <div 
        style={{ 
          padding: collapsed ? '24px 16px' : '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 12,
          transition: 'all 0.3s'
        }}
      >
        {!collapsed ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Animated Bonsai Logo */}
              <div 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                }}
                className="animate-sway"
              >
                <span style={{ fontSize: 28 }}>🌳</span>
              </div>
              <div>
                <Title level={4} style={{ margin: 0, color: '#1e293b', fontSize: 20 }}>
                  Bonsai
                </Title>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Knowledge Garden
                </Text>
              </div>
            </div>
          </>
        ) : (
          <Tooltip title="Knowledge Bonsai" placement="right">
            <div 
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
              }}
              className="animate-sway"
            >
              <span style={{ fontSize: 24 }}>🌳</span>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Collapse Toggle Button */}
      <div
        style={{
          padding: '0 24px 16px',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
        }}
      >
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="right">
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: 14, color: '#64748b' }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 14, color: '#64748b' }} />
            )}
          </div>
        </Tooltip>
      </div>

      <Divider style={{ margin: '0 0 16px 0', borderColor: '#e2e8f0' }} />

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '0 16px',
        }}
        theme="light"
      />

      {/* Footer Info */}
      {!collapsed && (
        <div 
          style={{ 
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            padding: '0 24px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 12,
              padding: 16,
              color: 'white',
            }}
          >
            <Text strong style={{ color: 'white', fontSize: 14, display: 'block', marginBottom: 4 }}>
              💡 Pro Tip
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12 }}>
              Use AI Chat to generate your knowledge trees!
            </Text>
          </div>
        </div>
      )}
    </Sider>
  );
};


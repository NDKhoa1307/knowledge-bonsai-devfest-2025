import { Avatar, Badge, Button, Typography, Dropdown, theme, Space, Tooltip } from 'antd';
import { MoreOutlined, WifiOutlined, DisconnectOutlined, LoadingOutlined } from '@ant-design/icons';

interface ChatHeaderProps {
  isConnected: boolean;
  isTyping: boolean;
}

const { Text, Title } = Typography;
const { useToken } = theme;

export const ChatHeader = ({ isConnected, isTyping }: ChatHeaderProps) => {
  const { token } = useToken();

  // Menu items for the settings dropdown
  const menuItems = [
    { key: '1', label: 'Clear Conversation' },
    { key: '2', label: 'Export Chat' },
    { type: 'divider' as const },
    { key: '3', label: 'Settings', danger: true },
  ];

  // Custom Bonsai Icon Component
  const BonsaiIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      className="w-5 h-5 text-emerald-400"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" 
      />
    </svg>
  );

  return (
    <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        
        {/* Left Side: Identity & Status */}
        <Space size={16}>
          <Tooltip title={isConnected ? "Online" : "Disconnected"}>
            <Badge 
              status={isConnected ? "success" : "error"} 
              dot 
              offset={[-6, 38]}
              className="shadow-sm"
              styles={{ indicator: { width: 10, height: 10, boxShadow: '0 0 0 2px #fff' } }}
            >
              <Avatar 
                shape="square" 
                size={48} 
                icon={<BonsaiIcon />}
                className="bg-gradient-to-br from-stone-700 to-stone-900 shadow-lg shadow-stone-200/80 flex items-center justify-center rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Badge>
          </Tooltip>

          <div className="flex flex-col justify-center">
            <Title level={5} style={{ margin: 0, color: token.colorTextHeading, fontSize: '16px' }}>
              Bonsai AI
            </Title>
            <Space size={6} align="center">
              {isTyping ? (
                <>
                  <LoadingOutlined style={{ fontSize: 10, color: token.colorPrimary }} />
                  <Text type="secondary" style={{ fontSize: '12px' }} className="text-emerald-600 font-medium">
                    Cultivating response...
                  </Text>
                </>
              ) : (
                <>
                  {isConnected ? (
                    <WifiOutlined style={{ fontSize: 10, color: token.colorSuccess }} />
                  ) : (
                    <DisconnectOutlined style={{ fontSize: 10, color: token.colorError }} />
                  )}
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {isConnected ? 'Ready to help' : 'Offline'}
                  </Text>
                </>
              )}
            </Space>
          </div>
        </Space>

        {/* Right Side: Actions */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
          <Button 
            type="text" 
            shape="circle" 
            size="large"
            icon={<MoreOutlined className="text-xl text-stone-500" />} 
            className="hover:bg-stone-100 flex items-center justify-center"
          />
        </Dropdown>
      </div>
    </div>
  );
};
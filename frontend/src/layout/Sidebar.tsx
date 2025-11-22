import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/chat', label: 'AI Chat', icon: '💬' },
    { to: '/graph', label: 'Knowledge Graph', icon: '🌳' },
    { to: '/nodes', label: 'Nodes', icon: '📦' },
    { to: '/users', label: 'Users', icon: '👥' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-3xl animate-sway">🌳</span>
          <span className="text-xl font-bold text-gray-800">Bonsai</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};


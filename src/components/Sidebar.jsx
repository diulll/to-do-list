import { CheckSquare, Home, List, Settings } from 'lucide-react';

function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: List },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="px-8 py-6 flex items-center gap-2.5 border-b border-gray-100">
        <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
          <CheckSquare size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">TaskMaster</h1>
      </div>

      {/* Menu Items */}
      <nav className="px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[15px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;

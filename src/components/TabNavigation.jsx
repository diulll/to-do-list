function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-10 px-12 bg-white border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-4 text-[15px] font-medium transition-all duration-200 relative ${
            activeTab === tab.id
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-t"></div>
          )}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;

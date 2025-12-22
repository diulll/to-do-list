import { Plus } from 'lucide-react';

function Header({ onNewTask }) {
  return (
    <div className="bg-white pl-8 py-6 pr-16 flex justify-between items-center border-b border-gray-200">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">Stay organized and productive</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
        >
          <Plus size={18} strokeWidth={2} />
          New Task
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

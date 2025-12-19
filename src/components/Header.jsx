import { Plus } from 'lucide-react';

function Header({ onNewTask }) {
  return (
    <div className="bg-white px-12 py-8 flex justify-between items-center border-b border-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
      <div className="flex items-center gap-5">
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow"
        >
          <Plus size={18} strokeWidth={2.5} />
          New Task
        </button>
        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-gray-300 transition-all duration-200 cursor-pointer">
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

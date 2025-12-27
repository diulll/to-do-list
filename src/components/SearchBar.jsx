import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 max-w-2xl">
        <Search className="text-gray-400" size={20} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-150"
        />
      </div>
    </div>
  );
}

export default SearchBar;

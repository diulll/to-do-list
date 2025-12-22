import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="px-8 py-4 bg-white border-b border-gray-200">
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-150"
        />
      </div>
    </div>
  );
}

export default SearchBar;

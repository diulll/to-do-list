import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <div className="px-12 py-6 bg-white border-b border-gray-100">
      <div className="relative max-w-3xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-gray-100 border border-transparent focus:border-gray-200 rounded-lg text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:bg-white transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default SearchBar;

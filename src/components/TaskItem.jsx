import { Trash2, Edit2 } from 'lucide-react';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 px-8 py-12 hover:bg-gray-50 transition-colors duration-150 group border-b border-gray-100 last:border-b-0">
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-base mb-3 ${
          task.completed 
            ? 'line-through text-gray-400' 
            : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-md bg-blue-100 text-blue-700">
          {task.category}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-blue-50 rounded-md transition-colors duration-150"
            title="Edit task"
          >
            <Edit2 size={16} className="text-blue-600" strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-red-50 rounded-md transition-colors duration-150"
            title="Delete task"
          >
            <Trash2 size={16} className="text-red-600" strokeWidth={2} />
          </button>
        </div>
        
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TaskItem;

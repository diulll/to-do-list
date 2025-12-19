import { Trash2, Edit2 } from 'lucide-react';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 px-12 py-6 hover:bg-gray-50 transition-all duration-200 group">
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-base mb-1.5 transition-colors ${
          task.completed 
            ? 'line-through text-gray-400' 
            : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 font-normal">{task.category}</p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Edit & Delete Buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <Edit2 size={16} className="text-gray-600" strokeWidth={2} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-red-100 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <Trash2 size={16} className="text-red-600" strokeWidth={2} />
          </button>
        </div>
        
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 border-2 border-gray-300 hover:border-gray-400 flex-shrink-0 transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default TaskItem;

import { useState, useMemo } from 'react';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';

function TaskDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Buy groceries for the week',
      category: 'Grocery Shopping',
      completed: false,
      description: 'Milk, eggs, bread, vegetables',
      dueDate: new Date(2025, 11, 18),
    },
    {
      id: 2,
      title: 'Attend project kickoff meeting',
      category: 'Project Meeting',
      completed: false,
      description: 'Main conference room, 2:00 PM',
      dueDate: new Date(2025, 11, 19),
    },
    {
      id: 3,
      title: 'Go to the gym',
      category: 'Gym',
      completed: false,
      description: '30 minutes cardio, 20 minutes weights',
      dueDate: new Date(2025, 11, 18),
    },
    {
      id: 4,
      title: 'Prepare dinner',
      category: 'Dinner',
      completed: false,
      description: 'Italian pasta',
      dueDate: new Date(2025, 11, 18),
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter tasks based on tab and search
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply tab filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === 'today') {
      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime() && !task.completed;
      });
    } else if (activeTab === 'upcoming') {
      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return taskDate > today && !task.completed;
      });
    } else if (activeTab === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, activeTab, searchTerm]);

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
      setEditingTask(null);
    } else {
      // Create new task
      const newTask = {
        id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
        ...formData,
        completed: false,
        dueDate: new Date(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header onNewTask={handleOpenNewTask} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="flex-1 overflow-y-auto">
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default TaskDashboard;

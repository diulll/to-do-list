import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskDashboard from './pages/TaskDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('tasks');

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {currentPage === 'tasks' && <TaskDashboard />}
        {currentPage === 'dashboard' && (
          <div className="p-8 overflow-auto">
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-4">Dashboard coming soon...</p>
          </div>
        )}
        {currentPage === 'settings' && (
          <div className="p-8 overflow-auto">
            <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-4">Settings coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

function Task() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);

  const addJob = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const removeSelected = () => {
    setTodos(todos.filter(todo => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  const toggleSelect = (id) => {
    setSelectedTodos(prev => 
      prev.includes(id) 
        ? prev.filter(todoId => todoId !== id)
        : [...prev, id]
    );
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addJob();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Job Tracker
          </h1>
          <p className="text-gray-600">Organize your tasks and track your progress</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6  ">
          <div className="flex gap-3 flex flex-col sm:flex-row">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new job..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={addJob}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add Job
            </button>
          </div>
          
          {selectedTodos.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={removeSelected}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Trash2 size={18} />
                Remove Selected ({selectedTodos.length})
              </button>
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Jobs ({todos.length})
            </h2>
            {todos.length > 0 && (
              <span className="text-sm text-gray-500">
                Completed: {todos.filter(t => t.completed).length}
              </span>
            )}
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <CheckCircle2 size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No jobs added yet</p>
              <p className="text-gray-400 text-sm">Add your first job above to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedTodos.includes(todo.id)
                      ? 'border-red-300 bg-red-50'
                      : todo.completed
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTodos.includes(todo.id)}
                    onChange={() => toggleSelect(todo.id)}
                    className="w-5 h-5 text-red-500 border-2 border-gray-300 rounded focus:ring-red-500"
                  />
                  
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.completed && <CheckCircle2 size={16} className="w-full h-full" />}
                  </button>

                  <span
                    className={`flex-1 transition-all duration-200 ${
                      todo.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>

                  {selectedTodos.includes(todo.id) && (
                    <span className="text-red-500 font-medium text-sm">
                      Selected for removal
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{todos.length}</div>
              <div className="text-sm text-gray-600">Total Jobs</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                {todos.filter(t => t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">
                {todos.filter(t => !t.completed).length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;

import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed', 'important'

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleImportant = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      case 'important':
        return todos.filter(t => t.important);
      default:
        return todos;
    }
  };

  return (
    <div className="app-container">
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <header className="app-header">
          <h1>Tasks</h1>
        </header>

        <TodoForm addTodo={addTodo} />

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`filter-btn ${filter === 'important' ? 'active' : ''}`}
            onClick={() => setFilter('important')}
          >
            Important
          </button>
        </div>

        <TodoList 
          todos={getFilteredTodos()} 
          toggleComplete={toggleComplete}
          toggleImportant={toggleImportant}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTodo({
      id: Date.now().toString(),
      text: text.trim(),
      schedule: schedule || null,
      completed: false,
      important: false,
      createdAt: new Date().toISOString()
    });
    
    setText('');
    setSchedule('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          className="glass-input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-row">
        <input
          type="datetime-local"
          className="glass-input"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button type="submit" className="glass-button">
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;

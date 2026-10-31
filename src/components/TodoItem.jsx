import React from 'react';
import { Star, Trash2, Calendar, Clock } from 'lucide-react';
import { format, isPast } from 'date-fns';

const TodoItem = ({ todo, toggleComplete, toggleImportant, deleteTodo }) => {
  const { id, text, schedule, completed, important } = todo;

  const formatSchedule = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const isOverdue = isPast(date) && !completed;
    
    return (
      <div className={`todo-schedule ${isOverdue ? 'danger' : ''}`} style={isOverdue ? {color: 'var(--danger)'} : {}}>
        <Clock size={14} />
        {format(date, 'MMM d, yyyy h:mm a')}
      </div>
    );
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''} ${important ? 'important' : ''}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={completed}
        onChange={() => toggleComplete(id)}
      />
      
      <div className="todo-content">
        <span className="todo-text">{text}</span>
        {schedule && formatSchedule(schedule)}
      </div>

      <div className="todo-actions">
        <button
          type="button"
          className={`icon-button ${important ? 'important' : ''}`}
          onClick={() => toggleImportant(id)}
          title={important ? "Remove importance" : "Mark as important"}
        >
          <Star size={20} fill={important ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          className="icon-button danger"
          onClick={() => deleteTodo(id)}
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

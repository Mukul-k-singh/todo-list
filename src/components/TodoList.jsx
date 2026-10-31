import { ClipboardList } from 'lucide-react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, toggleImportant, deleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <ClipboardList size={48} />
        <p>No tasks found. Time to relax or add a new one!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          toggleImportant={toggleImportant}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;


import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

const sampleTodos = [
  {
    id: 1,
    text: 'Learn GitHub Actions',
    completed: false,
    important: true,
    schedule: null,
  },
  {
    id: 2,
    text: 'Learn Docker',
    completed: true,
    important: false,
    schedule: null,
  },
];

describe('Todo App Integration Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // Test 1: Empty state
  it('shows empty state when no todos exist', () => {
    render(<App />);

    expect(
      screen.getByText(/No tasks found/i)
    ).toBeInTheDocument();
  });

  // Test 2: Load todos from localStorage
  it('loads saved todos from localStorage', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    expect(
      screen.getByText('Learn GitHub Actions')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Learn Docker')
    ).toBeInTheDocument();
  });

  // Test 3: Complete todo
  it('marks todo as completed', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    const checkbox = screen.getAllByRole('checkbox')[0];

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  // Test 4: Delete todo
  it('deletes a todo', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    await user.click(
      screen.getAllByTitle('Delete task')[0]
    );

    expect(
      screen.queryByText('Learn GitHub Actions')
    ).not.toBeInTheDocument();
  });

  // Test 5: Mark todo important
  it('marks todo as important', async () => {
    const user = userEvent.setup();

    const todos = [
      {
        id: 1,
        text: 'Learn GitHub Actions',
        completed: false,
        important: false,
        schedule: null,
      },
    ];

    localStorage.setItem(
      'todos',
      JSON.stringify(todos)
    );

    render(<App />);

    const starButton = screen.getByTitle(
      'Mark as important'
    );

    await user.click(starButton);

    expect(
      screen.getByTitle('Remove importance')
    ).toBeInTheDocument();
  });

  // Test 6: Active filter
  it('shows only active todos', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Active' })
    );

    expect(
      screen.getByText('Learn GitHub Actions')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Learn Docker')
    ).not.toBeInTheDocument();
  });

  // Test 7: Completed filter
  it('shows only completed todos', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Completed' })
    );

    expect(
      screen.getByText('Learn Docker')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Learn GitHub Actions')
    ).not.toBeInTheDocument();
  });

  // Test 8: Important filter
  it('shows only important todos', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'todos',
      JSON.stringify(sampleTodos)
    );

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Important' })
    );

    expect(
      screen.getByText('Learn GitHub Actions')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Learn Docker')
    ).not.toBeInTheDocument();
  });

  // Test 9: Add a new todo
  it('adds a new todo successfully', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText(
      'What needs to be done?'
    );

    await user.type(input, 'Testing New Todo 123');

    await user.click(
      screen.getByRole('button', { name: /Add Task/i })
    );

    expect(
      screen.getByText('Testing New Todo 123')
    ).toBeInTheDocument();

    expect(input).toHaveValue('');
  });

  // Test 10: Empty input validation
  it('does not add an empty todo', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /Add Task/i })
    );

    expect(
      screen.getByText(/No tasks found/i)
    ).toBeInTheDocument();
  });

  // Test 11: Add todo with schedule
  it('adds a todo with a scheduled date', async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskInput = screen.getByPlaceholderText(
      'What needs to be done?'
    );

    const scheduleInput = document.querySelector(
      'input[type="datetime-local"]'
    );

    await user.type(taskInput, 'Complete project');

    await user.type(
      scheduleInput,
      '2027-01-15T10:30'
    );

    await user.click(
      screen.getByRole('button', { name: /Add Task/i })
    );

    expect(
      screen.getByText('Complete project')
    ).toBeInTheDocument();

    expect(scheduleInput).toHaveValue('');
  });

  // Test 12: LocalStorage persistence
  it('saves newly added todo in localStorage', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText(
      'What needs to be done?'
    );

    await user.type(input, 'Learn GitHub Actions');

    await user.click(
      screen.getByRole('button', { name: /Add Task/i })
    );

    await waitFor(() => {
      const savedTodos = JSON.parse(
        localStorage.getItem('todos')
      );

      expect(savedTodos).toHaveLength(1);

      expect(savedTodos[0].text).toBe(
        'Learn GitHub Actions'
      );

      expect(savedTodos[0].completed).toBe(false);
      expect(savedTodos[0].important).toBe(false);
    });
  });

});

import { useEffect, useState } from 'react';
import './App.css';

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
});

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const completedCount = todos.filter((todo) => todo.is_done).length;
  const activeCount = todos.length - completedCount;

  async function loadTodos() {
    const res = await fetch('/api/todos');
    setTodos(await res.json());
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setTitle('');
    loadTodos();
  }

  async function toggleTodo(id) {
    await fetch('/api/todos/' + id, { method: 'PATCH' });
    loadTodos();
  }

  async function deleteTodo(id) {
    await fetch('/api/todos/' + id, { method: 'DELETE' });
    loadTodos();
  }

  function formatTaskDate(date) {
    if (!date) return '';
    return dateFormatter.format(new Date(date));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">✓</span>
          <span>TaskBoard</span>
        </div>

        <div className="profile">
          <div className="avatar">OO</div>
          <div>
            <strong>Oyeyemi Oluwatobiloba</strong>
            <span>Class A - Pair 16</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p>Overview</p>
          <div className="metric is-active">
            <span>All tasks</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="metric">
            <span>In progress</span>
            <strong>{activeCount}</strong>
          </div>
          <div className="metric">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <h1>Today&apos;s tasks</h1>
          </div>
          <div className="status-pill">
            <span></span>
            PostgreSQL connected
          </div>
        </header>

        <section className="task-panel">
          <div className="panel-heading">
            <div>
              <h2>To Do</h2>
              <p>{activeCount} active, {completedCount} completed</p>
            </div>
            <span className="task-total">{todos.length}</span>
          </div>

          <form onSubmit={addTodo}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs doing?"
            />
            <button type="submit" disabled={!title.trim()}>
              Add task
            </button>
          </form>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.is_done ? 'is-done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.is_done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <div className="task-actions">
                  <time dateTime={todo.created_at}>{formatTaskDate(todo.created_at)}</time>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="empty-state">
              <span>+</span>
              <p>No tasks yet. Add your first task.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

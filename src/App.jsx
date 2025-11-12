import { useReducer, useState } from 'react';
import { todoReducer } from './components/TodoReducer';
import { initialState as initialTasks } from './components/TodoItems';

// The reducer expects state to be an object { tasks: [] }, but the initial data is just an array.

// wrap it here to create the correct initial state shape.
const initialState = {
  tasks: initialTasks.map(task => ({ ...task, text: task.title })), //  'title' to 'text'
};

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTask = (e) => {
    if ((e.keyCode === 13 || e.type === 'click') && input.trim() !== '') {
      // new todo's placed at the top
      dispatch({ type: 'ADD_TASK', payload: { text: input.trim(), atTop: true } });
      setInput('');
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const handleSave = (id) => {
    if (editingText.trim() !== '') {
      dispatch({ type: 'SAVE_TASK', payload: { id, text: editingText.trim() } });
    }
    setEditingId(null);
    setEditingText('');
  };

  // new todos should be at the top visually.
  // render the array as is, since the reducer adds new items to the top.

  // TaskItem component now handles all the logic for a single todo
  const TaskItem = ({ task }) => {
    const isEditing = editingId === task.id;

    return (
      <li className={`task ${task.completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
        />

        {isEditing ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave(task.id)}
            autoFocus
          />
        ) : (
          <span>{task.text}</span>
        )}

        <div className="task-buttons">
          {isEditing ? (
            <button className="save" onClick={() => handleSave(task.id)}>Save</button>
          ) : (
              <>
              <button className="edit" onClick={() => handleEdit(task)}>Edit</button>
              <button
                className="delete"
                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                disabled={!task.completed}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-area">
        <input
          type="text"
          className="txtb"
          placeholder="Add a new todo..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleAddTask}
        />
        <button className="add-btn" onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {state.tasks.length > 0 ? (
          state.tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks yet. Add one!</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;

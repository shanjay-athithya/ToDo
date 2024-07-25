import React, { useState } from 'react';
import { format, isBefore, parseISO } from 'date-fns';

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateTodo = (todo, dueDate) => {
    if (!todo || !todo.trim()) {
      return 'Task cannot be empty';
    }
    if (!dueDate) {
      return 'Due date cannot be empty';
    }
    if (isBefore(parseISO(dueDate), new Date())) {
      return 'Due date cannot be in the past';
    }
    return '';
  };

  const addTodo = (todo, dueDate) => {
    const error = validateTodo(todo, dueDate);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const newTodo = {
      text: todo,
      completed: false,
      createdAt: new Date(),
      dueDate: new Date(dueDate),
    };
    setTodos([...todos, newTodo]);
    setErrorMessage('');
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const startEditTodo = (index, text, dueDate) => {
    setEditIndex(index);
    setEditText(text);
    setEditDueDate(dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : '');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText('');
    setEditDueDate('');
    setErrorMessage('');
  };

  const submitEditTodo = () => {
    const error = validateTodo(editText, editDueDate);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const newTodos = [...todos];
    newTodos[editIndex].text = editText;
    newTodos[editIndex].dueDate = new Date(editDueDate);
    setTodos(newTodos);
    cancelEdit();
  };

  return (
    <div className="font-roboto max-w-lg mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">To-Do List</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <AddToDo addTodo={addTodo} />
      <ToDoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        startEditTodo={startEditTodo}
        editIndex={editIndex}
        editText={editText}
        setEditText={setEditText}
        editDueDate={editDueDate}
        setEditDueDate={setEditDueDate}
        submitEditTodo={submitEditTodo}
        cancelEdit={cancelEdit}
      />
    </div>
  );
}

function ToDoList({
  todos,
  deleteTodo,
  toggleComplete,
  startEditTodo,
  editIndex,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  submitEditTodo,
  cancelEdit,
}) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={() => deleteTodo(index)}
          toggleComplete={() => toggleComplete(index)}
          startEditTodo={() => startEditTodo(index, todo.text, todo.dueDate)}
          isEditing={editIndex === index}
          editText={editText}
          setEditText={setEditText}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          submitEditTodo={submitEditTodo}
          cancelEdit={cancelEdit}
        />
      ))}
    </ul>
  );
}

function ToDoItem({
  todo,
  deleteTodo,
  toggleComplete,
  startEditTodo,
  isEditing,
  editText,
  setEditText,
  editDueDate,
  setEditDueDate,
  submitEditTodo,
  cancelEdit,
}) {
  return (
    <li className="flex items-center justify-between p-2 border-b bg-white mb-2 shadow-sm rounded-lg">
      {isEditing ? (
        <div className="flex items-center space-x-2 w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-2 flex-grow rounded"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={submitEditTodo} className="bg-green-500 text-white p-2 rounded">Save</button>
          <button onClick={cancelEdit} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <span
              onClick={toggleComplete}
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''} text-lg`}
            >
              {todo.text}
            </span>
            <div className="text-sm text-gray-500">
              Created At: {format(new Date(todo.createdAt), 'PPPpp')}
            </div>
            {todo.dueDate && (
              <div className="text-sm text-red-500">
                Due Date: {format(new Date(todo.dueDate), 'PPP')}
              </div>
            )}
          </div>
          <button onClick={startEditTodo} className="bg-yellow-500 text-white p-2 mx-2 rounded">Edit</button>
          <button onClick={deleteTodo} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </>
      )}
    </li>
  );
}

function AddToDo({ addTodo }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input, dueDate);
    setInput('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 flex-grow rounded"
        placeholder="Add a new task..."
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add</button>
    </form>
  );
}

export default App;

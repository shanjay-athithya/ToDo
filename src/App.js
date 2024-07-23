import React, { useState } from 'react';
import { format } from 'date-fns';

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const addTodo = (todo, dueDate) => {
    const newTodo = {
      text: todo,
      completed: false,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
    };
    setTodos([...todos, newTodo]);
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
  };

  const submitEditTodo = () => {
    const newTodos = [...todos];
    newTodos[editIndex].text = editText;
    newTodos[editIndex].dueDate = editDueDate ? new Date(editDueDate) : null;
    setTodos(newTodos);
    cancelEdit();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
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
    <li className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-2 flex-grow"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="border p-2"
          />
          <button onClick={submitEditTodo} className="bg-green-500 text-white p-2">Save</button>
          <button onClick={cancelEdit} className="bg-gray-500 text-white p-2">Cancel</button>
        </div>
      ) : (
        <>
          <div className="flex-grow">
            <span
              onClick={toggleComplete}
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
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
          <button onClick={startEditTodo} className="bg-yellow-500 text-white p-2 mx-2">Edit</button>
          <button onClick={deleteTodo} className="bg-red-500 text-white p-2">Delete</button>
        </>
      )}
    </li>
  );
}

function AddToDo ({ addTodo }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
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
        className="border p-2 flex-grow"
        placeholder="Add a new task..."
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add</button>
    </form>
  );
}

export default App;

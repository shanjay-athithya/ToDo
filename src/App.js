import React, { useState } from 'react';
import { format, isBefore, parseISO } from 'date-fns';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

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
    <div className="font-roboto max-w-xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-green-600">To-Do List</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <AddTodo addTodo={addTodo} />
      <TodoList
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

export default App;

import React, { useState } from 'react';

function AddTodo({ addTodo }) {
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
      <button type="submit" className="bg-green-600 text-white px-6 rounded">Add</button>
    </form>
  );
}

export default AddTodo;

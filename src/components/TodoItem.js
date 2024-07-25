import React from 'react';
import { format } from 'date-fns';

function TodoItem({
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

export default TodoItem;

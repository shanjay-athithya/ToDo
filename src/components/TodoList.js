import React from 'react';
import TodoItem from './TodoItem';

function TodoList({
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
        <TodoItem
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

export default TodoList;

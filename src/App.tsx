import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from './TodoList';
import { Todo } from './Todo';

function App() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [todoContent, setTodoContent] = useState<string>('');
    const idVal = useRef<number>(0);



    const deleteTodo = (deleteId: number) => {
        const todosCopy = [...todos].filter((todo) => {
            return todo.id !== deleteId;
        })
        setTodos(todosCopy);
    }

    const onEdit = (editedTodo: Todo) => {
        const todosCopy = [...todos].map((todo) => {
            if (todo.id === editedTodo.id) {
                return { ...todo, id: editedTodo.id, content: editedTodo.content }
            }
            else return todo;
        })
        setTodos(todosCopy);
    }

    return (
        <div>
            <label>Create new Todo</label>
            <input type='text' value={todoContent} onChange={(e) => setTodoContent(e.target.value)} />
            <button onClick={() => {
                const todosCopy = [...todos];
                todosCopy.push({ content: todoContent, id: idVal.current });
                setTodos(todosCopy);
                idVal.current++;
            }}>Submit</button>
            <TodoList todos={todos} onDelete={deleteTodo} onEdit={onEdit} />
      </div>
    );
}

export default App;

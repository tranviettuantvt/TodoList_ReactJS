import logo from './logo.svg';

// css
import './App.css';
import './css/Todo.css'

// components
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import {storageJobs} from './components/Storage';

const isNotCheckAll=(todos=[]) => todos.find(todo => !todo.isCompleted)
// console.log(isNotCheckAll);
const filterByStatus=(todos =[], status='', id='') => {
  switch(status){
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default: 
      return todos
  }
}


function App() {

  const todoDetails= [
        {
          id: 1,
          text: 'todo 1',
          isCompleted: true
        },
        {
          id: 2,
          text: 'todo 2',
          isCompleted: false
        }
      ]

  const [todoList, setTodoList]=useState(todoDetails)
  const [todoEdit, setTodoEdit]=useState()
  const [isCheckAll, setIsCheckAll]=useState(false)
  const [status, setStatus]=useState('ALL')

  useEffect(() =>{
    setIsCheckAll(!isNotCheckAll(todoList))
  },[])

  const addTodo=todo => {
    setTodoList(prevTodo => [...prevTodo, todo])
  }

  const getTodoEdit=(id) => {
    setTodoEdit(id)
  }

  const onEditTodo=(newTodo ={}, index=-1) => {
    if(index >=0){
      let newEditList=todoList
      newEditList.splice(index, 1, newTodo)
      setTodoList(newEditList)
      setTodoEdit()
    }
  }
  
  const markCompleted =(id='') => {
    const updatedList = todoList.map(todo => todo.id === id ? ({...todo, isCompleted: !todo.isCompleted}): todo)  
    setTodoList(updatedList)
    setIsCheckAll(!isNotCheckAll(updatedList))
    console.log(!isNotCheckAll(updatedList));
  }

  const checkAllTodos=() => {
    setTodoList(todoList.map(todo => ({...todo, isCompleted: !isCheckAll})))
    setIsCheckAll(!isCheckAll)
  }

  const setStatusFilter=(status='') => {setStatus(status)}

  const clearCompleted=() => {
    setTodoList(filterByStatus(todoList, 'ACTIVE'))
  }
  const removeTodo=(id)=> {
    setTodoList(filterByStatus(todoList, 'REMOVE', id))
  }

  return (
    <div className="todoapp">
      <Header 
        addTodo={addTodo}
        isCheckAll={isCheckAll}
      />
      <TodoList 
        todoDetails={filterByStatus(todoList, status)}
        getTodoEdit={getTodoEdit}
        todoEdit={todoEdit}
        onEditTodo={onEditTodo}
        markCompleted={markCompleted}
        isCheckAll={isCheckAll}
        checkAllTodos={checkAllTodos}
        removeTodo={removeTodo}
      />
      <Footer 
        setStatusFilter={setStatusFilter}
        status={status}
        clearCompleted={clearCompleted}
        numOfTodos={todoList.length}
        numOfTodoActive={filterByStatus(todoList, 'ACTIVE').length}
      />
    </div>
  );
}

export default App;

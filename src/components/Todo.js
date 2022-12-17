import React, {memo, useState} from 'react'
import App from '../App'
import TodoList from './TodoList'

const Todo =(props) => {
    const {todoDetail, getTodoEdit, todoEdit, onEditTodo, index, markCompleted, removeTodo} =props
    const [text, setText]=useState(todoDetail.text)

    // console.log(todoDetail);
    // ban dau chua co todoEdit nen chua Edit,
    // khi dbclick, getTodoEdit lay Id ve truyen vao todoEdit trong App
    // sau do truyen vao props TodoList
    // todoEdit se truyen id vao tat ca cac todoDetail,
    // roi so sanh todoEdit voi tung todoDetail.id
    const isEditing= todoEdit === todoDetail.id

    const editTodo =() => {
        onEditTodo({
            ...todoDetail,
            text
        }, index)
    }

    // console.log(isEditing);
    return (
        <li className={`${isEditing && 'editing'} 
                        ${todoDetail.isCompleted && 'completed'}`}>

            {!isEditing ? 
                <div className='view'> 
                    <input
                        className='toggle'
                        type='checkbox'
                        checked={todoDetail.isCompleted}
                        onChange={() => markCompleted(todoDetail.id)}
                    /> 
                    <label onDoubleClick={() => getTodoEdit(todoDetail.id)}> 
                        {todoDetail.text}
                    </label> 
                    <button className='destroy' onClick={()=>removeTodo(todoDetail.id)}></button> 
                </div> : 
                <input
                    className='edit'
                    type='text'
                    value={text} 
                    onChange={e => setText(e.target.value)}  
                    onBlur={editTodo}
                    onKeyUp={(e) =>{
                        if(e.key ==='Enter'){
                            editTodo()
                        }
                    }}
                />
            }
            
        </li>
    )
}

export default memo(Todo)
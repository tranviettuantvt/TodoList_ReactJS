import React, {memo, useState} from 'react'

const Header=(props) => {
    const [text, setText] =useState('')
    const {addTodo, isCheckAll} =props

    const onAddTodo=(e={}) => {
        if(e.keyCode === 13 && text) {
            // console.log(text);
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('')
        }
    }
    return (
        <header className="header">
            <h1>todos</h1>
            <input 
                className="new-todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(e) => onAddTodo(e)}
                checked={isCheckAll}
            />
        </header>
    )
}

export default memo(Header)
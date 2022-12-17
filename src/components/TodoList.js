import React, {memo} from 'react'
import Todo from './Todo'

const TodoList =props => {
    
    const {todoDetails, isCheckAll, checkAllTodos}=props
    // todoDetails.map(todoDetail => {
    //     console.log({...{todoDetail}})
    // })
   // console.log(todoDetails);
    
    return (
        <section className='main'>
            <input
                className='toggle-all'
                type='checkbox'
                checked={isCheckAll}
            />
            <label htmlFor='toggle-all' onClick={checkAllTodos}></label>
            <ul className='todo-list'>
                {todoDetails.map((todoDetail,index) => (
                    <Todo 
                        key={todoDetail.id} 
                        {...{todoDetail}}
                        {...props}
                        index={index}
                    />
                ))}
            </ul>
        </section>
    )
}

export default memo(TodoList)
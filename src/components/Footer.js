import React, {memo} from 'react'

const Footer = props => {
    const {setStatusFilter, status, numOfTodos, numOfTodoActive, clearCompleted}=props

    const filterBtns=[
        {
            title: 'All',
            isActived: status==='ALL',
            onClick: () => setStatusFilter('ALL'),
            link: ''
        },
        {
            title: 'Active',
            isActived: status==='ACTIVE',
            onClick: () => setStatusFilter('ACTIVE'),
            link: 'active'
        },
        {
            title: 'Completed',
            isActived: status==='COMPLETED',
            onClick: () => setStatusFilter('COMPLETED'),
            link: 'completed'
        }
    ]
    return (
        <footer className='footer'>
            <span className='todo-count'>
                <strong>{numOfTodoActive}</strong>
                <span> </span>
                <span>{numOfTodoActive > 1 ? 'items': 'item'}</span>
                <span> left</span>
            </span>
            <ul className='filters'>
                {filterBtns.map(filterBtn => (
                    <FilterBtn 
                        key={filterBtn.title} 
                        {...filterBtn}
                    />
                ))}
            </ul>
            <button className='clear-completed' onClick={clearCompleted}>
                {numOfTodoActive < numOfTodos ?'Clear completed':''}
            </button>
        </footer>
    )
}

const FilterBtn = memo(props => {
    const {title,isActived,onClick,link}=props
    return (
        <>
            <li>
                <a
                    href={`#/${link}`}
                    className={`${isActived ? 'selected' : ''}`}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
        </>
    )
})

export default memo(Footer)
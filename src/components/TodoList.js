import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TodoList extends Component {
    render() {
        const { todos } = this.props
        return (
            <div>
                <h3>Todo List</h3>
                {
                    todos.map((todo) => {
                        return <div key={todo._id} >
                            <Link to={`/todo/${todo._id}`}>{todo.name}</Link>
                            </div>
                    })
                }
            </div>
        )
    }
}

export default TodoList

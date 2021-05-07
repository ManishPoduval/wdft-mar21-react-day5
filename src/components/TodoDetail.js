import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function TodoDetail(props) {

    const [todoDetail, updateTodo] = useState({})

    useEffect(() => {
        let todoId = props.match.params.todoId
        axios.get(`http://localhost:5005/api/todos/${todoId}`)
            .then((response) => {
                updateTodo( response.data)
            })
    })
    const { onDelete } = props
    return (
        <div>
            <h3>Todo Details</h3>
            <h4>{todoDetail.name}</h4>
            <p>{todoDetail.description}</p>
            <button>
                <Link to={`/todo/${todoDetail._id}/edit`}>Edit</Link>
            </button>
            <button onClick={() => { onDelete(todoDetail)  }}>Delete</button>
        </div>
    )
}

export default TodoDetail
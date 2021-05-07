import React, { useState, useEffect } from 'react'
import axios from 'axios'


function EditForm(props) {

    const [todoDetail, updateTodo] = useState({})

    useEffect(() => {
        let todoId = props.match.params.todoId
        axios.get(`http://localhost:5005/api/todos/${todoId}`)
            .then((response) => {
                updateTodo(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        // update just the name in the todoDetail state here
        let newName = event.target.value

        // when you want to just a single property of the object and not the whole object
        // clone IT
        let cloneTodoDetail = JSON.parse(JSON.stringify(todoDetail))

        cloneTodoDetail.name = newName
        updateTodo(cloneTodoDetail)

    }

    // ---------- SOMETHING COOL HAPPENED HERE ----------
    //------☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻

    const handleDescChange = (event) => {
        let newDesc = event.target.value

        let cloneTodoDetail = JSON.parse(JSON.stringify(todoDetail))
        cloneTodoDetail.description = newDesc

        updateTodo(cloneTodoDetail)
    }

    const { onEdit } = props
    return (
        <div>
            <h3>Edit page</h3>
            <input onChange={handleNameChange} type="text" value={todoDetail.name} />
            <input onChange={handleDescChange} type="text" value={todoDetail.description}/>
            <button onClick={() => { onEdit(todoDetail)  }}>Submit</button>
        </div>
    )
}

export default EditForm
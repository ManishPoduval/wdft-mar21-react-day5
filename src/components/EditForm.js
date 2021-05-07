import React, { Component } from 'react'
import axios from 'axios'

class EditForm extends Component {

    state = {
        todoDetail: {}
    }

    componentDidMount(){
        let todoId = this.props.match.params.todoId
        axios.get(`http://localhost:5005/api/todos/${todoId}`)
            .then((response) => {
                    this.setState({ todoDetail: response.data })
            })
    }

    handleNameChange = (event) => {
        // update just the name in the todoDetail state here
        let newName = event.target.value

        // when you want to just a single property of the object and not the whole object
        // clone IT
        const { todoDetail } = this.state
        let cloneTodoDetail = JSON.parse(JSON.stringify(todoDetail))

        cloneTodoDetail.name = newName

        this.setState({
            todoDetail: cloneTodoDetail
        })

    }

    // ---------- SOMETHING COOL HAPPENED HERE ----------
    //------☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻

    handleDescChange = (event) => {
        let newDesc = event.target.value
        const { todoDetail } = this.state
        let cloneTodoDetail = JSON.parse(JSON.stringify(todoDetail))

        cloneTodoDetail.description = newDesc

        this.setState({
            todoDetail: cloneTodoDetail
        })

    }

    render() {
        const { todoDetail } = this.state
        const { onEdit } = this.props
        return (
            <div>
                <h3>Edit page</h3>
                <input onChange={this.handleNameChange} type="text" value={todoDetail.name} />
                <input onChange={this.handleDescChange} type="text" value={todoDetail.description}/>
                <button onClick={() => { onEdit(todoDetail)  }}>Submit</button>
            </div>
        )
    }
}

export default EditForm
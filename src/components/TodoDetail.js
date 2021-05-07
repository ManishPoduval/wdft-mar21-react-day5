import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class TodoDetail extends Component {

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

    render() {
        const { todoDetail } = this.state

        const { onDelete } = this.props

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
}

export default TodoDetail
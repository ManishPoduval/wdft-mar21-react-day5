import axios from 'axios';
import React, { Component } from  'react'
import { Switch, Route, withRouter } from  "react-router-dom";
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import MyNav from './components/MyNav';
import TodoDetail from './components/TodoDetail';
import TodoList from './components/TodoList';

class App extends Component {

  //Save all your todos here which we show initially to the user
  state = {
    todos: []
  }

  componentDidMount = () => {
    // This code runs just once in the entire lifecycle on this Component
    axios.get('http://localhost:5005/api/todos')
      .then((response) => {
            this.setState({ todos: response.data })
      })
  }

  handleAdd = (event) => {
    // this will update the DB
    // and the state here as well
    event.preventDefault()
    let newTodo = {
      name: event.target.name.value,
      description: event.target.description.value,
      completed: false
    }
    // POST TAKES in 2 parameters in this case,
    // First is the url,
    // second is an object with key value pairs to send as form-data
    axios.post('http://localhost:5005/api/create', newTodo)
      .then((response) => {
          // if the todo is successfully added. 
          // add it to the state as well

          this.setState({
            todos: [response.data , ...this.state.todos]
          }, () => {
              // Redirect the user here
              this.props.history.push('/')
          })
      })
      .catch(() => {
        console.log('Add todo failed')
      })

  }

  handleDelete = (todoDetail) => {
    //delete from the DB
    // delete from the state

    axios.delete(`http://localhost:5005/api/todos/${todoDetail._id}`)
      .then(() => {
          // filter all the todos and grab everyone except the one that is deleted
          let filterTodos = this.state.todos.filter((todo) => {
              return todo._id !== todoDetail._id
          })

          // Update the state so that the list in the UI updates as well
          this.setState({
            todos: filterTodos
          }, () => {
            // Redirecting to the home page after deleting
            this.props.history.push('/')
          })
      })
      .catch(() => {
          console.log('Delete failed')
      })



  }

  handleEdit = (todoDetail) => {
    // edit the todo in the DB
    // and then in the state as well
    axios.patch(`http://localhost:5005/api/todos/${todoDetail._id}`, todoDetail)
      .then(() => {
        // update the localstate as well after updating in the DB
          let updatedTodos = this.state.todos.map((todo) => {
              if  (todo._id == todoDetail._id) {
                todo.name = todoDetail.name
                todo.description = todoDetail.description
              }
              return todo
          })

        this.setState({
          todos: updatedTodos
        }, () => {
          // Redirect to an specific page
          // we redirect here to the '/' page
          this.props.history.push('/')
        })
      })
      .catch(() =>{
        console.log('Edit crashed')
      })


  }

	render() {
    // desrcuture state here
    const { todos } = this.state
    console.log(this.props)
		return (
		<div  >
			<h1>Shopping List</h1>
      <MyNav />
      <Switch>
        <Route exact path="/"  render={() => {
            return <TodoList todos={todos} />
        }}/>
        <Route exact path="/todo/:todoId"  render={(routeProps) => {
            return <TodoDetail 
            onDelete={this.handleDelete} {...routeProps} />
        }}/>
        <Route path="/todo/:todoId/edit"  render={(routeProps) => {
            return <EditForm onEdit={this.handleEdit} {...routeProps} />
        }}/>
        <Route  path="/add-form"  render={() => {
            return <AddForm onAdd={this.handleAdd} />
        }}/>
      </Switch>
		</div>
		);
	}
}

export default withRouter(App);
import React, { Component } from  'react'
import {Button} from  'react-bootstrap'

class AddForm extends Component {

	render() {
        const { onAdd } = this.props
		return (
			<form onSubmit={onAdd}>
				<input  name="name"  type="text"  placeholder="Enter name"/>
				<input  name="description"  type="text"  placeholder="Enter desc"/>
				<Button  type="submit"  >Submit</Button>
			</form>
		)
	}
}

export  default AddForm
import React from  'react'
import {Button} from  'react-bootstrap'

function AddForm(props) {
	const { onAdd } = props
	return (
		<form onSubmit={onAdd}>
			<input  name="name"  type="text"  placeholder="Enter name"/>
			<input  name="description"  type="text"  placeholder="Enter desc"/>
			<Button  type="submit"  >Submit</Button>
		</form>
	)
}

export  default AddForm
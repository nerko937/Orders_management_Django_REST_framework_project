import React from 'react';
import ReactDOM from 'react-dom';
import ShowResults from './ShowResults.jsx';


class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showSpecified: false
		};
	};

	mySubmitHandler = (event) => {
		event.preventDefault();
		this.setState({showSpecified: event.target.elements.search.value});
	}
	myClickHandler = (event) => {
		event.preventDefault();
		this.setState({showSpecified: false});
	}
  

  render() {
	const showSpecified = this.state.showSpecified;
	const showAll = this.state.showAll
    return (
		<div>

			<form 
				onSubmit={this.mySubmitHandler}
				class="form-inline"
			>
				<input
					class="form-control"
					placeholder="Search"
					aria-label="Search"
				/>
				<button 
					class="btn btn-danger" 
					type="submit"
				>
					Search
				</button>
			</form>

			<a
				href="#"
				class="text-decoration-none"
				onClick={this.myClickHandler}
			>
				Show all
			</a>
			
			<ShowResults showSpecified={showSpecified} />

		</div>
    );
  }
}

export default Form;